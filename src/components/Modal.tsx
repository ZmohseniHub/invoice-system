import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { ItemType } from "../invoiceType";
import UseInvoiceContext from "../UseInvoiceContext";
import { toPersian, toEnglish, isNumber } from "../utils/numberUtils";

const Modal = () => {
  const { modalMode, selectedItem, oncloseModal, addItem, editItem } =
    UseInvoiceContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ItemType>({
    defaultValues: {
      productName: "",
      productPrice: "",
      productQuantity: "",
      total: 1,
      description: "",
    },
  });

  const handleNumberChange =
    (fieldName: keyof ItemType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "" || isNumber(value)) {
        const englishValue = toEnglish(value);
        e.target.value = toPersian(englishValue);
        setValue(fieldName, englishValue as unknown as string, {
          shouldValidate: true,
        });
      }
    };

  const onSubmit = (data: ItemType) => {
    if (data) {
      if (modalMode === "add") {
        const item: Omit<ItemType, "id"> = {
          productName: data.productName,
          productPrice: toEnglish(data.productPrice),
          productQuantity: toEnglish(data.productQuantity),
          total:   Number(toEnglish(data.productPrice)) * Number(toEnglish(data.productQuantity)),
          description: data.description ? data.description : "",
        };
        addItem(item);
      }
      if (modalMode === "edit" && selectedItem) {
        editItem(selectedItem.id, data);
      }
    }

    oncloseModal();
  };
  useEffect(() => {
    if (modalMode === "add") {
      reset();
    } else if (modalMode === "edit" && selectedItem) {
      reset({
        ...selectedItem,
        productPrice: toPersian(selectedItem.productPrice),
        productQuantity: toPersian(selectedItem.productQuantity),
      });
    }
  }, [modalMode, reset, selectedItem]);
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm  z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-md bg-white shadow-[10px_4px_12px_rgba(0,0,0,0.2)] p-4 sm:p-8 rounded-lg"
      >
        <div className="w-full py-4 md:py-6 columns-1">
          <div className="w-full py-2 flex items-center justify-between">
            <label className="grow-0 w-[70px] ml-2 text-sm sm:text-base">
              نام کالا
            </label>
            <input
              className={`no-spinners grow shadow border ${
                errors.productName ? `border-red-400` : `border-slate-400`
              } rounded max-w-full py-1 pr-1 text-gray-700 focus:outline-none focus:shadow-outline`}
              type="text"
              {...register("productName", { required: true })}
            />
          </div>
          <div className="w-full py-2 flex items-center justify-between">
            {" "}
            <label className="grow-0 w-[70px] ml-2 text-sm sm:text-base">
              تعداد
            </label>
            <input
              className={`no-spinners grow shadow border ${
                errors.productQuantity ? `border-red-400` : `border-slate-400`
              } rounded max-w-full py-1 pr-1 text-gray-700 focus:outline-none focus:shadow-outline`}
              inputMode="numeric"
              type="text"
              {...register("productQuantity", { required: true })}
              onChange={handleNumberChange("productQuantity")}
              value={toPersian(watch("productQuantity"))}
            />
          </div>
          <div className="w-full py-2 flex items-center justify-between">
            {" "}
            <label className="grow-0 w-[70px] ml-2 text-sm sm:text-base">
            فی(تومان)
            </label>
            <input
              className={`no-spinners grow shadow border ${
                errors.productPrice ? `border-red-400` : `border-slate-400`
              } rounded max-w-full py-1 pr-1 text-gray-700 focus:outline-none focus:shadow-outline`}
              inputMode="numeric"
              type="text"
              {...register("productPrice", { required: true })}
              onChange={handleNumberChange("productPrice")}
              value={toPersian(watch("productPrice"))}
            />
          </div>
          <div className="w-full py-2 flex items-center justify-between">
            <label className="grow-0 w-[70px] ml-2 text-sm sm:text-base">
              شرح
            </label>
            <input
              className="no-spinners grow shadow border border-slate-400 rounded max-w-full py-1 pr-1 text-gray-700 focus:outline-none focus:shadow-outline"
              type="text"
              {...register("description")}
            />
          </div>
        </div>
        <div className="w-full py-2 flex items-center justify-center gap-4">
          <button
            className="py-2 px-6 bg-slate-700 text-white text-sm md:text-l rounded-2xl cursor-pointer"
            type="button"
            onClick={oncloseModal}
          >
            بستن
          </button>
          <button
            className="py-2 px-6 bg-slate-700 text-white text-sm md:text-l rounded-2xl cursor-pointer"
            type="submit"
          >
            تایید
          </button>
        </div>
      </form>
    </div>
  );
};
export default Modal;
