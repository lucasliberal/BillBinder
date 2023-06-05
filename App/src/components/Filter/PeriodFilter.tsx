import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Platform} from 'react-native';
import {format} from "date-fns";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import DateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import styles_global from '../../pages/style';

const actualMonth = (new Date().getMonth()+1);
const actualYear = new Date().getFullYear();
const nextYear = actualMonth >= 12 ? actualYear+1 : actualYear;
const nextMonth = actualMonth >= 12 ? 1 : actualMonth+1;

export default function PeriodFilter({onChangeDate}) {
        const[initialDate, setInitialDate] = useState(new Date(actualYear.toString()+'-'+actualMonth.toString()+'-1'));
        const[endDate, setEndDate] = useState(new Date(nextYear.toString()+'-'+nextMonth.toString()+'-1'));

        //***** DATE FUNCTIONS AND CONSTANTS *****//
        //const [date, setDate] = useState(new Date());
        const [showInitialPicker, setShowInitialPicker] = useState(false);
        const [showEndPicker, setShowEndPicker] = useState(false);
        
        //Alternar seletor de data
        const toggleInitialDatePicker = () => {
            setShowInitialPicker(!showInitialPicker);
        };

        const toggleEndDatePicker = () => {
            setShowEndPicker(!showEndPicker);
        };
    
        const onChangeInicialDate = ({type}, selectedDate) => {
            if (type == 'set'){
                // const currentDate = selectedDate;
                //setInitialDate(selectedDate);

                if (Platform.OS === "android"){
                    toggleInitialDatePicker();
                    setInitialDate(selectedDate);    
                }
            }else {
                toggleInitialDatePicker();
            }
        }

        const onChangeEndDate = ({type}, selectedDate) => {
            if (type == 'set'){
                // const currentDate = selectedDate;
                // setEndDate(currentDate);

                if (Platform.OS === "android"){
                    toggleEndDatePicker();
                    setEndDate(selectedDate);
                }
            }else {
                toggleEndDatePicker();
            }
        }
    
        const confirmIOSInitialDate = () => {
            setInitialDate(initialDate)
            toggleInitialDatePicker();
        }

        const confirmIOSEndDate = () => {
            setEndDate(endDate)
            toggleEndDatePicker();
        }

        useEffect(()=>{
            onChangeDate(initialDate, endDate)
        }, [initialDate, endDate])
        
    return(
        <View>
            <View style={styles.bloco1}>
                <View style={styles.periodo}>
                    {/* De: */}
                    <View style={styles.selection_row}>
                        <Text style={styles.texto}>De:</Text>
                        <View>
                            {/** Date picker */}
                            {/** Abrir seletor de data */}
                            {showInitialPicker && ( 
                                <View>
                                    <TouchableOpacity
                                    onPress={toggleInitialDatePicker}
                                    >
                                        <TextInput
                                        value={format(initialDate, "dd/MM/yyyy")}
                                        style={[styles.campoData]}
                                        placeholder='dd/mm/aaaa' 
                                        placeholderTextColor={'black'}
                                        onPressIn={toggleInitialDatePicker}
                                        />
                                    </TouchableOpacity>
                                    <DateTimePicker
                                    mode="date"
                                    display="spinner"
                                    value={initialDate}
                                    onChange={onChangeInicialDate}
                                    style={{height: 120, marginTop: -10}}
                                    />
                                </View>
                            )}

                            {/*Seletor de data em dispositivos IOS*/}
                            {!showInitialPicker && Platform.OS === "ios" && (
                                <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                                    <TouchableOpacity 
                                    style={{
                                        paddingHorizontal: 14,
                                        backgroundColor:'#d5d5d5',  
                                        padding: 14,
                                        borderRadius: 50
                                        }}
                                    onPress={toggleInitialDatePicker}
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
                                    onPress={confirmIOSInitialDate}
                                    >
                                        <Text style={{fontSize:14, fontWeight: "500", color: '#d5d5d5'}}>Confirmar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {/** Mostrar text input */}
                            {!showInitialPicker && (
                                <TouchableOpacity
                                    onPress={toggleInitialDatePicker}
                                    >
                                    <TextInput
                                    value={format(initialDate, "dd/MM/yyyy")}
                                    style={[styles.campoData]}
                                    placeholder='dd/mm/aaaa' 
                                    placeholderTextColor={'black'}
                                    onPressIn={toggleInitialDatePicker}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View >
                    {/* Até: */}
                    <View style={styles.selection_row}>
                        <Text style={styles.texto}>Até:</Text>
                        <View>
                            {/** End Date picker */}
                            {/** Abrir seletor de data */}
                            {showEndPicker && ( 
                                <View>
                                    <TouchableOpacity
                                    onPress={toggleEndDatePicker}
                                    >
                                        <TextInput
                                        value={format(endDate, "dd/MM/yyyy")}
                                        style={[styles.campoData]}
                                        placeholder='dd/mm/aaaa' 
                                        placeholderTextColor={'black'}
                                        onPressIn={toggleEndDatePicker}
                                        />
                                    </TouchableOpacity>
                                    <DateTimePicker
                                    mode="date"
                                    display="spinner"
                                    value={endDate}
                                    onChange={onChangeEndDate}
                                    style={{height: 120, marginTop: -10}}
                                    />
                                </View>
                            )}

                            {/*Seletor de data em dispositivos IOS*/}
                            {!showEndPicker && Platform.OS === "ios" && (
                                <View style={{flexDirection: "row", justifyContent: "space-around"}}>
                                    <TouchableOpacity 
                                    style={{
                                        paddingHorizontal: 14,
                                        backgroundColor:'#d5d5d5',  
                                        padding: 14,
                                        borderRadius: 50
                                        }}
                                    onPress={toggleEndDatePicker}
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
                                    onPress={confirmIOSEndDate}
                                    >
                                        <Text style={{fontSize:14, fontWeight: "500", color: '#d5d5d5'}}>Confirmar</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {/** Mostrar text input */}
                            {!showEndPicker && (
                                <TouchableOpacity
                                    onPress={toggleEndDatePicker}
                                    >
                                    <TextInput
                                    value={format(endDate, "dd/MM/yyyy")}
                                    style={[styles.campoData]}
                                    placeholder='dd/mm/aaaa' 
                                    placeholderTextColor={'black'}
                                    onPressIn={toggleEndDatePicker}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.bloco2}>
                <TouchableOpacity style={styles.filtro}>
                    <Text style={[styles.texto, {marginEnd: 6, fontSize: 16, fontWeight: 'normal'}]}>Filtrar</Text>
                    <FontAwesome name="sliders" size={18} color='#e7e7e7'/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bloco1:{
        backgroundColor: '#14423C',
    },
    bloco2:{
        backgroundColor: 'rgba(20, 66, 60, 0.7)',
        paddingHorizontal: 24,
        paddingVertical: 5
    },
    periodo:{
        gap: 10,
        alignSelf: 'center',
        marginVertical: 10
    },
    texto:{
        color: '#e7e7e7',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    campoData: {
        width: 140,
        height: 30,
        backgroundColor: 'white',
        fontSize: 18,
        textAlign: 'center',
        borderRadius: 5,
    },
    filtro:{
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    selection_row:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
});