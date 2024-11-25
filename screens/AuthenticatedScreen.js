import { useAuth, database } from '../AuthContext';
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";

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

    const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "transacciones"),
      (snapshot) => {
        const balances = { Efectivo: 0, Nequi: 0, MercadoPago: 0 };

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const { fuenteDinero, valor, fuenteCambio, valorCambio } = data;

          if (fuenteDinero && valor) {
            balances[fuenteDinero] += parseFloat(valor);
          }

          if (fuenteCambio && valorCambio) {
            balances[fuenteCambio] -= parseFloat(valorCambio);
          }
        });

        const total =
          balances.Efectivo + balances.Nequi + balances.MercadoPago;
        setTotalBalance(total);
        setLoading(false);
      },
      (error) => {
        console.error("Error al escuchar las transacciones:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


    return (
        <View style={styles.authContainer}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.emailText}>{user?.email || "CORREO"}</Text>
            <Text style={styles.title}>Balance Total</Text>
            <Text style={styles.total}>${totalBalance.toFixed(2)}</Text>
            <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
        </View>
    );
};

const styles = StyleSheet.create({
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
      },
      total: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#4caf50",
      },
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
