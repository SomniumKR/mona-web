import { AppProps } from 'next/app';
import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { wrapper } from 'store';
import { SFProTextFont } from 'styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
              ${SFProTextFont}
            }
        `}
      />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
export default wrapper.withRedux(MyApp);
