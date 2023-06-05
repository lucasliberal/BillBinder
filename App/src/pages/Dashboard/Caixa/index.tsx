import React, {useEffect, useState} from 'react';
import { StyleSheet, StatusBar, View, FlatList, TouchableOpacity, Text} from 'react-native';
import { PeriodFilter } from '../../../components/Filter';
import { ListItem } from '../../../components/List';
import styles_global from '../../style';

const list = [
    {
        id: 1,
        descricao: 'Salário',
        valor: '3160,00',
        tipo: 1, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '2023-01-02', // data de vencimento
        db: '2023-01-01', // data do debito/recebimento
        categoria: 'Salário',
        status: 1
    },
    {
        id: 2,
        descricao: 'Cartão',
        valor: '987,00',
        tipo: 0, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '2023-01-11', // data de vencimento
        db: '2023-01-10', // data do debito/recebimento
        categoria: 'Cartão',
        status: 1
    },
    {
        id: 3,
        descricao: 'Aluguel',
        valor: '1200,00',
        tipo: 1, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '2023-02-07', // data de vencimento
        db: '2023-02-06', // data do debito/recebimento
        categoria: 'Aluguel',
        status: 1
    },
    {
        id: 4,
        descricao: 'Internet',
        valor: '150,00',
        tipo: 0, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '2023-06-17', // data de vencimento
        db: '2023-06-16', // data do debito/recebimento
        categoria: 'Internet',
        status: 1
    }
]

export default function Caixa({navigation}) {
        
    const [initDate, setInitDate] = useState();
    const [endDate, setEndDate] = useState();
    
    const onChangeDate = (initialDate, endingDate) => {
        setInitDate(initialDate);
        setEndDate(endingDate);
    } 
    
    useEffect(() => {
        //executa o comando após a seleção do período
        console.log('******** TELA CAIXA **********');
        console.log('De: ' + initDate);
        console.log('Até: ' + endDate);
    }), [initDate, endDate];
    
    return(
        <View style={styles_global.container}>
            <StatusBar/>
            <PeriodFilter onChangeDate={onChangeDate}/>
            <FlatList
                data={list}
                keyExtractor={ (item) => String(item.id)}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => <ListItem data={item} 
                onPress={() => navigation.navigate('BillInformation', {
                    item: {
                        id:item.id, 
                        description:item.descricao,
                        value: item.valor,
                        type: item.tipo,
                        situation: item.situacao,
                        dv: item.dv, 
                        db: item.db,
                        category: item.categoria,
                        status: item.status
                    }})
                }/>}
            />
        </View>
    );
}