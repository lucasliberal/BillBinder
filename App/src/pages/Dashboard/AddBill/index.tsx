import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles_global from '../../style';

export default function AddBill(){
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [digitableLine, setDigitableLine] = useState('');
    const [paymentSlip, setPaymentSlip] = useState(''); //boleto

    return(
        <View
        style={styles_global.container}>

            <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles_local.conteudo}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/** Data de vencimento */}
                    <Text style={styles_global.txt_inputTitle}>Data de vencimento*</Text>
                    <TextInput value={date} onChangeText={setDate} style={[styles_global.txt_input, {width:'100%'}]} placeholder='Selecione a data de vencimento'/>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {/** Tipo */}
                        <View>
                            <Text style={styles_global.txt_inputTitle}>Tipo*</Text>
                            <TextInput value={type} onChangeText={setType} style={[styles_global.txt_input, {width:130}]} placeholder='A receber'/>
                        </View>
                       
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            {/** Categoria */}
                            <View>
                                <Text style={styles_global.txt_inputTitle}>Categoria*</Text>
                                <TextInput value={category} onChangeText={setCategory} style={[styles_global.txt_input, {width:130}]} placeholder='Selecione'/>
                            </View>
                            {/** Add categoria */}
                            <TouchableOpacity activeOpacity={0.5}>
                                <Ionicons name="add-circle-outline" size={30} color="#14423C" />
                            </TouchableOpacity>
                        </View>
                    </View>
        
                    {/** Descrição */}
                    <Text style={styles_global.txt_inputTitle}>Descrição*</Text>
                    <TextInput value={description} onChangeText={setDescription} style={[styles_global.txt_input, {width:'100%'}]} placeholder='Digite a descrição'/>

                    {/** Linha digitável */}
                    <Text style={styles_global.txt_inputTitle}>Linha digitável</Text>
                    <TextInput value={digitableLine} onChangeText={setDigitableLine} style={[styles_global.txt_input, {width:'100%'}]} placeholder='00000.00000.00000 000000.00000.000000 0 00000000000000'/>
        
                    {/** Boleto */}
                    <Text style={styles_global.txt_inputTitle}>Boleto</Text>
                    <TextInput value={paymentSlip} onChangeText={setPaymentSlip} style={[styles_global.txt_input, {width:'100%'}]} placeholder='Selecione o boleto'/>
                    
                    {/** Botão adicionar pagamento */}
                    <TouchableOpacity style={styles_global.btn1} activeOpacity={0.8}>
                        <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', color: 'white', fontSize: 16, alignSelf: 'center', justifyContent: 'center'}}>Adicionar</Text>
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