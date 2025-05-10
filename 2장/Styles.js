import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return<View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityname}>서울</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:"skyblue",
  },
  city: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  cityname: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {
    flex: 3,
  },
  day: {
    felx: 1,
    alignItems:"center",
  },
  temp: {
    marginTop: 30,
    fontSize: 178
  },
  description:{
    marginTop: -40,
    fontSize: 60
  }
});