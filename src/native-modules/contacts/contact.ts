type Contact = {
  readonly id: number;
  readonly photo?: string;
  readonly name: string;
  readonly email?: String;
  readonly phones: string[];
};

export default Contact;
