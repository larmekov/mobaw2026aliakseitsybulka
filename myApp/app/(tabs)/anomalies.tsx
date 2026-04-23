import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { useAnomalies } from "../../context/AnomaliesContext";

export default function MyAnomaliesScreen() {
  const { myAnomalies } = useAnomalies();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My Anomalies</Text>

      {myAnomalies.length === 0 ? (
        <Text style={styles.emptyText}>No anomalies yet</Text>
      ) : (
        <FlatList
          data={myAnomalies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/modal",
                  params: {
                    id: item.id,
                    from: "my-anomalies",
                  },
                })
              }
            >
              {!!item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={styles.meta}>
                {item.shared ? "Shared" : "Private"}
              </Text>
            </Pressable>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
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
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  emptyText: {
    color: "#b8c7d6",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#0d2438",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1e3d57",
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#10283d",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    color: "#c9d6e2",
    fontSize: 14,
    marginBottom: 8,
  },
  meta: {
    color: "#f59e0b",
    fontSize: 12,
    fontWeight: "600",
  },
});