import React from 'react';

import { styles } from '@contacts/presentation/components/SearchResultListItem/styles';
import PhoneNumber from '@native-modules/contacts/entities/phone_number';
import { useAppTheme } from '@theme/index';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const SearchResultListItem: React.FC<{
  readonly phoneNumber: PhoneNumber;
  readonly onPress: (phoneNumber: PhoneNumber) => void;
}> = ({ phoneNumber, onPress }) => {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(phoneNumber)}
      style={[styles.container, { backgroundColor: colors.primary['800'] }]}>
      <Image
        style={styles.img}
        source={
          phoneNumber.contact.photo
            ? { uri: phoneNumber.contact.photo }
            : require('@assets/imgs/contact-placeholder.png')
        }
        defaultSource={require('@assets/imgs/contact-placeholder.png')}
      />
      <View style={styles.data}>
        <Text style={[styles.name, { color: colors.primary['50'] }]}>
          {phoneNumber.contact.name}
        </Text>
        <Text style={[styles.phone, { color: colors.primary['50'] }]}>
          {phoneNumber.phone}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultListItem;
