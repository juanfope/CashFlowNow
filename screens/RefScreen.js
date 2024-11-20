import React from "react"
import { View, Button } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { database } from "../AuthContext"
import { collection, addDoc } from "firebase/firestore"
import { useNavigation } from "@react-navigation/native"

const RefScreen = () => {
  const navigation = useNavigation();
    const [newReference, setNewReference] = React.useState({
      name: "",
      SKU: "",
      precioVenta: 0,
      precioCompra: 0,
      unidadesDisp: 0,
      descripcion: ""
    })

    const onRefCreation = async() => {
      await addDoc(collection(database, "referencias"), newReference)
      navigation.navigate("Ver mis referencias");
    }

    return (
      <View>
        <TextInput placeholder="Nombre/Numero de ref" onChangeText={(text) => setNewReference({...newReference, name: text})}/>
        <TextInput placeholder="SKU" onChangeText={(text) => setNewReference({...newReference, SKU: text})}/>
        <TextInput placeholder="Precio de venta" onChangeText={(text) => setNewReference({...newReference, precioVenta: text})}/>
        <TextInput placeholder="Costo de compra" onChangeText={(text) => setNewReference({...newReference, precioCompra: text})}/>
        <TextInput placeholder="Unidades disponibles" onChangeText={(text) => setNewReference({...newReference, unidadesDisp: text})}/>
        <TextInput placeholder="Descripción" onChangeText={(text) => setNewReference({...newReference, descripcion: text})}/>
        <Button title="Crear referencia" onPress={onRefCreation} color="#e74c3c" />
      </View>
    )
}

export default RefScreen