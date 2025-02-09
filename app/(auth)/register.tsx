import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import {
  Avatar,
  Button,
  Input,
  Label,
  SizableText,
  XStack,
  YStack,
} from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [department, setDepartment] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Handle Image Selection
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  /// Handle Signup Request
  const handleSignUp = async () => {
    if (!username || !password || !profilePicture) {
      setMessage("Please fill in all fields and select a profile picture.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("first_name", firstname);
      formData.append("last_name", lastname);
      formData.append("matric_no", username);
      formData.append("department", department); // Ensure field names match backend
      formData.append("password", password);
      formData.append("profile_image", {
        uri: profilePicture,
        type: "image/jpeg", // Adjust this type if the image is not JPEG
        name: "profile_picture.jpeg", // Always include a name
      });

      // Log FormData keys for debugging
      for (let key of formData.keys()) {
        console.log(`${key}:`, formData.get(key));
      }

      const apiResponse = await axios.post(
        "https://absu-votes-api.onrender.com/register/student/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      setMessage(apiResponse.data.message || "Registration successful!");
      console.log(apiResponse.data);
      router.replace("/login");
    } catch (error: any) {
      if (error.response) {
        console.error("Server Response:", error.response.data);
        setMessage(error.response.data.message || "Registration failed.");
      } else if (error.request) {
        console.error("No Response from Server:", error.request);
        setMessage("Network error. Please check your connection.");
      } else {
        console.error("Unknown Error:", error.message);
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
      <View
        style={{
          marginTop: 30,
          marginBottom: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SizableText size={"$9"} style={{ fontFamily: "InterSemiBold" }}>
          Create Account
        </SizableText>
        <SizableText
          size={"$2"}
          style={{ fontFamily: "InterLight" }}
          color={"#AEACAC"}
        >
          Fill your details below to register
        </SizableText>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap={10}>
          <YStack>
            <Label htmlFor="firstname" style={{ fontFamily: "InterLight" }}>
              First Name
            </Label>
            <Input
              size={"$4"}
              id="firstname"
              placeholder="Enter your first name"
              value={firstname}
              onChangeText={(input) => setFirstname(input.trimStart())}
              style={{ fontFamily: "InterRegular" }}
              onBlur={() => setFirstname(firstname.trim())}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </YStack>

          <YStack>
            <Label htmlFor="lastname" style={{ fontFamily: "InterLight" }}>
              Last Name
            </Label>
            <Input
              size={"$4"}
              id="lastname"
              placeholder="Enter your last name"
              value={lastname}
              onChangeText={(input) => setLastname(input.trimStart())}
              style={{ fontFamily: "InterRegular" }}
              onBlur={() => setLastname(lastname.trim())}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </YStack>

          {/* Username Input */}
          <YStack>
            <Label htmlFor="username" style={{ fontFamily: "InterLight" }}>
              Matric Number
            </Label>
            <Input
              size={"$4"}
              id="username"
              placeholder="Enter your matric number"
              value={username}
              onChangeText={(input) => setUsername(input.trimStart())}
              style={{ fontFamily: "InterRegular" }}
              onBlur={() => setUsername(username.trim())}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </YStack>

          <YStack>
            <Label htmlFor="department" style={{ fontFamily: "InterLight" }}>
              Department
            </Label>
            <Input
              size={"$4"}
              id="department"
              placeholder="Enter your Department"
              value={department}
              onChangeText={(input) => setDepartment(input.trimStart())}
              style={{ fontFamily: "InterRegular" }}
              onBlur={() => setDepartment(department.trim())}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </YStack>

          {/* Password Input */}
          <YStack>
            <Label htmlFor="password" style={{ fontFamily: "InterLight" }}>
              Password
            </Label>
            <Input
              size={"$4"}
              id="password"
              placeholder="Enter password"
              value={password}
              secureTextEntry
              onChangeText={(input) => setPassword(input.trimStart())}
              style={{ fontFamily: "InterRegular" }}
              onBlur={() => setPassword(password.trim())}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </YStack>

          {/* Profile Picture Upload */}
          <YStack>
            <Label style={{ fontFamily: "InterLight" }}>Profile Picture</Label>
            {profilePicture && (
              <Avatar size={"$6"} width={"100%"} marginBottom={20}>
                <Avatar.Image src={profilePicture} />
                {/* <Avatar.Fallback bc="red" /> */}
              </Avatar>
            )}
            <Button
              onPress={pickImage}
              backgroundColor={"#0F52BA"}
              color="white"
            >
              {profilePicture ? "Change Picture" : "Upload Picture"}
            </Button>
          </YStack>

          {/* Error/Success Message */}
          {message && (
            <SizableText
              size={"$3"}
              color={message.includes("successful") ? "green" : "red"}
            >
              {message}
            </SizableText>
          )}

          {/* Signup Button */}
          <Button
            color={"white"}
            fontWeight={"800"}
            backgroundColor={"#0F52BA"}
            marginTop={20}
            style={{ color: "white" }}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
