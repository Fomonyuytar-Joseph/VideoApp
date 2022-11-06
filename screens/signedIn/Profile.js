import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { authentication } from '../../firebase/firebase'
import {signOut} from "firebase/auth"
import FormSuccess from '../../components/FormSuccess'

const Profile = ({navigation,route}) => {
  
  const logOut =()=>{
    signOut(authentication)
  }
  return (
    <View style={styles.mainView}>
       <TouchableOpacity onPress={logOut} style={styles.Button}>
              <Text style={styles.ButtonText}>Sign Out</Text>
            </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"gray"
  },
  Button: {
    width: '90%',
    color: '#000',
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText: {
    // color:"#fff",
    fontWeight: 'bold',
    fontSize: 20,
  },
})

export default Profile