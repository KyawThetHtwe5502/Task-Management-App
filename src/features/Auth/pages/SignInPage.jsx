import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

const SignInPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const login = useGoogleLogin({
    scope: "https://www.googleapis.com/auth/tasks",
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;
        console.log(accessToken)
            localStorage.setItem("google_access_token", accessToken);

        const res = await fetch("https://tasks.googleapis.com/tasks/v1/users/@me/lists", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch task lists");

        const data = await res.json();
        setTasks(data.items || []);
      } catch (err) {
        setError(err.message);
      }
    },
    onError: (err) => {
      setError("Login failed");
      console.error("Login Error", err);
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Google Tasks Viewer
        </h1>

        <button
          onClick={() => login()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
        >
          Sign in with Google
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}

        {tasks.length > 0 && (
          <section className="mt-6">
            <h2 className="text-lg font-medium mb-2 text-gray-700">
              Task Lists:
            </h2>
            <ul className="space-y-2 list-disc list-inside text-gray-600">
              {tasks.map((taskList) => (
                <li key={taskList.id}>{taskList.title}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
};

export default SignInPage;
