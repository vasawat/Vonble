import "./Home.css";
import React, { useEffect, useState, useContext } from "react";
import Carousel from "./HomeItem/Carousel";
import CategoriesBox from "./HomeItem/CategoriesBox";
import BestSale from "./HomeItem/BestSale";
import EachCategoryItem from "./HomeItem/EachCategoryItem";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import productContext from "../context/productsContext";

export default function Home() {
  const { products } = useContext(productContext);

  const [openMUIbackdrop, setOpenMUIbackdrop] = useState(true);
  const handleCloseMUIbackdrop = () => {
    setOpenMUIbackdrop(false);
  };
  const handleOpenMUIbackdrop = () => {
    setOpenMUIbackdrop(true);
  };

  useEffect(() => {
    if(products.length > 0){
      handleCloseMUIbackdrop();
    }else{
      handleOpenMUIbackdrop();
    }
  },[products])

  return (
    <section className="HomeBox">
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openMUIbackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Carousel />
      <CategoriesBox />
      <BestSale />
      <EachCategoryItem categoryID={'66ecf73111e27f1ece284694'} />
      <EachCategoryItem categoryID={'66ecfe9ba8a044b497cc9848'} />
      <EachCategoryItem categoryID={'66ecfee2a8a044b497cc984b'} />
      <EachCategoryItem categoryID={'66ecfef6a8a044b497cc984e'} />
      <EachCategoryItem categoryID={'66ecff0ca8a044b497cc9851'} />
      <EachCategoryItem categoryID={'66ecff20a8a044b497cc9854'} />
      <div className="scrolling-text-box">
        <div className="scrolling-text">
          <p className="text-scrolling">Welcome to Vonble.</p>
        </div>
      </div>
    </section>
  );
}
