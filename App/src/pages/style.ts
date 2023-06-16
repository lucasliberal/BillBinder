import { StyleSheet } from "react-native";

const styles_global = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#E1E1E1',
    },

    //TEXT INPUT
    txt_input:{
      height: 40,
      borderColor: "#14423C",
      borderWidth: 2,
      paddingLeft: 14,
      paddingRight: 14,
      marginBottom: 16,
      fontSize: 16,
      borderRadius: 5
    },
    txt_input_alternative:{
      color: 'black',
      flexDirection: 'row',
      height: 40,
      borderColor: "rgba(20, 66, 60, 0.2)",
      borderWidth:2,
      paddingLeft: 14,
      marginBottom: 16,
      fontSize: 16,
      borderRadius: 5
    },
    txt_inputTitle:{
      color: '#14423C',
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 6
    },
    txt_inputLoginPage: {
      width: 300,
      height: 50,
      textAlign: 'left',
      paddingStart: 16,
      alignSelf: 'center',
      borderColor: 'white',
      borderLeftWidth: 10,
      borderBottomWidth: 2,
      marginBottom: 40,
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold'
    },
    txt_inputRegisterPage: {
      display: 'flex',
      textAlign: 'left',
      width: 300,
      height: 43,
      backgroundColor: '#f5f5f5',
      borderRadius: 5,
      paddingStart: 16,
      alignSelf: 'center',
      fontSize: 16,
      fontWeight: 'bold'
    },
    txt_input_digitableLine:{
      paddingLeft:0,
      width: 95.5,
      textAlign: 'center',
      marginBottom: 2,
    },
    select_input_container:{
      height: 40,
      borderWidth: 2,
      borderColor: '#14423C',
      marginBottom: 16,
      borderRadius: 5
    },
    select_input:{
      height: 40,
      top:-10,
      borderColor: "#14423C",
      color:'black',
    },
    select_input_container_alternative:{
      height: 40,
      borderColor: "rgba(20, 66, 60, 0.2)",
      borderWidth: 2,
      marginBottom: 16,
      borderRadius: 5
    },
    select_input_alternative:{
      height: 40,
      top: -10,
    },
    //BUTTON
    btn_login1:{
      width: 180,
      elevation: 8,
      backgroundColor: '#F5F5F5',
      borderRadius: 30,
      paddingVertical: 10,
      paddingHorizontal: 12,
      alignSelf: 'center'
    },
    btn_login2:{
      borderColor: 'white',
      // borderWidth: 2,
      // borderRadius: 20,
      padding: 5,
    },
    txt_btnLogin:{
      fontSize: 18,
      color: '#14423C',
      fontWeight: 'bold',
      alignSelf: 'center',
      textTransform: 'uppercase'
    },
    btn1:{
      width: "100%",
      backgroundColor: '#14423C',
      borderRadius: 5,
      alignSelf: 'center',
      marginTop: 20,
    },
    btn2:{
      width: "100%",
      backgroundColor: '#AFAFAF',
      borderRadius: 5,
      alignSelf: 'center',
      marginTop: 20,
    },
    btn_upload:{
      backgroundColor: '#E7E7E7',
      width: 140,
      height: 45,
      borderRadius: 5,
      borderColor: '#14423C',
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      color: '#14423C'
    },
    btn_upload_alternativo:{
      backgroundColor: '#E7E7E7',
      width: 140,
      height: 45,
      borderRadius: 5,
      borderColor: 'rgba(20, 66, 60, 0.2)',
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      color: '#14423C'
    },
    date_field:{
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    msg_error:{
      backgroundColor: 'rgba(235, 52, 52, 0.2)',
      borderRadius: 10,
      textAlign: 'center',
      fontSize: 15,
      marginHorizontal:14,
      marginVertical: 10,
      fontWeight: '500',
      padding: 4
    },
    msg:{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 10,
      textAlign: 'center',
      fontSize: 15,
      marginHorizontal:14,
      marginVertical: 10,
      fontWeight: '500',
      padding: 4
    }
});

export default styles_global;