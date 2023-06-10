import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import styles_global from '../../style';
import {format} from "date-fns";
import { ExpirationDatePicker } from '../../../components/DatePicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ballonInput(){
    return(
        <TextInput placeholder='Digite...'></TextInput>
    );
}

export default function AddBill(){
    const [expirationDate, setExpirationDate] = useState(new Date()); //data da validade
    const [type, setType] = useState(0); //tipo
    const [category, setCategory] = useState(); //categoria
    const [description, setDescription] = useState(''); //descrição
    const [value, setValue] = useState(''); //valor
    const [digitableLine, setDigitableLine] = useState(''); //linha digitável
    const [paymentSlipUri, setPaymentSlipUri] = useState(''); //boleto endereço
    const [paymentSlipName, setPaymentSlipName] = useState(''); //boleto nome

    const [editablePickItem, setEditablePickItem] = useState('adicionar');
    const [editablePickLabel, setEditablePickItemLabel] = useState('Digite...');

    const [userId, setUserId] = useState('');

    useEffect(() => {
        getUserData();
    })
    
    async function getUserData(){
        let response = await AsyncStorage.getItem('userId');
        let json = JSON.parse(response);
        setUserId(json);
    }

    const onChangeExpirationDate = async (value) => {
        await setExpirationDate(value)
    }

    //Selecionar Boleto
    const pickPaymentSlip = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        // @ts-ignore
        setPaymentSlipUri(result.uri);
        // @ts-ignore
        setPaymentSlipName(result.name);
    }

    const submit = () => {
        //verifica se os campos obrigatórios estão preenchidos
        if((expirationDate && category && description && value)){
            axios.post('http://192.168.0.114:3000/bills', {
                user_id: userId,
                description: description,
                type: type,
                value: value,
                status: 0, //sempre o status de adição será 'pendente'
                expiration_date: format(expirationDate, "yyyy-MM-dd"),
                debit_date: "",
                category: category,
                digitableLine: digitableLine,
                paymentSlipUri: paymentSlipUri,
                paymentReceiptUri: "",
            })
            .then( (response) => {return response} )
            .then ( () => {
                Alert.alert('', 'Lançamento adicionado com sucesso!');
                cleanFields();
            })
        }
        else{
            Alert.alert('', 'Preencha todos os campos!');
        }
    }

    const cleanFields = () => {
        setExpirationDate(new Date());
        setType(0);
        setCategory(null);
        setValue('');
        setDescription('');
        setDigitableLine('');
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
                    <ExpirationDatePicker
                        onChange={onChangeExpirationDate}
                        date={expirationDate}
                    />
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {/** Tipo */}
                        <View>
                        <Text style={styles_global.txt_inputTitle}>Tipo*</Text>
                            <View style={styles_global.select_input_container}>
                                <Picker                             
                                selectedValue={type}
                                onValueChange={(itemValue) => 
                                    setType(itemValue)}
                                style={[styles_global.select_input, {width: 140}]}
                                dropdownIconColor={'#14423C'}>
                                    <Picker.Item label='Pagar' value={0}/>
                                    <Picker.Item label='Receber' value={1} />
                                </Picker>
                            </View>
                        </View>
                       
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            {/** Categoria */}
                            <View>
                                <Text style={styles_global.txt_inputTitle}>Categoria*</Text>
                                <View style={styles_global.select_input_container}>
                                    <Picker                    
                                    selectedValue={category}
                                    onValueChange={(itemValue) => {
                                        if(itemValue == 'adicionar'){
                                            /** Manter categoria */
                                        }else{
                                            setCategory(itemValue)
                                        }
                                    }}
                                    style={[styles_global.select_input, {width: 140}]}
                                    dropdownIconColor={'#14423C'}>
                                        <Picker.Item label='Selecione...' value={null} />
                                        <Picker.Item label='Energia' value={'energia'} />
                                        <Picker.Item label='Internet' value={'internet'}/>
                                        <Picker.Item label='Salário' value={'salario'}/>
                                        <Picker.Item label={'Outro'} value={'outro'}/>
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    </View>
        
                    {/** Valor */}
                    <Text style={styles_global.txt_inputTitle}>Valor*</Text>
                    <TextInput
                    onChangeText={setValue} 
                    value={value}
                    style={[styles_global.txt_input, {width:'100%'}]} 
                    placeholder='Insira o valor' 
                    placeholderTextColor={'black'}
                    maxLength={30}
                    keyboardType='numeric'/>

                    {/** Descrição */}
                    <Text style={styles_global.txt_inputTitle}>Descrição*</Text>
                    <TextInput
                    onChangeText={setDescription} 
                    value={description}
                    style={[styles_global.txt_input, {width:'100%'}]} 
                    placeholder='Insira a descrição' 
                    placeholderTextColor={'black'}
                    maxLength={30}/>

                    {/** Linha digitável */}
                    <Text style={styles_global.txt_inputTitle}>Linha digitável</Text>
                    <TextInput 
                    onChangeText={setDigitableLine}
                    value={digitableLine}
                    style={[styles_global.txt_input, {height: 55, width:'100%'}]}
                    placeholder='Insira a linha digitável' placeholderTextColor={'black'}
                    multiline={true}
                    numberOfLines={2}
                    maxLength={48}
                    keyboardType='numeric'
                    />
        
                    {/** Boleto **
                    <Text style={styles_global.txt_inputTitle}>Boleto</Text>
                    {paymentSlipUri ?
                    <TouchableOpacity onPress={() => alert('Abrir documento')} style={styles_global.btn_upload}>
                        <View style={{flexDirection: 'row', gap: 5}}>
                            <AntDesign name="file1" size={20} color="#14423C" />
                            <Text style={{width: 100}} numberOfLines={1}>{paymentSlipName}</Text>
                        </View>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={pickPaymentSlip} style={styles_global.btn_upload}>
                        <View style={{flexDirection: 'row', gap: 5}}>
                            <AntDesign name="upload" size={20} color="#14423C" />
                            <Text>Enviar boleto</Text>
                        </View>
                    </TouchableOpacity>} */}

                    {/** Botão adicionar pagamento */}
                    <TouchableOpacity style={styles_global.btn1} activeOpacity={0.8} onPress={submit}>
                        <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', color: 'white', fontSize: 16, alignSelf: 'center', justifyContent: 'center'}}>Adicionar</Text>
                    </TouchableOpacity>

                    {/** Botão limpar campos */}
                    <TouchableOpacity style={{marginTop: 20}} activeOpacity={0.8} onPress={cleanFields}>
                        <Text style={{color: '#14423C', fontSize: 16, alignSelf: 'center', borderBottomColor: "#14423C", borderBottomWidth: 1}}>Limpar campos</Text>
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
        //backgroundColor: 'red',
    },

});