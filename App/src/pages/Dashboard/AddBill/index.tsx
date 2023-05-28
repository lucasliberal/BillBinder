import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import styles_global from '../../style';

export default function AddBill(){
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [digitableLine, setDigitableLine] = useState([null, null, null, null, null, null, null]);
    const [paymentSlip, setPaymentSlip] = useState(''); //boleto


    function digitableLinePrint(){
        console.log(digitableLine[0]+'.'+digitableLine[1]+' '+digitableLine[2]+'.'+digitableLine[3]+' '+digitableLine[4]+'.'+digitableLine[5]+' '+digitableLine[6]+' '+digitableLine[7]);
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
                    <TextInput value={date} onChangeText={setDate} style={[styles_global.txt_input, {width:'100%'}]} placeholder='Selecione a data de vencimento' placeholderTextColor={'black'}/>
                    
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
                                    <Picker.Item label='Receber' value={1} />
                                    <Picker.Item label='Pagar' value={0}/>
                                </Picker>
                            </View>
                        </View>
                       
                        <View style={{flexDirection:'row', alignItems: 'center'}}>
                            {/** Categoria */}
                            <View>
                                <Text style={styles_global.txt_inputTitle}>Categoria*</Text>
                                {/* <TextInput value={category} onChangeText={setCategory} style={[styles_global.txt_input, {width:140}]} placeholder='Selecione' placeholderTextColor={'black'}/> */}
                                <View style={styles_global.select_input_container}>
                                    <Picker                    
                                    selectedValue={category}
                                    onValueChange={(itemValue) => 
                                        setCategory(itemValue)}
                                    style={[styles_global.select_input, {width: 140}]}
                                    dropdownIconColor={'#14423C'}>
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
                    <TextInput value={description} onChangeText={setDescription} style={[styles_global.txt_input, {width:'100%'}]} placeholder='Digite a descrição' placeholderTextColor={'black'}/>

                    {/** Linha digitável */}
                    <Text style={styles_global.txt_inputTitle}>Linha digitável</Text>
                    {/* <TextInput value={digitableLine} onChangeText={setDigitableLine} style={[styles_global.txt_input, {width:'100%'}]} placeholder='00000.00000.00000 000000.00000.000000 0 00000000000000' placeholderTextColor={'black'}/> */}
                    <View style={{rowGap: 12, marginBottom: 16}}>
                        <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%'}}>
                            <TextInput
                            style={[styles_global.txt_input, styles_global.txt_input_digitableLine]}
                            maxLength={5}
                            keyboardType='numeric'
                            value={digitableLine[0]}
                            onChangeText={setDigitableLine[0]}
                            placeholder='00000'
                            placeholderTextColor='black'

                            />
                            <TextInput 
                            style={[styles_global.txt_input, styles_global.txt_input_digitableLine]}
                            maxLength={5}
                            keyboardType='numeric'
                            value={digitableLine[1]}
                            onChangeText={setDigitableLine[1]}
                            placeholder='00000'
                            placeholderTextColor='black'
                            />
                            <TextInput
                            style={[styles_global.txt_input, styles_global.txt_input_digitableLine]}
                            maxLength={5}
                            keyboardType='numeric'
                            value={digitableLine[2]}
                            onChangeText={setDigitableLine[2]}
                            placeholder='00000'
                            placeholderTextColor='black'
                            />
                        </View>
                        <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%'}}>
                            <TextInput
                            style={[styles_global.txt_input, styles_global.txt_input_digitableLine]}
                            maxLength={6}
                            keyboardType='numeric'
                            value={digitableLine[3]}
                            onChangeText={setDigitableLine[3]}
                            placeholder='000000'
                            placeholderTextColor='black'
                            />
                            <TextInput
                            style={[styles_global.txt_input, styles_global.txt_input_digitableLine]}
                            maxLength={5}
                            keyboardType='numeric'
                            value={digitableLine[4]}
                            onChangeText={setDigitableLine[4]}
                            placeholder='00000'
                            placeholderTextColor='black'
                            />
                            <TextInput
                            style={[styles_global.txt_input, styles_global.txt_input_digitableLine]}
                            maxLength={6}
                            keyboardType='numeric'
                            value={digitableLine[5]}
                            onChangeText={setDigitableLine[5]}
                            placeholder='000000'
                            placeholderTextColor='black'
                            />
                        </View>
                        <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%'}}>
                            <TextInput
                            style={[[styles_global.txt_input, styles_global.txt_input_digitableLine], {width: 60}]}
                            maxLength={1}
                            keyboardType='numeric'
                            value={digitableLine[6]}
                            onChangeText={setDigitableLine[1]}
                            placeholder='0'
                            placeholderTextColor='black'
                            />
                            <TextInput
                            style={[[styles_global.txt_input, styles_global.txt_input_digitableLine], {width: 237}]}
                            maxLength={14}
                            keyboardType='numeric'
                            value={digitableLine[7]}
                            onChangeText={setDigitableLine[1]}
                            placeholder='00000000000000'
                            placeholderTextColor='black'
                            />
                        </View>

                    </View>
        
                    {/** Boleto */}
                    <Text style={styles_global.txt_inputTitle}>Boleto</Text>
                    <TextInput value={paymentSlip} onChangeText={setPaymentSlip} style={[styles_global.txt_input, {width:'100%', height: 60}]} placeholder='Selecione o boleto' placeholderTextColor={'black'}/>

                    {/** Botão adicionar pagamento */}
                    <TouchableOpacity style={styles_global.btn1} activeOpacity={0.8} onPress={digitableLinePrint}>
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