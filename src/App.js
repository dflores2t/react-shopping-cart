import { useState } from "react";
import data from "./data.json";
import Products from './components/Products';

function App() {
  const [product, setProduct] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  
  const [{ products, sizes, sorts }, setProducts] = useState({
    products: data.products,
    sizes: "",
    sorts: "",
  });

  return (
    <div className="grid-container">
      <header>
        <a href="/">React Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Products products={products}/>
          </div>
          <div className="sidebar">Cart Items</div>
        </div>
      </main>
      <footer>All Right is Reseved</footer>
    </div>
  );
}

export default App;
