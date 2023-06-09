import React, {useState} from "react";
import {TouchableOpacity, View, StyleSheet, TextInput, Platform, Text} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {format} from "date-fns";

import styles_global from "../../pages/style";

export default function DebitDatePicker({editable=true, date=null, onChange}){
    const [debitDate, setDebitDate] = useState(date ? date : null); //data de validade
    const [showDebitDatePicker, setShowDebitDatePicker] = useState(false);

    const toggleDebitDatePicker = () => {
        setShowDebitDatePicker(!showDebitDatePicker);
    };

    const onChangeDebitDate = ({type}, selectedDate) => {
        if (type == 'set'){
            //const currentDate = selectedDate;
            //setDate(currentDate);

            if (Platform.OS === "android"){
                toggleDebitDatePicker();
                // setDebitDate(currentDate.toDateString());
                setDebitDate(selectedDate);
                onChange(selectedDate);
            }
        }else {
            toggleDebitDatePicker();
        }
    }

    const confirmIOSDebitDate = () => {
        setDebitDate(debitDate);
        toggleDebitDatePicker();
    }

    return (
        <View>
            {showDebitDatePicker && ( 
                <View>
                    <TouchableOpacity
                    onPress={toggleDebitDatePicker}
                    disabled={editable}
                    >
                        <TextInput
                        value={format(debitDate, "dd/MM/yyyy")}
                        style={[editable ? styles_global.txt_input : styles_global.txt_input_alternative, {width:'100%'}]}
                        placeholder='Selecione a data de vencimento' 
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
                    <Text style={{fontSize:14, fontWeight: "500", color: '#075985'}}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{
                        paddingHorizontal: 14,
                        backgroundColor:'#075985',  
                        padding: 14,
                        borderRadius: 50
                        }}
                    onPress={confirmIOSDebitDate}>
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
                    placeholder='Selecione a data de vencimento' 
                    placeholderTextColor={'black'}
                    editable={editable}
                    onPressIn={toggleDebitDatePicker}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}