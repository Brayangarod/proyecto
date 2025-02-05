import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./AppNavigator";

interface LoginForm {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const onSubmit = async (data: LoginForm) => {
    const endpoint = isRegistering ? "register.php" : "login.php";
    try {
      const response = await fetch(`http://localhost/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(
        isRegistering ? "Registro exitoso:" : "Login exitoso:",
        result
      );

      if (result.success) {
        // Si es login o registro, redirigir a la pantalla de bienvenida
        navigation.navigate("Welcome", { email: data.email });
      } else {
        alert(result.error || "Ocurrió un error");
      }
    } catch (error) {
      console.error(
        isRegistering ? "Error en el registro:" : "Error en el login:",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenidos !</Text>

      <Text variant="headlineLarge" style={styles.title}>
        {isRegistering ? "Registrarse" : "Iniciar sesión"}
      </Text>

      <Controller
        control={control}
        name="email"
        rules={{ required: "Email es requerido" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            error={!!errors.email}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{ required: "Contraseña es requerida" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Contraseña"
            mode="outlined"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            error={!!errors.password}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        {isRegistering ? "Registrarse" : "Iniciar sesión"}
      </Button>

      <Button
        mode="outlined"
        onPress={() => setIsRegistering(!isRegistering)} // Cambiar entre login y registro
        style={styles.button}
      >
        {isRegistering ? " Inicia sesión" : " Regístrate"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },

  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default LoginScreen;
