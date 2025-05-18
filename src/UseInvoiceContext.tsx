import { useContext} from "react";
import { InvoiceContext } from "./InvoiceContext";
import type { ContextType } from "./invoiceType";

const UseInvoiceContext = (): ContextType=> {
  const context = useContext(InvoiceContext)
  if(context === undefined) {
    throw new Error("useInvoiceContext must be used within an InvoiceContextProvider")
  }
  return context
}
export default UseInvoiceContext