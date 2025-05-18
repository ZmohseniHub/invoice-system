import { useFieldArray, useForm } from "react-hook-form";
import UseInvoiceContext from "../UseInvoiceContext";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { InvoiceType, ItemType } from "../invoiceType";
import { toPersian, toEnglish } from "../utils/numberUtils";
import GenericTable from "../components/GenericTable";
import { v4 as uuidv4 } from "uuid";

const InvoiceDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { getInvoiceById, mainInvoice, updateInvoice } = UseInvoiceContext();
  const { register, handleSubmit, reset, control, watch, setValue } =
    useForm<InvoiceType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getInvoiceById(id);
    }
  }, [id, getInvoiceById]);

  useEffect(() => {
    if (mainInvoice) {
      reset(mainInvoice);
    }
  }, [mainInvoice, reset]);

  const onsubmit = (data: InvoiceType) => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      const updatedItems = data.items.map((item) => {
        const quantity = Number(toEnglish(item.productQuantity)) || 0;
        const price = Number(toEnglish(item.productPrice)) || 0;
        const total = quantity * price;
        return { ...item, total };
      });

      const updatedInvoice = {
        ...data,
        items: updatedItems,
        invoiceNumber: toEnglish(data.invoiceNumber), 
      };

      updateInvoice(mainInvoice.id, updatedInvoice);
      setIsEditing(false);
    }
  };
  const calculateItemTotal = (item: ItemType) => {
    const quantity = Number(toEnglish(item.productQuantity)) || 0;
    const price = Number(toEnglish(item.productPrice)) || 0;
    return quantity * price;
  };

  const tableHeaders = [
    "نام کالا",
    "تعداد",
    "قیمت واحد",
    "مبلغ کل",
    "شرح",
    ...(isEditing ? ["عملیات"] : []),
  ];

  const tableRows = fields.map((_, index) => {
    const row = [
      <input
        {...register(`items.${index}.productName`)}
        disabled={!isEditing}
        className={`w-full p-1 border rounded ${
          !isEditing
            ? "border-transparent bg-transparent text-center"
            : "border-gray-300"
        }`}
      />,
      <input
        {...register(`items.${index}.productQuantity`)}
        disabled={!isEditing}
        className={`w-full p-1 border rounded ${
          !isEditing
            ? "border-transparent bg-transparent text-center"
            : "border-gray-300"
        }`}
        onChange={(e) => {
          const value = e.target.value;
          setValue(`items.${index}.productQuantity`, toPersian(value));
        }}
        value={toPersian(watch(`items.${index}.productQuantity`))}
      />,
      <input
        {...register(`items.${index}.productPrice`)}
        disabled={!isEditing}
        className={`w-full p-1 border rounded ${
          !isEditing
            ? "border-transparent bg-transparent text-center"
            : "border-gray-300"
        }`}
        onChange={(e) => {
          const value = e.target.value;
          setValue(`items.${index}.productPrice`, toPersian(value));
        }}
        value={toPersian(watch(`items.${index}.productPrice`))}
      />,
      <span>
        {toPersian(
          calculateItemTotal(watch(`items.${index}`)).toLocaleString()
        )}
        تومان
      </span>,
      <input
        {...register(`items.${index}.description`)}
        disabled={!isEditing}
        className={`w-full p-1 border rounded ${
          !isEditing
            ? "border-transparent bg-transparent text-center "
            : "border-gray-300"
        }`}
      />,
    ];

    if (isEditing) {
      row.push(
        <button
          type="button"
          onClick={() => remove(index)}
          className=" px-2 py-1 text-sm bg-slate-700 text-white rounded cursor-pointer"
        >
          حذف
        </button>
      );
    }

    return row;
  });
  const calculateTotal = () => {
    const watchedItems = watch("items") || [];
    return watchedItems.reduce((sum, item) => {
      return (
        sum +
        Number(toEnglish(item.productQuantity)) *
          Number(toEnglish(item.productPrice))
      );
    }, 0);
  };
  const footer = (
    <p>جمع کل فاکتور: {toPersian(calculateTotal().toLocaleString())} تومان</p>
  );

  return (
    <div className="w-full columns-1 p-3 md:p-4 my-8 border border-slate-500 bg-slate-50 rounded">
      <div className="w-full text-center py-4 md:py-6 border-b border-dashed border-slate-600">
        <h2 className="text-[22px] sm:text-4xl text-slate-700">
          جزئیات فاکتور
        </h2>
      </div>

      <form
        className="w-full text-slate-700"
        onSubmit={handleSubmit(onsubmit)}
        noValidate
      >
        <div className="w-full py-4 columns-1">
          <div className="py-4 md:py-6 border-b border-slate-600">
            <h2 className="text-xl sm:text-2xl text-slate-700">سربرگ فاکتور</h2>
          </div>
          <div className="w-full  py-4 md:py-6 columns-1">
            <div className="w-full py-1 sm:p-y-3 flex items-center justify-between">
              <label className="w-[100px] ml-2 text-sm sm:text-base">
                شماره فاکتور
              </label>
              <input
                {...register("invoiceNumber")}
                type="text"
                disabled={!isEditing}
                className={`w-full p-2 border rounded ${
                  !isEditing
                    ? "border-transparent bg-transparent"
                    : "border-slate-700"
                }`}
                value={toPersian(watch("invoiceNumber"))}
                readOnly={!isEditing}
              />
            </div>
            <div className="w-full py-1 sm:p-y-3 flex items-center justify-between">
              <label className="w-[100px] ml-2 text-sm sm:text-base">
                خریدار
              </label>
              <input
                {...register("buyer")}
                type="text"
                disabled={!isEditing}
                className={`w-full  p-2 border  rounded ${
                  !isEditing
                    ? `w-full p-2 border border-slate-50`
                    : `border-slate-700`
                }`}
              />
            </div>
            <div className="w-full py-1 sm:p-y-3 flex items-center justify-between">
              <label className="w-[100px] ml-2 text-sm sm:text-base">
                تاریخ
              </label>
              <input
                {...register("date")}
                type="text"
                disabled={!isEditing}
                className={`w-full p-2 border  rounded ${
                  !isEditing
                    ? `w-full p-2 border border-slate-50`
                    : `border-slate-700`
                }`}
              />
            </div>
            <div className="w-full py-1 sm:p-y-3 flex items-center justify-between">
              <label className="w-[100px] ml-2 text-sm sm:text-base">شرح</label>
              <input
                {...register("description")}
                type="text"
                disabled={!isEditing}
                className={`w-full p-2 border  rounded ${
                  !isEditing
                    ? `w-full p-2 border border-slate-50`
                    : `border-slate-700`
                }`}
              />
            </div>
          </div>
          <div className="w-full  py-4 md:py-6 columns-1">
            <div className="py-4 md:py-6 border-b border-slate-600">
              <h2 className="text-xl sm:text-2xl text-slate-700">اقلام</h2>
            </div>

            <GenericTable
              headers={tableHeaders}
              rows={tableRows}
              className="mt-4 text-center "
              emptyMessage="هیچ آیتمی وجود ندارد"
              footer={footer}
            />
          </div>
          {isEditing && (
            <button
              type="button"
              onClick={() =>
                append({
                  id: uuidv4(),
                  productName: "",
                  productQuantity: "۱",
                  productPrice: "",
                  total: 0,
                  description: "",
                })
              }
              className=" w-full bg-green-500 text-white px-4 py-2 rounded"
            >
              + افزودن آیتم
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-slate-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          {!isEditing ? `ویرایش` : `ثبت تغییرات`}
        </button>
      </form>
    </div>
  );
};

export default InvoiceDetails;
