import { SxProps, Theme } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import React, { CSSProperties } from "react";

export type ToastTypes = "success" | "warning" | "error" | "info";

export interface IGlobleImageProps {
  img: string;
  alt: string;
  style?: SxProps<Theme>;
  onClick?: (e: any) => void;
}

export interface IGlobleTitleSeeAllProps {
  varient?: Variant | "inherit";
  title: string;
  btnText?: string;
  style?: CSSProperties;
  onClick?: (e: any) => void;
}

export interface IGlobalButtonProps {
  label: string;
  sublabel?: string | React.ReactNode;
  disabled?: boolean;
  onClick?: (e: any) => void;
  style?: CSSProperties;
  type?: "submit" | "reset";
  startIcon?: React.ReactElement;
}

export interface ILoaderButtonProps extends IGlobalButtonProps {
  variant: "text" | "outlined" | "contained";
  color: "primary" | "success" | "secondary";
  loading?: boolean;
}
