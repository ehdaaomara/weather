import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  TextInput,
  Alert,
  BackHandler 
} from 'react-native';
import BackButton2 from '../components/BackButton2';
import axios from 'axios';
import Button from '../components/Button';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const Wheather = ({navigation}) => {
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBackPress = () => {
    BackHandler.exitApp(); // Exit the app when back button is pressed
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const options = {
        method: 'GET',
        url: 'https://weather-api138.p.rapidapi.com/weather',
        params: {
          city_name: cityName,
        },
        headers: {
          'X-RapidAPI-Key':
            'fb47406978msh9f0c28b54b9e169p1dad1fjsndece3c713066',
          'X-RapidAPI-Host': 'weather-api138.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      console.log(response.data);

      setLoading(false);
      navigation.navigate('WeatherResult', {weatherData: response.data});
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
      Alert.alert(
        'Error',
        'Failed to fetch weather data. Please try again later.',
      );
    }
  };

  useEffect(() => {
    const backAction = () => {
      // Perform any clean-up or action here before exiting the app
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);


  return (
    <View
      style={{width: width * 1, height: height * 1, backgroundColor: '#fff'}}>
      <View
        style={{
          width: width * 1,
          height: height * 0.14,
          backgroundColor: '#D26060',
          borderBottomRightRadius: 35,
          borderBottomLeftRadius: 35,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: height * 0.015,
          }}>
          <BackButton2 onPress={handleBackPress}/>
          <Text
            style={{
              fontSize: 25,
              color: '#fff',
              fontFamily: 'Poppins-Bold',
              marginLeft: width * 0.12,
            }}>
            App Weather
          </Text>
        </View>
        </View>

        <TextInput
          style={{
            width: width * 0.85,
            height: height * 0.06,
            alignSelf: 'center',
            borderColor: '#ACACAC',
            borderWidth: 1,
            marginTop: height * 0.1,
            color: '#000',
            borderRadius: 10,
            padding: 15,
            marginBottom: height * 0.07,
          }}
          placeholder="Enter city name"
          value={cityName}
          onChangeText={setCityName}
          placeholderTextColor={'#ACACAC'}
        />
        <Button label={'Get Weather'} onPress={fetchData} />

        {loading && <ActivityIndicator size="large" color="blue" />}
      </View>
  );
};

export default Wheather;
