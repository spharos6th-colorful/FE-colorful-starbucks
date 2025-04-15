import Footer from '@/components/layouts/Footer';

export default function layout({
  children,
}: {
  children?: Readonly<React.ReactNode>;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
