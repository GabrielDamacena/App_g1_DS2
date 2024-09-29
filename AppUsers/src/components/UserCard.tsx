import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";

// Defina os tipos para a navegação
type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
  EditUser: { userId: number }; // Adicionamos a rota de edição
};

type UserCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserDetails"
>;

type UserCardProps = {
  id: number;
  name: string;
  email: string;
};

const UserCard: React.FC<UserCardProps> = ({ id, name, email }) => {
  const navigation = useNavigation<UserCardNavigationProp>();

  // Função para excluir o usuário
  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://192.168.100.4:3000/Users/${id}`);
      Alert.alert("Sucesso", "Usuário excluído com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir o usuário.");
      console.error("Erro ao excluir usuário:", error);
    }
  };

  return (
    <View style={styles.card}>
      {/* Botão para ir para os detalhes do usuário */}
      <TouchableOpacity
        onPress={() => navigation.navigate("UserDetails", { userId: id })}
      >
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </TouchableOpacity>

      {/* Botão para excluir o usuário */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteUser}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>

      {/* Botão para editar o usuário */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("EditUser", { userId: id })}
      >
        <Text style={styles.editButtonText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f3f3f3",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default UserCard;
