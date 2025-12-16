import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './views/HomePage.jsx'
import LoginPage from './views/LoginPage.jsx'
import ProfilePage from './views/ProfilePage.jsx'
import ProfileEditPage from './views/ProfileEditPage.jsx'
import RegisterPage from './views/RegisterPage.jsx'
import LinksPage from './views/LinksPage.jsx'
import NewLinkPage from './views/NewLinkPage.jsx'
import EditLinkPage from './views/EditLinkPage.jsx'
import NotesPage from './views/NotesPage.jsx'
import NewNotesPage from './views/NewNotesPage.jsx'
import EditNotePage from './views/EditNotePage.jsx'
import CategoriesPage from './views/CategoriesPage.jsx'
import NewCategoryPage from './views/NewCategoryPage.jsx'
import CategoryDetailsPage from './views/CategoryDetailsPage.jsx'
import EditCategoryPage from './views/EditCategoryPage.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import NotFoundPage from './views/NotFoundPage.jsx'
import AppLayout from './components/AppLayout.jsx'
import UsersPage from './views/UsersPage.jsx'
import UserDetailsPage from './views/UserDetailsPage.jsx'
import UserEditPage from './views/UserEditPage.jsx'
import {  AuthProvider } from './context/AuthContext.jsx'
import {ThemeProviderWrapper} from './context/ThemeContext.jsx'

// import theme from "./theme";
import { Experimental_CssVarsProvider as CssVarsProvider, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <>
    <AuthProvider>
      <ThemeProviderWrapper>
        <CssBaseline /> 
        <main className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={ <AppLayout /> }>
                <Route path="/" element={ <HomePage /> }/>
                <Route path="/links/all" element={ <PrivateRoute><LinksPage /></PrivateRoute>} />
                <Route path="/links/new" element={ <NewLinkPage />} />
                <Route path="/links/edit/:id" element={ <EditLinkPage />} />
                <Route path="/notes/all" element={ <PrivateRoute><NotesPage /></PrivateRoute>}/>
                <Route path="/notes/new" element={ <NewNotesPage /> }/>
                <Route path="/notes/edit/:id" element={ <EditNotePage />} />
                <Route path="/categories" element={<PrivateRoute><CategoriesPage /></PrivateRoute>} />
                <Route path="/categories/new" element={<NewCategoryPage />} />
                <Route path="/categories/:id" element={<CategoryDetailsPage />} />
                <Route path="/categories/edit/:id/" element={<EditCategoryPage  />} />
                <Route path="/login" element={ <LoginPage /> }/>
                {/* <Route path="/profile" element={ <ProfilePage /> }/> */}
                <Route path="/register" element={ <RegisterPage /> }/>
                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                <Route path="/profile/edit" element={<PrivateRoute><ProfileEditPage /></PrivateRoute>} />
                <Route path="/users" element={<AdminRoute><UsersPage /></AdminRoute>} />
                <Route path="/users/:id" element={<AdminRoute><UserDetailsPage /></AdminRoute>} />
                <Route path="/users/:id/edit" element={<AdminRoute><UserEditPage /></AdminRoute>} />
                <Route path="*" element={ <NotFoundPage /> }/>
              </Route>
            </Routes>
          </BrowserRouter>
        </main>
      </ThemeProviderWrapper>
    </AuthProvider>
    </>
  )
}

export default App
