# 📝 Guía de Configuración Detallada

## Pasos para Configurar Firebase y Google Sign-In

### 1️⃣ Crear Proyecto en Firebase

1. Ve a https://console.firebase.google.com/
2. Haz clic en "Agregar proyecto"
3. Nombra tu proyecto (ej: "foro-login-app")
4. Acepta los términos y continúa
5. Habilita Google Analytics (opcional)
6. Espera a que se cree el proyecto

### 2️⃣ Configurar Authentication

1. En el menú lateral, ve a **Build > Authentication**
2. Haz clic en "Comenzar"
3. Ve a la pestaña **"Sign-in method"**
4. Habilita estos proveedores:

#### Email/Password:
- Haz clic en "Correo electrónico/contraseña"
- Activa el interruptor
- Guarda

#### Google:
- Haz clic en "Google"
- Activa el interruptor
- Agrega un correo de soporte (tu email)
- Guarda

### 3️⃣ Agregar App Web a Firebase

1. En la página principal de tu proyecto, haz clic en el ícono **</>** (Web)
2. Registra tu app:
   - Nombre: "foro-login-app"
   - NO necesitas configurar Firebase Hosting
3. Copia el código de configuración que aparece:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxxx"
};
```

4. Pega esta configuración en `src/config/firebase.js`

### 4️⃣ Obtener Web Client ID para Google Sign-In

1. En Firebase Console, ve a **Configuración del proyecto** (⚙️)
2. Baja hasta la sección "Tus apps"
3. Selecciona tu app web
4. Busca el **Web Client ID** - se ve así:
   ```
   123456789-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
   ```
5. Copia este ID
6. Pégalo en `src/services/authService.js`:

```javascript
GoogleSignin.configure({
  webClientId: 'TU_WEB_CLIENT_ID_AQUI.apps.googleusercontent.com',
});
```

### 5️⃣ Configurar Android (Importante para Google Sign-In)

#### A. Generar SHA-1 Fingerprint

En Windows PowerShell o Git Bash:

```bash
cd %USERPROFILE%\.android
keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android
```

O en una sola línea:
```bash
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

Busca en la salida:
```
SHA1: AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:00:AA:BB:CC:DD
```

#### B. Agregar SHA-1 a Firebase

1. En Firebase Console > Configuración del proyecto
2. Baja hasta "Tus apps"
3. Si no tienes app Android, agrégala:
   - Haz clic en el ícono de Android
   - Package name: `com.foro.loginapp` (debe coincidir con app.json)
   - Nickname: "Android App"
   - SHA-1: Pega el SHA-1 que obtuviste
   - Registra la app

4. Descarga el archivo `google-services.json`
5. Coloca este archivo en la raíz de tu proyecto

#### C. Actualizar app.json

Asegúrate de que el package name coincida:

```json
"android": {
  "package": "com.foro.loginapp"
}
```

### 6️⃣ Configurar iOS (opcional)

#### A. Agregar App iOS en Firebase

1. En Firebase Console > Configuración del proyecto
2. Haz clic en el ícono de iOS
3. iOS bundle ID: `com.foro.loginapp`
4. Nickname: "iOS App"
5. Registra la app
6. Descarga `GoogleService-Info.plist`

#### B. Obtener el REVERSED_CLIENT_ID

1. Abre el archivo `GoogleService-Info.plist` descargado
2. Busca la clave `REVERSED_CLIENT_ID`
3. Copia su valor (ej: `com.googleusercontent.apps.123456789-xxxxxxxx`)

#### C. Actualizar app.json

```json
"ios": {
  "supportsTablet": true,
  "bundleIdentifier": "com.foro.loginapp",
  "infoPlist": {
    "CFBundleURLTypes": [
      {
        "CFBundleURLSchemes": ["com.googleusercontent.apps.TU-CLIENT-ID"]
      }
    ]
  }
}
```

### 7️⃣ Instalar Dependencias

```bash
npm install
```

### 8️⃣ Ejecutar la App

```bash
# Iniciar Expo
npm start

# O directamente en Android
npm run android

# O en iOS (macOS)
npm run ios
```

## ✅ Verificar Configuración

### Checklist:

- [ ] Proyecto creado en Firebase
- [ ] Authentication habilitado (Email/Password y Google)
- [ ] App Web registrada en Firebase
- [ ] Configuración copiada a `firebase.js`
- [ ] Web Client ID configurado en `authService.js`
- [ ] SHA-1 agregado a Firebase (Android)
- [ ] `google-services.json` descargado (Android)
- [ ] Package name correcto en `app.json`
- [ ] Dependencias instaladas con `npm install`

## 🔍 Troubleshooting

### "Could not connect to development server"
```bash
# Limpiar caché de Expo
expo start -c
```

### "Module not found"
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

### "Google Sign-In error 12500"
- Verifica el SHA-1
- Asegúrate de que `google-services.json` esté en la raíz
- Verifica que el package name coincida

### "API key not valid"
- Verifica que hayas copiado correctamente el `apiKey`
- No debe tener espacios ni comillas adicionales
- Reinicia Expo después de cambiar la configuración

## 📞 Contacto y Soporte

Si tienes problemas adicionales:
1. Revisa los logs en la consola de Expo
2. Verifica la consola de Firebase
3. Comprueba que todos los archivos estén guardados
4. Reinicia el servidor de desarrollo

## 🎓 Recursos de Aprendizaje

- [Video Tutorial Firebase Auth](https://firebase.google.com/docs/auth)
- [Guía React Native Firebase](https://rnfirebase.io/)
- [Google Sign-In Setup](https://github.com/react-native-google-signin/google-signin/blob/master/docs/setting-up/android.md)
