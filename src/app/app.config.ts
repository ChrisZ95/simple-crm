import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-64d4d","appId":"1:132202786446:web:5654a116475c1bfd97a3df","storageBucket":"simple-crm-64d4d.appspot.com","apiKey":"AIzaSyCbBBVHKpyzNeFqXm6LVe3wayXzrF1nuKk","authDomain":"simple-crm-64d4d.firebaseapp.com","messagingSenderId":"132202786446"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
