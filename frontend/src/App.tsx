import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import { RecoilRoot } from "recoil"
import Result from "./component/Result"
import AuthComponent from "./component/authComponent/AuthComponent"
import UserProfile from "./component/UserProfil"
import { Toast } from "react-hot-toast"
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
            <Route path = '/userprofile' element = { <UserProfile />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      {/* <Footer /> */}
    </RecoilRoot>
  )
}

export default App
