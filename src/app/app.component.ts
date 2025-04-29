import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameViewComponent } from './game-view/game-view.component';
import { GamePlayEntryComponent } from "./game-play-entry/game-play-entry.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameViewComponent, GamePlayEntryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CSCI-313-Final-Project-PROgrammers';
}
