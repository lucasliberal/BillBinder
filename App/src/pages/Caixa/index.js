import {} from 'react';
import {StyleSheet, StatusBar, Dimensions, View, Text, FlatList} from 'react-native';
import BarraSuperior from '../../components/BarraSuperior';
import PeriodoMenu from '../../components/PeriodoMenu';
import BarraInferior from '../../components/BarraInferior';
import Movimentacoes from '../../components/Movimentacoes';


const list = [
    {
        id: 1,
        descricao: 'Salário',
        valor: '3160,00',
        tipo: 1, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '01/01/2023', // data de vencimento
        db: '01/01/2023', // data do debito/recebimento
        categoria: 'Salário',
    },
    {
        id: 2,
        descricao: 'Cartão',
        valor: '987,00',
        tipo: 0, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '13/01/2023', // data de vencimento
        db: '10/01/2023', // data do debito/recebimento
        categoria: 'Cartão',
    },
    {
        id: 3,
        descricao: 'Salário Appen',
        valor: '2650,00',
        tipo: 1, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '15/01/2023', // data de vencimento
        db: '14/01/2023', // data do debito/recebimento
        categoria: 'Salário',
    },
    {
        id: 4,
        descricao: 'Salário Appen',
        valor: '2650,00',
        tipo: 1, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '15/01/2023', // data de vencimento
        db: '14/01/2023', // data do debito/recebimento
        categoria: 'Salário',
    },
    {
        id: 5,
        descricao: 'Salário Appen',
        valor: '2650,00',
        tipo: 1, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '15/01/2023', // data de vencimento
        db: '14/01/2023', // data do debito/recebimento
        categoria: 'Salário',
    },
    {
        id: 6,
        descricao: 'Salário Appen',
        valor: '2650,00',
        tipo: 1, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '15/01/2023', // data de vencimento
        db: '14/01/2023', // data do debito/recebimento
        categoria: 'Salário',
    },
    {
        id: 7,
        descricao: 'Salário Appen',
        valor: '2650,00',
        tipo: 1, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '15/01/2023', // data de vencimento
        db: '14/01/2023', // data do debito/recebimento
        categoria: 'Salário',
    },
    {
        id: 8,
        descricao: 'Salário Appen',
        valor: '2650,00',
        tipo: 1, // 1=receber | 0=pagar
        situacao: 1, // 1=cocluido | 0=pendente
        dv: '15/01/2023', // data de vencimento
        db: '14/01/2023', // data do debito/recebimento
        categoria: 'Salário',
    }
]

export default function Caixa() {
    return(
        <View style={styles.container}>
            <StatusBar/>
            <BarraSuperior titulo="Caixa"/>
            <PeriodoMenu/>
            <FlatList
                style={styles.conteudo}
                data={list}
                keyExtractor={ (item) => String(item.id)}
                showsVerticalScrollIndicator={true}
                renderItem={({ item }) => <Movimentacoes dado={item}/>}
            />
            <BarraInferior style={{justifyContent: 'flex-end'}} valor="caixa"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#d5d5d5',
    },
    conteudo:{
        flex: 1,
        backgroundColor:'#d5d5d5',
    }
});