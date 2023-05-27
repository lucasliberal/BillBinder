import { StyleSheet } from "react-native";

const styles_global = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#d5d5d5',
    },

    //TEXT INPUT
    txt_input:{
      height: 36,
      borderColor: "#14423C",
      borderLeftWidth: 6,
      borderBottomWidth: 2,
      paddingLeft: 14,
      marginBottom: 24,
    },
    txt_input_alternative:{
        height: 36,
        borderColor: "rgba(20, 66, 60, 0.2)",
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderTopWidth:1,
        borderRightWidth:1,
        paddingLeft: 14,
        marginBottom: 24,
    },
    txt_inputTitle:{
        color: '#14423C',
        fontSize: 16,
        fontWeight: 'bold'
    },
    txt_inputLoginPage: {
        position: 'relative',
        display: 'flex',
        textAlign: 'left',
        paddingStart: 16,
        width: 300,
        height: 50,
        alignSelf: 'center',
        borderColor: 'white',
        borderLeftWidth: 10,
        borderBottomWidth: 2,
        marginBottom: 40,
        color: 'white',
      },

      //BUTTON
      btn_login1:{
        width: 180,
        elevation: 8,
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignSelf: 'center'
      },
      btn_login2:{
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 20,
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
      }
});

export default styles_global;