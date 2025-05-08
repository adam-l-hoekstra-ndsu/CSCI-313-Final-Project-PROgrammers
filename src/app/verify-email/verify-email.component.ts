import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  imports: [FormsModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})

export class VerifyEmailComponent {
  readonly authService = inject(AuthService);

  email!: string;
  readonly bbEmail = 'fixityourself@bisonbase.com';

}
