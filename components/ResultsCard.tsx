import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Input,
  SizableText,
  Stack,
  XStack,
  YStack,
} from "tamagui";
import { ArrowCircleLeft, SearchNormal1 } from "iconsax-react-native";
import { useNavigation } from "expo-router";
import CandidateCard from "@/components/CandidateCard";
// import Position from "@/app/position/[id]";

export default function ResultsCard({ Position, name, result, imageUrl }: any) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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
        <XStack gap={20} alignItems="center">
          <Avatar circular size="$5">
            <Avatar.Image accessibilityLabel="Cam" src={imageUrl} />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>

          <YStack gap={3}>
            <SizableText style={{ fontSize: 14, fontFamily: "InterRegular" }}>
              {name}
            </SizableText>
            <SizableText style={{ fontSize: 12, fontFamily: "InterLight" }}>
              {Position} Aspirant
            </SizableText>
          </YStack>
        </XStack>
        <SizableText>{result} vote(s)</SizableText>
      </XStack>
    </Card>
  );
}
