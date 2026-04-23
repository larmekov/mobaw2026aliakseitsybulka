import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";

type ApodItem = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  copyright?: string;
};

const API_KEY = "BdY29fR1DkQHxQeeDSlQu5hFJjiBl47wnaLeL7pJ";

export default function SearchScreen() {
  const [fromDate, setFromDate] = useState("2026-03-20");
  const [toDate, setToDate] = useState("2026-03-26");
  const [results, setResults] = useState<ApodItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${fromDate}&end_date=${toDate}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch APOD data");
      }

      const data = await res.json();
      const normalized = Array.isArray(data) ? data : [data];

      const imageOnly = normalized.filter(
        (item: ApodItem) => item.media_type === "image"
      );

      const sorted = imageOnly.sort((a, b) => b.date.localeCompare(a.date));

      setResults(sorted);
    } catch (error) {
      Alert.alert("Error", "Could not load APOD data");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: ApodItem }) => (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/modal",
          params: {
            title: item.title,
            description: item.explanation,
            image: item.url,
            date: item.date,
            author: item.copyright ?? "",
            from: "search",
          },
        })
      }
    >
      <Image source={{ uri: item.url }} style={styles.cardImage} resizeMode="cover" />

      <View style={styles.cardContent}>
        <Text style={styles.cardDate}>{item.date}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.explanation}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.kicker}>EXPLORE RECORDS</Text>
      <Text style={styles.title}>APOD Search</Text>

      <View style={styles.row}>
        <View style={styles.fieldWrap}>
          <Text style={styles.label}>FROM</Text>
          <TextInput
            style={styles.input}
            value={fromDate}
            onChangeText={setFromDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#7f97ad"
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>TO</Text>
          <TextInput
            style={styles.input}
            value={toDate}
            onChangeText={setToDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#7f97ad"
          />
        </View>
      </View>

      <Pressable style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>
          {loading ? "Loading..." : "Search"}
        </Text>
      </Pressable>

      <FlatList
        data={results}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.emptyText}>
              No results yet. Choose a date range and press Search.
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#061a2b",
    padding: 16,
  },
  kicker: {
    color: "#9b8cff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 8,
    marginTop: 6,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  fieldWrap: {
    flex: 1,
  },
  label: {
    color: "#cfd9e3",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#10283d",
    color: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#23415b",
    fontSize: 15,
  },
  searchButton: {
    backgroundColor: "#7c4dff",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#0d2438",
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e3d57",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#10283d",
  },
  cardContent: {
    padding: 14,
  },
  cardDate: {
    color: "#8fa6bb",
    fontSize: 12,
    marginBottom: 6,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardDescription: {
    color: "#b8c7d6",
    fontSize: 14,
    lineHeight: 20,
  },
  emptyText: {
    color: "#8fa6bb",
    textAlign: "center",
    marginTop: 30,
    fontSize: 15,
  },
});