"use client";

type SmoothScrollLinkProps = {
  targetId: string;
  className?: string;
  children: React.ReactNode;
};

export const SmoothScrollLink = ({
  targetId,
  className,
  children,
}: SmoothScrollLinkProps) => {
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <a href={`#${targetId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}