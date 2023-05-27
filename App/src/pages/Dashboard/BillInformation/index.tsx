import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles_global from '../../style';

export default function BillInformation({navigation, param}){
    console.log(param.id);

    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [digitableLine, setDigitableLine] = useState('');
    const [paymentSlip, setPaymentSlip] = useState(''); //boleto

    const [editable, setEditable] = useState(false);

    function changeEditableMode(){
        return setEditable(!editable);
    }

    function submitChanges(){
        Alert.alert('Informações atualizadas com sucesso!');
        changeEditableMode();
        //navigation.pop();
    }

    return(
        <View
        style={styles_global.container}>

            <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles_local.conteudo}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/** Data de vencimento */}
                    <Text style={styles_global.txt_inputTitle}>Data de vencimento*</Text>
                    <TextInput value={date} onChangeText={setDate} style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]} placeholder='Selecione a data de vencimento' editable={editable}/>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {/** Tipo */}
                        <View>
                            <Text style={styles_global.txt_inputTitle}>Tipo*</Text>
                            <TextInput value={type} onChangeText={setType} style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:130}]} placeholder='A receber' editable={editable}/>
                        </View>
                       
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            {/** Categoria */}
                            <View>
                                <Text style={styles_global.txt_inputTitle}>Categoria*</Text>
                                <TextInput value={category} onChangeText={setCategory} style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:130}]} placeholder='Selecione' editable={editable}/>
                            </View>
                            {/** Add categoria */}
                            <TouchableOpacity activeOpacity={0.5}>
                                <Ionicons name="add-circle-outline" size={30} color="#14423C" />
                            </TouchableOpacity>
                        </View>
                    </View>
        
                    {/** Descrição */}
                    <Text style={styles_global.txt_inputTitle}>Descrição*</Text>
                    <TextInput value={description} onChangeText={setDescription} style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]} placeholder='Digite a descrição' editable={editable}/>

                    {/** Linha digitável */}
                    <Text style={styles_global.txt_inputTitle}>Linha digitável</Text>
                    <TextInput value={digitableLine} onChangeText={setDigitableLine} style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]} placeholder='00000.00000.00000 000000.00000.000000 0 00000000000000' editable={editable}/>
        
                    {/** Boleto */}
                    <Text style={styles_global.txt_inputTitle}>Boleto</Text>
                    <TextInput value={paymentSlip} onChangeText={setPaymentSlip} style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]} placeholder='Selecione o boleto' editable={editable}/>
                    
                    {editable ? 
                        /** Botão Salvar */
                        <TouchableOpacity style={styles_global.btn1} activeOpacity={0.8} onPress={submitChanges}>
                            <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', color: 'white', fontSize: 16, alignSelf: 'center', justifyContent: 'center'}}>Salvar</Text>
                        </TouchableOpacity> :
                        /** Botão Editar */
                        <TouchableOpacity style={styles_global.btn1} activeOpacity={0.8} onPress={changeEditableMode}>
                            <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', color: 'white', fontSize: 16, alignSelf: 'center', justifyContent: 'center'}}>Editar</Text>
                        </TouchableOpacity>
                    }
                    {/** Botão voltar */}
                        <TouchableOpacity style={styles_global.btn2} activeOpacity={0.8} onPress={() => navigation.pop()}>
                            <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', color: 'white', fontSize: 16, alignSelf: 'center', justifyContent: 'center'}}>Voltar</Text>
                        </TouchableOpacity>

                    

                    
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles_local = StyleSheet.create({
    conteudo:{
        paddingTop: 24,
        paddingBottom: 24,
        paddingStart: 24,
        paddingEnd: 24,
        flex: 1,
        backgroundColor: '#e7e7e7',
    },

});