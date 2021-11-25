import formatCurrency from "../utils";
import Fade from "react-reveal-effects/Fade";
import Modal from "react-modal";
import { useState } from "react";
import Zoom from "react-reveal-effects/Zoom";

export default function Products({ products, addToCart}) {
  const [Product, setProduct] = useState({ product: null, isOpen: false });

  const openModal = (product) => {
    setProduct({product, isOpen: true });
  };

  const closeModal = () => {
    setProduct({ product: null, isOpen: false });
  };

  return (
    <div>
      <Fade bottom cascade>
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id} onClick={() => openModal(product)}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="button primary"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Fade>
      {Product.product && (
        <Modal isOpen={Product.isOpen} onRequestClose={closeModal}>
              <button className="close-modal" onClick={closeModal}>
                x
              </button>
          <Zoom>
            <div className="product-details">
              {console.log("pantalla modal", Product.product.title)}
              <img src={Product.product.image} alt={Product.product.title} />
              <div className="product-details-description">
                <p>
                  <strong>{Product.product.title}</strong>
                </p>
                <p>{Product.product.description}</p>
                <p>
                  Available Sizes:{" "}
                  {Product.product.availableSizes.map((x) => (
                    <span>
                      {" "}
                      <button className="button">{x}</button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{formatCurrency(Product.product.price)}</div>
                  <button
                    className="button primary"
                    onClick={(e) => {
                      addToCart(Product.product);
                      addToCart(Product.product);
                      closeModal();
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
}
