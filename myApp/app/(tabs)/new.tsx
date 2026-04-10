import { View, Text, StyleSheet } from 'react-native';

export default function Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>New</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031526',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
  },
});