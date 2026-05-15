import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold leading-none transition-colors duration-150 ring-offset-2 ring-offset-background";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-contrast hover:bg-primary-hover focus-visible:bg-primary-hover",
  secondary:
    "bg-accent text-foreground hover:bg-accent-hover hover:text-primary-contrast focus-visible:bg-accent-hover focus-visible:text-primary-contrast",
  ghost:
    "bg-transparent text-primary border border-border-strong hover:bg-surface-muted",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AnchorProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children"> & {
    href: string;
    external?: boolean;
  };

export function CtaLink({
  variant = "primary",
  className = "",
  external,
  href,
  children,
  ...rest
}: AnchorProps) {
  const cls = `${baseStyles} ${variantStyles[variant]} ${className}`;
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
