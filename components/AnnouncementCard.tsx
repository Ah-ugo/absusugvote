import { View, Text } from "react-native";
import React from "react";
import { Card, SizableText, XStack, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

export default function AnnouncementCard() {
  return (
    <Card backgroundColor={"transparent"}>
      <XStack
        alignItems="center"
        gap={20}
        marginHorizontal={10}
        marginVertical={10}
      >
        <View
          style={{ backgroundColor: "#E0E0E0", padding: 10, borderRadius: 10 }}
        >
          <Ionicons name="megaphone-outline" size={24} color="black" />
        </View>
        <YStack>
          <SizableText
            // fontSize={16}
            // fontWeight={"600"}
            // fontFamily={"InterSemiBold"}
            style={{
              fontFamily: "InterSemiBold",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Debate Night
          </SizableText>
          <SizableText
            // fontSize={14}
            // fontWeight={"400"}
            // fontFamily={"InterLight"}
            style={{
              fontFamily: "InterLight",
              fontWeight: "400",
              fontSize: 14,
            }}
          >
            7am-8pm
          </SizableText>
        </YStack>
      </XStack>
    </Card>
  );
}
