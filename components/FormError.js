import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import {Button, Overlay} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FormError = ({hideErrorOverlay, err}) => {
  return (
    <Overlay
      overlayStyle={styles.Overlay}
      isVisible={true}
      onBackdropPress={() => hideErrorOverlay(false)}>
      <Icon name="check-box" color="red" size={80} style={styles.errorIcon} />

      <Text style={styles.ErrorText}>
        {err}
         </Text>

         <TouchableOpacity style={styles.Button} onPress={()=>{hideErrorOverlay(false)}}>
            <Text style={styles.ButtonText} >
                Okay
            </Text>
         </TouchableOpacity>
    </Overlay>
  );
};

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
    marginTop:20
  },
  Button: {
    width: 200,
    color: '#000',
    height: 51 ,
    backgroundColor: '#000',
    borderRadius: 5,
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  ButtonText:{
    color:"white",
    fontSize:20
  }
});

export default FormError;
