import { inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(readonly location: Location) {}
  
  goBack() {
    this.location.back();
  }
}
