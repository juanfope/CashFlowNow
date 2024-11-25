import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { database } from "../AuthContext";
import { collection, onSnapshot } from "firebase/firestore";

const MoneyBalanceScreen = () => {
  const [balances, setBalances] = useState({
    Efectivo: 0,
    Nequi: 0,
    MercadoPago: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "transacciones"),
      (snapshot) => {
        const newBalances = { Efectivo: 0, Nequi: 0, MercadoPago: 0 };

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const { fuenteDinero, valor, fuenteCambio, valorCambio } = data;

          if (fuenteDinero && valor) {
            newBalances[fuenteDinero] += parseFloat(valor);
          }

          if (fuenteCambio && valorCambio) {
            newBalances[fuenteCambio] -= parseFloat(valorCambio);
          }
        });

        setBalances(newBalances);
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
    <View style={styles.container}>
      <Text style={styles.title}>Balances de Medios de Pago</Text>
      <View style={styles.balanceContainer}>
        <View style={styles.card}>
          <Text style={styles.label}>Efectivo</Text>
          <Text style={styles.value}>${balances.Efectivo.toFixed(2)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Nequi</Text>
          <Text style={styles.value}>${balances.Nequi.toFixed(2)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>MercadoPago</Text>
          <Text style={styles.value}>${balances.MercadoPago.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

export default MoneyBalanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  balanceContainer: {
    flexDirection: "column",
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
});
