import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { Hearts } from "react-loader-spinner";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const getProduct = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch the product.");
      }
      const product = await response.json();
      setProduct(product);
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]); 

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10">
        <p>{error}</p>
        <Link to="/" className="text-teal-600 font-medium">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center w-full h-64">
          <Hearts
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="hearts-loading"
            visible={loading}
          />
        </div>
      ) : (
        product && (
          <section className="px-10 mt-10">
            <div className="text-right">
              <Link
                to="/"
                className="text-teal-600 font-medium border border-teal-600 px-3 py-2"
              >
                Back
              </Link>
            </div>
            <div className="border-t-4 border-t-teal-600 shadow-lg p-3 mt-4">
              {product.image ? (
                <img
                  src={`${import.meta.env.VITE_API}/${product.image}`}
                  alt={product.title}
                  className="my-10 h-64 w-full object-cover"
                />
              ) : (
                <div className="my-10 h-64 w-full bg-gray-200 flex items-center justify-center">
                  <p>No image available</p>
                </div>
              )}
              <h3 className="text-3xl font-medium">{product.title}</h3>
              <div className="flex gap-4 my-2">
                {product.createdAt && product.author && (
                  <>
                    <p className="flex items-center gap-1 font-medium text-sm text-gray-600">
                      <UserIcon className="w-4 h-4" /> {product.author.username}
                    </p>
                    <p className="flex items-center gap-1 font-medium text-sm text-gray-600">
                      <CalendarDaysIcon className="w-4 h-4" />
                      {format(new Date(product.createdAt), "yyyy-MMM-dd")}
                    </p>
                  </>
                )}
              </div>
              <p className="text-base mt-2">{product.content}</p>
            </div>
          </section>
        )
      )}
    </>
  );
};

export default Details;
