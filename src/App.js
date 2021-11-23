import { useState } from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

function App() {
  const [product, setProduct] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  const [{ products, sizes, sorts }, setProducts] = useState({
    products: data.products,
    sizes: "",
    sorts: "",
  });

  const sortProducts = (e) => {
    const sort = e.target.value;
    setProducts((state) =>({
      sorts: sort,
      products: state.products.slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }));
  };
  const filterProducts = (e) => {
    if (e.target.value === "") {
      setProducts({ sizes: e.target.value, products: data.products });
    } else {
      setProducts({
        sizes: e.target.value,
        products: data.products.filter(
          (element) => element.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              size={sizes}
              sort={sorts}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />

            <Products products={products} />
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>All Right is Reseved</footer>
    </div>
  );
}

export default App;
