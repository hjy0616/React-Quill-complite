"use client";

import { Theme } from "@radix-ui/themes";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen overflow-hidden max-w-screen-mb">
      <Theme>{children}</Theme>
    </div>
  );
}
