import { Inject, Injectable } from '@angular/core';
import { NTT_DATA_APP_CONFIG } from './config.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { merge } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class NttDataConfigService {
  private _config: BehaviorSubject<any>;

  constructor(@Inject(NTT_DATA_APP_CONFIG) config: any) {
    this._config = new BehaviorSubject(config);
  }

  set config(value: any) {
    // Merge the new config over to the current config
    const config = merge({}, this._config.getValue(), value);

    // Execute the observable
    this._config.next(config);
  }

  get config$(): Observable<any> {
    return this._config.asObservable();
  }

  reset(): void {
    this._config.next(this.config);
  }
}
