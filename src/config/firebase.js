// Firebase Configuration
import { Platform } from 'react-native';

let app, auth;

if (Platform.OS === 'web') {
  // Firebase Web SDK para web
  const { initializeApp } = require('firebase/app');
  const { getAuth } = require('firebase/auth');
  
  const firebaseConfig = {
    apiKey: "AIzaSyDZMuGgJ0zkqsTsnPWoiIAh8rUuglXrNFs",
    authDomain: "foro-login-app.firebaseapp.com",
    projectId: "foro-login-app",
    storageBucket: "foro-login-app.firebasestorage.app",
    messagingSenderId: "78717457739",
    appId: "1:78717457739:web:981e917b6240ffcdfc84ce",
    measurementId: "G-DTEFX71S44"
  };

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  // Firebase para React Native (Expo no soporta @react-native-firebase)
  // Usar solo el SDK web
  const { initializeApp } = require('firebase/app');
  const { initializeAuth, getReactNativePersistence } = require('firebase/auth');
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  
  const firebaseConfig = {
    apiKey: "AIzaSyDZMuGgJ0zkqsTsnPWoiIAh8rUuglXrNFs",
    authDomain: "foro-login-app.firebaseapp.com",
    projectId: "foro-login-app",
    storageBucket: "foro-login-app.firebasestorage.app",
    messagingSenderId: "78717457739",
    appId: "1:78717457739:web:981e917b6240ffcdfc84ce",
    measurementId: "G-DTEFX71S44"
  };

  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export { auth };
export default app;
