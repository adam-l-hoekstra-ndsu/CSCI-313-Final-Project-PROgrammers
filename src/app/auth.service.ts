import { inject, Injectable } from '@angular/core';
import { Auth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile, user, User } from '@angular/fire/auth';
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
  readonly token: string | null = localStorage.getItem('token');
  
  private auth = inject(Auth);
  private router = inject(Router);
  //private afAuth = inject(AngularFireAuth);

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then(
      () => {
      localStorage.setItem('token', 'true');
      window.location.href="";
    }, err => {
      alert(`User not found: ${err.message} `);
      this.router.navigate(['/login'])
    })
  }

  logOut() {
    signOut(this.auth)
      .then(() => {
        localStorage.removeItem('token');
        window.location.reload();
      })
      .catch(err => {
        alert(err.message);
      })
  }

  forgotPassword(email: string) {
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        alert(`Password reset link was sent!`)
        this.router.navigate(['/login']);
      })
      .catch( err => {
        alert(`Something went wrong: ${ err.message }`);
      })
  }
}