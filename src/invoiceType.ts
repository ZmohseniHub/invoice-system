export interface ItemType{
    id: string
    productName: string
    productQuantity: string
    productPrice: string
    total: number
    description ?: string
}
export interface HeaderType{
    id: string
    invoiceNumber: string
    buyer: string
    date: string
    description ?: string
}
export interface InvoiceType{
    id: string
    invoiceNumber: string
    buyer: string
    date: string
    description: string
    items: ItemType[]
}

export interface ContextType{
    currentInvoice: InvoiceType
    setCurrentInvoice: React.Dispatch<React.SetStateAction<InvoiceType>>
    mainInvoice:InvoiceType
    setMainInvoice: React.Dispatch<React.SetStateAction<InvoiceType>>
    invoices: InvoiceType[]
    setInvoices: React.Dispatch<React.SetStateAction<InvoiceType[]>>
    addItem: (newItem: Omit<ItemType, "id">) => void
    deleteItem: (id:string) => void
    editItem: (id: string, newItem: ItemType) => void;
    modalMode: "add" | "edit"
    setModalMode:  React.Dispatch<React.SetStateAction<"add" | "edit">>
    isOpenModal: boolean
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedItem: ItemType | undefined
    setSelectedItem: React.Dispatch<React.SetStateAction<ItemType | undefined>>
    oncloseModal: () => void
    saveInvoices: () => void
    deleteInvoice: (id: string) => void;
    getInvoiceById: (id:string) => void;
    updateInvoice: (id:string , newInvoice: InvoiceType) => void
}

