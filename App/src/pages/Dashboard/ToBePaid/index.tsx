import React, {useState, useEffect} from 'react';
import { StyleSheet, StatusBar, View, FlatList, Text} from 'react-native';
import { DateRange } from '../../../components/Filter';
import { ListItem } from '../../../components/List';
import styles_global from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../../../mock/config';

export default function ToBePaid({navigation}) {
    const [initDate, setInitDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [data, setData] = useState();
    const [userId, setUserId] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [msg, setMsg] = useState({"msg": "", "code": 200});
        
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
            setMsg({"msg":"Erro interno. Porfavor contate o administrado!", "code": 404})
        }
    }

    const getDataFromApi = () => {
        setRefreshing(true);
        //recebe apenas lançamentos com o status=1 (concluido) 
        axios.get(BASE_URL + `/bills?user_id=${userId}&status=0&type=0`)
        .then((data) => {
            var filteredData = data.data.filter(a => {
                var date = new Date(a.expiration_date); //no a pagar a listagem é feita com base na data de vencimento
                return (date >= initDate && date <=endDate);
            })
            setData(filteredData);
            if (filteredData.length === 0){
                setMsg({"msg": "Nenhum lançamento encontrado.", "code": 204}) // 204 = no content
            }
        })
        .then(() => setRefreshing(false))
        .catch((err) => setMsg({"msg":"Erro interno. Porfavor contate o administrado!", "code": 404}))
    }

    useEffect(() => {
        getUserId();
    }), [];

    useEffect(() => {
        setMsg({"msg": "", "code": 200});
        if(userId != undefined)
            getDataFromApi();
    }, [userId, initDate, endDate])

    return(
        <View style={styles_global.container}>
            {/* <StatusBar/> */}
            <DateRange onChangeDate={onChangeDate}/>
            {msg.code == 404 && <Text style={styles_global.msg_error}>{msg.msg}</Text>}
            {msg.code == 204 && <Text style={styles_global.msg}>{msg.msg}</Text>}
            <FlatList
                refreshing={refreshing}
                onRefresh={getDataFromApi}
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
