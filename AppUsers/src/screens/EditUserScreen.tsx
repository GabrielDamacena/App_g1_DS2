import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";

// Defina os parâmetros esperados pela navegação
type RootStackParamList = {
  Home: undefined;
  EditUser: { userId: number };
};

// Defina os tipos para as props da tela de edição
type EditUserScreenRouteProp = RouteProp<RootStackParamList, "EditUser">;

type EditUserScreenProps = {
  route: EditUserScreenRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "EditUser">;
};

// Defina o tipo do usuário que você vai editar
type User = {
  id: number;
  name: string;
  email: string;
  login: string;
  city: string;
};

const EditUserScreen: React.FC<EditUserScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar os detalhes do usuário
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.100.4:3000/Users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleSave = async () => {
    if (user) {
      try {
        await axios.put(`http://192.168.100.4:3000/Users/${userId}`, user);
        Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
        navigation.goBack(); // Volta à tela anterior após a edição
      } catch (error) {
        Alert.alert("Erro", "Não foi possível atualizar o usuário.");
        console.error("Erro ao atualizar usuário:", error);
      }
    }
  };

  if (loading || !user) {
    return null; // Ou você pode adicionar um loading spinner aqui
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={user.login}
        onChangeText={(text) => setUser({ ...user, login: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={user.city}
        onChangeText={(text) => setUser({ ...user, city: text })}
      />
      <Button title="Salvar" onPress={handleSave} />
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

export default EditUserScreen;
