import { View, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import TabHeader from "@/components/TabHeader";
import { ActivityIndicator } from "react-native-paper";
import { Input, Paragraph, Stack, XStack, YStack } from "tamagui";
import { SearchNormal1 } from "iconsax-react-native";
import ElectionCard from "@/components/ElectionCard";
import { getElectionPositions } from "@/appUtils/ApiUtils";

export default function Votes() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [positions, setPositions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPositions, setFilteredPositions] = useState([]);

  const fetchPositions = async () => {
    setLoading(true);
    try {
      const res = await getElectionPositions();
      setPositions(res);
      setFilteredPositions(res);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPositions();
    setRefreshing(false);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredPositions(positions);
    } else {
      const filtered = positions.filter((position) =>
        position.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPositions(filtered);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
      <TabHeader />

      {/* Search Input */}
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
          placeholder="Search Position..."
          paddingLeft={50}
          height={40}
          borderColor={"#AEACAC"}
          value={searchQuery}
          onChangeText={handleSearch}
          // style={{ width: "100%" }}
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

      {/* Positions List with Pull to Refresh */}
      <ScrollView
        style={{ paddingHorizontal: 15, paddingTop: 15 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <YStack gap={10}>
          {filteredPositions.length > 0 ? (
            filteredPositions.map((resp, index) => (
              <ElectionCard key={index} position={resp} time={3} />
            ))
          ) : (
            <Paragraph style={{ textAlign: "center", marginTop: 10 }}>
              No positions available.
            </Paragraph>
          )}
        </YStack>
      </ScrollView>
    </View>
  );
}
