import { redirect } from "react-router-dom";

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload); 
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const isLoginLoader = (allowedRoles = []) => {
  return async () => {
    const tokenData = JSON.parse(localStorage.getItem("token"));

    if (!tokenData || !tokenData.token) {
      return redirect("/login"); 
    }

    const decodedToken = decodeJWT(tokenData.token);

    if (!decodedToken) {
      return redirect("/login"); 
    }

    const { role } = decodedToken; 

    const response = await fetch(`${import.meta.env.VITE_API}/status`, {
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
    });

    if (response.status === 401) {
      return redirect("/login"); 
    }

    if (!allowedRoles.includes(role)) {
      return redirect("/unauthorized"); 
    }

    return null; 
  };
};

export default isLoginLoader;
