import "../app/globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useRouter } from "next/router";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className='flex flex-col min-h-screen'>
      {router.pathname !== "/signin" && router.pathname !== "/signup" && (
        <Navbar />
      )}
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
}
