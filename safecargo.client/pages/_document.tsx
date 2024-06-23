import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Componente Document
 *
 * Este componente personaliza a estrutura HTML da aplicação.
 * Utilizado para adicionar favicons, meta tags e fontes externas.
 *
 * @returns {JSX.Element} Documento HTML personalizado
 */
export default function Document() {
  return (
    <Html>
      <Head>
        <title>SafeCargo</title>
        <link rel="icon" href="/images/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
