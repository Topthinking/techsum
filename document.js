import * as React from "react";
import meta from "./.meta.js";

export default (props) => {
  const { Head, Html, Script } = props;
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>{meta.name}</title>
        <link rel="shortcut icon" href={meta.logo} />
        <Head />
      </head>
      <body>
        <Html />
        <Script />
      </body>
    </html>
  );
};
