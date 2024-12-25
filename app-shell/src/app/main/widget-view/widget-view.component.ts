import { Component, input, signal } from '@angular/core';
import { ktdTrackById, KtdGridLayout } from '@katoid/angular-grid-layout';
import { KtdGridModule } from '@katoid/angular-grid-layout';
import { CommonModule } from '@angular/common';
import { ReactWrapperComponent } from '../../wrappers/react-wrapper/react-wrapper.component';
import { VueWrapperComponent } from '../../wrappers/vue-wrapper/vue-wrapper.component';
import { AngularWrapperComponent } from '../../wrappers/angular-wrapper/angular-wrapper.component';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AppService } from '../../app.service';

@Component({
  selector: 'widget-view-shell',
  templateUrl: './widget-view.component.html',
  styleUrls: ['./widget-view.component.scss'],
  standalone: true,
  imports: [
    KtdGridModule,
    CommonModule,
    ReactWrapperComponent,
    VueWrapperComponent,
    AngularWrapperComponent,
  ],
})
export class WidgetViewComponent {
  cols: number = 6;
  rowHeight: number = 100;
  layout = signal<KtdGridLayout>([]);
  trackById = ktdTrackById;

  loaders = input<any[]>([]);

  // debounceDataChanged = debounce(this.handleDataChanged, 500);

  constructor(private readonly appService: AppService) {
    // Convert the computed signal to an observable
    const loadersObservable: Observable<any[]> = toObservable(this.loaders);

    // Debounce the observable
    loadersObservable
      .pipe(debounceTime(appService.hasAllModulesLoaded() ? 0 : 300))
      .subscribe((debouncedLoaders) => {
        this.handleDataChanged();
      });
  }

  ngOnInit() {
    console.log('WidgetViewComponent initialized');
  }

  handleDataChanged() {
    const newLayout = [];
    for (let i = 0; i < this.loaders().length; i++) {
      newLayout.push({
        id: `${i}-${Date.now()}`,
        x: 0,
        y: 0,
        w: 3,
        h: 3,
      });
    }

    this.layout.set(newLayout);
  }

  getLoader(id: string): any {
    // get index from id, then return loader
    return this.loaders()[parseInt(id.split('-')[0])];
  }
}
