import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { Avatar, AvatarFallback, SizableText, XStack } from "tamagui";
import { Notification } from "iconsax-react-native";

export default function TabHeader() {
  return (
    <Appbar.Header>
      <XStack
        width={"100%"}
        paddingHorizontal={10}
        justifyContent="space-between"
        alignItems="center"
      >
        <SizableText
          // fontFamily={"InterRegular"}
          // fontSize={20}
          // fontWeight={"500"}
          style={{
            fontFamily: "InterRegular",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          {/* ABSU SUG Election */}
          <Avatar circular size="$5">
            <Avatar.Image
              accessibilityLabel="cam"
              src="https://mega.nz/file/L3J3kQAJ#nhxeD4msmbwazFZthrz5lgcVUMRoV4XhspVn-hBBa0l"
            />
            <Avatar.Fallback background="$blue10" />
          </Avatar>
        </SizableText>
        <Avatar circular size="$5">
          <Avatar.Image
            accessibilityLabel="cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback background="$blue10" />
        </Avatar>
        {/* <Notification color="gray" size={24} /> */}
      </XStack>
    </Appbar.Header>
  );
}
