import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Invoices from "./pages/Invoices";
import Layout from "./Layout";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceDetails from "./pages/InvoiceDetails";

const routes = createBrowserRouter([
    {path: "/", element: <Layout />,
        children:[
            {path: "/", element: <Home />},
            {path: "/create-invoice", element: <CreateInvoice />},
            {path: "/invoices", element: <Invoices />},
            {path: "/invoices/:id" , element: <InvoiceDetails />}
        ]       
    }
]);

export default routes;




