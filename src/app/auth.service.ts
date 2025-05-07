import { inject, Injectable } from '@angular/core';
import { Auth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

export interface UserInfo{
  fname: string,
  lname: string,
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  [x: string]: any;

  readonly token: string | null = localStorage.getItem('token');
  private _token: string | null = localStorage.getItem('token');

  get tokenF(): string | null {
    return this._token;
  }
  
  private auth = inject(Auth);
  private router = inject(Router);

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['']);
      window.location.reload();
    }, err => {
      alert(`User not found: ${err.message} `);
      this.router.navigate(['/login'])
    })
  }

  logOut(){
    signOut(this.auth)
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['']);
        window.location.reload();
      })
      .catch(err => {
        alert(err.message);
      })
  }

  forgotPassword(email: string) {
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        this.router.navigate(['/verify-email']);
      })
      .catch( err => {
        alert(`Something went wrong: ${ err.message }`);
      })
  }

  getUser(): User | null {
    return this.auth.currentUser;
  }
}