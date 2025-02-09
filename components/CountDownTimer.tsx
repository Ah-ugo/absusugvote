import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import moment from "moment";
import { XStack } from "tamagui";

const { width } = Dimensions.get("window");

const CountdownTimer = ({ electionId }: { electionId: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [phase, setPhase] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchElectionTimer = async () => {
    try {
      const response = await fetch(
        `https://absu-votes-api.onrender.com/election-timer/${electionId}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setPhase(data.phase);

      // Convert remaining time from seconds
      setTimeLeft({
        days: Math.floor(data.timeRemaining / (60 * 60 * 24)),
        hours: Math.floor((data.timeRemaining / (60 * 60)) % 24),
        minutes: Math.floor((data.timeRemaining / 60) % 60),
        seconds: Math.floor(data.timeRemaining % 60),
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching election timer:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElectionTimer();
    const timer = setInterval(fetchElectionTimer, 10000); // Refresh every 10 seconds

    return () => clearInterval(timer); // Cleanup interval
  }, [electionId]);

  return (
    <View style={[styles.overContainer]}>
      {loading ? (
        <ActivityIndicator size="large" color="#333" />
      ) : (
        <>
          {/* <XStack
            style={{ width: "100%", marginHorizontal: 10 }}
            justifyContent="space-between"
            alignItems="center"
          > */}
          {/* <Text style={styles.phaseText}>Phase: </Text> */}
          <Text style={[styles.phaseText, { marginHorizontal: 5 }]}>
            {phase}
          </Text>
          {/* </XStack> */}

          <View style={styles.container}>
            {Object.entries(timeLeft).map(([label, value]) => (
              <View key={label} style={styles.boxContainer}>
                <View style={styles.box}>
                  <Text style={styles.value}>{value}</Text>
                </View>
                <Text style={styles.label}>{label.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overContainer: {
    flexDirection: "column",
    // justifyContent: "space-between",
    // alignItems: "center",
    width: "100%", // Responsive width
    maxWidth: 400,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Responsive width
    maxWidth: 400,
  },
  phaseText: {
    fontSize: 16,
    // fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "InterSemiBold",
  },
  timerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 400,
  },
  boxContainer: {
    alignItems: "center",
    flex: 1,
  },
  box: {
    backgroundColor: "#E0E0E0",
    paddingVertical: width * 0.05, // Responsive padding
    paddingHorizontal: width * 0.07, // Responsive padding
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  value: {
    fontSize: width * 0.05, // Scales with screen width
    // fontWeight: "bold",
    color: "#333",
    fontFamily: "InterSemiBold",
  },
  label: {
    fontSize: width * 0.025, // Adjust label size based on screen
    color: "#666",
    marginTop: 5,
    fontFamily: "InterLight",
  },
});

export default CountdownTimer;
