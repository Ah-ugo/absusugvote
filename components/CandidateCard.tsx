import { View, Text } from "react-native";
import React from "react";
import { Avatar, Button, Card, SizableText, XStack, YStack } from "tamagui";

export default function CandidateCard({
  name,
  position,
  img,
  func,
  voted,
}: any) {
  return (
    <Card
      animation="bouncy"
      elevate
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      paddingVertical={10}
      backgroundColor={"#fff"}
      paddingHorizontal={10}
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Avatar circular size="$5">
          <Avatar.Image accessibilityLabel="Candidate Image" src={img} />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>

        <YStack gap={3}>
          <SizableText style={{ fontSize: 14, fontFamily: "InterRegular" }}>
            {name}
          </SizableText>
          <SizableText style={{ fontSize: 12, fontFamily: "InterLight" }}>
            {position} Aspirant
          </SizableText>
        </YStack>

        <Button
          onPress={func}
          disabled={voted} // Disable button if already voted
          style={{
            fontFamily: "InterRegular",
            fontSize: 12,
            // backgroundColor: voted ? "#ccc" : "#ccc", // Gray out if voted
          }}
        >
          {voted ? "Voted ✅" : "Vote Now"}
        </Button>
      </XStack>
    </Card>
  );
}
