import React, { useEffect, useMemo, useRef, useState } from 'react';

import ClearInputIcon from '@assets/svg/clear-input.svg';
import SearchIcon from '@assets/svg/search.svg';
import { styles } from '@contacts/presentation/components/SearchInput/styles';
import {
  useGetContactsAction,
  useSearchContactsAction,
} from '@contacts/presentation/redux/actions';
import { useAppTheme } from '@theme/index';
import { TextInput, TouchableOpacity, View } from 'react-native';

const ContactsSearchInput: React.FC = () => {
  const { colors } = useAppTheme();

  const input = useRef<TextInput>(null);

  const [query, updateQuery] = useState<string>('');

  const opacity = useMemo(() => {
    return query.length >= 1 ? 1 : 0;
  }, [query]);

  const search = useSearchContactsAction();

  const getContacts = useGetContactsAction();

  useEffect(() => {
    search({ query });
  }, [query, search]);

  return (
    <View style={styles.container}>
      <SearchIcon style={styles.searchIcon} stroke={'gray'} />
      <TextInput
        style={[styles.input, { color: colors.primary['50'] }]}
        blurOnSubmit
        returnKeyType={'search'}
        placeholder={'Search contacts'}
        placeholderTextColor={colors.primary['500']}
        value={query}
        onChangeText={text => updateQuery(text)}
      />
      <TouchableOpacity
        disabled={query.length < 3}
        style={[styles.clear, { opacity }]}
        onPress={() => {
          input.current?.blur();
          updateQuery('');
          getContacts({});
        }}>
        <ClearInputIcon stroke={'gray'} />
      </TouchableOpacity>
    </View>
  );
};

export default ContactsSearchInput;
