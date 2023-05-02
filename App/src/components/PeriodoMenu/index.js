import { } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


export default function PeriodoMenu() {
    return(
        <View style={styles.container}>
            <View style={styles.periodo}>
                <View style={styles.inicio}>
                    <Text style={styles.texto}>De:</Text>
                    <TextInput style={styles.campoData} placeholder='dd/mm/aaaa'></TextInput>
                </View>
                <View style={styles.fim}>
                    <Text style={styles.texto}>Até:</Text>
                    <TextInput style={styles.campoData} placeholder='dd/mm/aaaa'></TextInput>
                </View>
            </View>

            <TouchableOpacity style={styles.filtro}>
                <Text style={[styles.texto, {marginEnd: 6, fontSize: 16}]}>Filtrar</Text>
                <FontAwesome name="sliders" size={18} color='white'/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#14423C',
        height: 130,
    },
    periodo:{
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingStart: 24,
        paddingEnd: 24
    },
    texto:{
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    campoData: {
        width: 140,
        height: 36,
        backgroundColor: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 6,
        borderRadius: 5
    },
    filtro:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingEnd: 24,
        alignItems: 'center',
    },
});