import { getLatestElection } from "@/appUtils/ApiUtils";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { SizableText, YStack } from "tamagui";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const navigateToHome = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        router.replace("/(auth)/login");
      } catch (error) {
        console.error("Navigation error:", error);
      }
    };
    getLatestElection();
    navigateToHome();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require("../assets/images/3999885.jpg")}
        />
        <SizableText color="black" style={styles.text}>
          ABSUVotes
        </SizableText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingTop: 50, // Adjust to move content below the status bar
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: "contain",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    fontFamily: "InterMedium",
  },
});
