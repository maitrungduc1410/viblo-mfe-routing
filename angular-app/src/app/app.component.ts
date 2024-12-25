import { Component } from '@angular/core';
import angularLogo from '../assets/angular.png';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  angularLogo = angularLogo;
}
