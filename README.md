#  Foro Login App

Aplicación de login con React Native, Firebase Authentication y Google Sign-In.

##  Pasos para levantar el proyecto

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar el servidor de desarrollo

```bash
npm start
```

o también:

```bash
npx expo start
```

### 3. Ejecutar la aplicación

Una vez iniciado el servidor, tienes varias opciones:

####  En tu teléfono
Escanea el código QR con la app **Expo Go**
- [Expo Go para Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [Expo Go para iOS](https://apps.apple.com/app/expo-go/id982107779)

####  En la consola
- Presiona `w` para abrir en navegador web
- Presiona `a` para abrir en Android Studio
- Presiona `i` para abrir en iOS Simulator (solo macOS)

##  Estructura del proyecto

```
foro-login-app/
 src/
    config/
       firebase.js          # Configuración de Firebase
    services/
       authService.js       # Servicio de autenticación
    screens/
        LoginScreen.js       # Pantalla de login
        HomeScreen.js        # Pantalla principal
 App.js                       # Componente principal con navegación
 package.json                 # Dependencias del proyecto
 app.json                     # Configuración de Expo
 README.md                    # Este archivo
```

##  Funcionalidades

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

##  Documentación adicional

Para más detalles sobre la configuración de Firebase, consulta el archivo `CONFIGURACION.md`.

---

Desarrollado para el proyecto de Desarrollo de Plataformas de Software (DPS)
