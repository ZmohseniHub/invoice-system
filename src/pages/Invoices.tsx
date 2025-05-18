import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import type { InvoiceType } from "../invoiceType";
import UseInvoiceContext from "../UseInvoiceContext";
import GenericTable from "../components/GenericTable";
import { toEnglish,toPersian } from "../utils/numberUtils";


const Invoices = () => {
  const { invoices, deleteInvoice } = UseInvoiceContext();
  const location = useLocation();
  const headerTitle: string = location.state?.headerTitle || "همه فاکتورها";
  const displayedInvoices: InvoiceType[] = location.state?.filterdInvoices || invoices;

  const calculateTotal = () => {
    return displayedInvoices.reduce((totalSum, invoice) => {
      const invoiceTotal = invoice.items.reduce((sum, item) => {
        return sum + (Number(toEnglish(item.productQuantity)) * Number(toEnglish(item.productPrice)));
      }, 0);
      return totalSum + invoiceTotal;
    }, 0);
  };

  const headers = ["شماره فاکتور", "تاریخ", "خریدار", "قیمت", "عملیات"];
  const rows = displayedInvoices.map((invoice: InvoiceType) => [
    toPersian(invoice.invoiceNumber),
    toPersian(invoice.date),
    invoice.buyer,
    `${toPersian(invoice.items.reduce((sum, item) => sum + (item.total || 0), 0).toLocaleString())} تومان`,
    <div className="w-full flex flex-col lg:flex-row justify-center align-center gap-1 p-1 lg:p-2">
      <Link
        to={`/invoices/${invoice.id}`}
        className="md:grow py-1 lg:px-3 bg-slate-700 text-white text-sm md:text-l rounded-2xl cursor-pointer"
      >
        مشاهده
      </Link>
      <button
       className="md:grow py-1 lg:px-3 bg-slate-700 text-white text-sm md:text-l rounded-2xl cursor-pointer"
       onClick={() => deleteInvoice(invoice.id)}>
        حذف
      </button>
    </div>
  ]);
  const footer = (
    <p>جمع کل فاکتور: {toPersian(calculateTotal().toLocaleString())} تومان</p>
  );

  return (
    <div className="w-full columns-1 p-3 md:p-4 my-8 border border-slate-500 bg-slate-50 rounded">
      <div className="w-full text-center py-4 md:py-6 border-b border-dashed border-slate-600">
        <h2 className="text-[22px] sm:text-4xl text-slate-700">
          {headerTitle}
        </h2>
      </div>
      <GenericTable
        headers={headers}
        rows={rows}
        className="text-slate-700"
        emptyMessage=" هنوز هیچ فاکتوری ثبت نشده"
        footer={footer}
      />
    </div>
  );
};

export default Invoices;

