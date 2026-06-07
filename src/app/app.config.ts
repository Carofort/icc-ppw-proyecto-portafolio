import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter} from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyAnAcrovIR_vZqnLC2Oo6Q1xUVUY5XJ9CE",
  authDomain: "ppw-portafolio-8517b.firebaseapp.com",
  projectId: "ppw-portafolio-8517b",
  storageBucket: "ppw-portafolio-8517b.firebasestorage.app",
  messagingSenderId: "708071106913",
  appId: "1:708071106913:web:93dfd4fb98d04370d07d20",
  measurementId: "G-74BMQF7QN2"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),

    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};
