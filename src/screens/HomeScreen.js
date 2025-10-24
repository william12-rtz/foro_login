import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import authService from '../services/authService';

const HomeScreen = ({ navigation }) => {
  const user = authService.getCurrentUser();

  const handleLogout = async () => {
    // En web usar confirm, en nativo usar Alert
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
      if (confirmed) {
        const result = await authService.logout();
        if (result.success) {
          // La navegación se manejará automáticamente por el onAuthStateChanged
        } else {
          window.alert('Error: ' + result.error);
        }
      }
    } else {
      Alert.alert(
        'Cerrar Sesión',
        '¿Estás seguro de que deseas cerrar sesión?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Sí, cerrar sesión',
            onPress: async () => {
              const result = await authService.logout();
              if (result.success) {
                navigation.replace('Login');
              } else {
                Alert.alert('Error', result.error);
              }
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Bienvenido! 👋</Text>
        <Text style={styles.subtitle}>Has iniciado sesión exitosamente</Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.label}>Correo electrónico:</Text>
        <Text style={styles.value}>{user?.email || 'No disponible'}</Text>
        
        <Text style={styles.label}>ID de usuario:</Text>
        <Text style={styles.value}>{user?.uid || 'No disponible'}</Text>
        
        {user?.displayName && (
          <>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{user.displayName}</Text>
          </>
        )}
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
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
  userInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginTop: 15,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
