import { Component, ElementRef, Input } from '@angular/core';
import { App, createApp } from 'vue';

@Component({
  selector: 'app-vue-wrapper',
  templateUrl: './vue-wrapper.component.html',
  styleUrls: ['./vue-wrapper.component.scss'],
  standalone: true,
})
export class VueWrapperComponent {
  @Input() component: any;
  @Input() plugins: any;
  app!: App<Element>;

  constructor(private readonly host: ElementRef) {}

  ngAfterViewInit() {
    this.app = createApp(this.component);

    if (this.plugins && Array.isArray(this.plugins)) {
      this.plugins.forEach((plugin: any) => {
        this.app.use(plugin);
      });
    }

    this.app.mount(this.host.nativeElement);
  }

  ngOnDestroy() {
    this.app.unmount();
  }
}
