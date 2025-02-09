import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, Appbar } from "react-native-paper";
import { Input, Paragraph, SizableText, Stack, XStack, YStack } from "tamagui";
import { TouchableOpacity } from "react-native";
import { ArrowCircleLeft, SearchNormal1 } from "iconsax-react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import CandidateCard from "@/components/CandidateCard";
import {
  fetchCandidatesForPosition,
  voteForCandidate,
} from "@/appUtils/ApiUtils";

export default function Position() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [votedCandidates, setVotedCandidates] = useState(new Set());
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const data = await fetchCandidatesForPosition(id);
      setCandidates(data);
      const voted = new Set(data.filter((c) => c.voted).map((c) => c._id));
      setVotedCandidates(voted);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch candidates.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCandidates();
  }, [id]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCandidates().finally(() => setRefreshing(false));
  }, []);

  const handleBackPress = () => navigation.goBack();

  const handleVote = async (candidate_id, candidate_position) => {
    if (votedCandidates.has(candidate_id)) {
      Alert.alert("Vote Error", "You have already voted for this candidate.");
      return;
    }
    setLoading(true);
    const response = await voteForCandidate(candidate_id, candidate_position);
    if (response?.id) {
      Alert.alert("Success", "Your vote has been cast successfully.");
      setVotedCandidates((prev) => new Set(prev).add(candidate_id));
    } else {
      Alert.alert(
        "Error",
        response?.detail || "Something went wrong. Please try again."
      );
    }
    setLoading(false);
  };

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <SizableText style={styles.headerText}>Vote for {id}</SizableText>
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
            flex={1}
            placeholder="Search by name..."
            paddingLeft={50}
            height={40}
            borderColor={"#AEACAC"}
            value={searchQuery}
            onChangeText={setSearchQuery}
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <YStack gap={10} style={{ paddingHorizontal: 20, marginTop: 20 }}>
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((resp) => (
              <CandidateCard
                key={resp._id}
                name={resp.name}
                position={resp.position}
                img={resp.image_url}
                func={() => handleVote(resp._id, resp.position)}
                voted={votedCandidates.has(resp._id)}
              />
            ))
          ) : (
            <Paragraph style={{ textAlign: "center", marginTop: 10 }}>
              No candidates available.
            </Paragraph>
          )}
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
  headerText: {
    fontFamily: "InterRegular",
    fontSize: 20,
    fontWeight: "600",
  },
});
