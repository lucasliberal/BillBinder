import React, {useEffect, useState, Component} from 'react';
import { StyleSheet, StatusBar, View, FlatList, TouchableOpacity, Text} from 'react-native';
import { PeriodFilter } from '../../../components/Filter';
import { ListItem } from '../../../components/List';
import styles_global from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Caixa({navigation}) {
    const [initDate, setInitDate] = useState();
    const [endDate, setEndDate] = useState();
    const [userId, setUserId] = useState();

    const list1 = [
        {
            id: 1,
            user_id: 1,
            description: "Salário prefeitura",
            value: "3160,00",
            type: 1,
            status: 1,
            expiration_date: "2023-01-02",
            debit_date: "2023-01-01",
            category: "Salário"
          },
          {
            id: 2,
            user_id: 1,
            description: "Cartão de crédito",
            value: "987,00",
            type: 1,
            status: 1,
            expiration_date: "2023-01-12",
            debit_date: "2023-01-11",
            category: "Cartão"
          },
    ]
    
    const onChangeDate = (initialDate, endingDate) => {
        setInitDate(initialDate);
        setEndDate(endingDate);
    }

    async function getUserData(){
        let response = await AsyncStorage.getItem('userId');
        let json = JSON.parse(response);
        setUserId(json);
        //list = getList();
    }

    // async function getList (){
    //     return fetch(`http://192.168.0.114:3000/bills?user_id=${userId}`)
    //             .then( (response) => {return response.json()} )
    //             .then( (data) => {
    //                 // list = Object.keys(data).map(key => ({
    //                 //     ...data[key]
    //                 // }));
    //                 list = data;
    //             })
    //             .catch((err) => console.error(err))
    // }

    useEffect(() => {
        getUserData()
        // .then(() => {
        //     apiData = fetch(`http://192.168.0.114:3000/bills?user_id=${userId}`)
        //     .then( (response) => {return response.json()} )
        //     .then( (data) => {
        //         return Object.keys(data).map(key => ({
        //             ...data[key]
        //         }));
        //         //return data;
        //     })
        //     .catch((err) => console.error(err))
        // })   
    }), [userId];
    
    return(
        <View style={styles_global.container}>
            <StatusBar/>
            <PeriodFilter onChangeDate={onChangeDate}/>
            <FlatList
                data={list1}
                keyExtractor={ (item) => String(item.id)}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => <ListItem data={item} 
                onPress={() => navigation.navigate('BillInformation', {
                    item: {
                        id:item.id, 
                        user_id:item.user_id,
                        description:item.description,
                        value: item.value,
                        type: item.type,
                        status: item.status,
                        expiration_date: item.expiration_date, 
                        debit_date: item.debit_date,
                        category: item.category,
                    }})
                }/>}
            />
        </View>
    );
}