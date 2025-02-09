import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const API_BASE_URL = "https://absu-votes-api.onrender.com";

// Function to get the current user and store their details
export const getCurrentUser = async () => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (!token) {
      console.error("No token found.");
      return null;
    }

    const response = await axios.get(`${API_BASE_URL}/current-user/`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const userData = response.data;

      // Store user details in AsyncStorage
      await AsyncStorage.setItem("user_data", JSON.stringify(userData));
      await AsyncStorage.setItem("voter_id", userData.matric_no); // Store matric_no as voter_id

      return userData;
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

// Function to retrieve voter_id (matric_no)
export const getVoterId = async () => {
  try {
    return await AsyncStorage.getItem("voter_id");
  } catch (error) {
    console.error("Error retrieving voter ID:", error);
    return null;
  }
};

// Function to get the latest election ID from AsyncStorage
const getElectionIdFromStorage = async () => {
  try {
    return await AsyncStorage.getItem("election_id");
  } catch (error) {
    console.error("Error retrieving election ID:", error);
    return null;
  }
};

// Function to fetch the latest election
const getLatestElection = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/latest-election`, {
      headers: { Accept: "application/json" },
    });

    if (response.status === 200) {
      const election = response.data;
      await AsyncStorage.setItem("election_id", election.id); // Store election ID
      return election;
    }
  } catch (error) {
    console.error("Error fetching latest election:", error);
    return null;
  }
};

// Function to retrieve election positions
const getElectionPositions = async () => {
  const electionId = await getElectionIdFromStorage();
  if (!electionId) return null;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/positions/${electionId}`,
      {
        headers: { Accept: "application/json" },
      }
    );
    return response.data.positions;
  } catch (error) {
    console.error("Error fetching positions:", error);
    return null;
  }
};

const fetchCandidatesForPosition = async (position: string) => {
  const electionId = await getElectionIdFromStorage();
  if (!electionId) return null;
  try {
    const response = await axios.get(
      `${API_BASE_URL}/position-candidates/${electionId}/${encodeURIComponent(
        position
      )}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return response.data; // Returns the list of candidates
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return [];
  }
};

// Function to fetch the result of a specific position in an election
const getPositionResult = async (position: string) => {
  const electionId = await getElectionIdFromStorage();
  if (!electionId) return null;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/get_position_result/${electionId}/${encodeURIComponent(
        position
      )}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching position result:", error);
    return null;
  }
};

// Function to fetch candidates in the election
const getCandidates = async () => {
  const electionId = await getElectionIdFromStorage();
  if (!electionId) return null;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/candidates/${electionId}`,
      {
        headers: { Accept: "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return null;
  }
};

// Function to fetch candidate details
const getCandidateDetails = async (candidateId: any) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/candidate/${candidateId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching candidate details:", error);
    return null;
  }
};

// Function to vote for a candidate
// import { Alert } from "react-native";

const voteForCandidate = async (candidateId: string, position: string) => {
  const electionId = await getElectionIdFromStorage();
  const voterId = await getVoterId();
  const token = await AsyncStorage.getItem("access_token");

  if (!electionId || !voterId || !token) {
    console.error("Missing required data for voting.");
    return { success: false, detail: "Missing required data." };
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/votes/`,
      {
        election_id: electionId,
        voter_id: voterId,
        candidate_id: candidateId,
        position,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error voting:", error);

    // Handle specific election status messages
    if (error.response?.data?.detail === "Election has ended.") {
      return { success: false, detail: "Election has ended." };
    }

    if (error.response?.data?.detail === "Election has not started yet.") {
      return { success: false, detail: "Election has not started yet." };
    }

    return (
      error.response?.data || {
        success: false,
        detail: "Something went wrong.",
      }
    );
  }
};

// Function to fetch election results
const getElectionResults = async () => {
  const electionId = await getElectionIdFromStorage();
  if (!electionId) return null;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/election-results/${electionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching election results:", error);
    return null;
  }
};

// Function to fetch candidates of the hour
const getCandidatesOfTheHour = async () => {
  const electionId = await getElectionIdFromStorage();
  if (!electionId) return null;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/candidates_of_the_hour/${electionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching candidates of the hour:", error);
    return null;
  }
};

// Function to fetch top candidates
const getTopCandidates = async () => {
  const electionId = await getElectionIdFromStorage();
  if (!electionId) return null;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/votes/top-candidates/${electionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching top candidates:", error);
    return null;
  }
};

// Function to fetch announcements for the election
const getAnnouncements = async () => {
  const electionId = await getElectionIdFromStorage();
  if (!electionId) return null;

  try {
    const response = await axios.get(
      `${API_BASE_URL}/announcements/${electionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return null;
  }
};

export {
  getLatestElection,
  getElectionPositions,
  getPositionResult,
  getCandidates,
  getCandidateDetails,
  voteForCandidate,
  getElectionResults,
  getCandidatesOfTheHour,
  getTopCandidates,
  getAnnouncements,
  getElectionIdFromStorage,
  fetchCandidatesForPosition,
  API_BASE_URL,
};
