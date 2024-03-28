// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet,Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;


const Button = ({  label,onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} >
       <Text style={{ fontSize: 20,
                  color: '#fff',
                  fontFamily: 'Poppins-Medium', textAlign:"center",marginTop:width*0.01}}>{label}</Text>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5B4DBC",
    padding: 10,
    borderRadius: 5,
    marginVertical: 15,
    width:width*0.85,
    height:height*0.07,
    borderRadius:30,
    alignSelf:"center",
    borderRadius: 10,
  },
});

export default Button;
