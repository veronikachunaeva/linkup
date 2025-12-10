import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './views/HomePage.jsx'
import LoginPage from './views/LoginPage.jsx'
import ProfilePage from './views/ProfilePage.jsx'
import RegisterPage from './views/RegisterPage.jsx'
import LinksPage from './views/LinksPage.jsx'
import NewLinkPage from './views/NewLinkPage.jsx'
import EditLinkPage from './views/EditLinkPage.jsx'
import NotesPage from './views/NotesPage.jsx'
import NewNotesPage from './views/NewNotesPage.jsx'
import EditNotePage from './views/EditNotePage.jsx'
import CategoriesPage from './views/CategoriesPage.jsx'
import NewCategoryPage from './views/NewCategoryPage.jsx'
import NotFoundPage from './views/NotFoundPage.jsx'
import AppLayout from './components/AppLayout.jsx'
import {  AuthProvider } from './context/AuthContext.jsx'

import theme from "./theme";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

function App() {
  return (
    <>
    <AuthProvider>
      <CssVarsProvider theme={theme} defaultMode="dark">
        <main className="container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={ <AppLayout /> }>
                <Route path="/" element={ <HomePage /> }/>
                <Route path="/links/all" element={ <LinksPage />} />
                <Route path="/links/new" element={ <NewLinkPage />} />
                <Route path="/links/edit/:id" element={ <EditLinkPage />} />
                <Route path="/notes/all" element={ <NotesPage /> }/>
                <Route path="/notes/new" element={ <NewNotesPage /> }/>
                <Route path="/notes/edit/:id" element={ <EditNotePage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/new" element={<NewCategoryPage />} />
                <Route path="/login" element={ <LoginPage /> }/>
                <Route path="/profile" element={ <ProfilePage /> }/>
                <Route path="/register" element={ <RegisterPage /> }/>
                <Route path="*" element={ <NotFoundPage /> }/>
              </Route>
            </Routes>
          </BrowserRouter>
        </main>
      </CssVarsProvider>
    </AuthProvider>
    </>
  )
}

export default App
