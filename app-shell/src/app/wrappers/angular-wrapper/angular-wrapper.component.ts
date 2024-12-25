import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-angular-wrapper',
  templateUrl: './angular-wrapper.component.html',
  styleUrls: ['./angular-wrapper.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AngularWrapperComponent {
  @Input() component: any;
  @Input() module: any;

  ngOnInit() {
    console.log('AngularWrapperComponent ngOnInit');
  }
}
