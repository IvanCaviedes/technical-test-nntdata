import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Layout } from './layout.types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NttDataConfigService } from '@ntt-data/services/config';
import { Subject, filter, takeUntil } from 'rxjs';
import { AppConfig } from 'app/core/config/app.config';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, OnDestroy {
  config!: AppConfig;
  layout!: Layout;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _nttDataConfigService: NttDataConfigService
  ) {}

  ngOnInit() {
    this._nttDataConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {
        this.config = config;
        this._updateLayout();
      });

    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this._updateLayout();
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  private _updateLayout(): void {
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    this.layout = this.config.layout;
    const layoutFromQueryParam = route.snapshot.queryParamMap.get(
      'layout'
    ) as Layout;
    if (layoutFromQueryParam) {
      this.layout = layoutFromQueryParam;
      if (this.config) {
        this.config.layout = layoutFromQueryParam;
      }
    }
    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      if (
        path.routeConfig &&
        path.routeConfig.data &&
        path.routeConfig.data?.['layout']
      ) {
        // Set the layout
        this.layout = path.routeConfig.data?.['layout'];
      }
    });
  }
}
