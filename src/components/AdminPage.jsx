import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminPage.css";
import { useForm } from "react-hook-form";
import { productContext } from "../contexts/productContext";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AdminPage() {
  const {
    addProduct,
    products,
    brands,
    addBrand,
    categories,
    addCategory,
    deleteBrand,
    fetchTransaction,
    allTransaction,
  } = useContext(productContext);
  const [adminContent, setAdminContent] = useState(1);

  const [formData, setFormData] = useState({});
  const [fieldName, setFieldName] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [sortUserLoginedTransaction, setSortUserLoginedTransaction] = useState(
    []
  );
  const [selectCategory, setSelectCategory] = useState({});
  const [selectBrand, setSelectBrand] = useState({});
  const [transactionPaid, setTransactionPaid] = useState([]);
  const [transactionUnpaid, setTransactionUnpaid] = useState([]);
  const [transactionCompleted, setTransactionCompleted] = useState([]);
  const [transactionCancel, setTransactionCancel] = useState([]);
  const addField = (fieldName, fieldValue) => {
    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
    setFieldName("");
    setFieldValue("");
  };
  const removeField = (fieldName) => {
    const newFormData = { ...formData };
    delete newFormData[fieldName];
    setFormData(newFormData);
  };

  const {
    register: product,
    handleSubmit: handleSubmitproduct,
    reset: resetproduct,
  } = useForm();
  const {
    register: category,
    handleSubmit: handleSubmitCategory,
    reset: resetCategory,
  } = useForm();
  const {
    register: brand,
    handleSubmit: handleSubmitBrand,
    reset: resetBrand,
  } = useForm();

  useEffect(() => {
    fetchTransaction();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (allTransaction) {
      let newT = Object.values(allTransaction).sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      });
      setSortUserLoginedTransaction(newT);
    }
  }, [allTransaction]);
  useEffect(() => {
    if (sortUserLoginedTransaction.length > 0) {
      setTransactionPaid(
        sortUserLoginedTransaction.filter(
          (item) => item.order_status === "PaymentReceived"
        )
      );
      setTransactionUnpaid(
        sortUserLoginedTransaction.filter(
          (item) => item.order_status === "PendingPayment"
        )
      );
      setTransactionCompleted(
        sortUserLoginedTransaction.filter(
          (item) => item.order_status === "completed"
        )
      );
      setTransactionCancel(
        sortUserLoginedTransaction.filter(
          (item) => item.order_status === "Cancelled"
        )
      );
    }
  }, [sortUserLoginedTransaction]);

  return (
    <section className="adminPageSection">
      <div className="allItem-Box">
        <ul className="dashBoardBox">
          <li className="dashBoardItemBox">
            <div>
              <p className="dashBoardText">จำนวนสินค้า</p>
              <p className="dashBoardText mt-2">
                {products.length > 0 ? products.length : 0}
              </p>
            </div>
          </li>
          <li className="dashBoardItemBox">
            <div>
              <p className="dashBoardText">คำสั่งซื้อที่รอดําเนินการ</p>
              <p className="dashBoardText mt-2">
                {transactionUnpaid &&
                  transactionUnpaid.length + transactionPaid.length}
              </p>
            </div>
          </li>
          <li className="dashBoardItemBox">
            <div>
              <p className="dashBoardText">คำสั่งซื้อที่สมบูรณ์</p>
              <p className="dashBoardText mt-2">
                {transactionCompleted && transactionCompleted.length}
              </p>
            </div>
          </li>
          <li className="dashBoardItemBox">
            <div>
              <p className="dashBoardText">คำสั่งซื้อที่ยกเลิก</p>
              <p className="dashBoardText mt-2">
                {transactionCancel && transactionCancel.length}
              </p>
            </div>
          </li>
        </ul>
        <div className="adminBox">
          <div className="adminBoxSelectBox">
            <div
              className="adminBoxSelect"
              role="button"
              onClick={() => setAdminContent(1)}
            >
              AddProduct
            </div>
            <div
              className="adminBoxSelect"
              role="button"
              onClick={() => setAdminContent(2)}
            >
              AddCategory
            </div>
            <div
              className="adminBoxSelect"
              role="button"
              onClick={() => setAdminContent(3)}
            >
              AddBrand
            </div>
            <div
              className="adminBoxSelect"
              role="button"
              onClick={() => setAdminContent(4)}
            >
              Transection
            </div>
          </div>
          <div className="adminBoxContent">
            {adminContent === 1 && (
              <form
                className="row g-3"
                onSubmit={handleSubmitproduct((data) => {
                  let newData = { ...data, category_id: selectCategory, brand_id: selectBrand, spec: { ...formData } };
                  addProduct(newData);
                  resetproduct();
                  setFormData({});
                })}
              >
                <div className="col-md-12" style={{ textAlign: "right" }}>
                  <div
                    className="btn btn-danger"
                    onClick={() => {
                      resetproduct();
                      setFormData({});
                    }}
                  >
                    ล้างข้อมูล
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">ชื่อสินค้า :</label>
                  <input
                    type="text"
                    className="form-control"
                    {...product("name", { required: true })}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">ราคา :</label>
                  <input
                    type="number"
                    className="form-control"
                    min={0}
                    {...product("price", { required: true })}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">ส่วนลด :</label>
                  <input
                    type="number"
                    className="form-control"
                    min={0}
                    max={100}
                    {...product("discount", { required: true })}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">จำนวน :</label>
                  <input
                    type="number"
                    className="form-control"
                    min={0}
                    {...product("quantity", { required: true })}
                  />
                </div>

                <div className="col-md-8">
                  <label className="form-label">ลิงค์รูปภาพ :</label>
                  <input
                    type="text"
                    className="form-control"
                    {...product("image_url", { required: true })}
                  />
                </div>

                <div className="col-md-2 w-full h-full flex align-items-end">
                  <Autocomplete
                    disablePortal
                    options={categories}
                    getOptionLabel={(option) => `${option.name}`}
                    onChange={(event, newValue) => {
                      setSelectCategory(newValue);
                    }}
                    sx={{  }}
                    renderInput={(params) => <TextField {...params} label="Category" />}
                  />
                </div>
                <div className="col-md-2">
                  <Autocomplete
                    disablePortal
                    options={brands}
                    getOptionLabel={(option) => `${option.name}`}
                    onChange={(event, newValue) => {
                      setSelectBrand(newValue);
                    }}
                    sx={{  }}
                    renderInput={(params) => <TextField {...params} label="Brand" />}
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">รายละเอียดสินค้า :</label>
                  <textarea
                    className="form-control"
                    {...product("description")}
                    rows="2"
                  />
                </div>
                {/*  */}
                <label className="col-md-12 form-label">สเปคสินค้า</label>
                <label className="col-md-1 form-label">ชื่อ field:</label>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setFieldName(e.target.value)}
                    value={fieldName}
                  />
                </div>
                <label className="col-md-1 form-label">ค่า field:</label>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setFieldValue(e.target.value)}
                    value={fieldValue}
                  />
                </div>
                <div className="col-md-2">
                  <div
                    className="btn btn-primary"
                    onClick={() => addField(fieldName, fieldValue)}
                  >
                    เพิ่ม field
                  </div>
                </div>
                <h4 className="mt-5">ตัวอย่างสเปคสินค้า</h4>
                <table className="SpecTable">
                  <tbody>
                    {Object.keys(formData).map((fieldName) => {
                      return (
                        <tr key={fieldName}>
                          <td>{fieldName}</td>
                          <td>{formData[fieldName]} </td>
                          <div
                            className="btn btn-danger m-2"
                            onClick={() => removeField(fieldName)}
                          >
                            ลบ
                          </div>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/*  */}
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    เพิ่มสินค้า
                  </button>
                </div>
              </form>
            )}
            {adminContent === 2 && (
              <div>
                <form
                  className="row g-3"
                  onSubmit={handleSubmitCategory((data) => {
                    addCategory(data);
                    resetCategory();
                  })}
                >
                  <div className="col-md-12" style={{ textAlign: "right" }}>
                    <div
                      className="btn btn-danger"
                      onClick={() => {
                        resetCategory();
                      }}
                    >
                      ล้างข้อมูล
                    </div>
                  </div>
                  <div className="col-md-5">
                    <label className="form-label">ชื่อหมวดหมู่ :</label>
                    <input
                      type="text"
                      className="form-control"
                      {...category("categoryName")}
                    />
                  </div>
                  <div className="col-md-5">
                    <label className="form-label">ชื่อหมวดหมู่ Eng :</label>
                    <input
                      type="text"
                      className="form-control"
                      {...category("categoryNameEng")}
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      เพิ่มหมวดหมู่สินค้า
                    </button>
                  </div>
                </form>
                <div>
                  <span className="ms-2">Name</span>
                </div>
                {categories.map((category, index) => (
                  <div key={index}>
                    <div>
                      <span className="ms-2">{category.name}</span>
                      <span></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {adminContent === 3 && (
              <div>
                <form
                  className="row g-3"
                  onSubmit={handleSubmitBrand((data) => {
                    addBrand(data);
                    resetBrand();
                  })}
                >
                  <div className="col-md-12" style={{ textAlign: "right" }}>
                    <div
                      className="btn btn-danger"
                      onClick={() => {
                        resetBrand();
                      }}
                    >
                      ล้างข้อมูล
                    </div>
                  </div>
                  <div className="col-md-5">
                    <label className="form-label">ชื่อแบรนด์ :</label>
                    <input
                      type="text"
                      className="form-control"
                      {...brand("brandName", { required: true })}
                    />
                  </div>
                  <div className="col-md-5">
                    <label className="form-label">รูปภาพแบรนด์ :</label>
                    <input
                      type="text"
                      className="form-control"
                      {...brand("brandImageUrl")}
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      เพิ่มแบรนด์หมู่สินค้า
                    </button>
                  </div>
                </form>
                <div>
                  <span className="ms-2">Name</span>
                </div>
                {brands.map((brand, index) => (
                  <div className="p-1" key={brand._id}>
                    <span className="ms-2">{brand.name}</span>
                    <span
                      className="btn btn-danger ms-2"
                      onClick={() => deleteBrand(brand.id)}
                    >
                      ลบแบรนด์นี้
                    </span>
                  </div>
                ))}
              </div>
            )}
            {adminContent === 4 && (
              <div>
                <div className="transactionBox">
                  {sortUserLoginedTransaction.length > 0 ? (
                    sortUserLoginedTransaction.map((item) => (
                      <div className="transactionItemBox">
                        <span className={`${item.order_status}`} style={{ minWidth: "150px" }}>
                          {item.order_status}
                        </span>
                        <span>{item._id}</span>
                        <span>{item.payment_method}</span>
                        <span>฿{item.shipping_fee}</span>
                        <span>฿{item.grand_total}</span>
                        <span>{item.order_date}</span>
                        <Link
                          to={`/user/${item.user_id}/transaction/${item.transaction_id}`}
                        >
                          Detail
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>ยังไม่มีการสั่งซื้อ</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
