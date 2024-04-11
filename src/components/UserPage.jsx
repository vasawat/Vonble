import { useLocation, useParams } from "react-router-dom";
import "./UserPage.css";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../contexts/productContext";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";

export default function UserPage() {
  const { user_email } = useParams();
  const { userLoginedInfo, findUserInfo, EditUserInfo } =
    useContext(productContext);
  const [editInfo, setEditInfo] = useState(false);
  const {
    register: userInfo,
    handleSubmit: handleSubmituserInfo,
    reset: resetuserInfo,
    // formState: { errors: errorsuserInfo },
  } = useForm();
  useEffect(() => {
    findUserInfo();
    // eslint-disable-next-line
  }, []);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <section className="userPageSection">
      <div className="allItem-BoxUserPage">
        <div className="userInfoBox">
          <h3>Welcome to Vonble</h3>

          {userLoginedInfo.fname ? (
            <h3>
              name : {userLoginedInfo.fname} {userLoginedInfo.lname}{" "}
              <span className="ms-2" onClick={() => setEditInfo(!editInfo)}>
                <CiEdit size={25} />
              </span>
            </h3>
          ) : (
            <h3>
              name :{" "}
              <span className="ms-2" onClick={() => setEditInfo(!editInfo)}>
                <CiEdit size={25} />
              </span>
            </h3>
          )}
          {editInfo ? (
            <form
              className="p-2"
              onSubmit={handleSubmituserInfo((data) => {
                EditUserInfo(data);
                setEditInfo(false);
                resetuserInfo();
              })}
            >
              <div className="editInfoBox">
                <div className="me-3">
                  <label for="fname" className="form-label">
                    Fristname :
                  </label>
                  <input
                    className="form-control userInfoInput"
                    id="fname"
                    {...userInfo("fname", { required: true })}
                  />
                </div>
                <div>
                  <label for="fname" className="form-label">
                    Lastname :
                  </label>
                  <input
                    className="form-control userInfoInput"
                    {...userInfo("lname", { required: true })}
                  />
                </div>
                <input
                  className="form-control userInfoInputSubmit ms-2"
                  type="submit"
                />
              </div>
            </form>
          ) : null}
          <h3>Email : {user_email}</h3>
        </div>
      </div>
    </section>
  );
}
