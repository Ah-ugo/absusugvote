import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { Avatar, AvatarFallback, SizableText, XStack } from "tamagui";
import { Notification } from "iconsax-react-native";
import { getCurrentUser } from "@/appUtils/ApiUtils";
import { useRouter } from "expo-router";

export default function TabHeader() {
  const [user, setUser] = useState({});
  const routes = useRouter();

  useEffect(() => {
    const GetUserDetails = async () => {
      const userDetails = await getCurrentUser();
      setUser(userDetails);
    };
    GetUserDetails();
  }, []);
  return (
    <Appbar.Header>
      <XStack
        width={"100%"}
        paddingHorizontal={10}
        justifyContent="space-between"
        alignItems="center"
      >
        <SizableText
          style={{
            fontFamily: "InterRegular",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Welcome, {user?.first_name}
          {/* ABSU SUG Election */}
          {/* <Avatar circular size="$5">
          <Avatar.Image
            accessibilityLabel="cam"
            src="https://mega.nz/file/L3J3kQAJ#nhxeD4msmbwazFZthrz5lgcVUMRoV4XhspVn-hBBa0l"
          />
          <Avatar.Fallback background="$blue10" />
        </Avatar> */}
        </SizableText>
        <Avatar
          circular
          size="$5"
          onPress={() => routes.push("/(tabs)/oldindex")}
        >
          <Avatar.Image accessibilityLabel="cam" src={user?.profile_image} />
          <Avatar.Fallback background="$blue10" />
        </Avatar>
        {/* <Notification color="gray" size={24} /> */}
      </XStack>
    </Appbar.Header>
  );
}
