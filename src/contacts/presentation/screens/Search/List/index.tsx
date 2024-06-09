import React, { useCallback } from 'react';

import PhoneNumberListItem from '@contacts/presentation/components/PhoneNumberListItem';
import { useSerchPhoneNumbersResults } from '@contacts/presentation/redux/search/selectors';
import { styles } from '@contacts/presentation/screens/Search/List/styles';
import { useAppNavigation } from '@core/presentation/navigation/config';
import PhoneNumber from '@native-modules/contacts/entities/phone_number';
import { FlatList } from 'react-native';

const SearchResultsList: React.FC = () => {
  const { navigate } = useAppNavigation();

  const results = useSerchPhoneNumbersResults();

  const renderItem = useCallback(
    ({ item }: { readonly item: PhoneNumber }): React.ReactElement => {
      return (
        <PhoneNumberListItem
          phoneNumber={item}
          onPress={({ contact: { id } }) =>
            navigate('ContactDetail', { contactId: id })
          }
        />
      );
    },
    [navigate],
  );

  const keyExtractor = useCallback((item: PhoneNumber) => {
    return `${item.id}`;
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={results}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      getItemLayout={(_, index) => {
        return { length: 65, offset: 65 * index, index };
      }}
    />
  );
};

export default SearchResultsList;
