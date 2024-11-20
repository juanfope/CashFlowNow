import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { database } from '../AuthContext';
import { doc, updateDoc } from 'firebase/firestore';

const RefEdit = ({ route, navigation }) => {
    const { id, name, SKU, precioVenta, precioCompra, unidadesDisp, descripcion } = route.params;
    const [newName, setNewName] = useState(name);
    const [newSKU, setNewSKU] = useState(SKU);
    const [newPrecioVenta, setNewPrecioVenta] = useState(precioVenta);
    const [newPrecioCompra, setNewPrecioCompra] = useState(precioCompra);
    const [newUnidadesDisp, setNewUnidadesDisp] = useState(unidadesDisp);
    const [newDescripcion, setNewDescripcion] = useState(descripcion);

    const onSave = async () => {
        const docRef = doc(database, "referencias", id);
        await updateDoc(docRef, {
            name: newName,
            SKU: newSKU,
            precioVenta: newPrecioVenta,
            precioCompra: newPrecioCompra,
            unidadesDisp: newUnidadesDisp,
            descripcion: newDescripcion,
        });
        alert("Referencia actualizada");
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={newName} onChangeText={setNewName} placeholder="Nombre" />
            <TextInput style={styles.input} value={newSKU} onChangeText={setNewSKU} placeholder="SKU" />
            <TextInput style={styles.input} value={String(newPrecioVenta)} onChangeText={(text) => setNewPrecioVenta(Number(text))} placeholder="Precio Venta" />
            <TextInput style={styles.input} value={String(newPrecioCompra)} onChangeText={(text) => setNewPrecioCompra(Number(text))} placeholder="Precio Compra" />
            <TextInput style={styles.input} value={String(newUnidadesDisp)} onChangeText={(text) => setNewUnidadesDisp(Number(text))} placeholder="Unidades Disponibles" />
            <TextInput style={styles.input} value={newDescripcion} onChangeText={setNewDescripcion} placeholder="Descripción" multiline />
            <Button title="Guardar Cambios" onPress={onSave} color="#e74c3c" />
        </View>
    );
};

export default RefEdit;

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});
