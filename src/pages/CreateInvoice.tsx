import { useForm } from "react-hook-form";
import type { HeaderType } from "../invoiceType";
import InvoiceTable from "../components/InvoiceTable";
import UseInvoiceContext from "../UseInvoiceContext";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

import { toPersian, toEnglish, isNumber } from "../utils/numberUtils";
import { useEffect } from "react";



const CreateInvoice = () => {
  const {
    saveInvoices,
    currentInvoice,
    setModalMode,
    setIsOpenModal,
    isOpenModal,
    setCurrentInvoice,
  } = UseInvoiceContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HeaderType>({});

  const handleNumberChange =
    (fieldName: keyof HeaderType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "" || isNumber(value)) {
        const englishValue = toEnglish(value);
        e.target.value = toPersian(englishValue);
        setValue(
          fieldName,
          englishValue as unknown as HeaderType[keyof HeaderType],
          { shouldValidate: true }
        );
      }
    };

  const onSubmit = (data: HeaderType) => {
    setCurrentInvoice((prev) => ({
      ...prev,
      invoiceNumber: data.invoiceNumber,
      buyer: data.buyer,
      date: data.date,
      description: data.description ? data.description : "",
    }));
    console.log("invoice number:", data.invoiceNumber);
    
    setModalMode("add");
    setIsOpenModal(true);
  };

  useEffect(() => {
    setValue("invoiceNumber", currentInvoice.invoiceNumber);
    setValue("buyer", currentInvoice.buyer);
    setValue("date", currentInvoice.date);
    setValue("description", currentInvoice.description);
  }, [currentInvoice, setValue]);


  return (
    <div className="w-full columns-1 p-3 md:p-4 my-8 border border-slate-500 rounded bg-slate-50">
      <div className="w-full text-center py-4 md:py-6 border-b border-dashed border-slate-600">
        <h2 className="text-[22px] sm:text-4xl text-slate-700">فاکتور فروش</h2>
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full text-slate-700"
          noValidate
        >
          <div className="w-full py-4 md:py-6 columns-1 sm:columns-2 gap-4">
            <div className="w-full py-1 sm:p-y-3 flex items-center justify-between">
              <label className="grow-0 w-[50px] sm:w-[100px] text-sm sm:text-base">
                <span className="text-red-600">*</span>
                شماره فاکتور
              </label>
              <input
                className={`no-spinners grow shadow border ${
                  errors.invoiceNumber ? `border-red-400` : `border-slate-400`
                } rounded max-w-full py-1 pr-1 text-gray-700 focus:outline-none focus:shadow-outline`}
                type="text"
                inputMode="numeric"
                {...register("invoiceNumber", {
                  required: "وارد کردن شماره فاکتور الزامی است.",
                  validate: (value) => isNumber(value) || "فقط عدد مجاز است",
                })}
                onChange={handleNumberChange("invoiceNumber")}
                value={toPersian(watch("invoiceNumber"))}
              />
            </div>

            <div className="w-full py-1 sm:p-y-3 flex items-center justify-between">
              <label className="grow-0 w-[50px] sm:w-[100px] text-sm sm:text-base">
                <span className="text-red-600">*</span>
                خریدار
              </label>
              <input
                className={`grow shadow border ${
                  errors.buyer ? `border-red-400` : `border-slate-400`
                } rounded max-w-full py-1 pr-1 text-gray-700  focus:outline-none focus:shadow-outline`}
                type="text"
                {...register("buyer", {
                  required: {
                    value: true,
                    message: "وارد کردن نام خریدار الزامی است.",
                  },
                })}
              />
            </div>
            <div className="w-full py-1 sm:p-y-3 flex items-center justify-between">
              <label className="grow-0 w-[50px] text-sm sm:text-base">
                <span className="text-red-600">*</span>
                تاریخ
              </label>
              <input
                className={`grow shadow border ${
                  errors.date ? `border-red-400` : `border-slate-400`
                } rounded max-w-full py-1 pr-1 text-gray-700 focus:outline-none focus:shadow-outline`}
                type="text"
                {...register("date", {
                  required: "وارد کردن تاریخ الزامی است.",
                })}
                onChange={handleNumberChange("date")}
                value={toPersian(watch("date"))}
              />
            </div>
            <div className="w-full py-1 sm:p-y-3 flex items-center justify-between">
              <label className="grow-0 w-[50px] text-sm sm:text-base">
                شرح
              </label>
              <input
                className="grow shadow border border-slate-400 border rounded max-w-full py-1 pr-1 text-gray-700  focus:outline-none focus:shadow-outline"
                type="text"
                {...register("description")}
              ></input>
            </div>
          </div>
          <div className="block">
            {errors.invoiceNumber && (
              <span className="text-red-500 text-xs mt-1 pr-[100px] sm:pr-[110px]">
                {errors.invoiceNumber.message}
              </span>
            )}
            {errors.buyer && (
              <span className="text-red-500 text-xs mt-1 pr-[100px] sm:pr-[110px]">
                {errors.buyer.message}
              </span>
            )}
            {errors.date && (
              <span className=" text-red-500 text-xs mt-1 pr-[100px] sm:pr-[110px]">
                {errors.date.message}
              </span>
            )}
          </div>
          <button
            className="px-5 sm:px-10 py-1 sm:py-2 mt-4 bg-slate-700 text-white text-sm sm:text-l text-center rounded-xl cursor-pointer"
            type="submit"
          >
            اضافه کردن کالا
          </button>
        </form>
      </div>
      {isOpenModal && <Modal />}
      <InvoiceTable />
      {currentInvoice.items.length > 0 && (
        <div className="w-full py-4 md:py-6 text-center">
          <button
            className="w-full py-2 sm:py-4 bg-slate-700 text-white text-sm sm:text-l rounded-2xl cursor-pointer"
            type="button"
            onClick={() => {
              saveInvoices();
            }}
          >
            ثبت فاکتور
          </button>
        </div>
      )}

      <Link
        to="/invoices"
        className="w-full block mt-2 py-2 sm:py-4 bg-slate-700 text-center text-white text-sm sm:text-l rounded-2xl cursor-pointer"
      >
        نمایش همه فاکتورها
      </Link>
    </div>
  );
};
export default CreateInvoice;