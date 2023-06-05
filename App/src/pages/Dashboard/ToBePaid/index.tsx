import React, {useState, useEffect} from 'react';
import { StyleSheet, StatusBar, View, FlatList } from 'react-native';
import { PeriodFilter } from '../../../components/Filter';
import { ListItem } from '../../../components/List';
import styles_global from '../../style';

const list = [
    {
        id: 1,
        descricao: 'Energia',
        valor: '540,00',
        tipo: 0, // 1=receber | 0=pagar
        situacao: 0, // 1=cocluido | 0=pendente
        dv: '2023-01-19', // data de vencimento
        db: '', // data do debito/recebimento
        categoria: 'Energia',
        status: 0
    },
    {
        id: 2,
        descricao: 'Telefone',
        valor: '60,00',
        tipo: 0, // 1=receber | 0=pagar
        situacao: 0, // 1=cocluido | 0=pendente
        dv: '2023-01-12', // data de vencimento
        db: '', // data do debito/recebimento
        categoria: 'Telefone',
        status: 0    
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
