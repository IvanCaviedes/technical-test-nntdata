import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, delay, of, switchMap, throwError } from 'rxjs';
import { NTT_MOCK_API_DEFAULT_DELAY } from './mock-api.constants';
import { MockApiService } from './mock-api.service';

@Injectable()
export class MockDataApiInterceptor implements HttpInterceptor {
  constructor(
    @Inject(NTT_MOCK_API_DEFAULT_DELAY) private _defaultDelay: number,
    private _NttDataaMockApiService: MockApiService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { handler, urlParams } = this._NttDataaMockApiService.findHandler(
      request.method.toUpperCase(),
      request.url
    );
    if (!handler) {
      return next.handle(request);
    }

    // Set the intercepted request on the handler
    handler.request = request;

    // Set the url params on the handler
    handler.urlParams = urlParams;

    // Subscribe to the response function observable
    return handler.response.pipe(
      delay(handler.delay ?? this._defaultDelay ?? 0),
      switchMap((response) => {
        // If there is no response data,
        // throw an error response
        if (!response) {
          response = new HttpErrorResponse({
            error: 'NOT FOUND',
            status: 404,
            statusText: 'NOT FOUND',
          });

          return throwError(() => response);
        }

        // Parse the response data
        const data = {
          status: response[0],
          body: response[1],
        };

        // If the status code is in between 200 and 300,
        // return a success response
        if (data.status >= 200 && data.status < 300) {
          response = new HttpResponse({
            body: data.body,
            status: data.status,
            statusText: 'OK',
          });

          return of(response);
        }

        // For other status codes,
        // throw an error response
        response = new HttpErrorResponse({
          error: data.body.error,
          status: data.status,
          statusText: 'ERROR',
        });

        return throwError(() => response);
      })
    );
  }
}
