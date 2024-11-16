import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../AuthContext';

const AuthenticatedScreen = ({ navigation }) => {
    const { user, logOut } = useAuth();

    const handleLogout = async () => {
        try {
            await logOut();
            navigation.navigate("Autentication");
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    return (
        <View style={styles.authContainer}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.emailText}>{user?.email || "CORREO"}</Text>
            <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
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
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    emailText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default AuthenticatedScreen;
