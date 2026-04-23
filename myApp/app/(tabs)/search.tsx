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

type ApodItem = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: string;
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
      setResults(normalized);
    } catch (error) {
      Alert.alert("Error", "Could not load APOD data");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
        renderItem={({ item }) => (
          <View style={styles.debugCard}>
            <Text style={styles.debugDate}>{item.date}</Text>
            <Text style={styles.debugTitle}>{item.title}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
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
  debugCard: {
    backgroundColor: "#0d2438",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1e3d57",
  },
  debugDate: {
    color: "#8fa6bb",
    fontSize: 12,
    marginBottom: 6,
  },
  debugTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});