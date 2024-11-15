import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBphThJugxAZvHgKuTTkR3BVecAxGICQGk",
    authDomain: "cashflownow-6d467.firebaseapp.com",
    projectId: "cashflownow-6d467",
    storageBucket: "cashflownow-6d467.firebasestorage.app",
    messagingSenderId: "919645255959",
    appId: "1:919645255959:web:8201455c5413739cdf9f52"
  };

  const app = initializeApp(firebaseConfig);

const AuthScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
  
    const auth = getAuth(app);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, [auth]);
  
    
    const handleAuthentication = async () => {
      navigation.navigate("Home");
      return;
      try {
        if (user) {
          console.log('User logged out successfully!');
          await signOut(auth);
        } else {
          if (isLogin) {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully!');
            navigation.navigate("Home")
          } else {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created successfully!');
          }
        }
      } catch (error) {
        console.error('Authentication error:', error.message);
      }
    };
  
    return (
      <View style={styles.authContainer}>
         <Text style={styles.title}>{isLogin ? 'Inicio de sesion' : 'Registro'}</Text>
  
         <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title={isLogin ? 'Iniciar sesion' : 'Registrate'} onPress={handleAuthentication} color="#3498db" />
        </View>
  
        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'No tienes cuenta? Registrate' : 'Ya tienes una cuenta? toca para ir al inicio de sesion'}
          </Text>
        </View>
      </View>
    );
  }

  //el export
  export default AuthScreen

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#3f9bd4',
    },
    authContainer: {
      width: '80%',
      maxWidth: 400,
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
      elevation: 3,
    },
    home: {
      width: '80%',
      height: '85%',
      maxWidth: 400,
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
      elevation: 3,
    },
    homeMenu: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
  
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 16,
      padding: 8,
      borderRadius: 4,
    },
    buttonContainer: {
      marginBottom: 16,
    },
    toggleText: {
      color: '#3498db',
      textAlign: 'center',
    },
    bottomContainer: {
      marginTop: 20,
    },
    emailText: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 20,
    },
  });