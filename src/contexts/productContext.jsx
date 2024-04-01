import React, { createContext, useState, useEffect } from "react";
import VonbleLogo from "../components/imgs/vonbleLogo.png";
import Swal from "sweetalert2";

export const productContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([{}]);
  const [categories, setCategories] = useState([{}]);
  const [Search, SetSearch] = useState("");
  const [userLogined, setUserLogined] = useState({});
  const [userLoginedInfo, setUserLoginedInfo] = useState({});
  const [userLoginedCart, setUserLoginedCart] = useState({});
  const [productDetail, setProductDetail] = useState({});
  const [searchCategoryItem, setSearchCategoryItem] = useState([]);
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [ModalRegister, setModalRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [errorInLogin, setErrorInLogin] = useState("");
  const [errorInRegister, setErrorRegister] = useState("");
  const [passNotMatch, setPassNotMatch] = useState(false);
  const handleLoginClose = () => {
    setShow(false);
    setLoginWithEmail(false);
  };
  const handleLoginShow = () => setShow(true);

  function formatMoney(money) {
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const fetchData = async () => {
    // https://vonble-backend.onrender.com
    try {
      const response = await fetch("https://vonble-backend.onrender.com/data/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://vonble-backend.onrender.com/data/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };  
  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    const now = Date.now() / 1000;
    if (exp < now) {
      localStorage.removeItem("token");
    }
  };
  const checkToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("https://vonble-backend.onrender.com/auth/checkToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token: token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setUserLogined({});
          } else {
            setUserLogined({
              user_id: data.sub,
              email: data.email,
              role: data.role,
            });
          }
        });
    } else {
    }
  };
  const UserRegister = async (data, resetRegister) => {
    if (data.passwordRegis === data.passwordAgainRegis) {
      setPassNotMatch(false);
      fetch("https://vonble-backend.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setErrorRegister(data.error);
          } else {
            handleLoginClose();
            resetRegister();
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: "Register successfully",
            });
          }
        });
    } else {
      setPassNotMatch(true);
    }
  };
  const UserLogin = async (data, resetLogin) => {
    fetch("https://vonble-backend.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrorInLogin(data.error);
        } else {
          localStorage.setItem("token", data.token);
          setUserLogined(data.thisUser);
          setErrorInLogin("");
          resetLogin();
          handleLoginClose();
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "login successfully",
          });
        }
      });
  };
  const findProductDetail = async (id) => {
    const data = { product_id: id };
    fetch("https://vonble-backend.onrender.com/data/productDetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setProductDetail(data);
      });
  };
  const findCart = async (userID) => {
    fetch("https://vonble-backend.onrender.com/user/findCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user_id: userID }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.noItemInCart) {
          setUserLoginedCart({});
        } else {
          setUserLoginedCart(data);
        }
      });
  };
  const findUserInfo = async () => {
    const data = { user_id: userLogined.user_id };
    fetch("https://vonble-backend.onrender.com/user/findUserInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserLoginedInfo(data);
      });
  };
  const addToCart = async (product) => {
    const data = { user_id: userLogined.user_id, product_id: product.id };
    fetch("https://vonble-backend.onrender.com/user/AddItemToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
  };
  // const buyNow = async (product) => {};
  const addOneInCart = async (productID) => {
    const data = {
      user_id: userLogined.user_id,
      product_id: parseInt(productID),
    };
    fetch("https://vonble-backend.onrender.com/user/AddOneItemToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "เพิ่มสินค้าเรียบร้อย",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  const minusOneInCart = async (productID) => {
    const data = {
      user_id: userLogined.user_id,
      product_id: parseInt(productID),
    };
    fetch("https://vonble-backend.onrender.com/user/MinusOneItemFromCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "ลบสินค้าเรียบร้อย",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  const removeOneItemInCart = async (productID) => {
    const data = {
      user_id: userLogined.user_id,
      product_id: parseInt(productID),
    };
    fetch("https://vonble-backend.onrender.com/user/DeleteItemFromCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "ลบสินค้าเรียบร้อย",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  const EditUserInfo = async (data) => {
    const Newdata = {
      user_id: userLogined.user_id,
      fname: data.fname,
      lname: data.lname,
    };
    fetch("https://vonble-backend.onrender.com/user/EditUserInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(Newdata),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          findUserInfo();
          Swal.fire({
            title: "แก้ไขข้อมูลเรียบร้อย",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  const searchCategory = async (category) => {
    const data = { category_id: category };
    fetch("https://vonble-backend.onrender.com/data/searchCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchCategoryItem(data);
      });
  };
  const addProduct = async (data) => {
    fetch("https://vonble-backend.onrender.com/data/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchData();
          Swal.fire({
            title: "เพิ่มสินค้าเรียบร้อย",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            title: "เพิ่มสินค้าไม่สําเร็จ",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  const deleteProduct = async (productID) => {
    const data = { product_id: productID };
    fetch("https://vonble-backend.onrender.com/data/deleteProduct", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchData();
          Swal.fire({
            title: "ลบสินค้าเรียบร้อย",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            title: "ลบสินค้าไม่สําเร็จ",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  const editProduct = async (data) => {
    fetch("https://vonble-backend.onrender.com/data/editProduct", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchData();
          Swal.fire({
            title: "แก้ไขสินค้าเรียบร้อย",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            title: "แก้ไขสินค้าไม่สําเร็จ",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    checkToken();
    const intervalId = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <productContext.Provider
      value={{
        products,
        categories,
        formatMoney,
        Search,
        SetSearch,
        VonbleLogo,
        userLogined,
        setUserLogined,
        UserRegister,
        UserLogin,
        loginWithEmail,
        setLoginWithEmail,
        ModalRegister,
        setModalRegister,
        handleLoginClose,
        handleLoginShow,
        show,
        errorInLogin,
        errorInRegister,
        passNotMatch,
        findProductDetail,
        productDetail,
        findCart,
        userLoginedCart,
        setUserLoginedCart,
        addToCart,
        addOneInCart,
        minusOneInCart,
        removeOneItemInCart,
        setUserLoginedInfo,
        userLoginedInfo,
        findUserInfo,
        EditUserInfo,
        searchCategory,
        searchCategoryItem,
        addProduct,
        deleteProduct,
        editProduct,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
