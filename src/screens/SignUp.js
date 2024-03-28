import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import {useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import TextInputs from '../components/TextInputs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'; // You need to install this library
import TextInputPass from '../components/TextInputPass';
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';



const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const SignUp = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  


    // Function to handle sign in or sign up based on the current authentication mode

  const handlePress = async () => {

    
    // Validate email and password
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword) &&
      validateUsername(username)
    ) {
      try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        await firebase.database().ref(`users/${user.uid}`).set({
          email,
          username,
          
        });
        await AsyncStorage.setItem('isAuthenticated', 'true');
        navigation.navigate('Wheather');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          // Handle email already in use error
          Alert.alert('Email is already in use.');
        } else {
          // Handle other errors
          console.error('Error signing up:', error);
        }      
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
      if (!validateConfirmPassword(confirmPassword)) {
        setConfirmPasswordError('Password not match.');
      } else {
        setConfirmPasswordError('');
      }
      if (!validateUsername(username)) {
        setUsernameError('Please entr a valid password.');
      } else {
        setUsernameError('');
      }
    }
  };

  useEffect(() => {
    // Retrieve data from AsyncStorage on component mount
    retrieveDataFromStorage('email').then(setEmail);
    retrieveDataFromStorage('username').then(setUsername);
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

  const validateConfirmPassword = text => {
    // Confirm password validation
    return text === password;
  };
  

  const validateUsername = text => {
    // Username validation
    return text.length >= 3; // Username must be at least 3 characters long
  };
  return (
    <>
      {/* parent view */}
      <ScrollView>
        <View
          style={{
            width: width * 1,
            height: height * 1,
            backgroundColor: '#fff',
          }}>
          {/* view of image */}
          <View
            style={{
              height: height * 0.23,
              width: width * 1,
              alignSelf: 'center',
              backgroundColor: '#ECC35A',
              borderBottomLeftRadius:35
            }}>
            <ImageBackground
              source={require('../components/images/image.png')}
              style={{
                width: width * 1,
                height: height * 0.23,
                alignSelf: 'center',
                borderBottomLeftRadius:35
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
                   Sign up to your
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
                      </View>

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
                  placeholder="Enter your name"
                  onChangeText={setUsername}
                  validation={validateUsername}
                  label="User name"
                  secureTextEntry={false} // Set secureTextEntry to false for username

                  // nameicon={'lock'}
                  value={username}
                  error={usernameError} // Pass the email error state

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
                  User name
                </Text>
              </View>
              {usernameError ? (
                <Text
                  style={{
                    color: 'red',
                    marginTop: height * 0.04,
                    padding: 10,
                    fontSize: 12,
                  }}>
                  {usernameError}
                </Text>
              ) : null}

              <View style={{marginTop: emailError && usernameError? height * 0.01 : height * 0.08 }}>
                <TextInputs
                  placeholder="Enter your email"
                  onChangeText={setEmail}
                  validation={validateEmail}
                  value={email}
                  label="Email"
                  error={emailError} // Pass the email error state
                  secureTextEntry={false} // Set secureTextEntry to false for username

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
                <Text
                  style={{
                    color: 'red',
                    marginTop: height * 0.04,
                    padding: 10,
                    fontSize: 12,
                  }}>
                  {emailError}
                </Text>
              ) : null}

              <View
                style={{
                  marginTop: passwordError && emailError ? height * 0.01 : height * 0.08,
                }}>
                  <View style={{flexDirection:"row"}}>
                <TextInputPass
                  placeholder="Enter your password"
                  onChangeText={setPassword}
                  validation={validatePassword}
                  label="Password"
                  secureTextEntry
                  value={password}
                  error={passwordError} // Pass the password error state
                  nameicon2={'eye-off'}
                  nameicon3={'eye'}
                />

                
                </View>
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
                <Text
                  style={{
                    color: 'red',
                    marginTop: height * 0.04,
                    padding: 10,
                    fontSize: 12,
                  }}>
                  {passwordError}
                </Text>
              ) : null}

              <View style={{marginTop: passwordError ? height * 0.01 : height * 0.08}}>
                <TextInputPass
                  placeholder="Enter your password"
                  onChangeText={setConfirmPassword}
                  validation={validateConfirmPassword}
                  label="Password"
                  nameicon2={'eye-off'}
                  nameicon3={'eye'}
                  secureTextEntry
                  value={confirmPassword}
                  error={confirmPasswordError} // Pass the email error state

                />
                <Text
                  style={{
                    color: '#181D26',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 15,
                    marginLeft: width * 0.06,
                    marginTop: height * -0.077,
                    backgroundColor: '#fff',
                    width: width * 0.43,
                    textAlign: 'center',
                  }}>
                  Confirm Password
                </Text>
              </View>
              {confirmPasswordError ? (
                <Text
                  style={{
                    color: 'red',
                    marginTop: height * 0.04,
                    padding: 10,
                    fontSize: 12,
                  }}>
                  {confirmPasswordError}
                </Text>
              ) : null}

              <Text
                style={{
                  color: '#181D26',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 15,
                  textAlign: 'right',
                  marginTop:  confirmPasswordError ? null : height * 0.055,
                }}>
                Forgot password ?
              </Text>

              <View style={{marginTop: width * 0.07}}>
                <Button
                  // onPress={handlePress}
                  label={'Sign Up'}
                  onPress={handlePress}
                />
              </View>

              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={toggleCheckbox}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons
                      name={isChecked ? 'checkbox-outline' : 'square-outline'}
                      size={24}
                      color="#919191"
                    />
                    <View>
                      <Text
                        style={{color: '#181D26', marginLeft: width * 0.05}}>
                        I accept & agree terms conditions{' '}
                      </Text>
                      <Text
                        style={{color: '#181D26', marginLeft: width * 0.05}}>
                        & privacy policy
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{marginTop: height * 0.02}}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: -5,
                    color: '#181D26',
                  }}>
                  Already have an acount?
                  <TouchableOpacity
                    style={{
                      marginLeft: 5,
                      height: 35,
                      marginTop: 10,
                    }}
                    onPress={() => navigation.navigate('SignIn')}>
                    <Text
                      style={{
                        marginTop: 17,
                        color: '#3d49f2',
                        textDecorationLine: 'underline',
                      }}>
                      {' '}
                      log in
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SignUp;
