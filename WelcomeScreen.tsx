import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./AppNavigator";

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Welcome">>();
  const { email } = route.params;

  const [hora, setHora] = useState<number>(new Date().getHours());
  const [minuto, setMinuto] = useState<number>(new Date().getMinutes());
  const [mensaje, setMensaje] = useState<string>("");
  const [imagen, setImagen] = useState<string>("");

  useEffect(() => {
    // Función para actualizar la hora y minuto
    const interval = setInterval(() => {
      const nuevaHora = new Date();
      setHora(nuevaHora.getHours());
      setMinuto(nuevaHora.getMinutes());
    }, 60000);

    if (minuto % 2 === 0) {
      setMensaje("Buen tiempo");
      setImagen("https://cdn-icons-png.flaticon.com/512/869/869869.png"); // Sol 🌞
    } else {
      setMensaje("Mal tiempo");
      setImagen("https://cdn-icons-png.flaticon.com/512/1779/1779940.png"); // Lluvia 🌧️
    }

    return () => clearInterval(interval);
  }, [minuto]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.subtitle}>Usuario: {email}</Text>
      <Text style={styles.time}>
        Hora actual: {hora}:{minuto < 10 ? `0${minuto}` : minuto}
      </Text>
      <Text style={styles.weatherText}>{mensaje}</Text>

      {/* Mostrar imagen dependiendo del clima */}
      <Image source={{ uri: imagen }} style={styles.weatherImage} />

      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        Cerrar Sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  time: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  weatherText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  weatherImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default WelcomeScreen;
