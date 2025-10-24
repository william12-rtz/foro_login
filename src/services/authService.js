// Servicio de Autenticación
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { Platform } from 'react-native';

class AuthService {
  // Login con Email y Contraseña
  async loginWithEmail(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        user: userCredential.user,
        message: 'Inicio de sesión exitoso'
      };
    } catch (error) {
      return {
        success: false,
        error: this.handleAuthError(error)
      };
    }
  }

  // Registro con Email y Contraseña
  async registerWithEmail(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        user: userCredential.user,
        message: 'Registro exitoso'
      };
    } catch (error) {
      return {
        success: false,
        error: this.handleAuthError(error)
      };
    }
  }

  // Login con Google
  async loginWithGoogle() {
    try {
      if (Platform.OS === 'web') {
        // Usar signInWithPopup para web
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        
        return {
          success: true,
          user: userCredential.user,
          message: 'Inicio de sesión con Google exitoso'
        };
      } else {
        // En Expo Go no se puede usar Google Sign-In nativo
        return {
          success: false,
          error: 'Google Sign-In solo está disponible en web con Expo Go'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: this.handleAuthError(error)
      };
    }
  }

  // Cerrar Sesión
  async logout() {
    try {
      // Cerrar sesión de Firebase
      await signOut(auth);
      
      return {
        success: true,
        message: 'Sesión cerrada exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al cerrar sesión'
      };
    }
  }

  // Obtener Usuario Actual
  getCurrentUser() {
    return auth.currentUser;
  }

  // Manejar Errores de Autenticación
  handleAuthError(error) {
    const errorMessages = {
      'auth/invalid-email': 'El correo electrónico no es válido',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
      'auth/user-not-found': 'No existe una cuenta con este correo',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/invalid-credential': 'Credenciales inválidas',
    };

    return errorMessages[error.code] || error.message || 'Error desconocido';
  }
}

export default new AuthService();
