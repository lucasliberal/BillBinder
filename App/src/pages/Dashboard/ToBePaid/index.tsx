import React, {useState, useEffect} from 'react';
import { StyleSheet, StatusBar, View, FlatList } from 'react-native';
import { PeriodFilter } from '../../../components/Filter';
import { ListItem } from '../../../components/List';
import styles_global from '../../style';

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
        
    const onChangeDate = (initialDate, endingDate) => {
        setInitDate(initialDate);
        setEndDate(endingDate);
    } 

    useEffect(() => {
        //executa o comando após a seleção do período
        console.log('********* TELA A PAGAR **********');
        console.log('De: ' + initDate);
        console.log('Até: ' + endDate);
    }), [initDate, endDate];

    return(
        <View style={styles_global.container}>
            {/* <StatusBar/> */}
            <PeriodFilter onChangeDate={onChangeDate}/>
            <FlatList
                data={list}
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
                    }})
                }/>}
            />
        </View>
    );
}
