import React, {useState, useEffect} from 'react';
import { StyleSheet, StatusBar, View, FlatList, Text} from 'react-native';
import { PeriodFilter } from '../../../components/Filter';
import { ListItem } from '../../../components/List';
import styles_global from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../../../mock/config';

const list = [
    {
        id: 1,
        user_id: 1,
        description: 'Energia',
        value: '540,00',
        type: 0, // 1=receber | 0=pagar
        status: 0, // 1=cocluido | 0=pendente
        expiration_date: '2023-01-19', // data de vencimento
        debit_date: '', // data do debito/recebimento
        category: 'Energia',
    },
    {
        id: 2,
        user_id: 1,     
        description: 'Telefone',
        value: '60,00',
        type: 0, // 1=receber | 0=pagar
        status: 0, // 1=cocluido | 0=pendente
        expiration_date: '2023-01-12', // data de vencimento
        debit_date: '', // data do debito/recebimento
        category: 'Telefone',    
    },
]

export default function ToBePaid({navigation}) {
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
            setError(true);
        }
    }

    const getDataFromApi = () => {
        setRefreshing(true);
        //recebe apenas lançamentos com o status=1 (concluido) 
        axios.get(BASE_URL + `/bills?user_id=${userId}&status=0&type=0`)
        .then((data) => {
            //console.log(data.data)
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
            {/* <StatusBar/> */}
            <PeriodFilter onChangeDate={onChangeDate}/>
            {error && 
            <Text style={styles_global.msg_error}>Erro na consulta. Contate o administrador!</Text>}
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
