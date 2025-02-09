import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Avatar, Button, SizableText, XStack, YStack } from "tamagui";
import { ActivityIndicator, Appbar } from "react-native-paper";
import { ArrowCircleLeft } from "iconsax-react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { getCandidateDetails, voteForCandidate } from "@/appUtils/ApiUtils";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [candidate, setCandidate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { id } = useLocalSearchParams(); // Get candidate ID from URL

  const fetchCandidateDetails = async () => {
    setLoading(true);
    try {
      const data = await getCandidateDetails(id); // Fetch details by ID
      setCandidate(data); // Set the fetched data to state
    } catch (error) {
      console.error("Error fetching candidate details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCandidateDetails(); // Fetch the candidate details when the component mounts
    }
  }, [id]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCandidateDetails().finally(() => setRefreshing(false));
  }, []);

  const handleBackPress = () => navigation.goBack();

  const handleVote = async () => {
    if (!candidate) return; // Ensure candidate details are available

    setLoading(true);

    const response = await voteForCandidate(candidate._id, candidate.position);

    console.log("Handle Vote Response:", response); // Debugging: Log response

    if (response?.id) {
      // If an ID is returned, assume success
      Alert.alert("Success", "Your vote has been cast successfully.");
    } else if (
      response?.detail === "Voter has already voted for this position."
    ) {
      Alert.alert("Vote Error", "You have already voted for this position.");
    } else if (response?.detail === "Election has ended.") {
      Alert.alert(
        "Election Ended",
        "You can no longer vote as the election has ended."
      );
    } else if (response?.detail === "Election has not started.") {
      Alert.alert(
        "Election Not Started",
        "Voting has not started yet. Please wait."
      );
    } else {
      Alert.alert(
        "Error",
        response?.detail || "Something went wrong. Please try again."
      );
    }

    setLoading(false);
  };

  if (loading || !candidate) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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

      <View style={{ paddingHorizontal: 10, paddingBottom: 20 }}>
        <Avatar circular size="$10">
          <Avatar.Image
            accessibilityLabel="Candidate Image"
            src={candidate.image_url}
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>

        <YStack marginTop={10} gap={4}>
          <SizableText style={styles.nameText}>{candidate.name}</SizableText>
          <SizableText style={styles.descriptionText}>
            {candidate.short_description}
          </SizableText>
        </YStack>
        <Button style={styles.voteButton} onPress={handleVote}>
          Vote for me
        </Button>
      </View>

      <ScrollView
        style={{ paddingTop: 10, marginBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingHorizontal: 10 }}>
          <SizableText style={styles.sectionTitle}>Achievements</SizableText>
        </View>
        <YStack>
          {candidate?.accomplishments.map((item, index) => (
            <View
              key={index}
              style={{ marginHorizontal: 10, paddingBottom: 10 }}
            >
              <Text style={styles.achievementText}>{`• ${item}`}</Text>
            </View>
          ))}
        </YStack>

        <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
          <SizableText style={styles.sectionTitle}>Manifesto</SizableText>
          <SizableText style={[styles.manifestoText, { paddingBottom: 20 }]}>
            {candidate.manifesto}
          </SizableText>
        </View>
      </ScrollView>

      {/* Full-width Vote Button */}
      <View style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 20 }}>
        <TouchableOpacity style={styles.fullWidthButton} onPress={handleVote}>
          <Text style={styles.floatingButtonText}>
            Vote for {candidate.name}
          </Text>
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
  },
  fullWidthButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
