import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { database } from "../AuthContext";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { TextInput } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

const RegVentaScreen = () => {
  const navigation = useNavigation();
  //Dropdown de tipo de transacción
  const [valor, setValor] = useState("");
  const [valorCambio, setValorCambio] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [tType, setTType] = useState([
    { label: "Venta", value: "Venta" },
    { label: "Compra", value: "Compra" },
    { label: "Consignación", value: "Consignación" },
    { label: "Retiro", value: "Retiro" },
  ]);

  //Dropdown de referencia
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDropdownOptions = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(database, "referencias"));
      const items = querySnapshot.docs.map((doc) => ({
        label: doc.data().name,
        value: { id: doc.id, name: doc.data().name },
      }));
      setDropdownItems(items);
    } catch (error) {
      console.error("Error al obtener datos de Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDropdownOptions();
  }, []);

  //Dropdown de fuente del dinero

  const [openMoney, setOpenMoney] = useState(false);
  const [valueMoney, setValueMoney] = useState(null);
  const [fuente, setFuente] = useState([
    { label: "Efectivo", value: "Efectivo" },
    { label: "MercadoPago", value: "MercadoPago" },
    { label: "Nequi", value: "Nequi" },
  ]);

  //Dropdown vueltas/cambio

  const [openChange, setOpenChange] = useState(false);
  const [valueChange, setValueChange] = useState(null);
  const [cambio, setCambio] = useState([
    { label: "Efectivo", value: "Efectivo" },
    { label: "MercadoPago", value: "MercadoPago" },
    { label: "Nequi", value: "Nequi" },
    { label: "No aplica", value: "N/A" },
  ]);

  //función para guardar los datos
  const onRegisterCreation = async () => {
    if (!value || !dropdownValue || !valueMoney || !valor || !valueChange || !valorCambio) {
      alert("Por favor completa todos los campos.");
      return;
    }
  
    try {
      await addDoc(collection(database, "transacciones"), {
        tipoTransaccion: value,        
        referencia: dropdownValue.name,
        fuenteDinero: valueMoney,    
        valor: parseFloat(valor),    
        fuenteCambio: valueChange,    
        valorCambio: parseFloat(valorCambio),
        fecha: new Date(), 
      });
  
      alert("Transacción registrada con éxito.");
      navigation.navigate("Historial");
    } catch (error) {
      console.error("Error al registrar transacción:", error);
      alert("Hubo un error al registrar la transacción.");
    }
  };
  
  

  return (
    <View style={styles.container}>
      <View style={styles.dropdownWrapper}>
        <DropDownPicker
          open={open}
          value={value}
          items={tType}
          setOpen={(open) => {
            setOpen(open);
            setDropdownOpen(false);
            setOpenMoney(false);
            setOpenChange(false);
          }}
          setValue={setValue}
          setItems={setTType}
          placeholder="Tipo de transacción"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>
      
      <View style={styles.dropdownWrapper}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <DropDownPicker
            open={dropdownOpen}
            value={dropdownValue}
            items={dropdownItems}
            setOpen={(open) => {
              setDropdownOpen(open);
              setOpen(false);
              setOpenMoney(false);
              setOpenChange(false);
            }}
            setValue={setDropdownValue}
            setItems={setDropdownItems}
            placeholder="Referencia"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        )}
        </View>

        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={openMoney}
            value={valueMoney}
            items={fuente}
            setOpen={(open) => {
              setOpenMoney(open);
              setOpen(false);
              setDropdownOpen(false);
              setOpenChange(false);
            }}
            setValue={setValueMoney}
            setItems={setFuente}
            placeholder="Fuente"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>
      
        <View style={styles.dropdownWrapper}>
          <TextInput
            placeholder="Valor"
            style={styles.dropdown}
            keyboardType="numeric"
            value={valor}
            onChangeText={(text) => setValor(text)}
          />
        </View>

        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={openChange}
            value={valueChange}
            items={cambio}
            setOpen={(open) => {
              setOpenChange(open);
              setOpen(false);
              setDropdownOpen(false);
              setOpenMoney(false);
            }}
            setValue={setValueChange}
            setItems={setCambio}
            placeholder="Fuente del cambio"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        </View>

        <View style={styles.dropdownWrapper}>
          <TextInput
            placeholder="Valor del cambio (Escriba 0 si no aplica)"
            style={styles.dropdown}
            keyboardType="numeric"
            value={valorCambio}
            onChangeText={(text) => setValorCambio(text)}
          />
        </View>

        <View style={styles.dropdownWrapper}>
          <Button title="Registrar transacción" onPress={onRegisterCreation}/>
        </View>
    </View>
  );
};

export default RegVentaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  dropdownWrapper: {
    margin: 15
  },
  dropdown: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  textInput: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownContainer: {
    borderColor: "#ddd",
    zIndex: 3000,
    elevation: 6,
  },
});
