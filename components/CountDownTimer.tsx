import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import moment from "moment";

const { width } = Dimensions.get("window"); // Get screen width

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = moment(targetDate).diff(moment());
    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // Responsive width
    maxWidth: 400, // Prevents overflow on larger screens
  },
  boxContainer: {
    alignItems: "center", // Centers both box and label
    flex: 1, // Ensures equal width for all boxes
  },
  box: {
    backgroundColor: "#E0E0E0",
    paddingVertical: width * 0.05, // Responsive padding
    paddingHorizontal: width * 0.07, // Responsive padding
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80, // Minimum width for spacing
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
