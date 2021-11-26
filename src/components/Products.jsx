import formatCurrency from "../utils";
import Fade from "react-reveal-effects/Fade";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import Zoom from "react-reveal-effects/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import {addToCart} from '../actions/cartAction'

function Products(props) {
  const [Product, setProduct] = useState({ product: null, isOpen: false });

  const { products, addToCart, fetchProducts } = props;

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (product) => {
    setProduct({ product, isOpen: true });
  };

  const closeModal = () => {
    setProduct({ product: null, isOpen: false });
  };

  return (
    <div>
      <Fade bottom cascade>
        {!products ? (
          <div>Loading...</div>
        ) : (
          <ul className="products">
            {products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a
                    href={"#" + product._id}
                    onClick={() => openModal(product)}
                  >
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
        )}
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

// const mapStateToProps = (state) => {
//   console.log('estado',state);
//   return {
//     products: state.products.items,
//   };
// };

export default connect((state) => ({ products:state.products.filteredItems}), { fetchProducts,addToCart })(Products);
// export default Products;
