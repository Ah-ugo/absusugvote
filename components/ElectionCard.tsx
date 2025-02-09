import { View, Text } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { SizableText, YStack } from "tamagui";
import { useRouter } from "expo-router";

export default function ElectionCard({ img, position, time }: any) {
  const router = useRouter();
  const NavigFunc = () => {
    router.push(`/position/${position}`);
  };
  return (
    <Card
      onPress={NavigFunc}
      style={{
        backgroundColor: "white",
        borderWidth: 0,
        // borderColor: "#AEACAC",
      }}
      elevation={0}
    >
      <Card.Cover
        resizeMode="contain"
        style={{ backgroundColor: "#0F52BA" }}
        source={{
          uri: "https://res.cloudinary.com/dejeplzpv/image/upload/v1739063162/IMG-20250208-WA0004_dj0jps.jpg",
        }}
      />
      <View
        style={{
          paddingHorizontal: 10,
          paddingTop: 20,
          marginTop: -10,
          paddingBottom: 20,
          borderBottomWidth: 0.5,
          borderLeftWidth: 0.5,
          borderRightWidth: 0.5,
          borderColor: "#AEACAC",
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
        }}
      >
        <YStack gap={4}>
          <SizableText
            style={{
              fontFamily: "InterSemiBold",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            Vote for {position}
          </SizableText>
          <SizableText
            style={{
              fontFamily: "InterLight",
              fontSize: 13,
              // fontWeight: "600",
            }}
          >
            Closes in {time} hours
          </SizableText>
          <SizableText
            style={{
              fontFamily: "InterLight",
              fontSize: 13,
              // fontWeight: "600",
            }}
          >
            Abia State University
          </SizableText>
        </YStack>
      </View>
    </Card>
  );
}
