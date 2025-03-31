export type TypographyType = {
  className?: string;
  children?: Readonly<React.ReactNode>;
};

export interface TitleProps extends TypographyType {
  level?: 1 | 2 | 3;
}

export interface SubTitleProps extends TypographyType {
  level?: 1 | 2 | 3;
}

export interface BodyProps extends TypographyType {
  level?: 1 | 2 | 3 | 4;
}

export interface CaptionProps extends TypographyType {
  level?: 1 | 2 | 3;
}
