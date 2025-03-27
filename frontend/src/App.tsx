import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import { RecoilRoot } from "recoil"
import Result from "./component/Result"
import UserProfile from "./component/UserProfile"
import SignIn from "./component/SignIn"
import SignUp from "./component/SignUp"
function App() {
  const token = localStorage.getItem("token");
  return (
    <RecoilRoot>
      <div className = 'min-h-screen'>
        <BrowserRouter>
          <Routes>  
            <Route path = '/' element = { <LandingPage />} /> 
            <Route path = '/login' element= { <SignIn />}></Route>
            <Route path = '/signup' element = { <SignUp />}></Route>
            <Route path = '/result' element = { <Result />}></Route>
            {/* <Route path = '/word' element = { <Word />}></Route> */}
            {token && <Route path = '/profile' element = { <UserProfile />}></Route>}
            {/* <Route path='/multiplayer' element = { <WebSocketServer />}></Route> */}
          </Routes>
        </BrowserRouter>
      </div>
      {/* <Footer /> */}
    </RecoilRoot>
  )
}

export default App
