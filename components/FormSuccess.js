import { View, Text ,StyleSheet,ActivityIndicator} from 'react-native'
import React from 'react'
import {Button, Overlay} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FormSuccess = ({close, successMessage }) => {
  return (

    
        successMessage ? 
        <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={()=>close("")} >
    
    <Icon name="check-box" color="blue" size={80} style={styles.errorIcon} />
    <Text  style={styles.ErrorText}>{successMessage}</Text>

       </Overlay>
       :
       <Overlay overlayStyle={styles.Overlay} isVisible={true} >
    
       <ActivityIndicator size={"large"} color={"blue"} />
       </Overlay>
    
   
  )
}

const styles = StyleSheet.create({
    Overlay: {
        width: '90%',
        height: 320,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      
  errorIcon: {
    width: 73,
    height: 73,
  },
  ErrorText:{
    color:"#000",
    fontSize:25,
    marginTop:20,
    textAlign:"center"
  }
})

export default FormSuccess