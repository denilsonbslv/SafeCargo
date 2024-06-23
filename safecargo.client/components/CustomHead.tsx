import NextHead from 'next/head';

interface CustomHeadProps {
  title?: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({ title }) => {
  return (
    <NextHead>
      <title>{title ? `${title} - SafeCargo` : 'SafeCargo'}</title>
      <link rel="icon" href="/images/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  );
};

export default CustomHead;
