import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { database } from '../AuthContext';
import { collection, getDocs } from 'firebase/firestore';

const RegVentaScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [tType, setTType] = useState([
    { label: 'Venta', value: 'V' },
    { label: 'Compra', value: 'C' },
    { label: 'Consignación', value: 'Con' },
    { label: 'Retiro', value: 'R' },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDropdownOptions = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(database, 'referencias'));
      const items = querySnapshot.docs.map((doc) => ({
        label: doc.data().name,
        value: doc.id,
      }));
      setDropdownItems(items);
    } catch (error) {
      console.error('Error al obtener datos de Firestore:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={tType}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setTType}
        placeholder="Tipo de transacción"
        style={styles.dropdown}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <DropDownPicker
          open={dropdownOpen}
          value={dropdownValue}
          items={dropdownItems}
          setOpen={setDropdownOpen}
          setValue={setDropdownValue}
          setItems={setDropdownItems}
          placeholder="Selecciona un producto"
          style={styles.dropdown}
        />
      )}
    </View>
  );
};

export default RegVentaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 40
  },
  dropdown: {
    width: 250,
    marginBottom: 40
  },
});