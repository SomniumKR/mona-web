import { CSSProperties } from 'react';
import { HEADER_HEIGHT } from 'constants/styles';
import { toast } from 'react-toastify';
import { COLORS } from 'constants/colors';

const notificationOptions = (style?: CSSProperties) => ({
  style: {
    top: HEADER_HEIGHT, background: COLORS.red03, color: COLORS.white, minHeight: '100%', ...style,
  },
  autoClose: 3000,
  hideProgressBar: true,
});

export const notify = (
  message: string,
  style?:CSSProperties,
) => toast(message, notificationOptions(style));
