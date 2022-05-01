import React, { useEffect } from "react";
import Loading from "../../components/User/Loading";
import Error from "../../components/User/Error";
import Navbar from "../../components/landing-page/Navbar";
import Footer from "../../components/landing-page/Footer";
import visacard from "../../assets/cart/visa_card.png";
import mastercard from "../../assets/cart/master_card.png";
import AmountButtons from "../../components/Cart/AmountButtons";
import "../../styles/CartStyles/Payment.css";
import { useCartContext } from "../../context/cart_context";
import { useUserContext } from "../../context/user_context";

const Checkout = () => {
  const { cart, total_amount, shipping_fee, tax } = useCartContext();
  const {
    userDetails,
    user_details_loading: loading,
    user_details_error: error,
    getUser,
  } = useUserContext();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Navbar />
      <section id="payment_options">
        <div className="details_container">
          <div className="address_details_container">
            <h1>1. ADDRESS DETAILS</h1>
            <div className="address_details">
              <p>{userDetails?.name}</p>
              <p>{userDetails?.deliveryAddress?.street}</p>
              <p>+234{userDetails?.phone?.substring(1)}</p>
            </div>
            <div className="details_button">
              <button className="change_button">CHANGE</button>
            </div>
          </div>
          <div className="address_details_container">
            <h1>2. DELIVERY DETAILS</h1>
            <div className="address_details">
              <p>DOOR STEP DELIVERY</p>
              <p>
                Delivered between{" "}
                <span className="step_delivery">MONDAY 28 MARCH</span> and{" "}
                <span className="step_delivery">THURSDAY 31 MARCH</span>
              </p>
            </div>
            <div className="details_button">
              <button className="change_button">CHANGE</button>
            </div>
          </div>
          <div className="address_details_container">
            <h1>3. PAYMENT METHOD</h1>
            <div className="address_details">
              <p></p>
              <div className="debit_cards">
                <input type="checkbox" />
                <label>DEBIT/CREDIT CARDS</label>
              </div>
              <div className="debit_cards_img">
                <img src={mastercard} alt="mastercard_image" />
                <img src={visacard} alt="visacard_image" />
              </div>
              <div className="debit_cards">
                <input type="checkbox" />
                <label>BANK TRANSFERS</label>
              </div>
              <p id="pay_account">Pay into this account</p>
              <p id="pay_details">Account Name: Kika limited</p>
              <p id="pay_details">Account Number: 3043123425</p>
              <p id="pay_details">Bank Name: First Bank Nig. Plc</p>
              <div className="upload_receipt">
                <p>Upload your transaction receipt</p>
                <input placeholder="upload transaction receipt" />
              </div>
              <div className="delivery_btn_container">
                <button
                  type="submit"
                  id="delivery-btn"
                  className="delivery-btn"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modify_cart_wrapper">
          <div className="modify_cart_container">
            <h1>CART SUMMARY</h1>
            {cart.map((item) => {
              return (
                <React.Fragment>
                  <div className="modify_card" key={item._id}>
                    <div className="modify_card_img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="modify_details">
                      <p>{item.name}</p>
                      <div className="modify_cart_footer">
                        <div className="footer_icons">
                          <AmountButtons />
                        </div>
                        <p className="modify_price">NGN {item.price}</p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}

            <div className="modify_cart_summary">
              <div className="modify_cart_subtotal">
                <p>Subtotal</p>
                <p>NGN {total_amount}</p>
              </div>
              <div className="modify_cart_subtotal">
                <p>Delivery</p>
                <p>NGN {shipping_fee}</p>
              </div>
              <div className="modify_cart_subtotal">
                <p>Tax</p>
                <p>NGN {tax}</p>
              </div>
              <div className="modify_cart_total">
                <p>Total</p>
                <p>NGN {total_amount + shipping_fee + tax}</p>
              </div>
            </div>
            <div id="payment-btn" className="delivery_btn_container">
              <button type="submit" className="delivery-btn">
                Modify cart
              </button>
            </div>
          </div>

          <div className="livechat_container">
            <h1>Need help</h1>
            <p>Contact an expert to support you</p>
            <div className="delivery_btn_container">
              <button type="submit" id="delivery-btn" className="delivery-btn">
                Livechat
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Checkout;
