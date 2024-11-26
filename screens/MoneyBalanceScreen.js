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
          const { fuenteDinero, valor, fuenteCambio, valorCambio, tipoTransaccion } = data;

          const parsedValor = parseFloat(valor) || 0;
          const parsedValorCambio = parseFloat(valorCambio) || 0;

          // Actualizar balances dependiendo del tipo de transacción
          if (tipoTransaccion) {
            if (["venta", "consignación"].includes(tipoTransaccion.toLowerCase())) {
              // Sumar el valor al medio de pago principal
              if (fuenteDinero) {
                newBalances[fuenteDinero] += parsedValor;
              }
              // Restar el valor de cambio del medio de pago secundario
              if (fuenteCambio) {
                newBalances[fuenteCambio] -= parsedValorCambio;
              }
            } else if (["compra", "retiro"].includes(tipoTransaccion.toLowerCase())) {
              // Restar el valor del medio de pago principal
              if (fuenteDinero) {
                newBalances[fuenteDinero] -= parsedValor;
              }
              // Sumar el valor de cambio al medio de pago secundario
              if (fuenteCambio) {
                newBalances[fuenteCambio] += parsedValorCambio;
              }
            }
          } else {
            console.warn("Transacción sin tipo especificado:", data);
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
        <View style={styles.e}>
          <Text style={styles.label}>Efectivo</Text>
          <Text style={styles.value}>${balances.Efectivo.toFixed(2)}</Text>
        </View>
        <View style={styles.nq}>
          <Text style={styles.label}>Nequi</Text>
          <Text style={styles.value}>${balances.Nequi.toFixed(2)}</Text>
        </View>
        <View style={styles.mp}>
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
  e: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#02e373",
    alignItems: "center",
    elevation: 2,
  },
  nq: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ba0687",
    alignItems: "center",
    elevation: 2,
  },
  mp: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f5d60c",
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
