import Contact from '@native-modules/contacts/contact';

type ContactsGroup = {
  readonly title: string;
  readonly data: Contact[];
};

export default ContactsGroup;
