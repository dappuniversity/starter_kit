/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Web3ReactProvider } from '@web3-react/core';
import { SWRConfig } from 'swr';

import AppLayout from 'components/layout/AppLayout';
import { AuthRouter } from 'components/utility';
import site from 'config/site';
import theme from 'config/theme';
import { getWeb3Library } from 'config/web3';
import { AccountProvider } from 'contexts/account';
import { BasketProvider } from 'contexts/basket';
import { BasketsProvider } from 'contexts/baskets';
import CrumbsProvider from 'contexts/crumbs/crumbsProvider';

import 'styles/globals.css';

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [SWRfallback, setSWRfallback] = useState({});

  return (
    <Web3ReactProvider getLibrary={ getWeb3Library }>
      <SWRConfig value={ { fallback: SWRfallback } }>
        <AccountProvider>
          <BasketsProvider>
            <BasketProvider>
              <CrumbsProvider>
                <Head>
                  <title>{ site.NAME }</title>
                  <meta content="Web3 application to track users traffic" name="description" />
                  <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
                  <link href="/favicon.ico" rel="icon" />
                  <link
                    as="font"
                    crossOrigin=""
                    href="/static/fonts/Anurati/Anurati-Regular.otf"
                    rel="preload"
                    type="font/otf"
                  />
                  <link
                    as="font"
                    crossOrigin=""
                    href="/static/fonts/Blessed/Blessed-Light.ttf"
                    rel="preload"
                    type="font/ttf"
                  />
                  { /*
                  <link
                    as="image"
                    href="/static/images/home/page-background.jpg"
                    imagesrcset="/_next/image?url=%2Fstatic%2Fimages%2Fhome%2Fpage-background.jpg&w=640&q=75 640w, /_next/image?url=%2Fstatic%2Fimages%2Fhome%2Fpage-background.jpg&w=750&q=75 750w, /_next/image?url=%2Fstatic%2Fimages%2Fhome%2Fpage-background.jpg&w=828&q=75 828w, /_next/image?url=%2Fstatic%2Fimages%2Fhome%2Fpage-background.jpg&w=1080&q=75 1080w, /_next/image?url=%2Fstatic%2Fimages%2Fhome%2Fpage-background.jpg&w=1200&q=75 1200w, /_next/image?url=%2Fstatic%2Fimages%2Fhome%2Fpage-background.jpg&w=1920&q=75 1920w, /_next/image?url=%2Fstatic%2Fimages%2Fhome%2Fpage-background.jpg&w=2048&q=75 2048w, /_next/image?url=%2Fstatic%2Fimages%2Fhome%2Fpage-background.jpg&w=3840&q=75 3840w"
                    rel="preload"
                  />
                  */ }
                </Head>
                <MantineProvider
                  theme={ theme.mantine }
                  withGlobalStyles
                  withNormalizeCSS
                >
                  <NotificationsProvider>
                    <AuthRouter>
                      <AppLayout>
                        <Component
                          { ...pageProps }
                          onSetSWRfallback={ setSWRfallback }
                        />
                      </AppLayout>
                    </AuthRouter>
                  </NotificationsProvider>
                </MantineProvider>
              </CrumbsProvider>
            </BasketProvider>
          </BasketsProvider>
        </AccountProvider>
      </SWRConfig>
    </Web3ReactProvider>
  );
};

export default App;
