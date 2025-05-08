import { Component, inject, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-coming-soon',
  imports: [],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css'
})

export class ComingSoonComponent {
  readonly userService = inject(UserService);
  readonly email: string = 'fixityourself@bisonbase.com';
}
