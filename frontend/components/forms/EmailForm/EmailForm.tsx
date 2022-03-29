/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import {
  Button, Group, Text, TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';

import theme from 'config/theme';

import styles from './EmailForm.module.scss';

type Props = {
  onSubmit: (values: any) => any,
  isLoading?: boolean,
  buttonText?: string,
  error?: string,
  placeholder?: string,
};

const defaultProps = {
  basket: undefined,
  isDisabled: false,
  isLoading: false,
  buttonText: 'Subscribe',
  error: undefined,
  placeholder: 'email address',
};

const EmailForm: FC<Props> = ({
  isLoading, buttonText, error, placeholder, onSubmit,
}) => {
  const emailForm = useForm({
    initialValues: {
      email: '',
    },
    validationRules: {
      // eslint-disable-next-line max-len
      email: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
    },
    errorMessages: {
      email: 'Email must have email format',
    },
  });

  return (
    <form
      className={ styles.EmailForm }
      onSubmit={ emailForm.onSubmit(onSubmit) }
    >
      <TextInput
        color={ theme.mantine.primaryColor }
        icon={ <EnvelopeClosedIcon /> }
        label="Email"
        placeholder={ placeholder }
        required
        size="lg"
        type="email"
        { ...emailForm.getInputProps('email') }
        onBlur={ () => emailForm.validateField('email') }
      />
      <Group mt="xl" position="right" spacing="xl">
        { !!error && (
        <Text
          className={ styles.Error }
          color="red"
          mt="md"
          size="md"
          weight={ 700 }
        >
          { error }
        </Text>
        ) }
        <Button
          className={ styles.Button }
          color={ theme.mantine.primaryColor }
          loading={ isLoading }
          size="lg"
          type="submit"
          variant="outline"
        >
          { buttonText }
        </Button>
      </Group>
    </form>
  );
};

EmailForm.defaultProps = defaultProps;

export default EmailForm;
