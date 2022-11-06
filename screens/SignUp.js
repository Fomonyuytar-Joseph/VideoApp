import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {React, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {db, authentication} from '../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import FormError from '../components/FormError';
import FormSuccess from '../components/FormSuccess';

const SignUp = ({navigation}) => {
  const [fullname, setFullname] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [successMessage, setSuccessMessage]=useState("")
  const [isLoading,setIsLoading]=useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [displayFormErr, setDisplayFormErr] = useState(false);

  function navigate() {
    navigation.navigate('signIn');
    // console.log(firebase);
  }

  const createUser = () => {
    setIsLoading(true)
    createUserWithEmailAndPassword(authentication, email, password)
      .then(response => {
        setIsLoading(false)
       
        setSuccessMessage("Your Account has been created")
        // console.log('worjed well');
        setEmail(''), setPassword('');
        setFullname('');
        setMobile('');
        setPasswordConfirm('');
      })
      .catch(error => {
        setIsLoading(false)
        .log(error.message);
        setErrorMessage(`${error.message}`)
        setDisplayFormErr(true)
      });
  };

  const validateForm = () => {
    var form_inputs = [fullname, mobile, email, password, passwordConfirm];
    var passwords_match = password === passwordConfirm;

    if (form_inputs.includes('') || form_inputs.includes(undefined)){
      setErrorMessage("Please fill in all Fields")
      return  setDisplayFormErr(true); 

    }
    if (!passwords_match){
      setErrorMessage("Passwords Do not Match")
      return setDisplayFormErr(true); 
    } 
    if (passwords_match) return createUser();
  };
  return (
    <View style={styles.mainView}>
      <View style={styles.TopView}>
        <Image
          style={styles.ImageStyle}
          source={require('../assets/images/gitlab.png')}
        />
      </View>
      <ScrollView style={styles.BottomView}>
        <Icon
          name="chevron-left"
          size={30}
          color="#fff"
          style={styles.IconStyle}
          onPress={navigate}
        />
        <View>
          <Text style={styles.Heading}>Create{'\n'}</Text>

          <View style={styles.FormView}>
            <TextInput
              value={fullname}
              onChangeText={fullname => setFullname(fullname)}
              placeholder={'Full Name'}
              placeholderTextColor={'#fff'}
              style={styles.TextInput}
            />
            <TextInput
              value={email}
              onChangeText={email => setEmail(email)}
              placeholder={'Email Address'}
              placeholderTextColor={'#fff'}
              style={styles.TextInput}
            />
            <TextInput
              value={mobile}
              onChangeText={mobile => setMobile(mobile)}
              placeholder={'Mobile'}
              placeholderTextColor={'#fff'}
              style={styles.TextInput}
            />
            <TextInput
              value={password}
              placeholder={'Password'}
              onChangeText={password => setPassword(password)}
              secureTextEntry={true}
              placeholderTextColor={'#fff'}
              style={styles.TextInput}
            />
            <TextInput
              value={passwordConfirm}
              onChangeText={passwordConfirm =>
                setPasswordConfirm(passwordConfirm)
              }
              placeholder={'Confirm Password'}
              secureTextEntry={true}
              placeholderTextColor={'#fff'}
              style={styles.TextInput}
            />
            <TouchableOpacity style={styles.Button} onPress={validateForm}>
              <Text style={styles.ButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {displayFormErr ? 
        <FormError hideErrorOverlay={setDisplayFormErr} err={errorMessage} />
       : null}

{
  isLoading? <FormSuccess/> : successMessage=="Your Account has been created"? <FormSuccess successMessage={successMessage} close={setSuccessMessage}/>: null
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
    height: '15%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomView: {
    width: '100%',
    height: '85%',
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  ImageStyle: {
    width: '40%',
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
    marginTop: -40,
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
  IconStyle: {
    marginLeft: 5,
    marginTop: 10,
  },
});
export default SignUp;
