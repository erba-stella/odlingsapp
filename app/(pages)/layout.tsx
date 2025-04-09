import { PageHeader } from "@/app/components/header/page_header"

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
       <PageHeader />
        {children}
    </>
  );
}