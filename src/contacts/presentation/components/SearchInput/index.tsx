import React, { useMemo, useRef } from 'react';

import { styles } from '@contacts/presentation/components/SearchInput/styles';
import {
  useClearSearchResultsAction,
  useSearchPhoneNumbersAction,
  useUpdateSearchInputAction,
} from '@contacts/presentation/redux/search/actions';
import { useSearchInputValue } from '@contacts/presentation/redux/search/selectors';
import { useAppNavigation } from '@core/presentation/navigation/config';
import { useAppTheme } from '@theme/index';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';

const PhoneNumbersSearchInput: React.FC = () => {
  const { top } = useSafeAreaInsets();

  const { colors } = useAppTheme();

  const { goBack } = useAppNavigation();

  const input = useRef<TextInput>(null);

  const { query } = useSearchInputValue();

  const updateQuery = useUpdateSearchInputAction();

  const opacity = useMemo(() => {
    return query.length >= 1 ? 1 : 0;
  }, [query]);

  const search = useSearchPhoneNumbersAction();

  const clear = useClearSearchResultsAction();

  return (
    <View style={[{ marginTop: top }, styles.container]}>
      <FeatherIcon
        style={styles.searchIcon}
        name={'search'}
        size={24}
        color={colors.primary['500']}
      />
      <View
        style={[{ borderColor: colors.primary['50'] }, styles.subContainer]}>
        <TextInput
          style={[styles.input, { color: colors.primary['50'] }]}
          blurOnSubmit
          returnKeyType={'search'}
          placeholder={'Search contacts'}
          placeholderTextColor={colors.primary['500']}
          value={query}
          onChangeText={text => {
            search(text);
            updateQuery(text);
          }}
        />
        <TouchableOpacity
          disabled={query.length < 3}
          style={[styles.clear, { opacity }]}
          onPress={() => {
            input.current?.blur();
            clear();
          }}>
          <FeatherIcon
            size={16}
            name="x-circle"
            color={colors.primary['500']}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.close} onPress={goBack}>
        <FeatherIcon name={'x'} size={24} color={colors.primary['500']} />
      </TouchableOpacity>
    </View>
  );
};

export default PhoneNumbersSearchInput;
