import React from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAnomalies } from "../context/AnomaliesContext";

export default function ModalScreen() {
  const { id, title, description, image, from, date, author } =
    useLocalSearchParams();

  const { addAnomaly, deleteAnomaly, myAnomalies } = useAnomalies();

  const fromMyAnomalies = from === "my-anomalies";

  const selectedAnomaly =
    fromMyAnomalies && typeof id === "string"
      ? myAnomalies.find((item) => item.id === id)
      : null;

  const finalTitle =
    fromMyAnomalies && selectedAnomaly
      ? selectedAnomaly.title
      : typeof title === "string"
      ? title
      : "";

  const finalDescription =
    fromMyAnomalies && selectedAnomaly
      ? selectedAnomaly.description
      : typeof description === "string"
      ? description
      : "";

  const finalImage =
    fromMyAnomalies && selectedAnomaly
      ? selectedAnomaly.image
      : typeof image === "string"
      ? image
      : "";

  const handleSave = () => {
    if (!finalTitle || !finalDescription || !finalImage) {
      Alert.alert("Error", "Could not save anomaly");
      return;
    }

    addAnomaly(finalTitle, finalDescription, finalImage, false);
    Alert.alert("Saved", `"${finalTitle}" was added to My Anomalies`);
  };

  const handleDelete = () => {
    if (typeof id !== "string") {
      Alert.alert("Error", "Could not delete anomaly");
      return;
    }

    Alert.alert("Delete anomaly", `Delete "${finalTitle}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteAnomaly(id);
          router.back();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerDate}>
          {typeof date === "string" && date
            ? date
            : fromMyAnomalies
            ? "Saved anomaly"
            : ""}
        </Text>

        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeText}>X</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!!finalImage && (
          <Image source={{ uri: finalImage }} style={styles.image} resizeMode="cover" />
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{finalTitle}</Text>

          {!!author && typeof author === "string" && !fromMyAnomalies && (
            <Text style={styles.author}>© {author}</Text>
          )}

          <Text style={styles.description}>{finalDescription}</Text>
        </View>
      </ScrollView>

      {!fromMyAnomalies && (
        <View style={styles.footer}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save to My Anomalies</Text>
          </Pressable>
        </View>
      )}

      {fromMyAnomalies && (
        <View style={styles.footer}>
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.saveButtonText}>Delete Anomaly</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#061a2b",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  headerDate: {
    color: "#9fb0c0",
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2a3f57",
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  image: {
    width: "100%",
    height: 260,
    backgroundColor: "#10283d",
  },
  content: {
    padding: 18,
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 30,
    marginBottom: 10,
  },
  author: {
    color: "#71879c",
    fontSize: 14,
    marginBottom: 14,
  },
  description: {
    color: "#d2dde8",
    fontSize: 18,
    lineHeight: 34,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#17324a",
    backgroundColor: "#061a2b",
  },
  saveButton: {
    backgroundColor: "#f58220",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#c2410c",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});