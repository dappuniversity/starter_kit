/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import {
  Button, Grid, LoadingOverlay, NumberInput, Space, Text, TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';

import theme from 'config/theme';
import { BasketType } from 'types';

import styles from './BasketForm.module.scss';

type Props = {
  onSubmit: (values: any) => any,
  basket?: BasketType,
  isDisabled?: boolean,
  isLoading?: boolean,
  error?: string,
};

const defaultProps = {
  basket: undefined,
  error: undefined,
  isDisabled: false,
  isLoading: false,
};

const BasketForm: FC<Props> = ({
  basket, error, isDisabled, isLoading, onSubmit,
}) => {
  const basketForm = useForm({
    initialValues: basket || {
      domain: '',
      amount: 0,
      price: 0,
    },
    validationRules: {
      domain: value => /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(value),
      amount: value => value > 0,
      price: value => value > 0,
    },
    errorMessages: {
      domain: 'Domain must have domain format',
      amount: 'Amount value should be greater than 0',
      price: 'Price value should be greater than 0',
    },
  });

  return (
    <form
      className={ styles.BasketForm }
      onSubmit={ basketForm.onSubmit(onSubmit) }
    >
      <LoadingOverlay
        transitionDuration={ 500 }
        visible={ isLoading || false }
      />
      <TextInput
        label="Domain"
        placeholder="my-domain.com"
        required
        { ...basketForm.getInputProps('domain') }
        onBlur={ () => basketForm.validateField('domain') }
      />
      <Space h="sm" />
      <NumberInput
        description="Total BREAD amount that can be spent on this referal campaign"
        label="Amount"
        placeholder="100"
        required
        { ...basketForm.getInputProps('amount') }
        onBlur={ () => basketForm.validateField('amount') }
      />
      <Space h="sm" />
      <NumberInput
        description="BREAD units payed per crumb created to publishers"
        label="Price"
        placeholder="1"
        required
        { ...basketForm.getInputProps('price') }
        onBlur={ () => basketForm.validateField('price') }
      />
      <Grid align="center" justify="space-between" mt="md">
        <Grid.Col grow span={ 10 }>
          <Text color="red" mt="sm" size="sm">
            {error}
          </Text>
        </Grid.Col>
        <Grid.Col grow span={ 2 }>
          <Button
            color={ theme.mantine.primaryColor }
            disabled={ isDisabled }
            loading={ isLoading }
            type="submit"
            variant="outline"
          >
            Save
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};

BasketForm.defaultProps = defaultProps;

export default BasketForm;
