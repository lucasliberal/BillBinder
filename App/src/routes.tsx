import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { getHeaderTitle } from "@react-navigation/elements";

import { Login, Register, Caixa, AddBill, ToBePaid, ToBeReceived, BillInformation, Menu} from "./pages" ;

import { TopBar } from "./components/Bar";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function Routes(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false, fullScreenGestureEnabled:false }}>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Register' component={Register}/>
            <Stack.Screen name='Dashboard' component={Dashboard}/>
            <Stack.Screen name='BillInformation' component={BillInformation}
            options={{headerShown: true, header:() => {return(<TopBar titulo={'Informações do lançamento'}/>)}}}/>
        </Stack.Navigator>
    );
}

export function Dashboard(){
    return(
        <Tab.Navigator
        initialRouteName="Caixa"
        screenOptions={{
            unmountOnBlur: true,
            tabBarHideOnKeyboard: true,
            header:({navigation, route, options}) => {
                const titulo = getHeaderTitle(options, route.name);
                return(
                    <TopBar titulo={titulo}/>
                );
            },
            tabBarItemStyle:{
                paddingBottom: 5,
                paddingTop: 5,

            },
            tabBarStyle: {
                backgroundColor: '#e7e7e7',
                borderTopColor: 'rgba(0, 0, 0, 0.5)',
                borderTopWidth: 1,
            },
            tabBarLabelStyle:{
                fontSize: 10,
                fontWeight: 'bold'
            },
            tabBarInactiveTintColor: '#14423C',
            tabBarActiveTintColor: '#e7e7e7',
            tabBarActiveBackgroundColor: '#14423C',
            tabBarIconStyle:{
                width: 2,
                height: 2
            }
        }}>
            <Tab.Screen name="Menu"
            component={Menu}
            options={{
                tabBarLabel: 'Menu'.toUpperCase(),
                tabBarIcon: ({color}) => (
                    <Feather name="menu" size={20} color={color}/>
                )
            }}/>

            <Tab.Screen name="Caixa"
            component={Caixa}
            options={{
                tabBarLabel: 'Caixa'.toUpperCase(),
                tabBarIcon: ({color}) => (
                    <FontAwesome5 name="cash-register" size={20} color={color} />
                )
            }}/>

            <Tab.Screen name="Adicionar lançamento"
            component={AddBill}
            options={{
                tabBarLabel: 'Adicionar'.toUpperCase(),
                tabBarIcon: ({color}) => (
                    <Entypo name="add-to-list" size={20} color={color} />
                )
            }}/>

            <Tab.Screen name="A pagar"
            component={ToBePaid}
            options={{
                tabBarLabel: 'A pagar'.toUpperCase(),
                tabBarIcon: ({color}) => (
                    <MaterialIcons name="money-off" size={20} color={color} />
                )
            }}/>

            <Tab.Screen name="A receber"
            component={ToBeReceived}
            options={{
                tabBarLabel: 'A receber'.toUpperCase(),
                tabBarIcon: ({color}) => (
                    <MaterialIcons name="attach-money" size={20} color={color}/>
                )
            }}/>
        </Tab.Navigator>
    );
}

