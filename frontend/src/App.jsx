import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard.jsx";
import "./App.css";

const BASE_URL = "http://localhost:5000/api/v1/products";

function App() {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("");
    const [nextCursor, setNextCursor] = useState(null);
    const [hasMore, setHasMore] = useState(false);

    const fetchProducts = async (reset = false) => {

        let url = BASE_URL + "?";

        if (category) {
            url += `category=${category}&`;
        }

        if (!reset && nextCursor) {
            url += `cursorCreatedAt=${nextCursor.cursorCreatedAt}`;
            url += `&cursorId=${nextCursor.cursorId}`;
        }

        const res = await axios.get(url);

        if (reset) {
            setProducts(res.data.products);
        }
        else {
            setProducts(prev => [...prev, ...res.data.products]);
        }

        setNextCursor(res.data.nextCursor);
        setHasMore(res.data.hasMore);
    };

    useEffect(() => {
        fetchProducts(true);
    }, [category]);

    return (
        <div className="container">

            <h1>Product Browser</h1>

            <div className="top-bar">

                <div className="count">
                    Showing {products.length} products
                </div>

                <select
                    value={category}
                    onChange={(e)=>{
                        setNextCursor(null);
                        setCategory(e.target.value);
                    }}
                >
                    ...
                </select>

            </div>

            <select
                value={category}
                onChange={(e) => {
                    setNextCursor(null);
                    setCategory(e.target.value);
                }}
            >
                <option value="">All Categories</option>
                <option value="Laptop">Laptop</option>
                <option value="Phone">Phone</option>
                <option value="Watch">Watch</option>
                <option value="Camera">Camera</option>
                <option value="Headphones">Headphones</option>
                <option value="Books">Books</option>
                <option value="Shoes">Shoes</option>
                <option value="Tablet">Tablet</option>
            </select>

            <div className="grid">

                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}

            </div>

            {hasMore && (

                <button
                    onClick={() => fetchProducts(false)}
                >
                    Load More
                </button>

            )}

        </div>
    );
}

export default App;