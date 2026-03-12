"use client";

import { cn } from "@/lib/utils";

type ShimmerButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof React.ButtonHTMLAttributes<HTMLButtonElement>>;

export function ShimmerButton({
  children,
  className,
  href,
  ...props
}: ShimmerButtonProps) {
  const baseClassName = cn(
    "relative inline-flex items-center justify-center overflow-hidden",
    "rounded-xl px-6 py-3",
    "bg-gradient-to-r from-teal to-teal-dark",
    "font-heading font-semibold text-white",
    "shadow-lg shadow-teal/20",
    "transition-all duration-200",
    "hover:shadow-xl hover:shadow-teal/30 hover:scale-[1.02]",
    "active:scale-[0.98]",
    className,
  );

  const shimmer = (
    <span
      aria-hidden="true"
      className="animate-shimmer pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
    />
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClassName}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {shimmer}
        {children}
      </a>
    );
  }

  return (
    <button
      className={baseClassName}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {shimmer}
      {children}
    </button>
  );
}
