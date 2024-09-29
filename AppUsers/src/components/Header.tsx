import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Defina os tipos para a navegação
type RootStackParamList = {
  Home: undefined;
  AddUser: undefined;
};

type HeaderNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Header: React.FC = () => {
  const navigation = useNavigation<HeaderNavigationProp>();

  return (
    <View style={styles.header}>
      {/* Título do Header */}
      <Text style={styles.title}>Lista de Usuários</Text>

      {/* Botão para adicionar um novo usuário */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddUser')}
      >
        <Text style={styles.addButtonText}>Adicionar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#5DE2E7",
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Header;
