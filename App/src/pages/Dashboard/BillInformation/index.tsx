import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, Switch} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import format from 'date-fns/format';
import { BASE_URL } from '../../../../mock/config';
import { mask, unmask, currency } from 'remask';

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
    const [text, setText] = useState(type == 0 && status == 0 ? 'Pagar' : type == 1 && status == 0 ? 'Receber' : type == 0 && status == 1 ? 'Pago' : 'Recebido');

    useEffect(() => {
        if(status == 0 && type == 0)
            setText('Pagar')
        else if (status == 0 && type == 1)
            setText('Receber')
        else if (status == 1 && type == 0)
            setText('Pago')
        else 
            setText('Recebido')
    }, [status])

    //Ao mudar a data de validade
    const onChangeExpirationDate = async value => {
        await setExpirationDate(value);
    }

    const onChangeDebitDate = async value => {
        await setDebitDate(value);
    }

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
            digitableLine: unmask(digitableLine),
            paymentSlipUri: paymentSlipUri,
            paymentReceiptUri: paymentSlipUri,
        })
        .then (() => {
            setEditable(!editable)
        })
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

    const changeStatus = async () => {
        if (status == 0){
            //setDebitDate(new Date("yyyy-MM-dd"));
            setStatus(1);
            axios.patch(BASE_URL + `/bills/${id}`, {
                status: 1,
                debit_date: format(debitDate, "yyyy-MM-dd")
            })
            navigation.navigate('Caixa');
            Alert.alert('', `Lançamento ${description} atualizado!`)
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
                            onChangeText={ value => {
                                setValue(currency.unmask({locale: 'pt-BR', currency: 'BRL', value: value}))
                            }} 
                            value={currency.mask({locale: 'pt-BR', currency: 'BRL', value: value})}
                            style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]}
                            placeholder='Digite o valor' 
                            placeholderTextColor={'black'}
                            maxLength={30}
                            keyboardType='numeric'
                            editable={editable}/>
                        </View>
                        {/* <View>
                            <View style={{flexDirection: 'column', alignItems:'flex-start', flex: 1}}>
                                //Switch 
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
                        </View> */}
                    </View>

                    {/** Linha digitável */}
                    <Text style={styles_global.txt_inputTitle}>Linha digitável</Text>
                    <TextInput
                    value={mask(digitableLine, '99999.99999 99999.999999 99999.999999 9 99999999999999')}
                    onChangeText={value => setDigitableLine(unmask(value))}
                    style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width: '100%', height: 55}]}
                    placeholder='Digite a linha digitável' placeholderTextColor={'black'}
                    multiline={true}
                    numberOfLines={2}
                    maxLength={54}
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
                </ScrollView>      
            </KeyboardAvoidingView>
            <View style={styles_local.buttons}>
                        {editable ? 
                    /** Botão Salvar */
                    <TouchableOpacity style={[styles_local.btn]} activeOpacity={0.8} onPress={submit}>
                        <AntDesign name="save" size={24} color="white" />
                    </TouchableOpacity> :
                    /** Botão Editar */
                    <TouchableOpacity style={[styles_local.btn, {}]} activeOpacity={0.8} onPress={() => setEditable(!editable)}>
                        <AntDesign name="edit" size={24} color="white" />
                        {/* <Text style={styles_local.btn_txt}>Editar</Text> */}
                    </TouchableOpacity>
                    }
                {/** Botão quitar*/}
                <TouchableOpacity style={status == 0 ? styles_local.btn2 : styles_local.btn2_innactive} activeOpacity={0.8} onPress={changeStatus}>
                    <Text style={styles_local.btn_txt}>{text}</Text>
                </TouchableOpacity>
                {/** Botão voltar */}
                    <TouchableOpacity style={[styles_local.btn, {backgroundColor: '#A0A0A0'}]} activeOpacity={0.8} onPress={() => navigation.pop()}>
                        <AntDesign name="back" size={24} color="white" />
                        {/* <Text style={styles_local.btn_txt}>Voltar</Text> */}
                    </TouchableOpacity>
            </View>   
        </View>
    );
}

const styles_local = StyleSheet.create({
    conteudo:{
        paddingTop: 24,
        paddingHorizontal: 24,
        flex: 1,
        backgroundColor: '#e7e7e7',
    },
    buttons:{
        elevation: 15,
        backgroundColor: '#e7e7e7',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24, 
        paddingVertical: 24
    },
    btn:{
        width: 40,
        height: 40,
        backgroundColor: '#14423C',
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn2: {
        width: 170,
        backgroundColor: '#14423C',
        borderRadius: 5,
        alignSelf: 'center',
    },
    btn2_innactive: {
        width: 170,
        backgroundColor: '#14423C',
        opacity: 0.5,
        borderRadius: 5,
        alignSelf: 'center',
    },
    btn_txt:{
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: 'normal',
        color: 'white',
        fontSize: 16, 
        alignSelf: 'center',
        justifyContent: 'center'
    }
});