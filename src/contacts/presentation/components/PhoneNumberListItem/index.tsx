import React from 'react';

import { styles } from '@contacts/presentation/components/PhoneNumberListItem/styles';
import PhoneNumber from '@native-modules/contacts/entities/phone_number';
import { useAppTheme } from '@theme/index';
import { Text, TouchableOpacity } from 'react-native';

const PhoneNumberListItem: React.FC<{
  readonly phoneNumber: PhoneNumber;
  readonly onPress: (phoneNumber: PhoneNumber) => void;
}> = ({ phoneNumber, onPress }) => {
  const { colors } = useAppTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(phoneNumber)}
      style={[{ backgroundColor: colors.secondary['900'] }, styles.container]}>
      <Text style={[styles.phone, { color: colors.primary['50'] }]}>
        {phoneNumber.phone}
      </Text>
    </TouchableOpacity>
  );
};

export default PhoneNumberListItem;
