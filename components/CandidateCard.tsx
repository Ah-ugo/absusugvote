import { View, Text } from "react-native";
import React from "react";
import { Avatar, Button, Card, SizableText, XStack, YStack } from "tamagui";

export default function CandidateCard({ name, position }: any) {
  return (
    <Card
      animation="bouncy"
      // size="$4"
      // width={250}
      // height={300}
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
          <Avatar.Image
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>

        <YStack gap={3}>
          <SizableText style={{ fontSize: 14, fontFamily: "InterRegular" }}>
            {name}
          </SizableText>
          <SizableText style={{ fontSize: 12, fontFamily: "InterLight" }}>
            SUG {position} Aspirant
          </SizableText>
        </YStack>
        <Button style={{ fontFamily: "InterRegular", fontSize: 12 }}>
          Vote Now
        </Button>
      </XStack>
    </Card>
  );
}
