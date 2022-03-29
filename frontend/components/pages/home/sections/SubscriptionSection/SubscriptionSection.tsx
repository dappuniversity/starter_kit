import { FC, useCallback, useState } from 'react';
import { Text } from '@mantine/core';
import classnames from 'classnames';

import Link from 'components/elements/Link';
import { EmailForm } from 'components/forms';
import theme from 'config/theme';
import { subscription } from 'content/home';
import { ClientType, createClient } from 'pages/api/clients';

import styles from './SubscriptionSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const SubscriptionSection: FC<Props> = ({ className, id }) => {
  const [createClientLoading, setCreateClientLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const createClientHandler = useCallback(async (_client: ClientType) => {
    setCreateClientLoading(true);
    const data = await createClient(_client);
    setCreateClientLoading(false);
    debugger;
    if (!data?.client?.email && data.error) setError(data.error);
  }, []);

  const subscriptionSectionClassNames = classnames(styles.SubscriptionSection, className);

  return (
    <div
      className={ subscriptionSectionClassNames }
      id={ id }
    >
      <div className={ styles.Content }>
        <div className={ styles.Title }>
          <Text
            color={ theme.mantine.primaryColor }
            size="xl"
          >
            { subscription.title.slice(0, -8) }
          </Text>
          <Text
            color={ theme.mantine.primaryColor }
            size="xl"
          >
            { subscription.title.slice(-8) }
          </Text>
        </div>

        <Text
          align="center"
          className={ styles.Subtitle }
          color="white"
          component="span"
          size="xl"
        >
          { subscription.subtitle }
        </Text>
      </div>
      <div className={ styles.Border } />
      <div className={ styles.Content }>
        <EmailForm
          buttonText={ subscription.form.button }
          error={ error }
          isLoading={ createClientLoading }
          placeholder={ subscription.form.placeholder }
          onSubmit={ createClientHandler }
        />
      </div>
      <div className={ styles.CommunityShape }>
        <div />
        <div />
      </div>
    </div>
  );
};

SubscriptionSection.defaultProps = defaultProps;

export default SubscriptionSection;
