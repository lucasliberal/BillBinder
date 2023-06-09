import React, {useState} from "react";
import {TouchableOpacity, View, StyleSheet, TextInput, Platform, Text} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {format} from "date-fns";

import styles_global from "../../pages/style";

export default function ExpirationDatePicker({editable=true, date=null, onChange}){
    const [expirationDate, setExpirationDate] = useState(date ? date : null); //data de validade
    const [showExpirationDatePicker, setShowExpirationDatePicker] = useState(false);


    const toggleExpirationDatePicker = () => {
        setShowExpirationDatePicker(!showExpirationDatePicker);
    };

    const onChangeExpirationDate = ({type}, selectedDate) => {
        if (type == 'set'){
            //const currentDate = selectedDate;
            //setDate(currentDate);

            if (Platform.OS === "android"){
                toggleExpirationDatePicker();
                // setExpirationDate(currentDate.toDateString());
                setExpirationDate(selectedDate);
                onChange(selectedDate);
            }
        }else {
            toggleExpirationDatePicker();
        }
    }

    const confirmIOSExpirationDate = () => {
        setExpirationDate(expirationDate);
        toggleExpirationDatePicker();
    }

    return (
        <View>
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
                    <Text style={{fontSize:14, fontWeight: "500", color: '#075985'}}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{
                        paddingHorizontal: 14,
                        backgroundColor:'#075985',  
                        padding: 14,
                        borderRadius: 50
                        }}
                    onPress={confirmIOSExpirationDate}>
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
        </View>
    );
}