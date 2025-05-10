import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';

const {width:SCREEN_WIDTH} = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...")
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async() => {
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
  } 
  useEffect(() => {
    ask();
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
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
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
  }
});