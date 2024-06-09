import React from 'react';

import SearchIcon from '@assets/svg/search.svg';
import { styles } from '@contacts/presentation/components/ContactsHeader/styles';
import { useAppNavigation } from '@core/presentation/navigation/config';
import { StackHeaderProps } from '@react-navigation/stack';
import { useAppTheme } from '@theme/index';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ContactsHeader: React.FC<StackHeaderProps> = () => {
  const { top } = useSafeAreaInsets();

  const { colors } = useAppTheme();

  const { navigate } = useAppNavigation();

  return (
    <View style={[{ marginTop: top }, styles.container]}>
      <Text style={[{ color: colors.primary['50'] }, styles.title]}>
        {'Contacts'}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => navigate('Search')}>
        <SearchIcon stroke={colors.primary['500']} />
      </TouchableOpacity>
    </View>
  );
};

export default ContactsHeader;
