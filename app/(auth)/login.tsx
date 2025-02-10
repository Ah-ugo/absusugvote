import React, { useContext, useState } from "react";
import { View, Alert } from "react-native";
import axios from "axios";
import {
  Button,
  Input,
  Label,
  Separator,
  SizableText,
  XStack,
  YStack,
} from "tamagui";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { Eye, EyeSlash } from "iconsax-react-native";

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://absu-votes-api.onrender.com/token",
        new URLSearchParams({
          grant_type: "password",
          username,
          password,
          scope: "",
          client_id: "",
          client_secret: "",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );

      const { access_token, token_type, role } = response.data;

      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("user_role", role);

      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
      <View
        style={{
          marginTop: 50,
          marginBottom: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SizableText size={"$9"} style={{ fontFamily: "InterSemiBold" }}>
          Sign In
        </SizableText>
        <SizableText
          size={"$2"}
          style={{ fontFamily: "InterLight" }}
          color={"#AEACAC"}
        >
          Hi Welcome! Continue to login
        </SizableText>
      </View>
      <View>
        <YStack>
          <Label htmlFor="username" style={{ fontFamily: "InterLight" }}>
            Matric Number
          </Label>
          <Input
            size={"$4"}
            id="username"
            placeholder="Enter your matric number"
            value={username}
            onChangeText={(input) => setUsername(input.trimStart())}
            style={{ fontFamily: "InterRegular" }}
            onBlur={() => setUsername(username.trim())}
            autoCapitalize="none"
            autoCorrect={false}
            // style={{ fontFamily: "InterRegular" }}
          />
        </YStack>

        <YStack>
          <Label htmlFor="password" style={{ fontFamily: "InterLight" }}>
            Password
          </Label>
          <XStack alignItems="center">
            <Input
              size={"$4"}
              id="password"
              placeholder="Enter your password"
              value={password}
              secureTextEntry={!isPasswordVisible}
              onChangeText={(input) => setPassword(input.trimStart())}
              style={{ fontFamily: "InterRegular", flex: 1 }}
              onBlur={() => setPassword(password.trim())}
              autoCapitalize="none"
              autoCorrect={false}
              // Remove the right prop from here
            />
            <Button // Button outside the Input
              onPress={togglePasswordVisibility}
              size="$3"
              backgroundColor="transparent"
              style={{
                position: "absolute",
                // position: 'absolute',
                right: 8,
                top: 3, // Align to top of parent
                bottom: 0, // Align to bottom of parent
                justifyContent: "center", // Vertically center content
                alignItems: "center", // Horizontally center content (if needed)
              }} // Position it
            >
              {isPasswordVisible ? (
                <EyeSlash size={20} color="gray" />
              ) : (
                <Eye size={20} color="gray" />
              )}
            </Button>
          </XStack>
        </YStack>

        <Button
          onPress={handleLogin}
          color={"white"}
          fontWeight={"800"}
          backgroundColor={"#0F52BA"}
          marginTop={20}
          style={{ color: "white" }}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <XStack marginTop={20} alignItems="center" gap={10}>
          <Separator borderColor={"#AEACAC"} />
          <SizableText
            size={"$2"}
            color={"#AEACAC"}
            style={{ fontFamily: "InterLight" }}
          >
            Or
          </SizableText>
          <Separator borderColor={"#AEACAC"} />
        </XStack>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <XStack
            gap={3}
            marginTop={15}
            justifyContent="center"
            alignItems="center"
          >
            <SizableText style={{ fontSize: 18, fontFamily: "InterRegular" }}>
              Don’t have an account?
            </SizableText>
            <Link
              style={{
                fontSize: 18,
                color: "#0F52BA",
                fontFamily: "InterRegular",
              }}
              href={"/register"}
            >
              Sign up
            </Link>
          </XStack>
        </View>
      </View>
    </SafeAreaView>
  );
}
