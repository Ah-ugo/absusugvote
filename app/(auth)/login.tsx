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

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    await router.replace("/(tabs)");
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
            Username
          </Label>
          <Input
            size={"$4"}
            id="username"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            style={{ fontFamily: "InterReg" }}
          />
        </YStack>

        <YStack>
          <Label htmlFor="password" style={{ fontFamily: "InterLight" }}>
            Password
          </Label>
          <Input
            size={"$4"}
            id="password"
            placeholder="Enter your password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            style={{ fontFamily: "InterReg" }}
          />
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
            <SizableText style={{ fontSize: 18, fontFamily: "InterReg" }}>
              Don’t have an account?
            </SizableText>
            <Link
              style={{ fontSize: 18, color: "#0F52BA", fontFamily: "InterReg" }}
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
