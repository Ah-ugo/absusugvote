import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import TabHeader from "@/components/TabHeader";
import { ActivityIndicator } from "react-native-paper";
import { Input, Stack, XStack, YStack } from "tamagui";
import { SearchNormal1 } from "iconsax-react-native";
import ElectionCard from "@/components/ElectionCard";

export default function votes() {
  const [loading, setLoading] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Ensures parent view takes full screen */}
      {loading && (
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      {/* App Header */}
      <TabHeader />

      {/* Search Input */}
      <XStack
        height={40}
        marginTop={2}
        marginBottom={10}
        marginHorizontal="$4"
        alignItems="center"
      >
        <Input
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          flex={1}
          placeholder="Search..."
          paddingLeft={50}
          height={40}
          borderColor={"#AEACAC"}
          // value={searchQuery}
          // onChangeText={(query) => setSearchQuery(query)}
        />
        <Stack
          position="absolute"
          left={0}
          bottom={0}
          height={40}
          width={40}
          alignItems="center"
          justifyContent="center"
        >
          <SearchNormal1 size="24" color="#AEACAC" />
        </Stack>
      </XStack>

      <ScrollView
        style={{ paddingHorizontal: 15, paddingTop: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap={10}>
          <ElectionCard position={"President"} time={3} />
          <ElectionCard position={"Vice-President"} time={3} />
          <ElectionCard position={"Secretary General"} time={3} />
        </YStack>
      </ScrollView>
    </View>
  );
}
