import { RouterProvider } from "react-router-dom";
import { InvoiceContextProvider } from "./InvoiceContext";
import routes from "./routes";
function App() {
  return (
    <InvoiceContextProvider>
      <RouterProvider router={routes} />
    </InvoiceContextProvider>
  );
}

export default App;
