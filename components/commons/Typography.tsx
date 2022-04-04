interface TypographyProps {
  children: string;
}

export default function Typography({ children }: TypographyProps) {
  return <span>{children}</span>;
}
