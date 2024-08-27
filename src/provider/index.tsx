import { type PropsWithChildren } from "react";

import { I18nProviderClient } from "@/locales/client";

import MuiProvider from "./MuiThemeProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import RTLProvider from "./RTLProvider";
import { ToastContainer } from "react-toastify";
import { TodoContext } from "@/context";

export default function Provider({ children, locale }: PropsWithChildren<{ locale: string }>) {
  return (
    <I18nProviderClient locale={locale}>
      <ToastContainer />
      <ReactQueryProvider>
        <RTLProvider locale={locale}>
          <MuiProvider>
            <TodoContext>{children}</TodoContext>
          </MuiProvider>
        </RTLProvider>
      </ReactQueryProvider>
    </I18nProviderClient>
  );
}
