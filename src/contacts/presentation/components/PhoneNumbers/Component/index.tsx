import React from 'react';

import EmptyPhoneNumbers from '@contacts/presentation/components/PhoneNumbers/Empty';
import PhoneNumbersError from '@contacts/presentation/components/PhoneNumbers/Error';
import PhoneNumbersList from '@contacts/presentation/components/PhoneNumbers/List';
import PhoneNumbersListSkeleton from '@contacts/presentation/components/PhoneNumbers/Skeleton';
import { usePhoneNumbersState } from '@contacts/presentation/redux/details/selectors/phone_numbers';
import Contact from '@native-modules/contacts/entities/contact';

const PhoneNumbersComponent: React.FC<{
  readonly contact: Contact;
}> = ({ contact }) => {
  const state = usePhoneNumbersState(contact.id);
  switch (state) {
    case 'waiting':
    case 'loading':
      return <PhoneNumbersListSkeleton />;
    case 'empty':
      return <EmptyPhoneNumbers />;
    case 'success':
      return <PhoneNumbersList contact={contact} />;
    default:
      return <PhoneNumbersError contact={contact} />;
  }
};

export default PhoneNumbersComponent;
