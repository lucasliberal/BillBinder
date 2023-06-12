import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, Switch} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import format from 'date-fns/format';
import { BASE_URL } from '../../../../mock/config';

import { ExpirationDatePicker, DebitDatePicker } from '../../../components/DatePicker';

import styles_global from '../../style';

export default function BillInformation({navigation, route}){
    
    const [id, setId] = useState(route.params.item.id);
    const [userId, setUserId] = useState(route.params.item.user_id);
    const [expirationDate, setExpirationDate] = useState(new Date(route.params.item.expiration_date)); //data de validade
    const [debitDate, setDebitDate] = useState(route.params.item.debit_date ? (new Date(route.params.item.debit_date)) : new Date()); //data do débito/pagamento
    const [type, setType] = useState(route.params.item.type); //tipo
    const [category, setCategory] = useState(route.params.item.category); //categoria
    const [value, setValue] = useState(route.params.item.value)
    const [description, setDescription] = useState(route.params.item.description); //descrição
    const [status, setStatus] = useState(route.params.item.status); //0 = não concluido, 1 = concluído
    const [digitableLine, setDigitableLine] = useState(route.params.item.digitableLine); // linha digitável
    const [paymentSlipUri, setPaymentSlipUri] = useState(route.params.item.paymentReceiptUri); //boleto endereço
    const [paymentSlipName, setPaymentSlipName] = useState(route.params.item.paymentReceiptName); //boleto nome
    const [paymentReceiptUri, setPaymentReceiptUri] = useState(route.params.item.paymentReceiptUri); //comprovante endereço
    const [paymentReceiptName, setPaymentReceiptName] = useState(route.params.item.paymentReceiptName); //comprovante endereço
    
    const [editable, setEditable] = useState(false);
    const [prevStatus, setPrevStatus] = useState(status);

    //Ao mudar a data de validade
    const onChangeExpirationDate = async value => {
        await setExpirationDate(value);
    }

    const onChangeDebitDate = async value => {
        await setDebitDate(value);
    }

    // const checkStatusChange = () => {
    //     setPrevStatus(status)
    //     if(prevStatus == status){
    //         //nao houve alterações
    //         return "none"
    //     }else if (prevStatus == 0 && status == 1){
    //         //houve alteração para concluído
    //         return "concluded"
    //     }else if (prevStatus == 1 && status == 0){
    //         //houve alteração para pendente
    //         return "pending"
    //     }
    // }

    //Submeter alterações
    const submit = () => {
        axios.put(BASE_URL + `/bills/${id}`, {
            user_id: userId,
            description: description,
            type: type,
            value: value,
            status: status, //sempre o status de adição será 'pendente'
            expiration_date: format(expirationDate, "yyyy-MM-dd"),
            debit_date: status==1 ? format(debitDate, "yyyy-MM-dd") : "",
            category: category,
            digitableLine: digitableLine,
            paymentSlipUri: paymentSlipUri,
            paymentReceiptUri: paymentSlipUri,
        })
        .then (() => {
            if (status == 1){
                navigation.navigate("Caixa")
           } else{
                if(type == 0) //a pagar
                    navigation.navigate("A pagar")
                else if (type == 1) //a receber
                    navigation.navigate("A receber")
           }
        })
        .then (() => Alert.alert('Informações atualizadas com sucesso!'))
        .catch ( (err) => Alert.alert('Erro ao salvar informações') )
        //setEditable(!editable);      
    }
   

    //Selecionar boleto de pagamento
    const pickPaymentSlip = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        // @ts-ignore
        setPaymentSlipUri(result.uri);
        // @ts-ignore
        setPaymentSlipName(result.name);
    }

    //Selecionar comprovante de pagamento
    const pickPaymentReceipt = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        // @ts-ignore
        setPaymentReceiptUri(result.uri);
        // @ts-ignore
        setPaymentReceiptName(result.name);
    }

    const toggleStatusValue = () => {
        //setPrevStatus(status);
        // if(prevStatus == status){
        //     //nao houve alterações
        // }else if (prevStatus == 0 && status == 1){
        //     //houve alteração para concluído
        //     prevStatus()
        // }else if (prevStatus == 1 && status == 0){
        //     //houve alteração para pendente
        // }

        if (status == 0){
            //setDebitDate(new Date("yyyy-MM-dd"));
            setStatus(1);
        }else{
            //setDebitDate(new Date("yyyy-MM-dd"));
            setStatus(0);
        }
    }
    //***** */

    let texto = type == 0 ? 'pagamento' : 'recebimento';
    return(
        <View
        style={styles_global.container}>

            <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles_local.conteudo}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles_global.date_field}>
                        <View style={{width: 144}}>
                            {/** Data de vencimento */}
                            <Text style={styles_global.txt_inputTitle}>Data do vencimento*</Text>

                            <ExpirationDatePicker
                                onChange={onChangeExpirationDate}
                                date={expirationDate}//expiration date
                                editable={editable}
                            />
                        </View>
                        <View style={{width: 144}}>
                            {status == 1 && (
                            /** Data de débito */
                            <View>
                                <Text style={styles_global.txt_inputTitle}>{'Data do ' + texto}</Text>
                                <DebitDatePicker
                                onChange={onChangeDebitDate}
                                date={debitDate}// debitdate
                                editable={editable}
                                />
                            </View>  
                            )}
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {/** Tipo */}
                        <View>
                            <Text style={styles_global.txt_inputTitle}>Tipo*</Text>
                            <View style={[editable ? styles_global.select_input_container : styles_global.select_input_container_alternative]}>
                                <Picker
                                    selectedValue={type}
                                    onValueChange={(itemValue) => 
                                        setType(itemValue)}
                                    style={[editable ? styles_global.select_input : styles_global.select_input_alternative, {width: 140}]}
                                    enabled={editable}
                                    dropdownIconColor={editable ? '#14423C' : '#b2b2b2'}>
                                        <Picker.Item label='Receber' value={1} />
                                        <Picker.Item label='Pagar' value={0}/>
                                </Picker>
                            </View>
                        </View>
                            
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            {/** Categoria */}
                            <View>
                                <Text style={styles_global.txt_inputTitle}>Categoria*</Text>
                                <View style={editable ? styles_global.select_input_container : styles_global.select_input_container_alternative}>
                                    <Picker                             
                                    selectedValue={category}
                                    onValueChange={(itemValue) => 
                                        setCategory(itemValue)}
                                    style={[editable ? styles_global.select_input : styles_global.select_input_alternative, {width: 140}]}
                                    enabled={editable}
                                    dropdownIconColor={editable ? '#14423C' : '#b2b2b2'}>
                                        <Picker.Item label='Energia' value={'energia'} />
                                        <Picker.Item label='Internet' value={'internet'}/>
                                        <Picker.Item label='Salário' value={'salario'}/>
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/** Descrição */}
                    <Text style={styles_global.txt_inputTitle}>Descrição*</Text>
                    <TextInput
                    value={description}
                    onChangeText={setDescription} 
                    style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]}
                    placeholder='Digite a descrição'
                    placeholderTextColor={'black'}
                    editable={editable}
                    maxLength={26}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 24}}>
                        {/* Valor */}
                        <View style={{flex: 1}}>
                            <Text style={styles_global.txt_inputTitle}>Valor*</Text>
                            <TextInput
                            onChangeText={setValue} 
                            value={value}
                            style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]}
                            placeholder='Digite o valor' 
                            placeholderTextColor={'black'}
                            maxLength={30}
                            keyboardType='numeric'
                            editable={editable}/>
                        </View>
                        <View>
                            <View style={{flexDirection: 'column', alignItems:'flex-start', flex: 1}}>
                                {/** Switch */}
                                <Text style={styles_global.txt_inputTitle}>Concluído</Text>
                                <View style={[editable ? styles_global.select_input_container : styles_global.select_input_container_alternative, {width: '100%', alignItems: 'center', justifyContent:'center'}]}>
                                    <Switch
                                    trackColor={{false: '#b9b9b9', true: '#b1b1b1'}}
                                    thumbColor={status == 1 ? '#14423C' : '#e0e0e0'}
                                    value={status==1 ? true : false}
                                    onValueChange={toggleStatusValue}
                                    disabled={!editable}
                                    style={!editable && {opacity: 0.4}}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                
                    <>{/* Linha digitável modelo 2
                    <Text style={styles_global.txt_inputTitle}>Linha digitável</Text>
                    <View style={{rowGap: 12, marginBottom: 16}}>
                        <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%'}}>
                            <TextInput
                            style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, styles_global.txt_input_digitableLine]}
                            maxLength={5}
                            keyboardType='numeric'
                            value={digitableLine[0]}
                            editable={editable}

                            />
                            <TextInput 
                            style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, styles_global.txt_input_digitableLine]}
                            maxLength={5}
                            keyboardType='numeric'
                            value={digitableLine[1]}
                            editable={editable}
                            />
                            <TextInput
                            style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, styles_global.txt_input_digitableLine]}
                            maxLength={5}
                            keyboardType='numeric'
                            value={digitableLine[2]}
                            editable={editable}
                            />
                        </View>
                        <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%'}}>
                            <TextInput
                            style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, styles_global.txt_input_digitableLine]}
                            maxLength={6}
                            keyboardType='numeric'
                            value={digitableLine[3]}
                            editable={editable}/>
                            <TextInput
                            style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, styles_global.txt_input_digitableLine]}
                            maxLength={5}
                            keyboardType='numeric'
                            value={digitableLine[4]}
                            editable={editable}
                            />
                            <TextInput
                            style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, styles_global.txt_input_digitableLine]}
                            maxLength={6}
                            keyboardType='numeric'
                            value={digitableLine[5]}
                            editable={editable}
                            />
                        </View>
                        <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%'}}>
                            <TextInput
                            style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, styles_global.txt_input_digitableLine, {width: 60}]}
                            maxLength={1}
                            keyboardType='numeric'
                            value={digitableLine[6]}
                            editable={editable}
                            />
                            <TextInput
                            style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, styles_global.txt_input_digitableLine, {width: 237}]}
                            maxLength={14}
                            keyboardType='numeric'
                            value={digitableLine[7]}
                            editable={editable}
                            />
                        </View>

                    </View> */}</>

                    {/** Linha digitável */}
                    <Text style={styles_global.txt_inputTitle}>Linha digitável</Text>
                    <TextInput
                    value={digitableLine}
                    onChangeText={setDigitableLine}
                    style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width: '100%', height: 55}]}
                    placeholder='Digite a linha digitável' placeholderTextColor={'black'}
                    multiline={true}
                    numberOfLines={2}
                    maxLength={48}
                    editable={editable}
                    keyboardType='numeric'
                    />

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            {/** Boleto */}
                            <Text style={styles_global.txt_inputTitle}>Boleto</Text>
                            {paymentSlipUri ?
                            <TouchableOpacity onPress={() => alert('Abrir documento')} style={[editable ? styles_global.btn_upload : styles_global.btn_upload_alternativo]} disabled={!editable}>
                                <View style={{flexDirection: 'row', gap: 5}}>
                                    <AntDesign name="file1" size={20} color="#14423C" />
                                    <Text style={{width: 100}} numberOfLines={1}>{paymentSlipName}</Text>
                                </View>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={pickPaymentSlip} style={[editable ? styles_global.btn_upload : styles_global.btn_upload_alternativo]} disabled={!editable}>
                                <View style={{flexDirection: 'row', gap: 5}}>
                                    <AntDesign name="upload" size={20} color="#14423C" />
                                    <Text>Enviar</Text>
                                </View>
                            </TouchableOpacity>}
                        </View>
                        <View>
                            {/** Comprovante */}
                            <Text style={styles_global.txt_inputTitle}>Comprovante</Text>
                            {paymentReceiptUri ?
                            <TouchableOpacity onPress={() => alert('Abrir documento')} style={[editable ? styles_global.btn_upload : styles_global.btn_upload_alternativo]} disabled={!editable}>
                                <View style={{flexDirection: 'row', gap: 5}}>
                                    <AntDesign name="file1" size={20} color="#14423C" />
                                    <Text style={{width: 100}} numberOfLines={1}>{paymentSlipName}</Text>
                                </View>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={pickPaymentReceipt} style={[editable ? styles_global.btn_upload : styles_global.btn_upload_alternativo]} disabled={!editable}>
                                <View style={{flexDirection: 'row', gap: 5}}>
                                    <AntDesign name="upload" size={20} color="#14423C" />
                                    <Text>Enviar</Text>
                                </View>
                            </TouchableOpacity>}
                        </View>
                    </View>
                        <Text style={{marginTop: 20, textAlign: 'center', fontSize: 11}}>Obs.: O campo data de pagamento/recebimento só fica visível quando o status for concluído.</Text>
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {editable ? 
                            /** Botão Salvar */
                            <TouchableOpacity style={[styles_global.btn1, {width: 150}]} activeOpacity={0.8} onPress={submit}>
                                <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', color: 'white', fontSize: 16, alignSelf: 'center', justifyContent: 'center'}}>Salvar</Text>
                            </TouchableOpacity> :
                            /** Botão Editar */
                            <TouchableOpacity style={[styles_global.btn1, {width: 150}]} activeOpacity={0.8} onPress={() => setEditable(!editable)}>
                                <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', color: 'white', fontSize: 16, alignSelf: 'center', justifyContent: 'center'}}>Editar</Text>
                            </TouchableOpacity>
                        }
                        {/** Botão voltar */}
                            <TouchableOpacity style={[styles_global.btn2, {width: 150}]} activeOpacity={0.8} onPress={() => navigation.pop()}>
                                <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', color: 'white', fontSize: 16, alignSelf: 'center', justifyContent: 'center'}}>Voltar</Text>
                            </TouchableOpacity>
                    </View>                    
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