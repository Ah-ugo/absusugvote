import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, Appbar } from "react-native-paper";
import {
  Paragraph,
  Progress,
  SizableText,
  SizeTokens,
  XStack,
  YStack,
} from "tamagui";
import { Notification } from "iconsax-react-native";
import CountdownTimer from "@/components/CountDownTimer";
import Carousel from "@/components/Carousel";
import FeaturedCandidatesCard from "@/components/FeaturedCandidatesCard";
import AnnouncementCard from "@/components/AnnouncementCard";
import TabHeader from "@/components/TabHeader";

export default function index() {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = React.useState(4);
  const sizeProp = `$${size}` as SizeTokens;

  const sampleData = [
    { id: 1, name: "Wiston Churchill", title: "SUG President" },
    { id: 2, name: "Bill Clinton", title: "SUG Vice-President" },
    { id: 3, name: "Barack Obama", title: "SUG Secretary General" },
    { id: 4, name: "George Bush", title: "SUG Asst. Sec Gen" },
  ];

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
      {/* Countdown Timer */}
      <View
        style={{
          alignItems: "center",
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <CountdownTimer targetDate="2025-03-31T23:59:59" />
      </View>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap="$4" marginHorizontal={15}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 1,
            }}
          >
            <SizableText
              style={{
                flex: 1,
                flexShrink: 0,
                fontFamily: "InterMedium",
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              Live election stats
            </SizableText>
            <Paragraph
              style={{ flexShrink: 0, fontFamily: "InterLight", fontSize: 14 }}
            >
              30%
            </Paragraph>
          </View>
          <Progress
            key={0}
            size={sizeProp}
            value={30}
            backgroundColor={"#E0E0E0"}
          >
            <Progress.Indicator animation="bouncy" />
          </Progress>
          <Paragraph
            style={{
              fontFamily: "InterXlight",
              fontSize: 13,
              //   fontWeight: "600",
            }}
            // fontFamily={"InterXlight"}
            // fontSize={13}
          >
            Voting progress
          </Paragraph>
        </YStack>
        <View>
          <View
            style={{ marginHorizontal: 10, marginBottom: 20, marginTop: 30 }}
          >
            <SizableText
              //   fontSize={20}
              //   fontWeight={"600"}
              //   fontFamily={"InterRegular"}
              style={{
                fontFamily: "InterRegular",
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Candidates of the hour
            </SizableText>
          </View>
          <Carousel
            data={sampleData}
            cardsPerView={2} // Number of visible cards
            autoSlide={true} // Enable auto-slide
            interval={2000} // Slide every 2 seconds
            renderItem={(item) => (
              <FeaturedCandidatesCard name={item.name} position={item.title} />
            )}
          />
        </View>

        <View>
          <View
            style={{ marginHorizontal: 10, marginBottom: 10, marginTop: 30 }}
          >
            <SizableText
              //   fontSize={20}
              //   fontWeight={"600"}
              //   fontFamily={"InterRegular"}
              style={{
                fontFamily: "InterRegular",
                fontSize: 20,
                fontWeight: "600",
              }}
            >
              Latest Announcements
            </SizableText>
          </View>
          <AnnouncementCard />
          <AnnouncementCard />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
