import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Paragraph, Progress, SizableText, SizeTokens, YStack } from "tamagui";
import CountdownTimer from "@/components/CountDownTimer";
import Carousel from "@/components/Carousel";
import FeaturedCandidatesCard from "@/components/FeaturedCandidatesCard";
import AnnouncementCard from "@/components/AnnouncementCard";
import TabHeader from "@/components/TabHeader";
import {
  getCandidatesOfTheHour,
  getCurrentUser,
  getAnnouncements,
  getElectionIdFromStorage,
} from "@/appUtils/ApiUtils";

type Candidate = {
  id: string;
  image: string;
  name: string;
  position: string;
};

type Announcement = {
  id: string;
  title: string;
  message: string;
  created_at: string;
};

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [size, setSize] = useState(4);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [electionId, setElectionId] = useState<string | null>(null);
  const sizeProp = `$${size}` as SizeTokens;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [candidatesData, announcementsData] = await Promise.all([
        getCandidatesOfTheHour(),
        getAnnouncements(),
      ]);

      if (candidatesData) {
        setCandidates(
          Object.values(candidatesData).map((candidate: any) => ({
            id: candidate._id,
            image: candidate.image_url,
            name: candidate.name,
            position: candidate.position,
          }))
        );
      }

      if (announcementsData) {
        setAnnouncements(announcementsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchElectionId = async () => {
      const id = await getElectionIdFromStorage();
      setElectionId(id);
    };
    fetchElectionId();
  }, []);

  // Function to handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Loader */}
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {/* App Header */}
      <TabHeader />

      {/* Countdown Timer */}
      <View style={styles.countdownContainer}>
        <CountdownTimer electionId={electionId} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Live Election Stats */}
        <YStack gap="$4" marginHorizontal={15}>
          <View style={styles.statContainer}>
            <SizableText style={styles.statTitle}>
              Live election stats
            </SizableText>
            <Paragraph style={styles.statValue}>30%</Paragraph>
          </View>
          <Progress
            key={0}
            size={sizeProp}
            value={30}
            backgroundColor={"#E0E0E0"}
          >
            <Progress.Indicator animation="bouncy" />
          </Progress>
          <Paragraph style={styles.statLabel}>Voting progress</Paragraph>
        </YStack>

        {/* Candidates of the Hour */}
        <View>
          <View style={styles.sectionHeader}>
            <SizableText style={styles.sectionTitle}>
              Candidates of the hour
            </SizableText>
          </View>
          <Carousel
            data={candidates}
            cardsPerView={2}
            autoSlide={true}
            interval={2000}
            renderItem={(item) => (
              <FeaturedCandidatesCard
                id={item.id}
                img={item.image}
                name={item.name}
                position={item.position}
              />
            )}
          />
        </View>

        {/* Latest Announcements */}
        <View>
          <View style={styles.sectionHeader}>
            <SizableText style={styles.sectionTitle}>
              Latest Announcements
            </SizableText>
          </View>

          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                title={announcement.title}
                message={announcement.message}
              />
            ))
          ) : (
            <Paragraph style={styles.noAnnouncements}>
              No announcements available.
            </Paragraph>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  countdownContainer: {
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  statContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 1,
  },
  statTitle: {
    flex: 1,
    flexShrink: 0,
    fontFamily: "InterMedium",
    fontWeight: "600",
    fontSize: 14,
  },
  statValue: {
    flexShrink: 0,
    fontFamily: "InterLight",
    fontSize: 14,
  },
  statLabel: {
    fontFamily: "InterXlight",
    fontSize: 13,
  },
  sectionHeader: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 30,
  },
  sectionTitle: {
    fontFamily: "InterRegular",
    fontSize: 20,
    fontWeight: "600",
  },
  noAnnouncements: {
    textAlign: "center",
    marginTop: 10,
  },
});
