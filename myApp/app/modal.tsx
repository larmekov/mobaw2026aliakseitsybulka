import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function ModalScreen() {
  const { title, description, image, shared, from, date, author } =
    useLocalSearchParams();

  const fromMyAnomalies = from === "my-anomalies";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerDate}>
          {typeof date === "string" && date ? date : "Saved anomaly"}
        </Text>

        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeText}>X</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {typeof image === "string" && !!image && (
          <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          {!!author && typeof author === "string" && (
            <Text style={styles.author}>{author}</Text>
          )}

          {!author && (
            <Text style={styles.author}>
              {shared === "true" ? "Shared anomaly" : "Private anomaly"}
            </Text>
          )}

          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>

      {!fromMyAnomalies && (
        <View style={styles.footer}>
          <Pressable style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save to My Anomalies</Text>
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
  saveButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});