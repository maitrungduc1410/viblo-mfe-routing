import { Component, computed, signal } from '@angular/core';
import { loadRemoteModule } from '../utils/federation-utils';
import { AppService } from '../app.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactWrapperComponent } from '../wrappers/react-wrapper/react-wrapper.component';
import { VueWrapperComponent } from '../wrappers/vue-wrapper/vue-wrapper.component';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { WidgetViewComponent } from './widget-view/widget-view.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSelectModule,
    CommonModule,
    RouterModule,
    WidgetViewComponent,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  loaders = signal<any[]>([]);
  widgetLoaders = computed(() => {
    return this.loaders().filter((loader) => !loader.appView);
  });

  appViewLoaders = computed(() => {
    return this.loaders().filter((loader) => loader.appView);
  });

  viewMode = signal('widgetView');

  constructor(readonly appService: AppService, readonly router: Router) {}

  ngOnInit() {
    console.log('MainComponent ngOnInit');
    this.loadModules();
  }

  logout() {
    window.location.reload();
  }

  async loadModules() {
    for (const m of this.appService.authorized_modules) {
      try {
        const module = await loadRemoteModule(m);

        let loader;
        if (module.default) {
          loader = module.default;
        } else {
          loader = module;
        }

        const exports = Object.keys(loader);

        this.loaders.update((loaders) => [
          ...loaders,
          ...exports.map((item) => loader[item]),
        ]);

        const mainRoute = this.router.config.find((r) => r.path === 'main');

        if (mainRoute) {
          for (const appView of exports.filter((e) => loader[e].appView)) {
            const l = loader[appView];
            if (l.routeName) {
              const existingRoute = mainRoute.children?.find(
                (r) => r.path === l.routeName
              );

              if (!existingRoute) {
                mainRoute.children?.push({
                  path: l.routeName,
                  ...(l.framework === 'angular'
                    ? { loadChildren: () => l.module }
                    : l.framework === 'react'
                    ? { component: ReactWrapperComponent }
                    : { component: VueWrapperComponent }),
                  data: {
                    component: l.component,
                    plugins: l.plugins,
                  },
                });
              }
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    this.router.resetConfig(this.router.config);

    this.appService.hasAllModulesLoaded.set(true);
  }

  changeView(e: MatButtonToggleChange) {
    this.viewMode.set(e.value);

    if (this.viewMode() === 'widgetView') {
      this.router.navigate(['main']);
    }
  }
}
