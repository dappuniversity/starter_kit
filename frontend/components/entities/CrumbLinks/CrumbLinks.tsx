/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  FC, MouseEventHandler, useCallback, useEffect, useState,
} from 'react';
import {
  ActionIcon, Code, Grid,
  Group,
  Space, Text, ThemeIcon,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { CopyIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';

import Link from 'components/elements/Link';
import theme from 'config/theme';
import useAccountContext from 'contexts/account';
import { getLink, LinkType } from 'pages/api/links/[account]/[domain]';

import styles from './CrumbLinks.module.scss';

const DEMO_PATH = '/some-path?key=value';

type Props = {
  domain: string,
    className?: string,
    onCopyLink: Function,
  };

const defaultProps = {
  className: '',
  onCopyLink: undefined,
};

const CrumbLinks: FC<Props> = ({ domain, className, onCopyLink }) => {
  const clipboard = useClipboard({ timeout: 500 });
  const { account } = useAccountContext();
  const [link, setLink] = useState<LinkType>();

  const urlWithPath = `${link?.url}${DEMO_PATH}`;
  const shortUrlWithPath = `${link?.shortUrl}${DEMO_PATH}`;

  const copy = (event: any, url: string = '') => {
    event.preventDefault();
    clipboard.copy(url);
    onCopyLink();
  };

  const copyLongUrl: MouseEventHandler = event => copy(event, link?.longUrl || undefined);
  const copyShortUrl: MouseEventHandler = event => copy(event, link?.shortUrl || undefined);
  const copyShortUrlWithPath: MouseEventHandler = event => copy(event, link?.shortUrl ? shortUrlWithPath : undefined);

  const fetchLink = useCallback(async () => {
    const _link = await getLink(account.address, domain);
    if (_link) setLink(_link);
  }, [account.address, domain]);

  useEffect(() => {
    fetchLink();
  }, [fetchLink]);

  const crumbLinksClassNames = classnames(styles.CrumbLinks, className);

  return (
    <div className={ crumbLinksClassNames }>
      <Text size="sm">Long link</Text>
      <Space h="xs" />
      <Grid align="center" justify="center">
        <Grid.Col span={ 9 }>
          <Code block>{ link?.longUrl }</Code>
        </Grid.Col>
        <Grid.Col span={ 3 }>
          <Group className={ styles.Links }>
            <ActionIcon onClick={ copyLongUrl }>
              <ThemeIcon
                gradient={ theme.primaryGradient }
                size="lg"
                variant="gradient"
              >
                <CopyIcon />
              </ThemeIcon>
            </ActionIcon>
            { link?.longUrl && (
              <Link isBlank to={ link?.longUrl }>
                <ThemeIcon
                  gradient={ theme.primaryGradient }
                  size="lg"
                  variant="gradient"
                >
                  <ExternalLinkIcon />
                </ThemeIcon>
              </Link>
            ) }
          </Group>
        </Grid.Col>
      </Grid>
      <Space h="xl" />
      <Text size="sm">Short link</Text>
      <Space h="xs" />
      <Grid align="center" justify="center">
        <Grid.Col span={ 9 }>
          <Code block>{ link?.shortUrl }</Code>
        </Grid.Col>
        <Grid.Col span={ 3 }>
          <Group className={ styles.Links }>
            <ActionIcon onClick={ copyShortUrl }>
              <ThemeIcon
                gradient={ theme.primaryGradient }
                size="lg"
                variant="gradient"
              >
                <CopyIcon />
              </ThemeIcon>
            </ActionIcon>
            { link?.shortUrl && (
            <Link isBlank to={ link?.shortUrl }>
              <ThemeIcon
                gradient={ theme.primaryGradient }
                size="lg"
                variant="gradient"
              >
                <ExternalLinkIcon />
              </ThemeIcon>
            </Link>
        ) }
          </Group>
        </Grid.Col>
      </Grid>
      <Space h="xl" />
      <Text size="sm">Short link with path</Text>
      <Text color="dimmed" size="sm">{ urlWithPath }</Text>
      <Space h="xs" />
      <Grid align="center" justify="space-between">
        <Grid.Col grow span={ 9 }>
          <Code block>{ shortUrlWithPath }</Code>
        </Grid.Col>
        <Grid.Col span={ 3 }>
          <Group className={ styles.Links }>
            <ActionIcon onClick={ copyShortUrlWithPath }>
              <ThemeIcon
                gradient={ theme.primaryGradient }
                size="lg"
                variant="gradient"
              >
                <CopyIcon />
              </ThemeIcon>
            </ActionIcon>
            <ThemeIcon
              gradient={ theme.primaryGradient }
              size="lg"
              variant="gradient"
            >
              <Link isBlank to={ shortUrlWithPath }>
                <ExternalLinkIcon />
              </Link>
            </ThemeIcon>
          </Group>
        </Grid.Col>
      </Grid>
    </div>
  );
};

CrumbLinks.defaultProps = defaultProps;

export default CrumbLinks;
