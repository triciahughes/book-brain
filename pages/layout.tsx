import "../app/globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='app-container'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
