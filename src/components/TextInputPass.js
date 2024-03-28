import React, { useState } from 'react';
import { TextInput, StyleSheet, View ,Dimensions,Text,TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const TextInputPass = ({ placeholder, onChangeText, secureTextEntry, validation, storageKey, nameicon, error ,nameicon2,nameicon3}) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(secureTextEntry);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsPasswordVisible(!isPasswordVisible);

  };

  const handleTextChange = (text) => {
    const isValidInput = validation(text);
    setIsValid(isValidInput);
    onChangeText(text);

    if (!isValidInput) {
      // setErrorMessage('Invalid input');
    } else {
      setErrorMessage('');
    }

    // Save text to AsyncStorage
    if (storageKey) {
      saveToStorage(storageKey, text);

    }
  };

  return (
    <View style={[styles.container, error ? styles.errorContainer : null]}>
      <View style={[styles.inputContainer, error ? styles.errorInputContainer : null]}>
        <TextInput
          style={[styles.input, !isValid && styles.invalid]}
          placeholder={placeholder}
          onChangeText={handleTextChange}
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor={"#ACACAC"}
        />
        <TouchableOpacity style={{marginTop:height*0.015}} onPress={handleToggleVisibility}>
         <Feather
          name={isVisible ? nameicon2 : nameicon3}
          style={{ alignSelf: 'center' }}
          color={'#919191'}
          size={20}
        />
        </TouchableOpacity>
      </View>
      {error ? (
        <Text style={{ color: 'red', marginTop: height * 0.01, marginLeft: width * 0.03 }}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    height: height * 0.06,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 10,

  },
  errorContainer: {
    borderColor: 'red',
  },
  errorInputContainer: {
    borderColor: 'red',
  },
  input: {
    width: width * 0.7,
    height: height * 0.06,
    marginLeft: width * 0.03,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#181D26",

  },
  invalid: {
    borderColor: 'red',
  },
});

      export default TextInputPass;
      