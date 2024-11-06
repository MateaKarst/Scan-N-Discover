import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function PickYourImage() {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text style={styles.noAccessText}>No access to gallery</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Favorite image?</Text>
        <Text style={styles.description}>
          Browse through your gallery and pick one of your favorite images!
        </Text>
      </View>
      <View style={styles.imageButtonContainer}>
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <Button
          title="Pick Image"
          onPress={pickImage}
          color="#007bff"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  textContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 10,
  },
  imageButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
  image: {
    width:100,
    height:100,
    borderRadius: 10,
    marginRight: 10,
  },
  noAccessText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#f00",
  },
});
