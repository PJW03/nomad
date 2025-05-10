import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  Text,
  View, 
  TouchableOpacity,
  TextInput,
  Alert, 
  ScrollView,
   } from 'react-native';
   import { Fontisto } from "@expo/vector-icons";
   import { Feather } from "@expo/vector-icons";
   import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './color';

const STORAGE_KEY="@toDos"
const WORKING_KEY="@working"

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState ({});
  const [editingKey, setEditingKey] = useState(null); // 수정 중인 항목의 키
  const [editText, setEditText] = useState("");        // 수정 중인 텍스트

  useEffect(() => {
    loadToDos();
  }, []);
  useEffect(() => {
  loadToDos();
  loadWorkingState(); // 마지막 상태 불러오기
}, []);
  const travel = () => {
  setWorking(false);
  saveWorkingState(false);
};
const work = () => {
  setWorking(true);
  saveWorkingState(true);
};
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  };
  const loadToDos = async() => {
    const s = await AsyncStorage.getItem(STORAGE_KEY)
    s !== null ? setToDos(JSON.parse(s)):null;
  }
  
  const addToDo = async() => {
    if(text === ""){
      return;
    }
    const newToDos = {
      ...toDos, 
      [Date.now()]: {text, working, completed: false},
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  }
  const deleteToDo = (key) => {
    Alert.alert(
      "Delete To Do?",
      "Are you sure?",[
      {text:"Cancel"},
      {text:"I'm sure", 
      onPress: () => {
        const newToDos = {...toDos};
        delete newToDos[key];
        setToDos(newToDos);
        saveToDos(newToDos);
      },
    },
    ]);
    
  }
  const saveWorkingState = async (isWorking) => {
  try {
    await AsyncStorage.setItem(WORKING_KEY, JSON.stringify(isWorking));
  } catch (error) {
    console.error("Failed to save working state:", error);
  }
};

const loadWorkingState = async () => {
  try {
    const savedState = await AsyncStorage.getItem(WORKING_KEY);
    if (savedState !== null) {
      setWorking(JSON.parse(savedState));
    }
  } catch (error) {
    console.error("Failed to load working state:", error);
  }
};

const toggleComplete = async (key) => {
  const newToDos = { ...toDos };
  newToDos[key].completed = !newToDos[key].completed; // 완료 상태 반전
  setToDos(newToDos);
  await saveToDos(newToDos);
};

const startEditing = (key) => {
  setEditingKey(key);
  setEditText(toDos[key].text); 
};
const finishEditing = async (key) => {
  const newToDos = { ...toDos };
  newToDos[key].text = editText;
  setToDos(newToDos);
  await saveToDos(newToDos);
  setEditingKey(null);
  setEditText("");
};


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          returnKeyType="done"
          value={text}
          placeholder={working ? "Add a To Do": "Where do you want to go?"}
          style={styles.input}></TextInput>
        <ScrollView>
              {Object.keys(toDos).map((key) =>
                toDos[key].working === working ? (
                  <View style={styles.toDo} key={key}>
                    <View style={styles.checkAndText}>
                      <TouchableOpacity onPress={() => toggleComplete(key)}>
                        <Fontisto 
                          name={toDos[key].completed ? "checkbox-active" : "checkbox-passive"} 
                          size={20} 
                          color={theme.grey} 
                          style={styles.checkIcon} 
                        />
                      </TouchableOpacity>
                      {editingKey === key ? (
                        <TextInput 
                          style={styles.input} 
                          value={editText} 
                          onChangeText={setEditText} 
                          onSubmitEditing={() => finishEditing(key)}
                          autoFocus
                        />
                      ) : (
                        <Text 
                          style={[
                            styles.toDoText, 
                            toDos[key].completed ? styles.completedText : null,
                          ]}
                        >
                          {toDos[key].text}
                        </Text>
                      )}
                    </View>
                    <View style={styles.iconContainer}>
                      <TouchableOpacity onPress={() => deleteToDo(key)}>
                        <Fontisto name="trash" size={18} color={theme.grey} style={styles.icon} />
                      </TouchableOpacity>
                      {editingKey === key ? (
                        <TouchableOpacity onPress={() => finishEditing(key)}>
                          <Fontisto name="check" size={18} color={theme.grey} style={styles.icon} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={() => startEditing(key)}>
                          <Feather name="edit-2" size={18} color={theme.grey} style={styles.icon} /> 
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ) : null
              )}
            </ScrollView>






    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header:{
    justifyContent:"space-between",
    flexDirection:"row",
    marginTop: 100,
  },
  btnText:{
    fontSize: 38,
    fontWeight: "600",

  },
  input:{
    backgroundColor:"white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo:{
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection:"row",
    alignItems:"center",
    justifyContent: "space-between"
  },
  toDoText:{
    color:"white",
    fontSize: 16,
    fontWeight: "500", 
  },
   checkAndText: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkIcon: {
    marginRight: 8,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: theme.grey,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center", 
  },
  icon: {
    marginLeft: 10,
  },
});
