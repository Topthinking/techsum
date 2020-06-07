import * as React from "react";

export default (props) => {
  const { Head, Html, Script } = props;
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>前端技术摘要</title>
        <link
          rel="shortcut icon"
          href="https://fdfs.xmcdn.com/group80/M07/1B/42/wKgPDF7JTR3guTJDAAASnx7Vvbc422.jpg"
        />
        <Head />
      </head>
      <body>
        <Html />
        <Script />
      </body>
    </html>
  );
};
