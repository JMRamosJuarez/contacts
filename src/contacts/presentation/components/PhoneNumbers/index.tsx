import React, { useEffect } from 'react';

import PhoneNumbersComponent from '@contacts/presentation/components/PhoneNumbers/Component';
import SectionHeader from '@contacts/presentation/components/SectionHeader';
import { useGetPhoneNumbersAction } from '@contacts/presentation/redux/details/actions';
import Contact from '@native-modules/contacts/entities/contact';
import { useTranslation } from 'react-i18next';

const PhoneNumbers: React.FC<{
  readonly contact: Contact;
}> = ({ contact }) => {
  const { t } = useTranslation();

  const getPhoneNumbers = useGetPhoneNumbersAction();

  useEffect(() => {
    getPhoneNumbers(contact.id);
  }, [contact.id, getPhoneNumbers]);

  return (
    <>
      <SectionHeader icon={'phone-call'} title={t('phone_numbers')} />
      <PhoneNumbersComponent contact={contact} />
    </>
  );
};

export default PhoneNumbers;
