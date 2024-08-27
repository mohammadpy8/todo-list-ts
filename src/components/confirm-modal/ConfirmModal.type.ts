import type { ReactNode } from "react";

interface IConfirmModal {
  title?: string | ReactNode;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  window?: () => Window;
}

export type { IConfirmModal };
