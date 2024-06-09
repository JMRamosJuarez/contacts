import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginVertical: 0.5,
  },
  img: { width: 40, height: 40, borderRadius: 40 },
  name: { flex: 1, marginHorizontal: 8, fontSize: 16, lineHeight: 22 },
});
