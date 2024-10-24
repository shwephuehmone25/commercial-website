import { useEffect, useState } from "react";
import Product from "../../components/Product";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  // Fetch products with error handling
  const getAllProducts = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/products?page=${pageNum}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      const { products, totalProducts, totalPages } = await response.json();
      setTotalPages(totalPages);
      setProducts(products);
    } catch (error) {
      setError(error.message);
      toast.error("Error fetching products: " + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage]); // Only re-fetch when the currentPage changes

  // Pagination handlers
  const handlePre = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <section className="flex gap-6 px-10 mt-10 flex-wrap w-full justify-center">
      {!loading && products.length > 0 ? (
        <>
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              getAllProducts={getAllProducts}
              customAlert={(message) => {
                toast.info(message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  pauseOnHover: true,
                  draggable: true,
                });
              }}
            />
          ))}
          <div className="w-full flex items-center justify-center gap-3 mt-4">
            {currentPage > 1 && (
              <button
                type="button"
                className="text-white font-medium bg-teal-600 px-3 py-1"
                onClick={handlePre}
              >
                Prev Page
              </button>
            )}
            {currentPage < totalPages && (
              <button
                type="button"
                className="text-white font-medium bg-teal-600 px-3 py-1"
                onClick={handleNext}
              >
                Next Page
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full">
          {loading ? (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
        draggable
      />
    </section>
  );
};

export default Index;
