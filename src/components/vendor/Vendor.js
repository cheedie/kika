import '../../styles/vendor/vendor.css';
import React, {useState, useEffect} from 'react'
import {Routes, Route, useNavigate} from "react-router-dom"
import Sidebar from './Sidebar.js'
import Dashboard from './Dashboard.js'
import Products from './Products.js'
import Orders from './Orders.js'
import Report from './Report.js'
import Reviews from './Reviews.js'
import kika from "../../assets/vendor/images/kika.svg"
import Withdraw from './Withdraw';
import Settings from './Settings';
import Loading from "../Global/Loading";
import Error from "../Global/Error";
import { useVendorContext } from "../../context/vendor_context";


const Vendor = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  const {
    signOut,
    getVendor,
    vendorDetails,
    product,
    products,
    getVendorProducts,
    vendor_details_loading: loading,
    vendor_details_error: error,
  } = useVendorContext();

  useEffect(() => {
    async function fetchData() {
    return  getVendor().then((response)=>{
      // console.log("SECOND VENDOR DETAILS", vendorDetails);
      getVendorProducts(response._id)
    })
      // ...
    }
    fetchData()
  }, []);


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }
  
  const handleSignOut = async () => {
    const sign = await signOut();
    if (sign) {
      navigate("/user/signin");
    } else return;
  }
  return (
    <div id="vendor">
        <div id="header">
            <img src={kika} alt="kika logo"/>
            <form>
                <input type="text" placeholder="Search" 
                onChange = {(event)=>setSearch(event.target.vaue)} value = {search}/>
            </form>

        </div >
        <section className="vendor main">
         
        <Sidebar handleSignOut={handleSignOut}/>
        <div className="main_container">                        
           <Routes>
              <Route path={"" ? "" : "/"} element={<Dashboard/>} />
              <Route path="/products" element={<Products products={products}/>} />
              <Route path="/orders" element={<Orders/>} />
              <Route path="/report" element={<Report/>} />
              <Route path="/reviews" element={<Reviews/>} />
              <Route path="/withdraw" element={<Withdraw/>} />
              <Route path="/settings" element={<Settings/>} />
           </Routes>

        </div>
         
        </section>
    </div>
  )
}

export default Vendor
