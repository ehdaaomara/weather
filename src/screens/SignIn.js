import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,Alert
} from 'react-native';
import {useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import TextInputs from '../components/TextInputs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';



const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const SignIn = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  


 const handlePress = async() => {
    // Validate email and password
    if (validateEmail(email) && validatePassword(password)) {

      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
              // Store authentication state
        await AsyncStorage.setItem('isAuthenticated', 'true');

        navigation.navigate('Wheather');
      } catch (error) {
        console.error('Error signing in:', error);
        Alert.alert('Error', 'Invalid email or password. Please try again.');

      }
     
    } else {
      // Set error messages for email and password
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email.');
      } else {
        setEmailError('');
      }
      if (!validatePassword(password)) {
        setPasswordError('Password must be at least 6 characters long.');
      } else {
        setPasswordError('');
      }
    }
  };

  useEffect(() => {
    // Retrieve data from AsyncStorage on component mount
    retrieveDataFromStorage('email').then(setEmail);
  }, []);

  const retrieveDataFromStorage = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? value : '';
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
      return '';
    }
  };

  const validateEmail = text => {
    // Email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
  };

  const validatePassword = text => {
    // Password validation
    return text.length >= 6; // Password must be at least 6 characters long
  };

  return (
    <>
      {/* parent view */}
      <View
        style={{width: width * 1, height: height * 1, backgroundColor: '#fff'}}>
        {/* view of image */}
        <View
          style={{
            height: height * 0.23,
            width: width * 1,
            alignSelf: 'center',
            backgroundColor: '#ECC35A',
            borderRadius: 10,
          }}>
          <ImageBackground
            source={require('../components/images/image.png')}
            style={{
              width: width * 1,
              height: height * 0.23,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            {/* view of button */}
            <View>
              <BackButton />
            </View>
            <View
              style={{
                width: width * 0.9,
                height: height * 0.1,
                // backgroundColor: '#fff',
                marginLeft: width * 0.05,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  color: '#fff',
                  fontFamily: 'Poppins-Bold',
                }}>
                Sign in to your
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: '#fff',
                  fontFamily: 'Poppins-Bold',
                  marginTop: height * -0.015,
                }}>
                account
              </Text>
            </View>
          </ImageBackground>
          {/* parent view of all textinputs */}
          <View
            style={{
              width: width * 0.85,
              height: height * 0.5,
              // backgroundColor: '#aaa',
              alignSelf: 'center',
              marginTop: height * 0.05,
            }}>
            {/* email textinput */}
            <View>
              <TextInputs
                placeholder="Enter your email"
                onChangeText={setEmail}
                validation={validateEmail}
                value={email}
                label="Email"
                nameicon={'mail'}
                error={emailError} // Pass the email error state
                
              />
              <Text
                style={{
                  color: '#181D26',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 15,
                  marginLeft: width * 0.06,
                  marginTop: height * -0.077,
                  backgroundColor: '#fff',
                  width: width * 0.15,
                  textAlign: 'center',
                }}>
                Email
              </Text>
            </View>
            {emailError ? (
              <Text style={{ color: 'red', marginTop: height*0.04,padding:10,fontSize:12 }}>{emailError}</Text>
            ) : null}

            <View style={{marginTop: passwordError && emailError? height * 0.01 : height * 0.085}}>
              <TextInputs
                placeholder="Enter your password"
                onChangeText={setPassword}
                validation={validatePassword}
                label="Password"
                nameicon={'lock'}
                secureTextEntry
                value={password}
                error={passwordError} // Pass the password error state


              />
              <Text
                style={{
                  color: '#181D26',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 15,
                  marginLeft: width * 0.06,
                  marginTop: height * -0.077,
                  backgroundColor: '#fff',
                  width: width * 0.25,
                  textAlign: 'center',
                }}>
                Password
              </Text>
            </View>
            {passwordError ? (
              <Text style={{ color: 'red', marginTop: height*0.04,padding:10,fontSize:12  }}>{passwordError}</Text>
            ) : null}

            <Text
              style={{
                color: '#181D26',
                fontFamily: 'Poppins-Medium',
                fontSize: 15,
                textAlign: 'right',
                marginTop: passwordError ? null : height * 0.055
              }}>
              Forgot password ?
            </Text>

            <View style={{marginTop:width*0.07}}>
              <Button
               onPress={handlePress} 
              label={'Sign In'}
               />
              
            </View>

            {/* start of line */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <View
                style={{
                  flex: 0.5,
                  height: 1,
                  backgroundColor: 'black',
                  marginHorizontal: 5,
                  backgroundColor: '#d4d4d4',
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Poppins-Medium',
                  color: '#000',
                }}>
                Or
              </Text>
              <View
                style={{
                  flex: 0.5,
                  height: 1,
                  backgroundColor: 'black',
                  marginHorizontal: 5,
                  backgroundColor: '#d4d4d4',
                }}
              />
            </View>
            {/* end of line */}

            <View
              style={{
                height: height * 0.07,
                width: width * 0.63,
                // backgroundColor: '#aaa',
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: height * 0.07,
                  width: width * 0.17,
                  borderWidth: 1,
                  borderColor: '#d4d4d4',
                  borderRadius: 10,
                }}>
                  <Image
            source={require('../components/images/google.jpg')}
            style={{
              width: width * 0.09,
              height: height * 0.045,
              alignSelf: 'center',
              borderRadius: 10,
              marginTop:height*0.015
            }}/>
                </View>
              <View
                style={{
                  height: height * 0.07,
                  width: width * 0.17,
                  borderWidth: 1,
                  borderColor: '#d4d4d4',
                  marginLeft: width * 0.06,
                  borderRadius: 10,
                }}>
                <MaterialCommunityIcons
                  name={'facebook'}
                  style={{alignSelf: 'center',marginTop:height*0.01}}
                  color={'#0077B7'}
                  size={40}
                />
              </View>
              <View
                style={{
                  height: height * 0.07,
                  width: width * 0.17,
                  borderWidth: 1,
                  borderColor: '#d4d4d4',
                  marginLeft: width * 0.06,
                  borderRadius: 10,
                }}>
                  <MaterialCommunityIcons
                  name={'twitter'}
                  style={{alignSelf: 'center',marginTop:height*0.01}}
                  color={'#1D9BF0'}
                  size={40}
                />
                </View>
            </View>

            <View>
          <Text style={{ textAlign: 'center',marginTop:5 , color: '#181D26',
                }}>
            Create an acount?
            <TouchableOpacity
              style={{
                
                height: 35,
                marginTop:10
              }}
              onPress={() =>
                navigation.navigate('SignUp')}

              >
              <Text style={{marginTop:17,color:"#3d49f2",textDecorationLine: 'underline'}}>  Sign Up</Text>
            </TouchableOpacity>
          </Text>
          </View>

          </View>
        </View>
      </View>
    </>
  );
};

export default SignIn;
