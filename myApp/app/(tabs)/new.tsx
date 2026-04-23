import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAnomalies } from "../../context/AnomaliesContext";

export default function NewScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const { addAnomaly } = useAnomalies();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "Please allow access to your photo library"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!title.trim() || !description.trim() || !image.trim()) {
      Alert.alert(
        "Missing data",
        "Please enter title, description and choose an image"
      );
      return;
    }

    addAnomaly(title.trim(), description.trim(), image.trim(), false);
    Alert.alert("Saved", `Saved "${title}" to My Anomalies`);
    setTitle("");
    setDescription("");
    setImage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Create New Anomaly</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter anomaly title"
            placeholderTextColor="#7f97ad"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter anomaly description"
            placeholderTextColor="#7f97ad"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.label}>Image</Text>
          <Pressable style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>
              {image ? "Choose another image" : "Choose from gallery"}
            </Text>
          </Pressable>

          {!!image && (
            <Image
              source={{ uri: image }}
              style={styles.preview}
              resizeMode="cover"
            />
          )}

          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save to My Anomalies</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#061a2b",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heading: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  form: {
    backgroundColor: "#0b2236",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1d3c57",
  },
  label: {
    color: "#d9e6f2",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 6,
  },
  input: {
    backgroundColor: "#10283d",
    color: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#23415b",
    marginBottom: 12,
  },
  textArea: {
    minHeight: 140,
    marginBottom: 12,
  },
  imageButton: {
    backgroundColor: "#16344d",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#2a4e6d",
  },
  imageButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  preview: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 18,
    backgroundColor: "#10283d",
  },
  button: {
    backgroundColor: "#f59e0b",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f59e0b",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});