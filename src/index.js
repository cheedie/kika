import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/user_context";
import { VendorProvider } from "./context/vendor_context";
import { CartProvider } from "./context/cart_context";
import { ProductProvider } from "./context/product_context";
import { NavbarProvider } from "./context/navbar_context";
import { OrderProvider } from "./context/order_context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <NavbarProvider>
    <VendorProvider>
      <UserProvider>
        <OrderProvider>
          <ProductProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductProvider>
        </OrderProvider>
      </UserProvider>
    </VendorProvider>
  </NavbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
