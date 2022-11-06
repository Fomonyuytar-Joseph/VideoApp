import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import{React,useState}  from 'react';
import FormError from '../components/FormError';
import {signInWithEmailAndPassword} from"firebase/auth"
import { authentication } from '../firebase/firebase';
import FormSuccess from '../components/FormSuccess';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [displayFormErr, setDisplayFormErr] = useState(false);
  const [isLoading,setIsLoading]=useState(false)




  const validateInput =()=>{
    var form_inputs = [ email, password];
    if (form_inputs.includes('') || form_inputs.includes(undefined)){
      setErrorMessage("Please fill in all Fields")
      return  setDisplayFormErr(true); 

    }
    
    signInWithEmailAndPassword(authentication,email,password).then(()=>{
   
    }).then(()=>{
      setIsLoading(true)
    }).catch(error=>{
      setIsLoading(false)
      // console.log(error.message);
        setErrorMessage(`${error.message}`)
        setDisplayFormErr(true)
    })

  }

  return (
    <View style={styles.mainView}>
      <View style={styles.TopView}>
        <Image
          style={styles.ImageStyle}
          source={require('../assets/images/gitlab.png')}
        />
      </View>
      <View style={styles.BottomView}>
        <Text style={styles.Heading}>
          Welcome{'\n'}
          back
        </Text>

        <View style={styles.FormView}>
          <TextInput
            value={email}
            onChangeText={email => setEmail(email)}
            placeholder={'Email Address'}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
          />
          <TextInput
            value={password}
            onChangeText={password => setPassword(password)}
            placeholder={'Password'}
            secureTextEntry={true}
            placeholderTextColor={'#fff'}
            style={styles.TextInput}
          />
          <TouchableOpacity style={styles.Button}>
            <Text
              style={styles.ButtonText}
              onPress={validateInput}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.TextButton}  onPress={() => navigation.navigate('signUp')}>
          <Text
            style={styles.SignupText}
            >
            SignUp
          </Text>
        </TouchableOpacity>
      </View>

      
      {displayFormErr ? 
        <FormError hideErrorOverlay={setDisplayFormErr} err={errorMessage} />
       : null}

{
  isLoading? <FormSuccess/>: null
}

      {/* <Text>SignIn</Text>
      <Button title="Go to Sign Up"  onPress={() => navigation.navigate('signUp')} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"gray"
  },
  TopView: {
    width: '100%',
    height: '20%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomView: {
    width: '100%',
    height: '80%',
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  ImageStyle: {
    width: '60%',
    resizeMode: 'contain',
  },
  Heading: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 20,
  },
  TextInput: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
    height: 52,
    color: '#fff',
    paddingLeft: 5,
  },
  FormView: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: -20,
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
  SignupText: {
    fontSize: 20,
    color: 'gray',
  },
  TextButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
export default SignIn;
