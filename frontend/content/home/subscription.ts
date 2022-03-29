export type Subscription = {
  title: string,
  subtitle: string,
  form: {
    placeholder: string,
    button: string,
  },
}

const subscription: Subscription = {
  title: 'let\'s start sharing!',
  subtitle: 'Sign up to be the first to know about BreadCrumbs ISO and the following campaigns',
  form: {
    placeholder: 'email@address.com',
    button: 'Subscribe',
  },
};

export default subscription;
