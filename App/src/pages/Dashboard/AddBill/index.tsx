import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import styles_global from '../../style';

export default function AddBill(){
    const [date, setDate] = useState(null); //data
    const [type, setType] = useState(0); //tipo
    const [category, setCategory] = useState(null); //categoria
    const [description, setDescription] = useState(null); //descrição
    const [digitableLine, setDigitableLine] = useState(null); //linha digitável
    const [paymentSlipUri, setPaymentSlipUri] = useState(null); //boleto endereço
    const [paymentSlipName, setPaymentSlipName] = useState(null); //boleto nome

    const pickPaymentSlip = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        // @ts-ignore
        setPaymentSlipUri(result.uri);
        // @ts-ignore
        setPaymentSlipName(result.name);
    }

    const requiredInput = () => {
        if(this.state.text.trim() === "") {
            this.setState(() => ({inputError: 'Preencha todos os campos'}))
        }else {
            this.setState(() => ({inputError: null}))
        }
    }

    const submit = () => {
        //verifica se os campos obrigatórios estão preenchidos
        if((date && category && description)){
            alert('Formulário submetido');
            console.log('Data: ' + date);
            console.log('Tipo ID: ' + type);
            console.log('Categoria: ' + category);
            console.log('Descrição: ' + description);
            // console.log('Linha digitável: ' + digitableLine);
            // console.log('Boleto URL: ' + paymentSlipUri);
        }
        else{
            alert('Preencha todos os campos!');
            console.log('Data: ' + date);
            console.log('Tipo ID: ' + type);
            console.log('Categoria: ' + category);
            console.log('Descrição: ' + description);
            // console.log('Linha digitável: ' + digitableLine);
            // console.log('Boleto URL: ' + paymentSlipUri);
        }
        
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
                    <TextInput onChangeText={setDate} style={[styles_global.txt_input, {width:'100%'}]} placeholder='Selecione a data de vencimento' placeholderTextColor={'black'}/>
                    
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
                                    onValueChange={(itemValue) => 
                                        setCategory(itemValue)}
                                    style={[styles_global.select_input, {width: 140}]}
                                    dropdownIconColor={'#14423C'}>
                                        <Picker.Item label='Selecione...' value={null} />
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
                    <TextInput onChangeText={setDescription} style={[styles_global.txt_input, {width:'100%'}]} placeholder='Digite a descrição' placeholderTextColor={'black'}/>

                    {/** Linha digitável */}
                    <Text style={styles_global.txt_inputTitle}>Linha digitável</Text>
                    <TextInput onChangeText={setDigitableLine}
                    style={[styles_global.txt_input, {height: 55, width:'100%'}]}
                    placeholder='Digite a linha digitável' placeholderTextColor={'black'}
                    multiline={true}
                    numberOfLines={2}
                    maxLength={48}
                    />
        
                    {/** Boleto */}
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
                    </TouchableOpacity>}

                    {/** Botão adicionar pagamento */}
                    <TouchableOpacity style={styles_global.btn1} activeOpacity={0.8} onPress={submit}>
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