import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import SignInPage from "./features/Auth/pages/SignInPage";
import todoRoutes from "./routes/todoRoutes";
import Layout from "./components/Layout";
import TodoListPage from "./features/Todo/pages/TodoListPage";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <NotFoundPage/>,
        children: [
            {
                index: true,
                element: <SignInPage/>
            },
            {
                path : "todo",
                element: <Layout/>,
                children: [{
                    index : true,
                    element : <TodoListPage/>
                },
                ...todoRoutes
            ]
            }
        ]
    }
]);

export default router;