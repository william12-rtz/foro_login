import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import authService from '../services/authService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Registro
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Mensaje de error visible

  // Manejar Login/Registro con Email
  const handleEmailAuth = async () => {
    // Limpiar mensaje de error previo
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Por favor completa todos los campos');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await authService.loginWithEmail(email, password);
      } else {
        result = await authService.registerWithEmail(email, password);
      }

      if (result.success) {
        Alert.alert('Éxito', result.message);
        navigation.replace('Home');
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  // Manejar Login con Google
  const handleGoogleSignIn = async () => {
    // Limpiar mensaje de error previo
    setErrorMessage('');
    
    setLoading(true);

    try {
      const result = await authService.loginWithGoogle();

      if (result.success) {
        Alert.alert('Éxito', result.message);
        navigation.replace('Home');
      } else if (result.cancelled) {
        // Usuario canceló el popup, no mostrar error
        console.log('Usuario canceló el inicio de sesión con Google');
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo o Título */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin 
              ? 'Bienvenido de nuevo' 
              : 'Completa los datos para registrarte'}
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          {/* Mensaje de Error */}
          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
            </View>
          ) : null}
          
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          {/* Botón de Login/Registro */}
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleEmailAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Divisor - Solo en web */}
          {Platform.OS === 'web' && (
            <>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>O</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Botón de Google Sign-In */}
              <TouchableOpacity
                style={[styles.button, styles.googleButton]}
                onPress={handleGoogleSignIn}
                disabled={loading}
              >
                <Text style={styles.googleButtonText}>
                  🔍 Continuar con Google
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* Cambiar entre Login y Registro */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              {isLogin 
                ? '¿No tienes cuenta? ' 
                : '¿Ya tienes cuenta? '}
            </Text>
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.switchLink}>
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  switchText: {
    color: '#666',
    fontSize: 14,
  },
  switchLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LoginScreen;
