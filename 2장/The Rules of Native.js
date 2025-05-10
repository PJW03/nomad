export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    color: "black",
  },
});