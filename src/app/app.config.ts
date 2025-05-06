import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Your web app's Firebase configuration firebaseConfig goes here
// Copy the firebaseConfig object from your Firebase project settings
// const firebaseConfig = { ...... }
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm2GfZCaMECX8w9JILeSrtdrXe_dI8x3w",
  authDomain: "bisonbase-e2ae4.firebaseapp.com",
  projectId: "bisonbase-e2ae4",
  storageBucket: "bisonbase-e2ae4.firebasestorage.app",
  messagingSenderId: "1058085099612",
  appId: "1:1058085099612:web:4afd6d011ebb2c0f13ae99"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};
