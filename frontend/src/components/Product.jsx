import { TrashIcon, PencilSquareIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import DOMPurify from "dompurify"; 

const Product = ({ product, getAllProducts, customAlert }) => {
  const { token } = useContext(UserContext);
  const { _id, title, content, createdAt } = product;

  const formattedDate = format(new Date(createdAt), "yyyy-MMM-dd");

  const deleteProduct = async () => {
    console.log("Product ID:", _id); 
  
    const userConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (!userConfirmed) return;
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/delete/product/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
  
      console.log("Delete response status:", response.status); 
  
      if (response.status === 204) {
        customAlert("Product deleted successfully.");
        getAllProducts(); 
      } else if (response.status === 404) {
        customAlert("Product not found!"); 
      } else if (response.status === 401 || response.status === 403) {
        customAlert("Permission Denied!"); 
      } else {
        customAlert("Failed to delete the product. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred during deletion:", error);
      customAlert("An error occurred. Please try again.");
    }
  };  

  return (
    <div className="w-2/5 border-t-4 border-t-teal-600 shadow-lg p-3 h-fit">
      <h3 className="text-xl font-medium">{DOMPurify.sanitize(title)}</h3> 
      <p className="text-sm">{DOMPurify.sanitize(content.slice(0, 120))}...</p> 
      <div className="flex items-center justify-between mt-2 border-t pt-2">
        <p className="text-sm font-medium">{formattedDate}</p>
        <div className="flex items-center justify-end gap-2">
          {token && (
            <>
              <TrashIcon
                width={20}
                className="text-red-600 cursor-pointer"
                onClick={deleteProduct}
              />
              <Link to={`/edit/product/${_id}`}>
                <PencilSquareIcon width={20} className="text-teal-600" />
              </Link>
            </>
          )}
          <Link to={`/product/${_id}`}>
            <EyeIcon width={20} className="text-blue-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
