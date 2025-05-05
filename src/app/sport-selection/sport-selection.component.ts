import { Component, inject, OnInit } from '@angular/core';
import { SportsService, SportInfo } from '../sports.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sport-selection',
  imports: [CommonModule],
  templateUrl: './sport-selection.component.html',
  styleUrl: './sport-selection.component.css',
})
export class SportSelectionComponent implements OnInit {
  sports: SportInfo[] = [];

  sportService: SportsService = inject(SportsService);

  ngOnInit(): void {
    this.sports = this.sportService.getSports();
  }
}
