import { Link } from "react-router-dom";
import "./CardProduct.css";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { productContext } from "../../contexts/productContext";
export default function CardProduct(props) {
  const { formatMoney } = useContext(productContext);
  const { product } = props;
  if (!product) {
    return null;
  }
  return (
    <Link to={`/product/${product._id}`}>
      <Card className="productCard">
        <Card.Img className="card-img" variant="top" src={product.image_url} />
        <Card.Body>
          <Card.Title>
            <div className="card-title">
              {product && product.name ? product.name.substring(0, 14) : ""}...
            </div>
          </Card.Title>
          <Card.Text>
            <div className="card-text">
              {product.discount !== undefined && product.discount !== 0 ? (
                <div className="discount">-{product.discount}%</div>
              ) : null}
              <div>
                $
                {formatMoney(
                  Math.floor(product.price * ((100 - product.discount) / 100))
                )}
              </div>

              {product.discount !== undefined && product.discount !== 0 ? (
                <s>${product.price}</s>
              ) : null}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
