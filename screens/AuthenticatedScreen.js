import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const AuthenticatedScreen = ({ navigation }) => {

// user

    return (
      <View style={styles.authContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.emailText}>CORREO</Text>
        <Button title="Logout" onPress={()=>{}} color="#e74c3c" />
      </View>
    );
  };

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
export default AuthenticatedScreen