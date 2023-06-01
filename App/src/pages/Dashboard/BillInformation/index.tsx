import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';

import styles_global from '../../style';

export default function BillInformation({navigation, route}){

    const [dv, setDv] = useState(route.params.item.dv);
    const [type, setType] = useState(route.params.item.type);
    const [category, setCategory] = useState(route.params.item.category);
    const [description, setDescription] = useState(route.params.item.description);
    const [digitableLine, setDigitableLine] = useState('');
    const [paymentSlipUri, setPaymentSlipUri] = useState(''); //boleto endereço
    const [paymentReceiptUri, setPaymentReceiptUri] = useState(''); //comprovante endereço
    
    const [paymentSlipName, setPaymentSlipName] = useState(''); //boleto nome
    const [paymentReceiptName, setPaymentReceiptName] = useState(''); //comprovante endereço

    const [editable, setEditable] = useState(false);

    function changeEditableMode() {
        return setEditable(!editable);
    }

    const submitChanges = () => {
        Alert.alert('Informações atualizadas com sucesso!');
        changeEditableMode();
        //navigation.pop();
    }

    const pickPaymentSlip = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        // @ts-ignore
        setPaymentSlipUri(result.uri);
        // @ts-ignore
        setPaymentSlipName(result.name);
    }

    const pickPaymentReceipt = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        // @ts-ignore
        setPaymentReceiptUri(result.uri);
        // @ts-ignore
        setPaymentReceiptName(result.name);
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
                    <TextInput value={String(dv)} onChangeText={setDv} style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]} placeholder='Selecione a data de vencimento' placeholderTextColor={'black'} editable={editable}/>
                    
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
                            {/* * Add categoria
                            <TouchableOpacity activeOpacity={0.5}>
                                <Ionicons name="add-circle-outline" size={30} color="#14423C" />
                            </TouchableOpacity> */}
                        </View>
                    </View>
        
                    {/** Descrição */}
                    <Text style={styles_global.txt_inputTitle}>Descrição*</Text>
                    <TextInput value={description} onChangeText={setDescription} style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]} placeholder='Digite a descrição' placeholderTextColor={'black'} editable={editable}/>

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
                    <TextInput value={digitableLine} onChangeText={setDigitableLine}
                    style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width: '100%', height: 55}]}
                    placeholder='Digite a linha digitável' placeholderTextColor={'black'}
                    multiline={true}
                    numberOfLines={2}
                    maxLength={48}
                    editable={editable}
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
        
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {editable ? 
                            /** Botão Salvar */
                            <TouchableOpacity style={[styles_global.btn1, {width: 150}]} activeOpacity={0.8} onPress={submitChanges}>
                                <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', color: 'white', fontSize: 16, alignSelf: 'center', justifyContent: 'center'}}>Salvar</Text>
                            </TouchableOpacity> :
                            /** Botão Editar */
                            <TouchableOpacity style={[styles_global.btn1, {width: 150}]} activeOpacity={0.8} onPress={changeEditableMode}>
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