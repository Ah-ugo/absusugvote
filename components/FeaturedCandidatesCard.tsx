import { View, Text } from "react-native";
import React from "react";
import { Image, SizableText } from "tamagui";
import { Card } from "react-native-paper";
import { useRouter } from "expo-router";

export default function FeaturedCandidatesCard({
  name,
  position,
  id,
  img,
}: any) {
  const router = useRouter();
  const NavigFunc = () => {
    router.push(`/profile/${id}`);
  };
  return (
    <Card
      onPress={NavigFunc}
      elevation={0}
      style={{ width: "100%", backgroundColor: "#fff" }}
    >
      {/* <Image
        resizeMode="contain"
        alignSelf="center"
        width="50%"
        height="100%"
        source={{
          uri: "https://images.pexels.com/photos/3866555/pexels-photo-3866555.png",
        }}
      /> */}
      <Card.Cover
        source={{
          uri: img,
        }}
      />
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" /> */}
      <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
        <SizableText
          style={{
            fontFamily: "InterSemiBold",
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          {name}
        </SizableText>
        <SizableText
          style={{
            fontFamily: "InterLight",
            fontSize: 13,
            // fontWeight: "600",
          }}
        >
          {position}
        </SizableText>
      </View>
    </Card>
  );
}
