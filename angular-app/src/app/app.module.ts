import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterLink, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Route[] = [
  // {
  //   path: 'test',
  //   loadChildren: () =>
  //     import('./widget/widget.module').then((m) => {
  //       console.log(1111, m);
  //       return m.WidgetModule;
  //     }),
  // },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
