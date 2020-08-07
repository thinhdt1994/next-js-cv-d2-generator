import React from "react";
import "../styles/antd.less";
import "../styles/global.less";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}