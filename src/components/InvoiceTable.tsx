import type { ItemType } from "../invoiceType";
import UseInvoiceContext from "../UseInvoiceContext";
import { calculatePersianNumbers, toPersian, toEnglish } from "../utils/numberUtils";
import GenericTable from "./GenericTable";

const InvoiceTable = () => {
  const {
    currentInvoice,
    deleteItem,
    setIsOpenModal,
    setModalMode,
    setSelectedItem,
  } = UseInvoiceContext();

  const editHandler = (item: ItemType) => {
    setIsOpenModal(true);
    setModalMode("edit");
    setSelectedItem(item);
  };


  const calculateTotal = () => {
    return currentInvoice.items.reduce((sum, item) => {
      return sum + (Number(toEnglish(item.productQuantity)) * Number(toEnglish(item.productPrice)));
    }, 0);
  };


  const headers = [
    "نام کالا",
    "تعداد",
    "فی",
    "مبلغ کل",
    "شرح",
    "عملیات"
  ];

  const rows = currentInvoice.items.map((item: ItemType) => [
    item.productName,
    toPersian(item.productQuantity),
    toPersian(item.productPrice),
    `${(calculatePersianNumbers(item.productQuantity, item.productPrice))} تومان`,
    item.description,
    <div className="w-full flex flex-col lg:flex-row justify-center align-center gap-1 p-1 lg:p-2">
      <button
        className="md:grow py-1 lg:px-3 bg-slate-700 text-white text-sm md:text-l rounded-2xl cursor-pointer"
        onClick={() => editHandler(item)}
      >
        ویرایش
      </button>
      <button
        className="md:grow py-1 lg:px-3 bg-slate-700 text-white text-sm md:text-l rounded-2xl cursor-pointer"
        onClick={() => deleteItem(item.id)}
      >
        حذف
      </button>
    </div>
  ]);


  const footer = (
    <p>جمع کل فاکتور: {toPersian(calculateTotal().toLocaleString())} تومان</p>
  );

  return (
    <GenericTable
      headers={headers}
      rows={rows}
      footer={footer}
      emptyMessage="هنوز هیچ کالایی ثبت نشده"
      className="text-slate-700"
    />
  );
};

export default InvoiceTable;