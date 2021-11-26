import { useState } from "react";
import formatCurrency from "../utils";
import Fade from "react-reveal-effects/Fade";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartAction";

function Cart(props) {
  const { cartItems, removeFromCart } = props;

  const initialState = {
    name: "",
    email: "",
    address: "",
  };
  const [inputs, setInputs] = useState(initialState);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleInput = (e) => {
    setInputs({
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.address]: e.target.value,
    });
  };

  const createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: inputs.name,
      email: inputs.address,
      address: inputs.address,
      cartItems,
    };
    props.createOrder(order);
  };
  return (
    <>
      {/* <div>
        {cartItems.length === parseInt(0) ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}
        </div> */}
      <div>
        <Fade left cascade>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count} {""}
                      <button
                        className="button"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Fade>
      </div>
      {cartItems.length !== 0 && (
        <div>
          <div className="cart">
            <div className="total">
              <div>
                Total:{" "}
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button
                onClick={() => {
                  setShowCheckout(true);
                }}
                className="button primary"
              >
                Proceed
              </button>
            </div>
          </div>
          {showCheckout && (
            <Fade right cascade>
              <div className="cart">
                <form onSubmit={createOrder}>
                  <ul className="form-container">
                    <li>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        onChange={handleInput}
                      />
                    </li>
                    <li>
                      <button className="button primary" type="submit">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            </Fade>
          )}
        </div>
      )}
    </>
  );
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart }
)(Cart);
