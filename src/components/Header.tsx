import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="container px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl py-2 sm:py-4 sm:text-2xl font-bold">
            سیستم مدیریت فاکتورها
          </h1>
          <p className="text-sm sm:text-base hidden sm:block">
            مدیریت حرفه‌ای فاکتورهای فروش
          </p>
        </div>

        <button
          className="sm:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <nav className="hidden sm:flex gap-6 font-medium">
          <Link
            to="/"
            className="px-5 py-1 border border-slate-800 rounded-2xl hover:border-white"
          >
            خانه
          </Link>
          <Link
            to="/invoices"
            className="px-5 py-1 border border-slate-800 rounded-2xl hover:border-white"
          >
            فاکتورها
          </Link>
        </nav>
      </div>

      {isOpen && (
        <div className="sm:hidden pb-4">
          <nav className="flex flex-col gap-4 font-medium">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="w-[110px] text-center py-1 border border-slate-800 rounded-2xl hover:border-white"
            >
              خانه
            </Link>
            <Link
              to="/invoices"
              onClick={() => setIsOpen(false)}
              className="w-[110px] text-center py-1 border border-slate-800 rounded-2xl hover:border-white"
            >
              فاکتورها
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
