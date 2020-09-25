import React from "react";
import ReactDOM from "react-dom";
import { I18nContext, I18nManager } from "@shopify/react-i18n";
import { CookiesProvider } from "react-cookie";

import App from "./App";

const locale = "en";
const i18nManager = new I18nManager({
  locale,
  onError(error) {
    //Bugsnag.notify(error);
  }
});
const rootElement = document.getElementById("root");

export default function Apps() {
  return (
    <I18nContext.Provider value={i18nManager}>
      <App />
    </I18nContext.Provider>
  );
}

ReactDOM.render(
  <CookiesProvider>
    <React.StrictMode>
      <Apps />
    </React.StrictMode>
  </CookiesProvider>,
  rootElement
);
