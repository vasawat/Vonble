import { useContext, useState } from "react";
import "./AdminPage.css";
import { useForm } from "react-hook-form";
import { productContext } from "../contexts/productContext";
export default function AdminPage() {
  const { addProduct, products, brands, addBrand, categories, addCategory } =
    useContext(productContext);
  const [adminContent, setAdminContent] = useState(1);

  const [formData, setFormData] = useState({}); // State for JSONB data
  const [fieldName, setFieldName] = useState(""); // State for field name
  const [fieldValue, setFieldValue] = useState(""); // State for field value

  const addField = (fieldName, fieldValue) => {
    setFormData({
      ...formData,
      [fieldName]: fieldValue, // Update state using spread syntax
    });
    setFieldName(""); // Clear input fields after adding
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
              <p className="dashBoardText mt-2">0</p>
            </div>
          </li>
          <li className="dashBoardItemBox">
            <div>
              <p className="dashBoardText">คำสั่งซื้อที่สมบูรณ์</p>
              <p className="dashBoardText mt-2">0</p>
            </div>
          </li>
          <li className="dashBoardItemBox">
            <div>
              <p className="dashBoardText">คำสั่งซื้อที่ยกเลิก</p>
              <p className="dashBoardText mt-2">0</p>
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
                class="row g-3"
                onSubmit={handleSubmitproduct((data) => {
                  let newData = { ...data, spec: { ...formData } };
                  addProduct(newData);
                  resetproduct();
                  setFormData({});
                })}
              >
                <div class="col-md-12" style={{ textAlign: "right" }}>
                  <div
                    class="btn btn-danger"
                    onClick={() => {
                      resetproduct();
                      setFormData({});
                    }}
                  >
                    ล้างข้อมูล
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">ชื่อสินค้า :</label>
                  <input
                    type="text"
                    class="form-control"
                    {...product("name")}
                  />
                </div>
                <div class="col-md-2">
                  <label class="form-label">ราคา :</label>
                  <input
                    type="number"
                    class="form-control"
                    min={0}
                    {...product("price")}
                  />
                </div>
                <div class="col-md-2">
                  <label class="form-label">ส่วนลด :</label>
                  <input
                    type="number"
                    class="form-control"
                    min={0}
                    max={100}
                    {...product("discount")}
                  />
                </div>
                <div class="col-md-2">
                  <label class="form-label">จำนวน :</label>
                  <input
                    type="number"
                    class="form-control"
                    min={0}
                    {...product("quantity")}
                  />
                </div>

                <div class="col-md-8">
                  <label class="form-label">ลิงค์รูปภาพ :</label>
                  <input
                    type="text"
                    class="form-control"
                    {...product("image_url")}
                  />
                </div>

                <div class="col-md-2">
                  <label class="form-label">CategoryID :</label>
                  <input
                    type="text"
                    class="form-control"
                    {...product("category_id")}
                  />
                </div>
                <div class="col-md-2">
                  <label class="form-label">BrandID :</label>
                  <input
                    type="text"
                    class="form-control"
                    {...product("brand_id")}
                  />
                </div>

                <div class="col-md-12">
                  <label class="form-label">รายละเอียดสินค้า :</label>
                  <textarea
                    class="form-control"
                    {...product("description")}
                    rows="2"
                  />
                </div>
                {/*  */}
                <label class="col-md-12 form-label">สเปคสินค้า</label>
                <label class="col-md-1 form-label">ชื่อ field:</label>
                <div class="col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setFieldName(e.target.value)}
                    value={fieldName}
                  />
                </div>
                <label class="col-md-1 form-label">ค่า field:</label>
                <div class="col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    onChange={(e) => setFieldValue(e.target.value)}
                    value={fieldValue}
                  />
                </div>
                <div class="col-md-2">
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
                <div class="col-12">
                  <button type="submit" class="btn btn-primary">
                    เพิ่มสินค้า
                  </button>
                </div>
              </form>
            )}
            {adminContent === 2 && (
              <div>
                <form
                  class="row g-3"
                  onSubmit={handleSubmitCategory((data) => {
                    addCategory(data);
                    resetCategory();
                  })}
                >
                  <div class="col-md-12" style={{ textAlign: "right" }}>
                    <div
                      class="btn btn-danger"
                      onClick={() => {
                        resetCategory();
                      }}
                    >
                      ล้างข้อมูล
                    </div>
                  </div>
                  <div class="col-md-5">
                    <label class="form-label">ชื่อหมวดหมู่ :</label>
                    <input
                      type="text"
                      class="form-control"
                      {...category("categoryName")}
                    />
                  </div>
                  <div class="col-md-5">
                    <label class="form-label">ชื่อหมวดหมู่ Eng :</label>
                    <input
                      type="text"
                      class="form-control"
                      {...category("categoryNameEng")}
                    />
                  </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-primary">
                      เพิ่มหมวดหมู่สินค้า
                    </button>
                  </div>
                </form>
                <div>
                  <span>ID</span>
                  <span className="ms-2">Name</span>
                </div>
                {categories.map((category) => (
                  <div>
                    <div>
                      <span>{category.id}</span>
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
                  class="row g-3"
                  onSubmit={handleSubmitBrand((data) => {
                    addBrand(data);
                    resetBrand();
                  })}
                >
                  <div class="col-md-12" style={{ textAlign: "right" }}>
                    <div
                      class="btn btn-danger"
                      onClick={() => {
                        resetBrand();
                      }}
                    >
                      ล้างข้อมูล
                    </div>
                  </div>
                  <div class="col-md-5">
                    <label class="form-label">ชื่อแบรนด์ :</label>
                    <input
                      type="text"
                      class="form-control"
                      {...brand("brandName")}
                    />
                  </div>
                  <div class="col-md-5">
                    <label class="form-label">รูปภาพแบรนด์ :</label>
                    <input
                      type="text"
                      class="form-control"
                      {...brand("brandImageUrl")}
                    />
                  </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-primary">
                      เพิ่มแบรนด์หมู่สินค้า
                    </button>
                  </div>
                </form>
                <div>
                  <span>ID</span>
                  <span className="ms-2">Name</span>
                </div>
                {brands.map((brand) => (
                  <div>
                    <div>
                      <span>{brand.id}</span>
                      <span className="ms-2">{brand.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {adminContent === 4 && (
              <div>
                <h1>Transection</h1>
                <h1>Transection</h1>
                <h1>Transection</h1>
                <h1>Transection</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
