import * as React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import { database } from '../AuthContext'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

    export default function References({
        id,
        name,
        SKU,
        precioVenta,
        precioCompra,
        unidadesDisp,
        descripcion
    }){

    const navigation = useNavigation();

    const onRefEdit = () => {
        navigation.navigate("reference edit", {
            id,
            name,
            SKU,
            precioVenta,
            precioCompra,
            unidadesDisp,
            descripcion,
        });
    };

    const onDelete = () => {
        const docRef = doc(database, "referencias", id);
        deleteDoc(docRef);
    }

    return(
            <View style={styles.refContainer}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={styles.name}>{name}</Text>
                    <AntDesign onPress={onDelete} name='delete' size={24}/>
                </View>
                <Text style={styles.sku}>{SKU}</Text>
                <Text style={styles.precioVenta}>${precioVenta}</Text>
                <Text style={styles.precioCompra}>${precioCompra}</Text>
                <Text style={styles.unidadesDisp}>{unidadesDisp}</Text>
                <Text style={styles.descripcion}>{descripcion}</Text>
                <Button title="Editar referencia" onPress={onRefEdit} color="#e74c3c"/>
            </View>
    )
}

const styles = StyleSheet.create({
    margCont: {
        maxWidth: 900,
        padding: 22,
        backgroundColor: '#3f9bd4',
        margin: 16,
        borderRadius: 8
    },
    refContainer: {
        padding: 22,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    sku: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    precioVenta: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0b8f35'
    },
    precioCompra: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1291b8'
    },
    unidadesDisp: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
    },
    descripcion: {
        fontSize: 20,
        color: 'grey',
    },
})