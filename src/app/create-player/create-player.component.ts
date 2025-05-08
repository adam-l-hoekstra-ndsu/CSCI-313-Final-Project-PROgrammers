import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-create-player',
  imports: [RouterLink, FormsModule],
  templateUrl: './create-player.component.html',
  styleUrl: './create-player.component.css'
})
export class CreatePlayerComponent {
  sportId = input.required<number>()
  teamId = input.required<string>()
  playerService = inject(PlayerService)
  
  firstName: string = ""
  lastName: string = ""
  bio: string = ""
  age: string = ""

  commitChanges() {
    this.playerService.createPlayer(this.firstName, this.lastName, this.bio, this.age)
  }

}
