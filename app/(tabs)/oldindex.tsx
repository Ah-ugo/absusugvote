import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, Appbar } from "react-native-paper";
import {
  Stack,
  Card,
  Avatar,
  XStack,
  YStack,
  SizableText,
  Button,
} from "tamagui";
import { useNavigation, useRouter } from "expo-router";
import { ArrowCircleLeft } from "iconsax-react-native";
import { getCurrentUser } from "@/appUtils/ApiUtils";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const navigation = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const navigationer = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = () => {
    setMenuVisible(false);
    navigation.replace("/(auth)/login"); // Navigate to the login screen
  };

  const handleBackPress = () => navigationer.goBack();

  const GetUserDetails = async () => {
    setLoading(true);
    const userDetails = await getCurrentUser();
    setUser(userDetails);
    setLoading(false);
  };

  useEffect(() => {
    GetUserDetails();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await GetUserDetails();
    setRefreshing(false);
  }, []);

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
          <SizableText style={styles.headerText}>My Profile</SizableText>
          <View></View>
        </XStack>
      </Appbar.Header>

      {/* Scrollable Content with Pull-to-Refresh */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Profile Card */}
        <Card
          padding="$4"
          marginTop="$4"
          borderRadius="$4"
          alignItems="center"
          backgroundColor={"#fff"}
        >
          <Avatar circular size="$12">
            <Avatar.Image src={user?.profile_image} />
          </Avatar>
          <YStack marginTop="$3" alignItems="center">
            <SizableText fontSize="$6" fontWeight="bold">
              {user.first_name} {user.last_name}
            </SizableText>
            <SizableText color="$gray10">
              Matric No: {user.matric_no}
            </SizableText>
            <SizableText color="$blue10">{user.department}</SizableText>
          </YStack>
        </Card>

        {/* Logout Button */}
        <XStack justifyContent="center" marginTop="$4">
          <Button onPress={handleLogout} size="$4" variant="outlined">
            Logout
          </Button>
        </XStack>
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
