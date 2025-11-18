// import { PageHeader, NavToggleMenu } from "@/app/(subpages)/header";
import { PageHeader } from "@/app/components/pageHeader";
import layout from "./layout.module.css";

export default function SubpagesLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className={layout.container}>
      <PageHeader className={layout.header} />
      <div className={layout.content}>
        {children}
        {modal}
      </div>
      <PageFooter className={layout.footer} />
    </div>
  );
}
// TODO: footer
const PageFooter = ({ className }: { className: string }) => {
  return (
    <footer className={className}>
      <p>© footer content...</p>
    </footer>
  );
};
