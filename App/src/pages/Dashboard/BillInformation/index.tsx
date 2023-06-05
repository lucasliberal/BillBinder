import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, Switch} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {format} from "date-fns";

import styles_global from '../../style';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';

export default function BillInformation({navigation, route}){

    const [expirationDate, setExpirationDate] = useState(new Date(route.params.item.dv)); //data de validade

    const [debitDate, setDebitDate] = useState(route.params.item.db ? new Date(route.params.item.db) : new Date()); //data do débito/pagamento

    const [type, setType] = useState(route.params.item.type); //tipo
    const [category, setCategory] = useState(route.params.item.category); //categoria
    const [description, setDescription] = useState(route.params.item.description); //descrição
    const [status, setStatus] = useState(route.params.item.status); //0 = não concluido, 1 = concluído
    const [digitableLine, setDigitableLine] = useState(''); // linha digitável
    const [paymentSlipUri, setPaymentSlipUri] = useState(''); //boleto endereço
    const [paymentReceiptUri, setPaymentReceiptUri] = useState(''); //comprovante endereço
    
    console.log(status);
    
    const [paymentSlipName, setPaymentSlipName] = useState(''); //boleto nome
    const [paymentReceiptName, setPaymentReceiptName] = useState(''); //comprovante endereço

    const [editable, setEditable] = useState(false);

    //***** DATE FUNCTIONS AND CONSTANTS *****//
    //const [date, setDate] = useState(new Date());
    const [showExpirationDatePicker, setShowExpirationDatePicker] = useState(false);
    const [showDebitDatePicker, setShowDebitDatePicker] = useState(false);
    
    //Alternar seletor de data
    const toggleExpirationDatePicker = () => {
        setShowExpirationDatePicker(!showExpirationDatePicker);
    };

    const toggleDebitDatePicker = () => {
        setShowDebitDatePicker(!showDebitDatePicker);
    };

    const onChangeExpirationDate = ({type}, selectedDate) => {
        if (type == 'set'){
            //const currentDate = selectedDate;
            //setDate(currentDate);

            if (Platform.OS === "android"){
                toggleExpirationDatePicker();
                // setExpirationDate(currentDate.toDateString());
                setExpirationDate(selectedDate)
            }
        }else {
            toggleExpirationDatePicker();
        }
    }

    const onChangeDebitDate = ({type}, selectedDate) => {
        if (type == 'set'){
            //const currentDate = selectedDate;
            //setDate(currentDate);
            if (Platform.OS === "android"){
                toggleDebitDatePicker();
                // setExpirationDate(currentDate.toDateString());
                setDebitDate(selectedDate)
            }
        }else {
            toggleDebitDatePicker();
        }
    }

    const confirmIOSExpirationDate = () => {
        setExpirationDate(expirationDate);
        toggleExpirationDatePicker();
    }

    const confirmIOSDebitDate = () => {
        setDebitDate(debitDate);
        toggleDebitDatePicker();
    }
    //***** */

    //***** OTHERS FUNCTIONS *****//
    const submitChanges = () => {
        Alert.alert('Informações atualizadas com sucesso!');
        setEditable(!editable);
        //changeEditableMode();
        //navigation.pop();
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
        setStatus(previousState => !previousState);
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
                    {/** Data de vencimento */}
                    <Text style={styles_global.txt_inputTitle}>Data de vencimento*</Text>
                    {/** Expiration Datepicker */}
                        {/** Abrir seletor de data */}
                        {showExpirationDatePicker && ( 
                            <View>
                                <TouchableOpacity
                                onPress={toggleExpirationDatePicker}
                                disabled={editable}
                                >
                                    <TextInput
                                    value={format(expirationDate, "dd/MM/yyyy")}
                                    style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]}
                                    placeholder='Selecione a data de vencimento' 
                                    placeholderTextColor={'black'}
                                    editable={editable}
                                    onPressIn={toggleExpirationDatePicker}
                                    />
                                </TouchableOpacity>
                                <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={expirationDate}
                                onChange={onChangeExpirationDate}
                                style={{height: 120, marginTop: -10}}
                                />
                            </View>
                        )}

                        {/*Seletor de data em dispositivos IOS*/}
                        {!showExpirationDatePicker && Platform.OS === "ios" && (
                            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                                <TouchableOpacity 
                                style={{
                                    paddingHorizontal: 14,
                                    backgroundColor:'#d5d5d5',  
                                    padding: 14,
                                    borderRadius: 50
                                    }}
                                onPress={toggleExpirationDatePicker}
                                >
                                    <Text
                                    style={{fontSize:14, fontWeight: "500", color: '#075985'}}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                style={{
                                    paddingHorizontal: 14,
                                    backgroundColor:'#075985',  
                                    padding: 14,
                                    borderRadius: 50
                                    }}
                                onPress={confirmIOSExpirationDate}
                                >
                                    <Text style={{fontSize:14, fontWeight: "500", color: '#d5d5d5'}}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/** Mostrar text input */}
                        {!showExpirationDatePicker && (
                            <TouchableOpacity
                                onPress={toggleExpirationDatePicker}
                                disabled={!editable}
                                >
                                <TextInput
                                value={format(expirationDate, "dd/MM/yyyy")}
                                style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]}
                                placeholder='Selecione a data de vencimento' 
                                placeholderTextColor={'black'}
                                editable={editable}
                                onPressIn={toggleExpirationDatePicker}
                                />
                            </TouchableOpacity>
                        )}
                    
                    {status == 1 && (
                        <View>
                            {/** Data de débito */}
                            <Text style={styles_global.txt_inputTitle}>{'Data do ' + texto}</Text>
                            {/** Date picker */}
                                {/** Abrir seletor de data */}
                                {showDebitDatePicker && ( 
                                    <View>
                                        <TouchableOpacity
                                        onPress={toggleDebitDatePicker}
                                        disabled={editable}
                                        >
                                            <TextInput
                                            value={format(debitDate, "dd/MM/yyyy")}
                                            style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]}
                                            placeholder={'Selecione a data do ' + texto}  
                                            placeholderTextColor={'black'}
                                            editable={editable}
                                            onPressIn={toggleDebitDatePicker}
                                            />
                                        </TouchableOpacity>
                                        <DateTimePicker
                                        mode="date"
                                        display="spinner"
                                        value={debitDate}
                                        onChange={onChangeDebitDate}
                                        style={{height: 120, marginTop: -10}}
                                        />
                                    </View>
                                )}

                                {/*Seletor de data em dispositivos IOS*/}
                                {!showDebitDatePicker && Platform.OS === "ios" && (
                                    <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                                        <TouchableOpacity 
                                        style={{
                                            paddingHorizontal: 14,
                                            backgroundColor:'#d5d5d5',  
                                            padding: 14,
                                            borderRadius: 50
                                            }}
                                        onPress={toggleDebitDatePicker}
                                        >
                                            <Text
                                            style={{fontSize:14, fontWeight: "500", color: '#075985'}}>Cancelar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                        style={{
                                            paddingHorizontal: 14,
                                            backgroundColor:'#075985',  
                                            padding: 14,
                                            borderRadius: 50
                                            }}
                                        onPress={confirmIOSDebitDate}
                                        >
                                            <Text style={{fontSize:14, fontWeight: "500", color: '#d5d5d5'}}>Confirmar</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}

                                {/** Mostrar text input */}
                                {!showDebitDatePicker && (
                                    <TouchableOpacity
                                    onPress={toggleDebitDatePicker}
                                    disabled={!editable}
                                    >
                                        <TextInput
                                        value={format(debitDate, "dd/MM/yyyy")}
                                        style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]}
                                        placeholder={'Selecione a data do ' + texto}  
                                        placeholderTextColor={'black'}
                                        editable={editable}
                                        onPressIn={toggleDebitDatePicker}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                            
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
            
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 24}}>
                        <View style={{flex: 1}}>
                            {/** Descrição */}
                            <Text style={styles_global.txt_inputTitle}>Descrição*</Text>
                            <TextInput
                            value={description}
                            onChangeText={setDescription} 
                            style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]}
                            placeholder='Digite a descrição'
                            placeholderTextColor={'black'}
                            editable={editable}
                            maxLength={30}/>
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
                            <TouchableOpacity style={[styles_global.btn1, {width: 150}]} activeOpacity={0.8} onPress={submitChanges}>
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