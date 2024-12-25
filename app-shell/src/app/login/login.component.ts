import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = 'user';
  password = 'user';
  constructor(
    private readonly appService: AppService,
    private readonly router: Router,
    private readonly _snackBar: MatSnackBar
  ) {}

  login() {
    const success = this.appService.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/main']);
    } else {
      this._snackBar.open('Login failed', 'Close');
    }
  }
}
