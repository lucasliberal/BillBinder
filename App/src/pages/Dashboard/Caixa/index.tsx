import React, {useEffect, useState, Component} from 'react';
import { StatusBar, View, FlatList, TouchableOpacity, Text, ActivityIndicator, ScrollView} from 'react-native';
import { PeriodFilter } from '../../../components/Filter';
import { ListItem } from '../../../components/List';
import styles_global from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Caixa({navigation, route}) {
    const [initDate, setInitDate] = useState();
    const [endDate, setEndDate] = useState();
    const [userId, setUserId] = useState();
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [updated, setUpdated] = useState(false);

    const onChangeDate = (initialDate, endingDate) => {
        setInitDate(initialDate);
        setEndDate(endingDate);
    }

    async function getUserId () {
        try {  
            await AsyncStorage.getItem('userId')
            .then((value) => {
                if(value) {
                    setUserId(JSON.parse(value));
                };
            })
        } catch (error) {
            console.error(error);
        }
    }

    const getDataFromApi = async () => {
        //recebe apenas lançamentos com o status=1 (concluido) 
        setRefreshing(true);
        await axios.get(`http://192.168.0.114:3000/bills?user_id=${userId}&status=1`)
        .then((data) => {
            setData(data.data);
        })
        .then(() => setRefreshing(false))
        .catch((err) => console.error(err))
    }

    useEffect(() => {
        getUserId();
    }), [];

    useEffect(() => {
        getDataFromApi();
    }, [userId, initDate, endDate])
    
    return(
        <View style={styles_global.container}>
            <StatusBar/>
            <PeriodFilter onChangeDate={onChangeDate}/>
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
                        user_id:item.user_id,
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