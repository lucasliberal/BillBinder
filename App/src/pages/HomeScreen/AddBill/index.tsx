import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../../components/Bar/TopBar';
import BottomBar from '../../../components/Bar/BottomBar';
import {TextInput_SECONDARY} from '../../../components/Form/TextInput'

export default function AddBill(){
    const [value, setValue] = useState(''); 

    return(
        <View
        style={styles.container}>
            {/* <Header titulo="Adicionar pagamento"/> */}
            <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.conteudo}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TextInput_SECONDARY title="Data de vencimento *" tamanho={'100%'} placeholder={"Selecione a data de vencimento"} type={"Text"} value={value} setValue={setValue}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TextInput_SECONDARY title="Tipo *" tamanho={130} placeholder={"A receber"} type={"Text"} value={value} setValue={setValue}/>
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            <TextInput_SECONDARY title="Categoria *" tamanho={130} placeholder={"Selecione"} type={"Text"} value={value} setValue={setValue}/>
                            <TouchableOpacity activeOpacity={0.5}>
                                <Ionicons name="add-circle-outline" size={30} color="#14423C" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TextInput_SECONDARY title="Descrição *" tamanho={'100%'} placeholder={"Digite a descrição"} type={"Text"} value={value} setValue={setValue}/>
                    <TextInput_SECONDARY title="Linha digitável" tamanho={'100%'} placeholder={"00000.00000.00000 000000.00000.000000 0 00000000000000"} type={"Text"} value={value} setValue={setValue}/>
                    <TextInput_SECONDARY title="Boleto" tamanho={'100%'} placeholder={"Selecione o boleto"} type={"Text"} value={value} setValue={setValue}/>
                    
                    <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                        <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', color: 'white', fontSize: 16, alignSelf: 'center', justifyContent: 'center'}}>Adicionar</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
            {/* <BottomBar valor="adicionar"/> */}
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