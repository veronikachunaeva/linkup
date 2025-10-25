import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import TheHeader from './components/TheHeader.jsx'
import TheFooter from './components/TheFooter.jsx'
import TheHome from './views/TheHome.jsx'
import TheLinks from './views/TheLinks.jsx'
import TheNotes from './views/TheNotes.jsx'
import TheLogin from './views/TheLogin.jsx'
import NotFound from './views/NotFound.jsx'

function App() {


  return (
    <>
    <TheHeader />
      <main className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <TheHome /> }/>
            <Route path="/links" element={ <TheLinks />} />
            <Route path="/notes" element={ <TheNotes /> }/>
            <Route path="/login" element={ <TheLogin /> }/>
            <Route path="*" element={ <NotFound /> }/>
          </Routes>
        </BrowserRouter>
      </main>
    <TheFooter />
    </>
  )
}

export default App
