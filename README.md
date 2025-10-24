# 🔐 Aplicación de Login con React Native y Firebase

Aplicación de React Native con pantalla de login que implementa autenticación con Firebase, incluyendo login por correo electrónico/contraseña y autenticación con Google.

## 📋 Características

- ✅ **Autenticación por Correo Electrónico**: Login y registro con email/password
- ✅ **Autenticación con Google**: Inicio de sesión con cuentas de Google
- ✅ **Navegación Automática**: Redirección basada en el estado de autenticación
- ✅ **Manejo de Errores**: Mensajes de error en español y validaciones
- ✅ **UI Moderna**: Interfaz limpia y responsive
- ✅ **Persistencia de Sesión**: Mantiene la sesión del usuario

## 🛠️ Tecnologías Utilizadas

- React Native (Expo)
- Firebase Authentication
- React Navigation
- Google Sign-In
- JavaScript/ES6+

## 📦 Instalación

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita Authentication en el menú lateral
4. Activa los métodos de autenticación:
   - Email/Password
   - Google

#### 2.1 Configurar Firebase en la App

Edita el archivo `src/config/firebase.js` y reemplaza los valores con tu configuración:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

Para obtener esta configuración:
- Ve a Firebase Console > Configuración del proyecto (⚙️)
- En "Tus apps" selecciona la app web
- Copia la configuración de Firebase

### 3. Configurar Google Sign-In

#### 3.1 Obtener Web Client ID

1. En Firebase Console, ve a Authentication > Sign-in method
2. Habilita Google como proveedor
3. Ve a "Configuración del SDK web" y copia el **Web Client ID**

#### 3.2 Configurar en la App

Edita `src/services/authService.js` y reemplaza:

```javascript
GoogleSignin.configure({
  webClientId: 'TU_WEB_CLIENT_ID.apps.googleusercontent.com',
});
```

#### 3.3 Configurar para Android

1. Genera el SHA-1 de tu certificado de debug:

```bash
# En Windows (Git Bash o PowerShell)
cd C:\Users\TU_USUARIO\.android
keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android
```

2. Copia el SHA-1 fingerprint
3. En Firebase Console > Configuración del proyecto > Tus apps > Android
4. Agrega el SHA-1 fingerprint
5. Descarga el archivo `google-services.json` y colócalo en la carpeta raíz del proyecto

#### 3.4 Configurar para iOS

1. Descarga el archivo `GoogleService-Info.plist` desde Firebase Console
2. Agrega tu iOS URL Scheme en `app.json`:

```json
"ios": {
  "bundleIdentifier": "com.foro.loginapp",
  "supportsTablet": true,
  "infoPlist": {
    "CFBundleURLTypes": [
      {
        "CFBundleURLSchemes": ["com.googleusercontent.apps.TU-CLIENT-ID"]
      }
    ]
  }
}
```

## 🚀 Ejecución

### Iniciar Expo

```bash
npm start
```

### Ejecutar en Android

```bash
npm run android
```

### Ejecutar en iOS (macOS solamente)

```bash
npm run ios
```

### Ejecutar en Web

```bash
npm run web
```

## 📁 Estructura del Proyecto

```
foro-login-app/
├── src/
│   ├── config/
│   │   └── firebase.js          # Configuración de Firebase
│   ├── services/
│   │   └── authService.js       # Servicio de autenticación
│   └── screens/
│       ├── LoginScreen.js       # Pantalla de login
│       └── HomeScreen.js        # Pantalla principal
├── App.js                       # Componente principal con navegación
├── package.json                 # Dependencias del proyecto
├── app.json                     # Configuración de Expo
└── README.md                    # Este archivo
```

## 🔧 Funcionalidades

### LoginScreen.js

- Formulario de login/registro
- Validación de campos
- Botón de autenticación con Google
- Alternancia entre login y registro
- Manejo de estados de carga

### AuthService.js

- `loginWithEmail(email, password)` - Login con email
- `registerWithEmail(email, password)` - Registro con email
- `loginWithGoogle()` - Login con Google
- `logout()` - Cerrar sesión
- `getCurrentUser()` - Obtener usuario actual
- `handleAuthError(error)` - Manejo de errores en español

### HomeScreen.js

- Muestra información del usuario
- Botón para cerrar sesión
- Confirmación antes de cerrar sesión

## 🎨 Personalización

### Cambiar Colores

Edita los estilos en cada componente. Por ejemplo, en `LoginScreen.js`:

```javascript
primaryButton: {
  backgroundColor: '#007AFF', // Cambia este color
}
```

### Agregar Logo

1. Agrega tu logo en la carpeta `assets/`
2. Importa y muestra en `LoginScreen.js`:

```javascript
import { Image } from 'react-native';

// En el render:
<Image 
  source={require('../assets/logo.png')} 
  style={styles.logo}
/>
```

## 🐛 Solución de Problemas

### Error: "Google Sign-In is not configured"

- Verifica que hayas configurado el `webClientId` correctamente
- Asegúrate de haber agregado el SHA-1 en Firebase Console (Android)

### Error: "Network request failed"

- Verifica tu conexión a internet
- Comprueba que la configuración de Firebase sea correcta

### Error: "auth/invalid-api-key"

- Verifica que los valores en `firebase.js` sean correctos
- Asegúrate de no tener espacios o comillas adicionales

### La app se cierra al presionar el botón de Google

- En Android: Verifica que el SHA-1 esté configurado
- Asegúrate de haber descargado el archivo `google-services.json`

## 📱 Capturas de Pantalla

La aplicación incluye:
- Pantalla de Login con campos de email/password
- Botón de Google Sign-In con estilo personalizado
- Pantalla de Home con información del usuario
- Transiciones suaves entre pantallas

## 🔒 Seguridad

- Las contraseñas nunca se almacenan en texto plano
- Firebase maneja toda la encriptación
- Los tokens de sesión son manejados automáticamente
- Validación de campos en el cliente

## 📄 Licencia

Este proyecto es de uso educativo para el curso de DPS.

## 👨‍💻 Autor

Desarrollado para el proyecto de Desarrollo de Plataformas de Software (DPS)

## 🆘 Soporte

Si tienes problemas:
1. Revisa que todas las dependencias estén instaladas
2. Verifica la configuración de Firebase
3. Comprueba los logs en la consola de Expo
4. Revisa la documentación de Firebase y React Native

## 📚 Recursos Adicionales

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Documentación de React Native](https://reactnative.dev/)
- [Documentación de Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Google Sign-In para React Native](https://github.com/react-native-google-signin/google-signin)
