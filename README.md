# TASK_MANAGEMENT_APP

## Feature

## Auth
[] Google Sign-in with OAuth2
[] When accessToken expire, login again
[] Google OAuth2 not support refreshToken

## Todo

### TodoList
[] TaskList using Google Task Api
[] filter status(completed,needsAction) and date(selectDate)
[] redirect to TodoCreatePage and TodoDetailPage

### TodoCreatePage
[] create by  title,notes,getStatus(formData.status),hidden,due 
[] readOnly starts(data and time) and ends(time) because of due not support time ,only date 
[] redirect to TodoListPage

### TodoDetailPage
[] readOnly data
[] delete task and back to TodoListPage
[] redirect to TodoEditPage

### TodoEditPage
[] edit by  title,notes,getStatus(formData.status),hidden,due
[] redirect to TodoDetailPage


#### Tech Stack
[] React.js , TailwindCss, Vite
[] @react-oauth/google for Google OAuth2 Authentication
[] React Router DOM	for Page navigation and routing
[] React Hook Form for formSummit
[] lucide-react for icons
[] Vercel for deploy