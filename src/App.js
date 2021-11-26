import { useState } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

// import store from "./store";

function App() {
  const [{ products, sizes, sorts, cartItems }, setProducts] = useState({
    products: data.products,
    sizes: "",
    sorts: "",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [], //[]al inicio
  });

  const createOrder = (order) => {
    alert("need to save order for " + order.name);
  };

  //removeFromCart
  const removeFromCart = (products) => {
    const cartItem = cartItems.slice();
    // cartItem.filter(x => x._id !== products._id);
    setProducts((prev) => ({
      ...prev,
      cartItems: cartItem.filter((x) => x._id !== products._id),
    }));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItem.filter((x) => x._id !== products._id))
    );
  };

  const addToCart = (products) => {
    const cartItem = cartItems.slice();
    let alreadyInCart = false;
    cartItem.forEach((item) => {
      if (item._id === products._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...products, count: 1 });
    }
    setProducts((prev) => ({ ...prev, cartItem }));
    // setCartItem(cartItem); //funciona bien
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  // const sortProducts = (e) => {
  //   const sort = e.target.value;
  //   setProducts((state) => ({
  //     sorts: sort,
  //     products: state.products
  //       .slice()
  //       .sort((a, b) =>
  //         sort === "lowest"
  //           ? a.price > b.price
  //             ? 1
  //             : -1
  //           : sort === "highest"
  //           ? a.price < b.price
  //             ? 1
  //             : -1
  //           : a._id > b._id
  //           ? 1
  //           : -1
  //       ),
  //     cartItems: state.cartItems,
  //   }));
  // };
  // const filterProducts = (e) => {
  //   if (e.target.value === "") {
  //     setProducts({ sizes: e.target.value, products: data.products });
  //   } else {
  //     setProducts({
  //       sizes: e.target.value,
  //       products: data.products.filter(
  //         (element) => element.availableSizes.indexOf(e.target.value) >= 0
  //       ),
  //       cartItems: cartItems,
  //     });
  //   }
  // };

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              // count={products.length}
              // size={sizes}
              // sort={sorts}
              // filterProducts={filterProducts}
              // sortProducts={sortProducts}
            />

            <Products
              // products={products}
              addToCart={addToCart} />
          </div>
          <div className="sidebar">
            {" "}
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>
      <footer>All Right is Reseved</footer>
    </div>
  );
}

export default App;
