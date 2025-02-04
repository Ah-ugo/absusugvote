import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Button, SizableText, XStack, YStack } from "tamagui";
import { ActivityIndicator, Appbar } from "react-native-paper";
import { ArrowCircleLeft } from "iconsax-react-native";
import { useNavigation } from "expo-router";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleBackPress = () => navigation.goBack();

  const achievements = [
    { id: "1", title: "Organized the Annual Student Tech Conference" },
    { id: "2", title: "Led a campaign for mental health awareness" },
    { id: "3", title: "Secured funding for new library books" },
    { id: "4", title: "Established a mentorship program for freshmen" },
  ];

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
          <SizableText style={styles.headerText}>Profile</SizableText>
          <View></View>
        </XStack>
      </Appbar.Header>

      <View style={{ paddingHorizontal: 10 }}>
        <Avatar circular size="$10">
          <Avatar.Image
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>

        <YStack marginTop={10} gap={4}>
          <SizableText style={styles.nameText}>Mia Jang</SizableText>
          <SizableText style={styles.descriptionText}>
            Candidate for the role of VP of the student union. I am passionate
            about making our school a better place and have been involved in
            many impactful projects.
          </SizableText>
        </YStack>
        <Button style={styles.voteButton}>Vote for me</Button>
      </View>

      <ScrollView style={{ paddingTop: 20 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <SizableText style={styles.sectionTitle}>Achievements</SizableText>
        </View>
        {/* <FlatList
          data={achievements}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 10, paddingBottom: 20 }}>
              <Text style={styles.achievementText}>{item.title}</Text>
            </View>
          )}
        /> */}
        <YStack>
          {achievements.map((item) => {
            return (
              <View style={{ marginHorizontal: 10, paddingBottom: 20 }}>
                <Text style={styles.achievementText}>{item.title}</Text>
              </View>
            );
          })}
        </YStack>

        <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
          <SizableText style={styles.sectionTitle}>Manifesto</SizableText>
          <SizableText style={styles.manifestoText}>
            "My vision is to create an inclusive and empowering school
            environment where every student feels heard and valued. I will work
            to improve student engagement, advocate for better resources, and
            ensure transparency in the student union."
          </SizableText>
        </View>
      </ScrollView>

      {/* Full-width Vote Button */}
      <View style={{ marginHorizontal: 10, paddingTop: 20 }}>
        <TouchableOpacity style={styles.fullWidthButton}>
          <Text style={styles.floatingButtonText}>Vote for Mia</Text>
        </TouchableOpacity>
      </View>
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
  nameText: {
    fontFamily: "InterSemiBold",
    fontSize: 15,
  },
  descriptionText: {
    fontFamily: "InterLight",
    fontSize: 14,
  },
  sectionTitle: {
    fontFamily: "InterRegular",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  achievementText: {
    fontFamily: "InterLight",
    fontSize: 14,
  },
  manifestoText: {
    fontFamily: "InterLight",
    fontSize: 14,
    marginTop: 5,
  },
  voteButton: {
    fontFamily: "InterBlack",
    fontSize: 14,
    backgroundColor: "#E0E0E0",
    marginTop: 20,
    // marginHorizontal: 10,
  },
  fullWidthButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,

    // marginHorizontal: 10,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "InterRegular",
  },
});
