"use client";

import { type PropsWithChildren } from "react";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

export default function RTLProvider({ children, locale }: PropsWithChildren<{ locale: string }>) {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin]
  });

  if (locale !== "fa") return children;
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
