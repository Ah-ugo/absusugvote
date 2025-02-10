import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
import { Eye, EyeSlash } from "iconsax-react-native";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContent}
      >
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
            <XStack alignItems="center">
              <Input
                size={"$4"}
                id="password"
                placeholder="Enter password"
                value={password}
                secureTextEntry={!isPasswordVisible}
                onChangeText={(input) => setPassword(input.trimStart())}
                style={{ fontFamily: "InterRegular", flex: 1 }}
                onBlur={() => setPassword(password.trim())}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Button // Button outside the Input
                onPress={togglePasswordVisibility}
                size="$3"
                backgroundColor="transparent"
                style={{
                  position: "absolute",
                  // position: 'absolute',
                  right: 8,
                  top: 3, // Align to top of parent
                  bottom: 0, // Align to bottom of parent
                  justifyContent: "center", // Vertically center content
                  alignItems: "center", // Horizontally center content (if needed)
                }} // Position it
              >
                {isPasswordVisible ? (
                  <EyeSlash size={20} color="gray" />
                ) : (
                  <Eye size={20} color="gray" />
                )}
              </Button>
            </XStack>
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
        </YStack>
      </ScrollView>
      {/* Signup Button */}
      <View style={styles.fixedButtonContainer}>
        <Button
          color={"white"}
          fontWeight={"800"}
          backgroundColor={"#0F52BA"}
          style={{ color: "white" }}
          onPress={handleSignUp}
          disabled={loading}
          width="100%"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Container takes full screen
  },
  scrollViewContent: {
    flexGrow: 1, // ScrollView content can grow to fill space
    // paddingHorizontal: 16, // Add horizontal padding back here
    // paddingBottom: 80, // Add padding to avoid button overlap
  },
  fixedButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    // top: 100,
    // backgroundColor: "white",
    padding: 16,
    // borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
  },
});
