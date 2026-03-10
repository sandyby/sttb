declare module "react-responsive-masonry" {
  import { FC, ReactNode } from "react";

  export interface MasonryProps {
    children: ReactNode;
    gutter?: string | number;
    className?: string;
    style?: React.CSSProperties;
  }

  export const Masonry: FC<MasonryProps>;

  export interface ResponsiveMasonryProps {
    children: ReactNode;
    columnsCountBreakPoints: Record<number, number>;
    className?: string;
    style?: React.CSSProperties;
  }

  export const ResponsiveMasonry: FC<ResponsiveMasonryProps>;
}
