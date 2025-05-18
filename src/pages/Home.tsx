import React, { useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaFileInvoice, FaPlus } from "react-icons/fa";
import UseInvoiceContext from "../UseInvoiceContext";
import moment from "moment-jalaali";
import { toPersian } from "../utils/numberUtils";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

const Home: React.FC = () => {
  const {invoices} = UseInvoiceContext()
  const todaysInvoices = invoices.filter((invoice) => (invoice.date) === toPersian(moment().format("jYYYY/jMM/jDD")))
  const navigate = useNavigate()



  const todaysSale = todaysInvoices.reduce((sum, invoice) => {
    const invoiceTotal = invoice.items.reduce((itemSum, item) => {
      return itemSum + (item.total ?? 0);
    }, 0);
    return sum + invoiceTotal;
  }, 0);

  const handleTodayInvoicesClick = (value:string) => {
    navigate("/invoices", {
      state:{
        headerTitle: value,
        filterdInvoices: todaysInvoices
      }
    })
  }
  useEffect(()=> {
    console.log(todaysSale);
    
  })
  return (
    <div className="w-full min-h-avh mx-auto">
      <div className="w-full grid-cols-1 py-4 md:py-6 bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
          <Link
            to="/create-invoice"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <div className="bg-slate-200 p-4 rounded-full mb-4">
              <FaPlus className="text-slate-700 text-2xl" />
            </div>
            <h2 className="font-semibold text-lg">فاکتور جدید</h2>
            <p className="text-slate-500 mt-2 text-sm">
              ایجاد فاکتور فروش جدید
            </p>
          </Link>

          <Link
            to="/invoices"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
          >
            <div className="bg-slate-200 p-4 rounded-full mb-4">
              <FaFileInvoice className="text-slate-700 text-2xl" />
            </div>
            <h2 className="font-semibold text-lg">لیست فاکتورها</h2>
            <p className="text-slate-500 mt-2 text-sm">
              مشاهده و مدیریت فاکتورها
            </p>
          </Link>
        </div>

        <div className="max-w-4xl mt-10 sm:mt-16 mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold text-lg mb-4">آمار امروز</h2>

          <div className="grid grid-cols-2 gap-6 py-6" >
            <div className="bg-slate-100 p-4 sm:p-6 rounded text-center shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => handleTodayInvoicesClick("فاکتورهای امروز")}>
              <p className="text-slate-500">فاکتورهای امروز</p>
              <p className="font-bold text-xl mt-2">{todaysInvoices.length}</p>
            </div>

            <div className="bg-slate-100 p-4 sm:p-6 rounded text-center shadow-md hover:shadow-lg cursor-pointer"
            onClick={() => handleTodayInvoicesClick("فروش امروز")}>
              <p className="text-slate-500">فروش امروز</p>
              <p className="font-bold text-xl mt-2">{toPersian(todaysSale.toLocaleString())} تومان</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
