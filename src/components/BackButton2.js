// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet,Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;


const BackButton2 = ({  onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        {/* icon */}
      <Entypo
          name="chevron-left"
          style={{alignSelf: 'center'}}
          color={'#fff'}
          size={30}
        />
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6556CC",
    padding: 10,
    borderRadius: 5,
    marginVertical: 15,
    width:width*0.14,
    height:height*0.06,
    borderRadius:30,
    marginLeft: width*0.05
  },
});

export default BackButton2;
