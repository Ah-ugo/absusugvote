import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Appbar, Searchbar } from "react-native-paper";
import {
  SizableText,
  Stack,
  Button,
  Accordion,
  XStack,
  YStack,
  Input,
} from "tamagui";
import { ArrowCircleLeft, SearchNormal1 } from "iconsax-react-native";
import { useNavigation } from "expo-router";
import ResultsCard from "@/components/ResultsCard";
import { getElectionIdFromStorage } from "@/appUtils/ApiUtils";

const API_BASE_URL = "https://absu-votes-api.onrender.com";
// const ELECTION_ID = "67a676e1da89036f6c0d72c0";

export default function Explore() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    const ELECTION_ID = await getElectionIdFromStorage();
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/election-results/${ELECTION_ID}`
      );
      const data = await response.json();
      const enrichedResults = await enrichResultsWithCandidateDetails(data);
      setResults(enrichedResults);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
    setLoading(false);
  };

  const enrichResultsWithCandidateDetails = async (results: any) => {
    const updatedResults = {};
    for (const position in results) {
      updatedResults[position] = await Promise.all(
        results[position].map(async (candidate) => {
          const candidateResponse = await fetch(
            `${API_BASE_URL}/candidate/${candidate.candidate_id}`
          );
          const candidateData = await candidateResponse.json();
          return { ...candidate, image_url: candidateData.image_url };
        })
      );
    }
    return updatedResults;
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchResults();
    setRefreshing(false);
  };

  const handleBackPress = () => navigation.goBack();

  const filteredResults = Object.keys(results).reduce((acc, position) => {
    const filteredCandidates = results[position].filter(
      (candidate) =>
        candidate.candidate_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        position.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredCandidates.length > 0) acc[position] = filteredCandidates;
    return acc;
  }, {});

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <Appbar.Header>
        <XStack
          paddingHorizontal={10}
          justifyContent="space-between"
          width="100%"
        >
          <TouchableOpacity onPress={handleBackPress}>
            <ArrowCircleLeft color="black" variant="Outline" />
          </TouchableOpacity>
          <SizableText style={styles.headerText}>Results</SizableText>
          <View></View>
        </XStack>
      </Appbar.Header>

      <View>
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
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {Object.keys(filteredResults).map((position) => (
          <Accordion
            overflow="hidden"
            type="multiple"
            borderWidth={0}
            key={position}
          >
            <Accordion.Item value={position} borderWidth={0}>
              <Accordion.Trigger>
                <XStack
                  padding="$3"
                  justifyContent="space-between"
                  alignItems="center"
                  background="$gray4"
                  borderRadius="$4"
                >
                  <SizableText fontSize="$5" fontWeight="bold">
                    {position}
                  </SizableText>
                  <Button size="$2">▼</Button>
                </XStack>
              </Accordion.Trigger>
              <Accordion.Content>
                <YStack gap={10}>
                  {filteredResults[position].map((candidate) => (
                    <ResultsCard
                      key={candidate.candidate_id}
                      Position={position}
                      name={candidate.candidate_name}
                      result={candidate.vote_count}
                      imageUrl={candidate.image_url}
                    />
                  ))}
                </YStack>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  loadingOverlay: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
