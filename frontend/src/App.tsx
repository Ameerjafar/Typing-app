import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import { RecoilRoot } from "recoil"
import Result from "./component/Result"
function App() {

  return (
    <RecoilRoot>
        <div className = 'min-h-screen'>
        <BrowserRouter>
          <Routes>
            <Route path = '/' element = { <LandingPage />} /> 
            <Route path = '/result' element = { <Result />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  )
}

export default App
