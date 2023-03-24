import {CSSProperties, MouseEventHandler} from "react";

type HTMLElementAttributes = {
  title?: string;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
  style?: CSSProperties;
  className?: string;
  ext?: string;
  width?: number;
  role?: string;
};

export type PropsWithHTMLElementAttributes<T> = T & HTMLElementAttributes;
