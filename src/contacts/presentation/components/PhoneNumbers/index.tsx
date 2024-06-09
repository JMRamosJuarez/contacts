import React, { useEffect } from 'react';

import PhoneNumbersComponent from '@contacts/presentation/components/PhoneNumbers/Component';
import SectionHeader from '@contacts/presentation/components/SectionHeader';
import { useGetPhoneNumbersAction } from '@contacts/presentation/redux/details/actions';
import Contact from '@native-modules/contacts/entities/contact';

const PhoneNumbers: React.FC<{
  readonly contact: Contact;
}> = ({ contact }) => {
  const getPhoneNumbers = useGetPhoneNumbersAction();

  useEffect(() => {
    getPhoneNumbers(contact.id);
  }, [contact.id, getPhoneNumbers]);

  return (
    <>
      <SectionHeader icon={'phone-call'} title={'Phone numbers'} />
      <PhoneNumbersComponent contact={contact} />
    </>
  );
};

export default PhoneNumbers;
