import { AppProps } from 'next/app';
import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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

    </>
  );
}

export default MyApp;
