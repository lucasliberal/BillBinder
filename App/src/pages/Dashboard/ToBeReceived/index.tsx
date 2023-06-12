import React, { useState, useEffect }from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { ListItem } from "../../../components/List";
import { PeriodFilter } from "../../../components/Filter";
import styles_global from '../../style';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import Caixa from "../Caixa";
import { BASE_URL } from "../../../../mock/config";

export default function ToBeReceived({navigation}) {


    const [initDate, setInitDate] = useState();
    const [endDate, setEndDate] = useState();
    const [data, setData] = useState();
    const [userId, setUserId] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(false);
        
    const onChangeDate = (initialDate, endingDate) => {
        setInitDate(initialDate);
        setEndDate(endingDate);
    } 

    async function getUserId () {
        try {  
            AsyncStorage.getItem('userId')
            .then((value) => {
                if(value) {
                    setUserId(JSON.parse(value));
                };
            })
        } catch (error) {
            setError(true)
        }
    }

    const getDataFromApi = async () => {
        //recebe apenas lançamentos com o status=1 (concluido) 
        setRefreshing(true);
        await axios.get(BASE_URL + `/bills?user_id=${userId}&status=0&type=1`)
        .then((data) => {
            setData(data.data)
        })
        .then(() => setRefreshing(false))
        .catch((err) => setError(true))
    }

    useEffect(() => {
        getUserId();
    }), [];

    useEffect(() => {
        getDataFromApi();
    }, [userId, initDate, endDate])

    return(
        <View style={styles_global.container}>
        <PeriodFilter onChangeDate={onChangeDate}/>
        {error && 
            <Text style={styles_global.msg_error}>Erro na consulta. Contate o administrador!</Text>}
        <FlatList
            onRefresh={getDataFromApi}
            refreshing={refreshing}
            data={data}
            keyExtractor={ (item) => String(item.id)}
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => <ListItem data={item}
            onPress={() => navigation.navigate('BillInformation', {
                item: {
                    id:item.id, 
                    user_id: item.user_id,
                    description:item.description,
                    value: item.value,
                    type: item.type,
                    status: item.status,
                    expiration_date: item.expiration_date, 
                    debit_date: item.debit_date,
                    category: item.category,
                    digitableLine: item.digitableLine
                }})
            }/>}
        />
    </View>
    );
}