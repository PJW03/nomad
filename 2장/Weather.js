import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

const {width:SCREEN_WIDTH} = Dimensions.get("window");

const API_KEY = "4a6db36c8e50672b215a878f6faa9842";

export default function App() {
  const [city, setCity] = useState("Loading...")
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {
      coords:{latitude, longitude},
    } = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude},
      {useGoogleMaps:flase}
    );
    setCity(location[0].city);
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&APPID=${API_KEY}&units=metric')
    const json = await response.json();
    setDays(json.daily);
  } 
  useEffect(() => {
    getWeather();
  }, []);
  return(
  <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityname}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
        {days.length === 0 ? (
          <View style={styles.day}>
          <ActivityIndicator 
            color="white" 
            style={{marginTop:10}} 
            size="large" />
        </View>
        ) : (
          days.map((day, index) =>
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}</Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinytext}>{day.weather[0].description}</Text>       
        </View>
          )
        )}
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:"skyblue",
  },
  city: {
    flex: 1.2,
    justifyContent:"center",
    alignItems:"center"
  },
  cityname: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH, 
    alignItems:"center",
  },
  temp: {
    marginTop: 30,
    fontWeight: "500",
    fontSize: 158
  },
  description:{
    marginTop: -40,
    fontSize: 60
  },
  tinytext: {
    fontSize: 20,
  }
});