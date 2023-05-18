import {} from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BarraSuperior from '../../components/BarraSuperior';
import BarraInferior from '../../components/BarraInferior';
import {InputBox2} from '../../components/InputBox'

export default function AddPagamento(){
    return(
        <View
        style={styles.container}>
            <BarraSuperior titulo="Adicionar pagamento"/>
            <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.conteudo}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <InputBox2 titulo="Data de vencimento *" placeholder={"Selecione a data de vencimento"}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <InputBox2 titulo="Tipo *" tamanho={130} placeholder={"A receber"}/>
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            <InputBox2 titulo="Categoria *" tamanho={130} placeholder={"Selecione"}/>
                            <TouchableOpacity activeOpacity={0.5}>
                                <Ionicons name="add-circle-outline" size={30} color="#14423C" />
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                    <InputBox2 titulo="Descrição *" placeholder={"Digite a descrição"}/>
                    <InputBox2 titulo="Linha digitável" placeholder={"00000.00000.00000 000000.00000.000000 0 00000000000000"}/>
                    <InputBox2 titulo="Boleto" placeholder={"Selecione o boleto"}/>
                    
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
    btn:{
        width: "100%",
        backgroundColor: '#14423C',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    }

});