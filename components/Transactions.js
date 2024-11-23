import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { deleteDoc, doc } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { database } from "../AuthContext";

export default function Transactions({
  id,
  tipoTransaccion,
  referencia,
  fuenteDinero,
  valor,
  fuenteCambio,
  valorCambio,
}) {
  const getBackgroundColor = () => {
    if (tipoTransaccion === "Venta" || tipoTransaccion === "Consignación") {
      return styles.greenBackground;
    } else if (tipoTransaccion === "Compra" || tipoTransaccion === "Retiro") {
      return styles.redBackground;
    }
    return styles.defaultBackground;
  };

  const onDelete = () => {
    const docRef = doc(database, "transacciones", id);
    deleteDoc(docRef);
  };

  return (
    <View style={[styles.refContainer, getBackgroundColor()]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.tipoTransaccion}>{tipoTransaccion}</Text>
        <Text style={styles.valor}>${valor}</Text>
        <AntDesign onPress={onDelete} name="delete" size={24} />
      </View>
      <Text style={styles.referencia}>Referencia: {referencia}</Text>
      <Text style={styles.fuenteDinero}>Fuente: {fuenteDinero}</Text>
      <Text style={styles.fuenteCambio}>Fuente de cambio: {fuenteCambio}</Text>
      <Text style={styles.valorCambio}>Valor cambio: ${valorCambio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  refContainer: {
    padding: 22,
    margin: 16,
    borderRadius: 8,
  },
  greenBackground: {
    backgroundColor: "#62f07a",
  },
  redBackground: {
    backgroundColor: "#eb495e",
  },
  defaultBackground: {
    backgroundColor: "#fff",
  },
  valor: {
    fontSize: 28,
    fontWeight: "bold",
  },
  tipoTransaccion: {
    fontSize: 28,
    fontWeight: "bold",
  },
  referencia: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fuenteDinero: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fuenteCambio: {
    fontSize: 20,
    fontWeight: "bold",
  },
  valorCambio: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
