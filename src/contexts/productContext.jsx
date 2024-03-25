import React, { createContext, useState, useEffect } from "react";
import VonbleLogo from "../components/imgs/vonbleLogo.png";
import Swal from "sweetalert2";

export const productContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([{}]);
  const [users, setUsers] = useState([{}]);
  const [categories, setCategories] = useState([{}]);
  const [Brands, setBrands] = useState([{}]);
  const [allCart, setAllCart] = useState([{}]);
  const [Search, SetSearch] = useState("");
  const [userLogined, setUserLogined] = useState({});
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [ModalRegister, setModalRegister] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setLoginWithEmail(false);
  };
  const handleShow = () => setShow(true);

  function formatMoney(money) {
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/Brands");
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart");
      const data = await response.json();
      setAllCart(data);
    } catch (error) {
      console.error(error);
    }
  };
  const UserRegister = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const datalog = await response.json();
      console.log("user Add response:", datalog);
    } catch (err) {
      console.log("Error NOW");
      console.log(err);
    }
  };

  const UserLogin = async (data) => {
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === data.email &&
        users[i].password === data.password
      ) {
        setUserLogined(users[i]);
        console.log("login successfully", users[i]);
        handleClose();
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
      } else {
        console.log("wrong password or email");
      }
    }
  };
  const addToCart = async (product) => {
    try {
      const userCart = allCart.find(
        (cart) => cart.user_id === userLogined.user_id
      );
      if (userCart) {
        const data = { cart_id: userCart.cart_id, product_id: product.id };
        const response = await fetch(
          "http://localhost:5000/api/user/AddItemToCart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
          }
        );
        const datalog = await response.json();
        fetchCart();
        console.log("new item to cart response:", datalog);
      } else {
        // let dataForNewCart = {
        //   user_id: userLogined.user_id,
        //   product_id: product.id,
        // };
        const response = await fetch(
          "http://localhost:5000/api/user/AddNewCart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userLogined),
          }
        );
        const datalog = await response.json();
        fetchCart();
        console.log("user new cart response:", datalog);
      }
    } catch (err) {
      console.log("Error NOW");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchBrands();
    fetchUsers();
    fetchCart();
  }, []);
  return (
    <productContext.Provider
      value={{
        products,
        users,
        categories,
        Brands,
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
        handleClose,
        handleShow,
        show,
        setShow,
        addToCart,
        allCart,
        fetchCart,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
