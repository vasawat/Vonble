import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { productContext } from "../contexts/productContext";
import Modal from "react-bootstrap/Modal";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useForm } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";

export default function Header() {
  const {
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
  } = useContext(productContext);
  const navigate = useNavigate();

  function toSearchPage(e) {
    e.preventDefault();
    navigate(`/search/${Search}`);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function LogOut() {
    setUserLogined({});
    navigate("/");
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
            icon: "error",
            title: "Log out successfully",
          });
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img className="vonbleLogo me-1" src={VonbleLogo} alt="" />
          Vonble
        </Link>

        <form className="d-flex" role="search" onSubmit={toSearchPage}>
          <input
            id="reseachInput"
            className="form-control me-2"
            type="search"
            placeholder="ค้นหาสินค้า"
            onChange={(e) => SetSearch(e.target.value)}
          />
          <button
            id="searchBtn"
            className="btn btn-outline-primary"
            type="submit"
          >
            ค้นหา
          </button>
        </form>

        <div className="navbar-nav mb-2 mb-lg-0 gap-3">
          {userLogined ? (
            <Link to={`/user/${userLogined.email}/${"cart"}`} className="nav-item btn btn-none">
              <AiOutlineShoppingCart size={30} />
            </Link>
          ) : (
            <div className="nav-item btn btn-none">
              <AiOutlineShoppingCart size={30} />
            </div>
          )}

          <div className="nav-item">
            {userLogined.email ? (
              <Dropdown variant="none">
                <Dropdown.Toggle variant="none">
                  <FaRegUserCircle size={30} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to={`/user/${userLogined.email}`}>User Profile</Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => LogOut()}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="btn">
                <FaRegUserCircle size={30} onClick={handleShow} />
              </div>
            )}
          </div>
        </div>
      </div>

      {loginWithEmail ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Body className="loginModal ">
            <div>
              <img className="vonbleLogo mt-3 mb-3" src={VonbleLogo} alt="" />
              <h3>Vonble</h3>
              <div className="loginTypeBox loginTypeEmailBox">
                <div
                  className="d-flex align-items-center pt-2 px-4 mt-3"
                  onClick={() => setLoginWithEmail(false)}
                >
                  <MdOutlineMail className="loginTypeIcon" />
                  <div>ล็อคอินด้วยอีเมล</div>
                </div>
                <div className="loginRegisbuttonBox">
                  <button
                    className={
                      ModalRegister
                        ? "loginRegisbutton"
                        : "loginRegisbuttonSelect"
                    }
                  >
                    <div
                      className="loginRegisText"
                      onClick={() => setModalRegister(false)}
                    >
                      ล็อคอิน
                    </div>
                  </button>
                  <button
                    className={
                      ModalRegister
                        ? "loginRegisbuttonSelect"
                        : "loginRegisbutton"
                    }
                  >
                    <div
                      className="loginRegisText"
                      onClick={() => setModalRegister(true)}
                    >
                      สมัครสมาชิก
                    </div>
                  </button>
                </div>
              </div>

              {ModalRegister ? (
                <form
                  onSubmit={handleSubmit((data) => {
                    UserRegister(data);
                    handleClose();
                  })}
                >
                  {errors.emailRegis ? (
                    <div className="loginInputBox mt-4 text-start">
                      {errors.emailRegis && (
                        <div className="requiredText">* Required Email</div>
                      )}
                      <input
                        className="form-control loginInput requiredInput"
                        placeholder="Email"
                        name="email"
                        {...register("emailRegis", { required: true })}
                      />
                    </div>
                  ) : (
                    <div className="loginInputBox mt-4 text-start">
                      <input
                        className="form-control loginInput"
                        placeholder="Email"
                        name="email"
                        {...register("emailRegis", { required: true })}
                      />
                    </div>
                  )}

                  {errors.passwordRegis ? (
                    <div className="loginInputBox text-start">
                      {errors.passwordRegis && (
                        <div className="requiredText">* Required Password</div>
                      )}
                      <input
                        className="form-control loginInput requiredInput"
                        placeholder="Password"
                        name="password"
                        type="password"
                        {...register("passwordRegis", { required: true })}
                      />
                    </div>
                  ) : (
                    <div className="loginInputBox text-start">
                      <input
                        className="form-control loginInput"
                        placeholder="Password"
                        name="password"
                        type="password"
                        {...register("passwordRegis", { required: true })}
                      />
                    </div>
                  )}

                  {errors.passwordAgainRegis ? (
                    <div className="loginInputBox text-start">
                      {errors.passwordAgainRegis && (
                        <div className="requiredText">* Required Password</div>
                      )}
                      <input
                        className="form-control loginInput requiredInput"
                        placeholder="Password Again"
                        name="passwordAgainRegis"
                        type="password"
                        {...register("passwordAgainRegis", { required: true })}
                      />
                    </div>
                  ) : (
                    <div className="loginInputBox text-start">
                      <input
                        className="form-control loginInput"
                        placeholder="Password Again"
                        name="passwordAgainRegis"
                        type="password"
                        {...register("passwordAgainRegis", { required: true })}
                      />
                    </div>
                  )}

                  {errors.checkbox1 ? (
                    <div className="loginInputBox d-flex align-items-center text-start">
                      <input
                        className="MyCheckBox "
                        name="checkbox1"
                        type="checkbox"
                        {...register("checkbox1", { required: true })}
                      />
                      <div className="requiredInputChackBox">
                        ยอมรับเงื่อนไข bra bra
                      </div>
                    </div>
                  ) : (
                    <div className="loginInputBox d-flex align-items-center text-start">
                      <input
                        className="MyCheckBox "
                        name="checkbox1"
                        type="checkbox"
                        {...register("checkbox1", { required: true })}
                      />
                      <div className="loginCheckboxText">
                        ยอมรับเงื่อนไข bra bra
                      </div>
                    </div>
                  )}

                  <input className="submitButton" type="submit" />
                </form>
              ) : (
                <form
                  onSubmit={handleSubmit((data) => {
                    UserLogin(data);
                  })}
                >
                  {errors.email ? (
                    <div className="loginInputBox mt-4 text-start">
                      {errors.email && (
                        <div className="requiredText">* Required Email</div>
                      )}
                      <input
                        className="form-control loginInput requiredInput"
                        placeholder="Email"
                        name="email"
                        {...register("email", { required: true })}
                      />
                    </div>
                  ) : (
                    <div className="loginInputBox mt-4 text-start">
                      {errors.email && (
                        <div className="requiredText">* Required Email</div>
                      )}
                      <input
                        className="form-control loginInput"
                        placeholder="Email"
                        name="email"
                        {...register("email", { required: true })}
                      />
                    </div>
                  )}

                  {errors.password ? (
                    <div className="loginInputBox text-start">
                      {errors.password && (
                        <div className="requiredText">* Required Password</div>
                      )}
                      <input
                        className="form-control loginInput requiredInput"
                        placeholder="Password"
                        type="password"
                        name="password"
                        {...register("password", { required: true })}
                      />
                    </div>
                  ) : (
                    <div className="loginInputBox text-start">
                      {errors.password && (
                        <div className="requiredText">* Required Password</div>
                      )}
                      <input
                        className="form-control loginInput"
                        placeholder="Password"
                        type="password"
                        name="password"
                        {...register("password", { required: true })}
                      />
                    </div>
                  )}

                  <input className="submitButton" type="submit" />
                </form>
              )}
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Body className="loginModal">
            <div>
              <img className="vonbleLogo mt-3 mb-3" src={VonbleLogo} alt="" />
              <h3>Vonble</h3>
              <div className="loginTypeBox">
                <FcGoogle className="loginTypeIcon" />
                <div>ล็อคอินด้วย Google</div>
              </div>
              <div className="loginTypeBox">
                <FaFacebook
                  style={{ color: "#1877F2" }}
                  className="loginTypeIcon"
                />
                <div>ล็อคอินด้วย Facebook</div>
              </div>
              <div
                className="loginTypeBox"
                onClick={() => setLoginWithEmail(true)}
              >
                <MdOutlineMail className="loginTypeIcon" />
                <div>ล็อคอินด้วยอีเมล</div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </nav>
  );
}
