import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import UserDetailsScreen from "./src/screens/UserDetailsScreen";
import EditUserScreen from "./src/screens/EditUserScreen";
import AddUserScreen from "./src/screens/AddUserScreen";

// Defina os parâmetros que as telas esperam
type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
  EditUser: { userId: number }; 
  AddUser: { userId: number }; 
};

// Crie o stack navigator tipado
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={{ title: "Detalhes do Usuário" }}
        />
        <Stack.Screen
          name="EditUser" 
          component={EditUserScreen}
          options={{ title: "Edição de Usuário" }}
        />
        <Stack.Screen
          name="AddUser" 
          component={AddUserScreen}
          options={{ title: "Adicionar novo usuário" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;