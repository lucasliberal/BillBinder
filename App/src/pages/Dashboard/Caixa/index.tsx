import React, {useEffect, useState, Component} from 'react';
import { StatusBar, View, FlatList, TouchableOpacity, Text, ActivityIndicator, ScrollView} from 'react-native';
import { DateRange } from '../../../components/Filter';
import { ListItem } from '../../../components/List';
import styles_global from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../../../mock/config';

export default function Caixa({navigation}) {
    const [initDate, setInitDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [userId, setUserId] = useState();
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [msg, setMsg] = useState({"msg": "", "code": 200});

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
            setMsg({"msg":"Erro interno. Porfavor contate o administrado!", "code": 404})
        }
    }

    const getDataFromApi = async () => {
        //recebe apenas lançamentos com o status=1 (concluido) 
        setRefreshing(true);
        await axios.get(BASE_URL + `/bills?user_id=${userId}&status=1`)
        .then((data) => {
            //setData(data.data); //Dados sem filtragem
            var filteredData = data.data.filter(a => {
                var date = new Date(a.debit_date); //no caixa a listagem é feita com base na data de débito
                return (date >= initDate && date <=endDate);
            });
            setData(filteredData);
            if (filteredData.length === 0){
                setMsg({"msg": "Nenhum lançamento encontrado.", "code": 204}) // 204 = no content
            }
        })
        .then(() => setRefreshing(false))
        .catch((err) => setMsg({"msg":"Erro interno. Porfavor contate o administrado!", "code": 404})) // 404 = not found
    }

    useEffect(() => {
        getUserId();
    }), [];

    useEffect(() => {
        setMsg({"msg": "", "code": 200});
        if (userId != undefined){
            getDataFromApi();
        }
        // if(route.params){
        //     setMsg({"msg": route.params.msg, "code": route.params.code})
        //     setTimeout(() => {
        //         setMsg({"msg": "", "code": 200});
        //     }, 5000)
        // }
    }, [userId, initDate, endDate]);   
    
    return(
        <View style={styles_global.container}>
            <StatusBar/>
            <DateRange onChangeDate={onChangeDate}/>
            <View>
                {msg.code == 404 && <Text style={styles_global.msg_error}>{msg.msg}</Text>}
                {msg.code == 204 && <Text style={styles_global.msg}>{msg.msg}</Text>}
                {/* {msg.code == 201 && <Text style={[styles_global.msg_success,{position: 'absolute', height: 36, zIndex: 1, fontSize: 15, alignSelf: 'center'}]}>{msg.msg}</Text>} */}
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
        </View>
    );
}