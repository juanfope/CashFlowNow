import React from 'react';
import { View, Button, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { database } from "../AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Transactions from '../components/Transactions';

const HistScreen = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
      const collectionRef = collection(database, 'transacciones');
      const q = query(collectionRef, orderBy('fecha', 'desc'));

      const unsubscribe = onSnapshot(q, querySnapshot => {
          setTransactions(
              querySnapshot.docs.map(doc => ({
                  id: doc.id,
                  tipoTransaccion: doc.data().tipoTransaccion,
                  referencia: doc.data().referencia,
                  fuenteDinero: doc.data().fuenteDinero,
                  valor: doc.data().valor,
                  fuenteCambio: doc.data().fuenteCambio,
                  valorCambio: doc.data().valorCambio,
                  fecha: doc.data().fecha
              }))
          );
      });
      return unsubscribe;
  }, []);

  const goToTransactionRegister = async () => {
      navigation.navigate("Registrar nueva transacción");
  };

  return (
      <View style={styles.margCont}>
          <ScrollView style={styles.scrollArea}>
              {transactions.map(transaction => <Transactions key={transaction.id} {...transaction} />)}
          </ScrollView>
          <Button title="Registrar nueva transaccion" onPress={goToTransactionRegister} color="#e74c3c" />
      </View>
  );
}

export default HistScreen

const styles = StyleSheet.create({
  margCont: {
      flex: 1,
      padding: 22,
      backgroundColor: '#3f9bd4',
      margin: 16,
      borderRadius: 8
  },
  scrollArea: {
      flex: 1,
      marginBottom: 16,
  }
});