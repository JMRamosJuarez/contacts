import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 4,
  },
  searchIcon: { margin: 12 },
  input: { flex: 1, padding: 8, fontSize: 16 },
  clear: { padding: 12 },
  close: { padding: 12 },
});
