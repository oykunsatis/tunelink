import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { firebase } from '@nativescript/firebase-core';
import { AppContainer } from './components/AppContainer';
import { FirebaseService } from './services/FirebaseService';

// Initialize Firebase
FirebaseService.initialize()
  .then(() => {
    console.log('Firebase initialized successfully');
  })
  .catch(error => {
    console.error('Firebase initialization error:', error);
  });

// Disable verbose logging in production
Object.defineProperty(global, '__DEV__', { value: false });

ReactNativeScript.start(React.createElement(AppContainer, {}, null));