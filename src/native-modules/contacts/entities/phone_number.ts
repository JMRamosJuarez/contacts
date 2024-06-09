import Contact from '@native-modules/contacts/entities/contact';

type PhoneNumber = {
  readonly id: number;
  readonly phone: string;
  readonly contact: Contact;
};

export default PhoneNumber;
