import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// Defina os parâmetros esperados pela navegação
type RootStackParamList = {
  Home: undefined;
  AddUser: undefined;
};

type AddUserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddUser'>;

type AddUserScreenProps = {
  navigation: AddUserScreenNavigationProp;
};

const AddUserScreen: React.FC<AddUserScreenProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [city, setCity] = useState("");

  const handleAddUser = async () => {
    try {
      const newUser = {
        name,
        email,
        login,
        city,
      };
      await axios.post("http://192.168.100.4:3000/Users", newUser);
      Alert.alert("Sucesso", "Usuário adicionado com sucesso!");
      navigation.goBack(); // Volta para a lista de usuários
    } catch (error) {
      Alert.alert("Erro", "Não foi possível adicionar o usuário.");
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Adicionar" onPress={handleAddUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default AddUserScreen;
