import { AppProps } from 'next/app';
import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { ConnectionProvider } from 'providers/connection';
import { WalletProvider } from 'providers/wallet';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConnectionProvider>
      <WalletProvider>
        <Global
          styles={css`
          ${emotionNormalize}
            html,
            body {
              padding: 0;
              margin: 0;
              background: white;
              min-height: 100%;
              font-family: sans-serif;
            }
        `}
        />
        <Component {...pageProps} />
        ;
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
