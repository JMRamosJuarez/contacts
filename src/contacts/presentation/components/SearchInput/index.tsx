import React, { useEffect, useMemo, useRef, useState } from 'react';

import ClearInputIcon from '@assets/svg/clear-input.svg';
import SearchIcon from '@assets/svg/search.svg';
import {
  useGetContactsAction,
  useSearchContactsAction,
} from '@contacts/presentation/redux/actions';
import { TextInput, TouchableOpacity, View } from 'react-native';

const ContactsSearchInput: React.FC = () => {
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
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <SearchIcon style={{ margin: 12 }} stroke={'gray'} />
      <TextInput
        style={{ flex: 1, paddingVertical: 8, fontSize: 16 }}
        blurOnSubmit
        returnKeyType={'search'}
        placeholder={'Search contacts'}
        value={query}
        onChangeText={text => updateQuery(text)}
      />
      <TouchableOpacity
        disabled={query.length < 3}
        style={[{ padding: 12 }, { opacity }]}
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
