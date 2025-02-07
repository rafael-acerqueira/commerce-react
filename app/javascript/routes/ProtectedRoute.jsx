import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default () => {
  const { user, login, setCsrf } = useUserContext()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/me");
        if (response.ok) {
          const json = await response.json();

          const email = json.email
          login(email)

          const csrf = json.csrf_token
          setCsrf(csrf)
        } else {
          login(null)
        }

      } catch (error) {
        console.error("Failure to auth", error);
        login(null)
      } finally {
        setLoading(false);
      }
    }
    checkAuth()
  }, [])

  if (loading) return <p>Loading...</p>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};