import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from "@vercel/analytics/next"

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/gvo1vcm.css" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  );
}
