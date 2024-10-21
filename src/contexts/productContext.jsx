import React, { createContext, useState, useEffect } from "react";
import MjnVonbleLogo from "../components/imgs/MjnVonbleLogo.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import enviroment from "../assets/environments/environment";

export const productContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([{}]);
  const [categories, setCategories] = useState([{}]);
  const [brands, setBrands] = useState([{}]);
  const [allTransaction, setAllTransaction] = useState([{}]);
  const [searchProduct, setSearchProduct] = useState([{}]);
  const [Search, SetSearch] = useState("");
  const [userLogined, setUserLogined] = useState({});
  const [userLoginedInfo, setUserLoginedInfo] = useState({});
  const [userLoginedCart, setUserLoginedCart] = useState({});
  const [userLoginedAddress, setUserLoginedAddress] = useState([{}]);
  const [userLoginedTransaction, setUserLoginedTransaction] = useState({});
  const [productDetail, setProductDetail] = useState({});
  const [transactionDetail, setTransactionDetail] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [searchCategoryItem, setSearchCategoryItem] = useState([]);
  const [searchBrandItem, setSearchBrandItem] = useState([]);
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [ModalRegister, setModalRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [errorInLogin, setErrorInLogin] = useState("");
  const [errorInRegister, setErrorRegister] = useState("");
  const [passNotMatch, setPassNotMatch] = useState(false);
  const navigate = useNavigate();
  const handleLoginClose = () => {
    setShow(false);
    setLoginWithEmail(false);
  };
  const handleLoginShow = () => setShow(true);

  function formatMoney(money) {
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const showOverlay = (time) => {
    // สร้าง overlay div
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.zIndex = 9999;

    // สร้าง spinner div
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    spinner.style.position = "absolute";
    spinner.style.top = "50%";
    spinner.style.left = "50%";
    spinner.style.transform = "translate(-50%, -50%)";
    spinner.style.width = "50px";
    spinner.style.height = "50px";
    spinner.style.borderRadius = "50%";
    spinner.style.border = "5px solid #fff";
    spinner.style.borderTopColor = "transparent";
    spinner.style.animation = "spinner-animation 1s linear infinite";

    // เพิ่ม spinner ลงใน overlay
    overlay.appendChild(spinner);

    // เพิ่ม overlay ลงใน body
    document.body.appendChild(overlay);

    // ตั้งเวลา 1 วินาที
    setTimeout(() => {
      // ลบ overlay ออก
      document.body.removeChild(overlay);
    }, time);
  };
  const fetchData = async () => {
    // https://vonble-backend.onrender.com
    try {
      const response = await fetch(enviroment.apiUrl + "/data/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch(enviroment.apiUrl + "/data/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchBrands = async () => {
    try {
      const response = await fetch(enviroment.apiUrl + "/data/brands");
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTransaction = async () => {
    try {
      const response = await fetch(enviroment.apiUrl + "/data/transaction");
      const data = await response.json();
      setAllTransaction(data);
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
      setUserLogined({});
      setUserLoginedCart({});
      setUserLoginedInfo({});
      navigate("/");
    }
  };
  const checkToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(enviroment.apiUrl + "/auth/checkToken", {
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
      fetch(enviroment.apiUrl + "/auth/register", {
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
    fetch(enviroment.apiUrl + "/auth/login", {
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
            timer: 2000,
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
    setProductDetail({});
    const data = { product_id: id };
    fetch(enviroment.apiUrl + "/data/productDetail", {
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
  const searchProductData = async (key) => {
    const Sdata = { keyword: key };
    fetch(enviroment.apiUrl + "/data/searchProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(Sdata),
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchProduct(data);
      });
  };
  const findCart = async (userID) => {
    fetch(enviroment.apiUrl + "/user/findCart", {
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
          setUserLoginedCart(data.items);
        }
      });
  };
  const findUserInfo = async () => {
    const data = { user_id: userLogined.user_id };
    fetch(enviroment.apiUrl + "/user/findUserInfo", {
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
  const findUserAddress = async (userID) => {
    fetch(enviroment.apiUrl + "/user/findUserAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user_id: userID }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserLoginedAddress(data);
      });
  };
  const findUserTransaction = async (userID) => {
    fetch(enviroment.apiUrl + "/user/findUserTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ user_id: userID }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserLoginedTransaction(data);
      });
  };
  const findTransactionDetail = async (transactionID) => {
    fetch(enviroment.apiUrl + "/user/findTransactionDetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ transaction_id: transactionID }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactionDetail(data);
      });
  };
  const addToCart = async (product, quantityCount) => {
    const data = {
      user_id: userLogined.user_id,
      product_id: product._id,
      quantity: quantityCount,
    };
    fetch(enviroment.apiUrl + "/user/AddItemToCart", {
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
          findCart(userLogined.user_id);
        }
      });
  };
  const addOneInCart = async (productID) => {
    const data = {
      user_id: userLogined.user_id,
      product_id: productID,
    };
    fetch(enviroment.apiUrl + "/user/AddOneItemFromCart", {
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
          findCart(userLogined.user_id);
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
      product_id: productID,
    };
    fetch(enviroment.apiUrl + "/user/MinusOneItemFromCart", {
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
          findCart(userLogined.user_id);
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
      product_id: productID,
    };
    fetch(enviroment.apiUrl + "/user/DeleteItemFromCart", {
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
          findCart(userLogined.user_id);
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
    fetch(enviroment.apiUrl + "/user/EditUserInfo", {
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
    fetch(enviroment.apiUrl + "/data/searchCategory", {
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
  const searchBrand = async (brand) => {
    const data = { brand_id: brand };
    fetch(enviroment.apiUrl + "/data/searchBrand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchBrandItem(data);
      });
  };
  const addProduct = async (data) => {
    fetch(enviroment.apiUrl + "/data/addProduct", {
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
    fetch(enviroment.apiUrl + "/data/deleteProduct", {
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
          findProductDetail(productID);
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
  const editProduct = async (dataEdit) => {
    fetch(enviroment.apiUrl + "/data/editProduct", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dataEdit),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchData();
          findProductDetail(dataEdit.product_id);
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
  const addCategory = async (data) => {
    fetch(enviroment.apiUrl + "/data/addCategory", {
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
          fetchCategories();
          Swal.fire({
            title: "เพิ่มหมวดหมู่เรียบร้อย",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
        }
      });
  };
  const addBrand = async (data) => {
    fetch(enviroment.apiUrl + "/data/addBrand", {
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
          fetchBrands();
          Swal.fire({
            title: "เพิ่มแบรนดหมู่เรียบร้อย",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
        }
      });
  };
  const deleteBrand = async (brandID) => {
    const data = { brand_id: brandID };
    fetch(enviroment.apiUrl + "/data/deleteBrand", {
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
          fetchBrands();
          Swal.fire({
            title: "ลบเรียบร้อย",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
        }
      });
  };
  const CreateShippingAddresss = async (data) => {
    fetch(enviroment.apiUrl + "/transaction/CreateShippingAddresss", {
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
          findUserAddress(data.user_id);
          showOverlay(1000);
          setTimeout(() => {
            Swal.fire({
              title: "เพิ่มที่อยู่เรียบร้อย",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
          }, 1000);
        } else {
          Swal.fire({
            title: "เพิ่มที่อยู่ไม่สําเร็จ",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  const deleteAddress = async (thisindex) => {
    const data = { user_id: userLogined.user_id, index: thisindex };
    fetch(enviroment.apiUrl + "/transaction/deleteAddress", {
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
          findUserAddress(userLogined.user_id);
          showOverlay(1000);
          setTimeout(() => {
            Swal.fire({
              title: "ลบที่อยู่เรียบร้อย",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
          }, 1000);
        }
      });
  };
  const CreateTransaction = async (data) => {
    fetch(enviroment.apiUrl + "/transaction/CreateTransaction", {
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
          showOverlay(4000);
          setTimeout(() => {
            navigate(
              `/user/${userLogined.user_id}/payment/${data.transactionID}`
            );
          }, 4000);
          Swal.fire({
            title: "สั่งซื้อสินค้าเรียบร้อย",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            title: "สั่งซื้อสินค้าไม่สําเร็จ",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };
  const deleteTransaction = async (transactionID) => {
    const data = { transaction_id: transactionID };
    fetch(enviroment.apiUrl + "/transaction/deleteTransaction", {
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
          findUserTransaction(userLogined.user_id);
          showOverlay(1000);
          setTimeout(() => {
            navigate(`/user/${userLogined.user_id}/transaction`);
            Swal.fire({
              title: "ยกเลิกการสั่งซื้อสินค้าเรียบร้อย",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });
          }, 1000);
        }
      });
  };
  const findPaymentData = async (transactionID) => {
    fetch(enviroment.apiUrl + "/transaction/findPaymentData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ transaction_id: transactionID }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPaymentData(data);
      });
  };
  const testKbank = async () => {
    fetch(enviroment.apiUrl + "/bank/kbank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchBrands();
    checkToken();
    const intervalId = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);
  return (
    <productContext.Provider
      value={{
        products,
        categories,
        brands,
        allTransaction,
        fetchTransaction,
        formatMoney,
        showOverlay,
        Search,
        SetSearch,
        searchProduct,
        searchProductData,
        MjnVonbleLogo,
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
        setPassNotMatch,
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
        findUserAddress,
        userLoginedAddress,
        searchCategory,
        searchCategoryItem,
        searchBrand,
        searchBrandItem,
        addProduct,
        deleteProduct,
        editProduct,
        addCategory,
        addBrand,
        deleteBrand,
        CreateShippingAddresss,
        CreateTransaction,
        findUserTransaction,
        userLoginedTransaction,
        findTransactionDetail,
        transactionDetail,
        findPaymentData,
        deleteTransaction,
        paymentData,
        deleteAddress,
        testKbank,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
