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

  private auth = inject(Auth);
  private router = inject(Router);

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/dashboard'])
    }, err => {
      alert(`Something went wrong: ${err.message} `);
      this.router.navigate(['/login'])
    })
  }

  logout(){
    signOut(this.auth)
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
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