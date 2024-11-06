import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

// Define locations with their name, URL, and coordinates
const locations = [
  {
    id: 1,
    name: "Google",
    url: "https://www.google.be/?hl=nl",
    coords: { latitude: 50.8527, longitude: 4.3499 },
  },
  {
    id: 2,
    name: "Microsoft",
    url: "https://www.microsoft.com/fr-be/",
    coords: { latitude: 50.8467, longitude: 4.355 },
  },
  {
    id: 3,
    name: "Firefox",
    url: "https://www.mozilla.org/en-US/firefox/new/",
    coords: { latitude: 50.84, longitude: 4.349 },
  },
  {
    id: 4,
    name: "Opera",
    url: "https://www.opera.com",
    coords: { latitude: 50.846, longitude: 4.34 },
  },
  {
    id: 5,
    name: "Safari",
    url: "https://www.apple.com/safari/",
    coords: { latitude: 50.855, longitude: 4.35 },
  },
];

const LocationFinder = () => {
  const [inputLatitude, setInputLatitude] = useState("");
  const [inputLongitude, setInputLongitude] = useState("");
  const [validLocationUrls, setValidLocationUrls] = useState({});

  const validateCoordinates = () => {
    const lat = parseFloat(inputLatitude);
    const lon = parseFloat(inputLongitude);

    if (isNaN(lat) || isNaN(lon)) {
      Alert.alert("Input Error", "Please enter valid numeric coordinates.");
      return;
    }

    // Check each location to see if coordinates match
    const updatedUrls = {};
    locations.forEach((location) => {
      const distance = calculateDistance(
        lat,
        lon,
        location.coords.latitude,
        location.coords.longitude
      );
      updatedUrls[location.id] = distance < 0.5 ? location.url : ""; // 0.5 km radius
    });

    setValidLocationUrls(updatedUrls);
  };

  // Utility function to calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  return (
    <View contentContainerStyle={styles.container}>
      <Text style={styles.header}>Enter Latitude and Longitude</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          keyboardType="numeric"
          value={inputLatitude}
          onChangeText={setInputLatitude}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          keyboardType="numeric"
          value={inputLongitude}
          onChangeText={setInputLongitude}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Validate Location"
          onPress={validateCoordinates}
          color="#007bff"
          style={styles.button}
        />
      </View>
      <View style={styles.qrContainer}>
        {locations.map((location) => (
          <View key={location.id} style={styles.qrWrapper}>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{location.name}</Text>
            </View>
            <QRCode
              value={validLocationUrls[location.id] || " "}
              size={100}
              color="black"
              backgroundColor="white"
            />
            <Text style={styles.locationText}>
              Latitude: {location.coords.latitude}
            </Text>
            <Text style={styles.locationText}>
              Longitude: {location.coords.longitude}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5,
    width: "45%",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    height: 40,
    borderRadius: 5,
    backgroundColor: "#007bff",
    color: "#fff",
    width: "100%",
    marginBottom: 20,
  },
  qrContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  qrWrapper: {
    alignItems: "center",
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: "45%", // Ensures QR codes fit well on smaller screens
  },
  locationInfo: {
    alignItems: "center",
    marginBottom: 10,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
  },
});

export default LocationFinder;
