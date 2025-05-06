import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);

  email = '';
  password = '';

  login() {
    if (this.email == '') {
      alert('Please enter email');
      return;
    }

    if (this.password == ''){
      alert('Please enter your password')
      return;
    }

    this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';

  }
}
