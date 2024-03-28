import React from 'react';
import {View, Dimensions, Text} from 'react-native';
import BackButton2 from '../components/BackButton2';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const WeatherResult = ({route,navigation}) => {
  const handlePress = () => {
    navigation.navigate('Wheather');
  }

  const {weatherData} = route.params;

  return (
    <View
      style={{width: width * 1, height: height * 1, backgroundColor: '#fff'}}>
      <View
        style={{
          width: width * 1,
          height: height * 0.12,
          backgroundColor: '#D26060',
          borderBottomRightRadius: 35,
          borderBottomLeftRadius: 35,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: height * 0.01,
          }}>
          <BackButton2 onPress={handlePress}/>
          <Text
            style={{
              fontSize: 25,
              color: '#fff',
              fontFamily: 'Poppins-Bold',
              marginLeft: width * 0.22,
            }}>
            Result
          </Text>
        </View>
      </View>
      <View
        style={{
          width: width * 0.8,
          height: height * 0.33,
          alignSelf: 'center',
          marginTop: height * 0.15,
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#aaa',
          borderRadius: 20,
        }}>
        {weatherData && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                fontFamily: 'Poppins-Medium',
              }}>
              City: {weatherData.name}
            </Text>
            {weatherData.main && (
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontFamily: 'Poppins-Medium',
                }}>
                Temperature: {weatherData.main.temp} K
              </Text>
            )}
            {weatherData.weather && (
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontFamily: 'Poppins-Medium',
                }}>
                {' '}
                Description: {weatherData.weather[0].description}
              </Text>
            )}
            {weatherData.main && (
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontFamily: 'Poppins-Medium',
                }}>
                Humidity: {weatherData.main.humidity}%
              </Text>
            )}
            {weatherData.wind && (
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontFamily: 'Poppins-Medium',
                }}>
                Wind Speed: {weatherData.wind.speed} m/s
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default WeatherResult;
