import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import { RecoilRoot } from "recoil"
import Result from "./component/Result"
import AuthComponent from "./component/authComponent/AuthComponent"
import toast from "react-hot-toast"
import UserProfile from "./component/UserProfile"
function App() {

  return (
    <RecoilRoot>
      <div className = 'min-h-screen'>
        <BrowserRouter>
          <Routes>
            <Route path = '/' element = { <LandingPage />} /> 
            <Route path = '/result' element = { <Result />}></Route>
            {/* <Route path = '/word' element = { <Word />}></Route> */}
            <Route path = '/login' element = { <AuthComponent />}></Route>
            <Route path = '/profile' element = { <UserProfile />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      {/* <Footer /> */}
    </RecoilRoot>
  )
}

export default App
