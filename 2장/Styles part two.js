import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';

const {width:SCREEN_WIDTH} = Dimensions.get("window");

export default function App() {
  return(
  <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityname}>서울</Text>
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