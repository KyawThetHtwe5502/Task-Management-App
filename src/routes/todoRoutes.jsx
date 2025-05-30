import React from 'react'
import TodoDetailPage from '../features/Todo/pages/TodoDetailPage'
import TodoCreatePage from '../features/Todo/pages/TodoCreatePage'
import TodoEditPage from '../features/Todo/pages/TodoEditPage'

const todoRoutes = [
    
    {
        path: "detail/:id",
        element: <TodoDetailPage/>
    },
    {
        path: "create",
        element: <TodoCreatePage/>
    },
    {
        path: "edit/:id",
        element: <TodoEditPage/>
    }
]

export default todoRoutes