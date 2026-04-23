import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from "react-native";

export default function NewScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <SafeAreaView style={styles.container}>
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

        <Pressable
          style={styles.button}
          onPress={() => Alert.alert("TODO", "Save to My Anomalies not implemented yet")}
        >
          <Text style={styles.buttonText}>Save to My Anomalies</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.shareButton]}
          onPress={() => Alert.alert("TODO", "Save and Share not implemented yet")}
        >
          <Text style={styles.buttonText}>Save and Share</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#061a2b",
    padding: 16,
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
    marginBottom: 18,
  },
  button: {
    backgroundColor: "#16344d",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2a4e6d",
  },
  shareButton: {
    backgroundColor: "#f59e0b",
    borderColor: "#f59e0b",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});