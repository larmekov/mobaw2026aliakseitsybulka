import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SearchScreen() {
  const [fromDate, setFromDate] = useState("2026-03-20");
  const [toDate, setToDate] = useState("2026-03-26");

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

      <Pressable style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </Pressable>
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
});