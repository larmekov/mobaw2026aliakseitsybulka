import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ApodItem = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  copyright?: string;
};

const API_KEY = "BdY29fR1DkQHxQeeDSlQu5hFJjiBl47wnaLeL7pJ";
const MIN_YEAR = 1996;

function pad(num: number) {
  return String(num).padStart(2, "0");
}

function getRandomYear() {
  const currentYear = new Date().getFullYear();
  return Math.floor(Math.random() * (currentYear - MIN_YEAR + 1)) + MIN_YEAR;
}

export default function HomeScreen() {
  const [apod, setApod] = useState<ApodItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [error, setError] = useState("");

  const fetchOnThisDayApod = async () => {
    try {
      setLoading(true);
      setError("");

      const now = new Date();
      const month = pad(now.getMonth() + 1);
      const day = pad(now.getDate());

      let foundImage: ApodItem | null = null;
      let attempts = 0;

      while (!foundImage && attempts < 8) {
        const randomYear = getRandomYear();
        const targetDate = `${randomYear}-${month}-${day}`;

        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${targetDate}`
        );

        if (!res.ok) {
          attempts++;
          continue;
        }

        const data: ApodItem = await res.json();

        if (data.media_type === "image") {
          foundImage = data;
          setSelectedYear(randomYear);
        }

        attempts++;
      }

      if (!foundImage) {
        setError("Could not load an image for this day");
        setApod(null);
      } else {
        setApod(foundImage);
      }
    } catch (e) {
      console.log(e);
      setError("Something went wrong while loading data");
      setApod(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOnThisDayApod();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#f58220" />
            <Text style={styles.loaderText}>Loading anomaly of the day...</Text>
          </View>
        ) : error ? (
          <View style={styles.loaderWrap}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable style={styles.refreshButton} onPress={fetchOnThisDayApod}>
              <Text style={styles.refreshButtonText}>Try another year</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {!!apod?.url && (
              <Image
                source={{ uri: apod.url }}
                style={styles.heroImage}
                resizeMode="cover"
              />
            )}

            <Text style={styles.kicker}>NASA ANOMALY MONITOR</Text>
            <Text style={styles.title}>Home</Text>
            <Text style={styles.description}>
              Review the mission status, recent activity, and the most important
              anomaly alerts in one place.
            </Text>

            <View style={styles.card}>
              <Text style={styles.cardKicker}>ON THIS DAY</Text>
              <Text style={styles.cardDate}>
                {apod?.date} {selectedYear ? `• Year ${selectedYear}` : ""}
              </Text>
              <Text style={styles.cardTitle}>{apod?.title}</Text>
              <Text style={styles.cardText} numberOfLines={4}>
                {apod?.explanation}
              </Text>

              <Pressable
                style={styles.refreshButton}
                onPress={fetchOnThisDayApod}
              >
                <Text style={styles.refreshButtonText}>Try another year</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#031a2c",
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 28,
  },
  heroImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 24,
    backgroundColor: "#10283d",
  },
  kicker: {
    color: "#9b8cff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    color: "#ffffff",
    fontSize: 50,
    fontWeight: "800",
    marginBottom: 18,
    lineHeight: 56,
  },
  description: {
    color: "#b8c3cf",
    fontSize: 18,
    lineHeight: 31,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#0d2438",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1e3d57",
  },
  cardKicker: {
    color: "#f59e0b",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  cardDate: {
    color: "#8fa6bb",
    fontSize: 13,
    marginBottom: 8,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 30,
    marginBottom: 12,
  },
  cardText: {
    color: "#d2dde8",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: "#f58220",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  refreshButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  loaderWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 120,
  },
  loaderText: {
    color: "#b8c3cf",
    marginTop: 14,
    fontSize: 16,
  },
  errorText: {
    color: "#ffb4b4",
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
});