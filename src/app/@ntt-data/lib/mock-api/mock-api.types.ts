import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export type NttDataMockApiMethods =
  | 'get'
  | 'post'
  | 'patch'
  | 'delete'
  | 'put'
  | 'head'
  | 'jsonp'
  | 'options';

export type NttDataMockApiReplyCallback =
  | ((data: {
      request: HttpRequest<any>;
      urlParams: { [key: string]: string };
    }) => [number, string | any] | Observable<any>)
  | undefined;
