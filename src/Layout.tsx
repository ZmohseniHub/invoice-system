import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900">
      <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Outlet />
        </main>
      <Footer />
    </div>
  );
};

export default Layout;
