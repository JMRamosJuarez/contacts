import Contact from '@native-modules/contacts/entities/contact';

type PhoneNumber = {
  readonly id: number;
  readonly account: string;
  readonly phone: string;
  readonly contact: Contact;
};

export default PhoneNumber;
