import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://picsum.photos/600/300' }}
        style={styles.image}
      />

      <Text style={styles.kicker}>NASA ANOMALY MONITOR</Text>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.description}>
        Review the mission status, recent activity, and the most important anomaly alerts in one place.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031526',
    padding: 24,
    paddingTop: 80,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 24,
  },
  kicker: {
    color: '#7fb3d5',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    color: 'white',
    fontSize: 42,
    fontWeight: '700',
    marginBottom: 16,
  },
  description: {
    color: '#b8c4d0',
    fontSize: 18,
    lineHeight: 30,
  },
});