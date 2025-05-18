import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ContextType, InvoiceType, ItemType } from "./invoiceType";
import { v4 as uuidv4 } from "uuid";
import { toEnglish, toPersian } from "./utils/numberUtils";
import moment from "moment-jalaali";

export const InvoiceContext = createContext<ContextType | undefined>(undefined);

export const InvoiceContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {

  const [invoices, setInvoices] = useState<InvoiceType[]>(() => {
    const saved = localStorage.getItem("invoices");
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("خطا در parse:", e);
      return [];
    }
  });

  const [currentInvoice, setCurrentInvoice] = useState<InvoiceType>(() => {
    if (invoices.length > 0) {
      const lastInvoice = invoices[invoices.length - 1];
      const lastNumber = parseInt(toEnglish(lastInvoice.invoiceNumber)) || 0;
      return {
        ...lastInvoice,
        id: "",
        invoiceNumber: toPersian((lastNumber + 1).toString().padStart(5, '0')),
        buyer: "",
        description:"",
        items: [],
      };
    }
    return {
      id: "",
      invoiceNumber: toPersian("00001"),
      buyer: "",
      date: toPersian(moment().format("jYYYY/jMM/jDD")),
      description: "",
      items: [],
    };
  });

  const [mainInvoice, setMainInvoice] = useState<InvoiceType>({
    id: "",
    invoiceNumber: "",
    buyer: "",
    date: "",
    description: "",
    items: [],
  });


  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState<ItemType | undefined>(
    undefined
  );

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices, currentInvoice]);

  const addItem = (item: Omit<ItemType, "id">) => {
    const newItem: ItemType = { ...item, id: uuidv4() };
    setCurrentInvoice({
      ...currentInvoice,
      items: [...currentInvoice.items, newItem],
    });
  };

  const deleteItem = (id: string) => {
    const updatedItems = currentInvoice.items.filter((item) => item.id !== id);
    setCurrentInvoice({ ...currentInvoice, items: updatedItems });
  };
  const editItem = (id: string, newItem: ItemType) => {
    const updatedItems = currentInvoice.items.map((item) =>
      item.id === id ? { ...item, ...newItem } : item
    );
    setCurrentInvoice({ ...currentInvoice, items: updatedItems });
  };
  const oncloseModal = () => {
    setIsOpenModal(false);
  };


  const saveInvoices = () => {
    const lastInvoiceNumber =
      invoices.length > 0
        ? parseInt(toEnglish(invoices[invoices.length - 1].invoiceNumber))
        : 0;
    const nextInvoiceNumber = lastInvoiceNumber + 1;
  
    const newInvoice: InvoiceType = {
      ...currentInvoice,
      id: uuidv4(),
      invoiceNumber: toPersian(nextInvoiceNumber.toString().padStart(5, "0")),
      date: currentInvoice.date || toPersian(moment().format("jYYYY/jMM/jDD")),
    };
  
    setInvoices((prev) => [...prev, newInvoice]);
  
    setCurrentInvoice({
      id: "",
      invoiceNumber: toPersian((nextInvoiceNumber + 1).toString().padStart(5, "0")),
      buyer: "",
      date: toPersian(moment().format("jYYYY/jMM/jDD")), 
      description: "",
      items: [],
    });
  };
  const getInvoiceById = (id: string) => {
    const foundInvoice = invoices.find((invoice) => invoice.id === id);
    if (foundInvoice) {
      setMainInvoice(foundInvoice);
    }
  };
  const updateInvoice = (id: string, newInvoice: InvoiceType) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === id ? { ...newInvoice, id } : invoice
      )
    );
  };
  const deleteInvoice = (id: string) => {
    const updatedInvoice = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updatedInvoice);
  };

  return (
    <InvoiceContext.Provider
      value={{
        mainInvoice,
        setMainInvoice,
        updateInvoice,
        getInvoiceById,
        deleteInvoice,
        invoices,
        setInvoices,
        currentInvoice,
        setCurrentInvoice,
        addItem,
        deleteItem,
        editItem,
        modalMode,
        setModalMode,
        isOpenModal,
        setIsOpenModal,
        selectedItem,
        setSelectedItem,
        oncloseModal,
        saveInvoices,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
