import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const userData = params.get("user");



    if (!token || !userData) {

      return;
    }

    try {
      const user = JSON.parse(
        decodeURIComponent(userData)
      );

  

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );



      navigate("/");
    } catch (error) {

      navigate("/login");
    }
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-600" />

        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Signing you in...
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please wait...
        </p>
      </div>
    </main>
  );
}

export default GoogleSuccess;