import {} from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BarraSuperior from '../../components/barraSuperior';
import BarraInferior from '../../components/barraInferior';

function Campo({titulo, tamanho, placeholder}){
    console.log(tamanho);
    return(
        <View>
            <Text style={styles.titulo}>{titulo}</Text>
            <TextInput style={[styles.input, {width:tamanho}]} placeholder={placeholder}/>
        </View>
    );   
}

export default function AddPagamento(){
    return(
        <View
        style={styles.container}>
            <BarraSuperior titulo="Adicionar pagamento"/>
            <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.conteudo}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Campo titulo="Data de vencimento *" placeholder={"Selecione a data de vencimento"}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Campo titulo="Tipo *" tamanho={130} placeholder={"A receber"}/>
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            <Campo titulo="Categoria *" tamanho={130} placeholder={"Selecione"}/>
                            <TouchableOpacity activeOpacity={0.5}>
                                <Ionicons name="add-circle-outline" size={30} color="#14423C" />
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                    <Campo titulo="Descrição *" placeholder={"Digite a descrição"}/>
                    <Campo titulo="Linha digitável" placeholder={"00000.00000.00000 000000.00000.000000 0 00000000000000"}/>
                    <Campo titulo="Boleto" placeholder={"Selecione o boleto"}/>
                    
                    <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                        <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', color: 'white', fontSize: 16, alignSelf: 'center', justifyContent: 'center'}}>Adicionar</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
            <BarraInferior valor="adicionar"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    conteudo:{
        paddingTop: 24,
        paddingBottom: 24,
        paddingStart: 24,
        paddingEnd: 24,
        flex: 1,
        backgroundColor: '#e7e7e7',
    },
    titulo:{
        color: '#14423C',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input:{
        height: 36,
        borderColor: "#14423C",
        borderLeftWidth: 6,
        borderBottomWidth: 2,
        paddingLeft: 14,
        marginBottom: 24,
    },
    btn:{
        width: "100%",
        backgroundColor: '#14423C',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    }

});