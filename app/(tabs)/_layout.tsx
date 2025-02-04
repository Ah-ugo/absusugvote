import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Category2, Cup, Home2, User } from "iconsax-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0F52BA",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Home2 color={color} size={28} variant="Bold" />
          ),
        }}
      />

      <Tabs.Screen
        name="votes"
        options={{
          title: "Vote",
          tabBarIcon: ({ color }) => (
            <Category2 color={color} size={28} variant="Bold" />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Results",
          tabBarIcon: ({ color }) => (
            <Cup color={color} size={28} variant="Bold" />
          ),
        }}
      />

      <Tabs.Screen
        name="oldindex"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <User color={color} size={28} variant="Bold" />
          ),
        }}
      />
    </Tabs>
  );
}
