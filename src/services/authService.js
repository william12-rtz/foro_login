// Servicio de Autenticación
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  EmailAuthProvider,
  linkWithCredential
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { Platform } from 'react-native';

class AuthService {
  // Login con Email y Contraseña
  async loginWithEmail(email, password) {
    try {
      console.log('🔐 Intentando login con:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Login exitoso:', userCredential.user.email);
      return {
        success: true,
        user: userCredential.user,
        message: 'Inicio de sesión exitoso'
      };
    } catch (error) {
      console.log('❌ Error en login:', error.code, error.message);
      
      // Validar si el error es por credenciales inválidas (usuario no existe o contraseña incorrecta)
      if (error.code === 'auth/invalid-credential') {
        return {
          success: false,
          error: 'Este correo no está registrado o la contraseña es incorrecta. Por favor, regístrate primero.'
        };
      }
      
      return {
        success: false,
        error: this.handleAuthError(error)
      };
    }
  }

  // Registro con Email y Contraseña
  async registerWithEmail(email, password) {
    try {
      console.log('📝 Intentando registro con:', email);
      
      // Verificar si el usuario ya está logueado (con Google)
      const currentUser = auth.currentUser;
      
      if (currentUser && currentUser.email === email) {
        // Usuario ya existe (logueado con Google), vincular contraseña
        console.log('🔗 Usuario ya existe, vinculando contraseña...');
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(currentUser, credential);
        console.log('✅ Contraseña vinculada exitosamente');
        return {
          success: true,
          user: currentUser,
          message: 'Contraseña agregada exitosamente. Ahora puedes usar email/password para iniciar sesión'
        };
      } else {
        // Crear nuevo usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('✅ Registro exitoso:', userCredential.user.email);
        return {
          success: true,
          user: userCredential.user,
          message: 'Registro exitoso'
        };
      }
    } catch (error) {
      console.log('❌ Error en registro:', error.code, error.message);
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
      // Si el usuario cancela el popup, retornar un error específico
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        return {
          success: false,
          error: null, // No mostrar error, solo fue cancelado
          cancelled: true
        };
      }
      
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
      'auth/invalid-credential': 'Este email no tiene contraseña configurada. Inicia sesión con Google primero',
      'auth/provider-already-linked': 'Este método de autenticación ya está vinculado',
      'auth/credential-already-in-use': 'Esta contraseña ya está en uso con otra cuenta',
    };

    return errorMessages[error.code] || error.message || 'Error desconocido';
  }
}

export default new AuthService();
