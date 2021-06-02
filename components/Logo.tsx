import Image from 'next/image';

interface Props {
  height: string;
}

function Logo({ height }: Props) {
  return (
    <Image
      src="/images/logo.svg"
      alt="mona logo"
      height={height}
      width={height}
    />
  );
}

export default Logo;
