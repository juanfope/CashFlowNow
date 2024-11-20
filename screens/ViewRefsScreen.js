import React from 'react';
import { View, Button, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { database } from "../AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import References from "../components/References";

const ViewRefsScreen = () => {
    const navigation = useNavigation();
    const [references, setReferences] = React.useState([]);

    React.useEffect(() => {
        const collectionRef = collection(database, 'referencias');
        const q = query(collectionRef, orderBy('SKU', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setReferences(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name,
                    SKU: doc.data().SKU,
                    precioVenta: doc.data().precioVenta,
                    precioCompra: doc.data().precioCompra,
                    unidadesDisp: doc.data().unidadesDisp,
                    descripcion: doc.data().descripcion
                }))
            );
        });
        return unsubscribe;
    }, []);

    const goToRefCreation = async () => {
        navigation.navigate("Crear referencia");
    };

    return (
        <View style={styles.margCont}>
            <ScrollView style={styles.scrollArea}>
                {references.map(reference => <References key={reference.id} {...reference} />)}
            </ScrollView>
            <Button title="Crear nueva referencia" onPress={goToRefCreation} color="#e74c3c" />
        </View>
    );
};

export default ViewRefsScreen;

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
