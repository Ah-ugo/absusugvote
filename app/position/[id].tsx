import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, Appbar } from "react-native-paper";
import { Input, SizableText, Stack, XStack, YStack } from "tamagui";
import { TouchableOpacity } from "react-native";
import { ArrowCircleLeft, SearchNormal1 } from "iconsax-react-native";
import { useNavigation } from "expo-router";
import CandidateCard from "@/components/CandidateCard";

export default function Position() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleBackPress = () => navigation.goBack();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      {/* Header */}
      <Appbar.Header>
        <XStack
          paddingHorizontal={10}
          justifyContent="space-between"
          width={"100%"}
        >
          <TouchableOpacity onPress={handleBackPress}>
            <ArrowCircleLeft color="black" variant="Outline" />
          </TouchableOpacity>
          <SizableText style={styles.headerText}>
            Vote for Vice-President
          </SizableText>
          <View></View>
        </XStack>
      </Appbar.Header>
      <View>
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap={10} style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <CandidateCard name={"George Bush"} position={"President"} />
          <CandidateCard name={"Donald Trump"} position={"President"} />
          <CandidateCard name={"Barack Obama"} position={"President"} />
        </YStack>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "InterRegular",
    fontSize: 20,
    fontWeight: "600",
  },
});
