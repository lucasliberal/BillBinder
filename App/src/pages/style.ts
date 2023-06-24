import { StyleSheet } from "react-native";

const styles_global = StyleSheet.create(
  {
    container:{
        flex: 1,
        backgroundColor:'#E1E1E1',
    },

    logo:{
      alignSelf: 'center',
      height: 100,
      width: 100,
      marginBottom: 10,
    },

    //TEXT INPUT
    txt_input:{
      height: 40,
      borderColor: "#14423C",
      borderWidth: 2,
      paddingLeft: 14,
      paddingRight: 14,
      marginBottom: 20,
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
      marginBottom: 20,
      fontSize: 16,
      borderRadius: 5
    },
    txt_inputTitle:{
      paddingHorizontal: 5,
      alignSelf: 'flex-start',
      backgroundColor: '#e7e7e7',
      color: '#14423C',
      fontSize: 15,
      fontWeight: '500',
      marginBottom:-10,
      marginStart: 10,
      zIndex: 1,
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
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold'
    },
    txt_inputSignUpPage: {
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
      marginBottom: 20,
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
      marginBottom: 20,
      borderRadius: 5
    },
    select_input_alternative:{
      height: 40,
      top: -10,
    },
    //BUTTON
    btn_login1:{
      width: 180,
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
    msg_container:{
      zIndex: 1,
      height: 40,
    },
    msg_container_v2:{
      zIndex: 1,
      position: 'absolute',
      width: '100%',
      height: 36,
      paddingHorizontal: 24
    },
    msg_error:{
      flex:1,
      elevation: 10,
      textAlignVertical: 'center',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      backgroundColor: 'rgba(255, 55, 55, 1)',
      textAlign: 'center',
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
    },
    msg_error_v2:{
      flex: 1,
      elevation: 8,
      textAlignVertical: 'center',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      backgroundColor: 'rgba(255, 55, 55, 1)',
      textAlign: 'center',
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
    },
    msg_success:{
      flex:1,
      elevation: 10,
      paddingHorizontal: 10,
      textAlignVertical: 'center',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      backgroundColor: 'rgba(50, 168, 75, 1)',
      textAlign: 'center',
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
    },
    msg:{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      height: 36,
      textAlignVertical: 'center',
      textAlign: 'center',
      marginHorizontal: 24,
      fontSize: 15,
      fontWeight: '500'
    }
});

export default styles_global;