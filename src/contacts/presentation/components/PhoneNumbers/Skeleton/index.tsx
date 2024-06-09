import React, { useMemo } from 'react';

import PhoneNumberListItemSkeleton from '@contacts/presentation/components/PhoneNumberListItemSkeleton';

const PhoneNumbersListSkeleton: React.FC = () => {
  const phones = useMemo(() => new Array(3).fill({}), []);

  return (
    <>
      {phones.map((_, index) => {
        return <PhoneNumberListItemSkeleton key={`${index}`} />;
      })}
    </>
  );
};

export default PhoneNumbersListSkeleton;
