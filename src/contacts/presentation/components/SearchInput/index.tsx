import React, { useMemo, useRef } from 'react';

import ClearInputIcon from '@assets/svg/clear-input.svg';
import CloseIcon from '@assets/svg/close.svg';
import SearchIcon from '@assets/svg/search.svg';
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
      <SearchIcon style={styles.searchIcon} stroke={colors.primary['500']} />
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
          <ClearInputIcon stroke={'gray'} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.close} onPress={goBack}>
        <CloseIcon stroke={colors.primary['500']} />
      </TouchableOpacity>
    </View>
  );
};

export default PhoneNumbersSearchInput;
