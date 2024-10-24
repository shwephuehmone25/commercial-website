import { useContext, useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomErrorMessage from "./CustomErrorMessage";
import { UserContext } from "../contexts/UserContext";

const ProductForm = ({ isCreate }) => {
  const { token } = useContext(UserContext);
  const { id } = useParams(); 
  const [redirect, setRedirect] = useState(false);
  const [oldProduct, setOldProduct] = useState({});
  const [previewImg, setPreviewImg] = useState(null);  
  const [isUpload, setIsUpload] = useState(false);  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef();

  // Fetch old product data if editing
  const getOldProduct = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      if (response.ok) {
        const product = await response.json();
        setOldProduct(product);
        if (product.image) {
          setPreviewImg(`${import.meta.env.VITE_API}/${product.image}`);  
        }
      } else {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error fetching old product:", error);
    }
  };

  useEffect(() => {
    if (!isCreate && id) {
      getOldProduct();
    }
  }, [isCreate, id]);

  // Initial form values
  const initialValues = {
    title: isCreate ? "" : oldProduct.title || "",
    content: isCreate ? "" : oldProduct.content || "",
    image: isCreate ? "" : oldProduct.image || "",  
  };

  // Supported image formats
  const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];

  // Validation schema using Yup
  const ProductFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required."),
    content: Yup.string()
      .min(5, "Content is too short!")
      .required("Content is required."),
    image: Yup.mixed()
      .nullable()
      .test(
        "FILE_FORMAT",
        "File type is not supported.",
        (value) => !value || SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  // Handle image change event
  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setPreviewImg(URL.createObjectURL(selectedImage));  
      setFieldValue("image", selectedImage);  
    }
  };

  // Clear image preview
  const clearPreviewImg = (setFieldValue) => {
    setPreviewImg(null);
    setFieldValue("image", null);
    fileRef.current.value = "";
  };

  // Submit form data
  const submitHandler = async (values) => {
    setIsSubmitting(true);
    try {
      const API = isCreate
        ? `${import.meta.env.VITE_API}/create/product`
        : `${import.meta.env.VITE_API}/edit/${id}`;
      const method = isCreate ? "POST" : "PUT";

      const formData = new FormData();
      formData.append("title", values.title.trim());
      formData.append("content", values.content.trim());

      if (values.image && typeof values.image !== "string") { 
        formData.append("image", values.image);
      }

      const response = await fetch(API, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (response.ok) {
        toast.success("Product saved successfully!");
        setRedirect(true);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        throw new Error("Failed to save the product.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <section>
      <ToastContainer />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create" : "Edit"}
        </h1>
        <Link to="/">
          <ArrowLeftIcon width={22} />
        </Link>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={ProductFormSchema}
        onSubmit={submitHandler}
        enableReinitialize={true}  
      >
        {({ setFieldValue }) => (
          <Form encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="title" className="font-medium block">
                Title:
              </label>
              <Field
                name="title"
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                placeholder="Enter your title"
              />
              <CustomErrorMessage name="title" />
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="font-medium block">
                Content:
              </label>
              <Field
                as="textarea"
                name="content"
                rows={4}
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                placeholder="Enter your content"
              />
              <CustomErrorMessage name="content" />
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="font-medium block">
                Cover image{" "}
                <span className="text-xs font-medium text-yellow-400">
                  *optional
                </span>
              </label>
              {previewImg && (
                <p
                  className="text-base font-medium cursor-pointer text-teal-600"
                  onClick={() => clearPreviewImg(setFieldValue)}
                >
                  Clear
                </p>
              )}
              {isUpload ? (
                <p
                  className="text-base font-medium cursor-pointer text-teal-600"
                  onClick={() => setIsUpload(false)}
                >
                  Disable cover image
                </p>
              ) : (
                <p
                  className="text-base font-medium cursor-pointer text-teal-600"
                  onClick={() => setIsUpload(true)}
                >
                  Upload cover image
                </p>
              )}
              {isUpload && (
                <>
                  <input
                    type="file"
                    name="image"
                    hidden
                    ref={fileRef}
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                  />
                  <div
                    className="border border-teal-600 flex items-center justify-center text-teal-600 border-dashed h-60 cursor-pointer rounded-lg relative overflow-hidden"
                    onClick={() => fileRef.current.click()}
                  >
                    <ArrowUpTrayIcon width={30} height={30} className="z-20" />
                    {previewImg && (
                      <img
                        src={previewImg}
                        alt="preview"
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-80 z-10"
                      />
                    )}
                  </div>
                </>
              )}
              <CustomErrorMessage name="image" />
            </div>

            <button
              type="submit"
              className="text-white bg-teal-600 py-3 font-medium w-full text-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : isCreate ? "Save" : "Update"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ProductForm;
