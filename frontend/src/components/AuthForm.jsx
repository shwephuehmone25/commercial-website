import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomErrorMessage from "./CustomErrorMessage";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const AuthForm = ({ isLogin }) => {
  const { updateToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    role: "", 
  };

  const AuthFormSchema = Yup.object({
    username: isLogin
      ? null
      : Yup.string()
          .min(3, "Username is too short!")
          .max(25, "Username is too long!")
          .required("Username is required!"),
    email: Yup.string()
      .required("Email is required!")
      .email("Please enter a valid email!"),
    password: Yup.string()
      .min(4, "Password is too short!")
      .required("Password is required!"),
    role: isLogin
      ? null
      : Yup.string().required("Role is required!"), 
  });

  const submitHandler = async (values) => {
    setIsSubmitting(true);
    const { email, password, username, role } = values; 
    const END_POINT = isLogin
      ? `${import.meta.env.VITE_API}/login`
      : `${import.meta.env.VITE_API}/register`;

    try {
      const response = await fetch(END_POINT, {
        method: "POST",
        body: JSON.stringify({ email, password, username, role }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      
      if (response.ok) {
        if (isLogin) {
          updateToken(responseData);
        }
        setRedirect(true);
        toast.success(isLogin ? "Logged in successfully!" : "Registered successfully!");
      } else {
        throw new Error(responseData.message || "An error occurred");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (redirect) {
    return <Navigate to={isLogin ? "/" : "/login"} />;
  }

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={AuthFormSchema}
        onSubmit={submitHandler}
      >
        {() => (
          <Form className="w-1/2 mx-auto">
            <h1 className="text-center font-bold text-4xl my-4 text-teal-600">
              {isLogin ? "Login" : "Register"}
            </h1>
            {!isLogin && (
              <>
                <div className="mb-3">
                  <label htmlFor="username" className="font-medium block">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                    placeholder="Enter your name"
                  />
                  <CustomErrorMessage name="username" />
                </div>

                <div className="mb-3">
                  <label htmlFor="role" className="font-medium block">
                    Role
                  </label>
                  <Field
                    as="select"
                    name="role"
                    id="role"
                    className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Field>
                  <CustomErrorMessage name="role" />
                </div>
              </>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="font-medium block">
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                placeholder="example@gmail.com"
              />
              <CustomErrorMessage name="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="font-medium block">
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                placeholder="Enter your password"
              />
              <CustomErrorMessage name="password" />
            </div>
            <button
              className="text-white bg-teal-600 py-3 font-medium w-full text-center"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : isLogin ? "Login" : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthForm;
