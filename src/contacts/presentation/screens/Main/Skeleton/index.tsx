import React, { useCallback, useMemo } from 'react';

import ContactListItemSkeleton from '@contacts/presentation/components/ContactListItemSkeleton';
import { styles } from '@contacts/presentation/screens/Main/Skeleton/styles';
import { FlatList } from 'react-native';

const ContactsListSkeleton: React.FC = () => {
  const data = useMemo(() => new Array(25).fill({}), []);

  const renderItem = useCallback((): React.ReactElement => {
    return <ContactListItemSkeleton />;
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={data}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => `${index}`}
      renderItem={renderItem}
      getItemLayout={(_, index) => {
        return { length: 65, offset: 65 * index, index };
      }}
    />
  );
};

export default ContactsListSkeleton;
