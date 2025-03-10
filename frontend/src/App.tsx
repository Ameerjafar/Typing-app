import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import { RecoilRoot } from "recoil"
import Result from "./component/Result"
import AuthComponent from "./component/authComponent/AuthComponent"
import UserProfile from "./component/UserProfile"
import WebSocketServer from "./ws/WebSocket"
function App() {
  const [ isLogin, setIsLogin ] = localStorage.getItem("isLogin");
  return (
    <RecoilRoot>
      <div className = 'min-h-screen'>
        <BrowserRouter>
          <Routes>  
            <Route path = '/' element = { <LandingPage />} /> 
            <Route path = '/result' element = { <Result />}></Route>
            {/* <Route path = '/word' element = { <Word />}></Route> */}
            <Route path = '/login' element = { <AuthComponent />}></Route>
            {isLogin && <Route path = '/profile' element = { <UserProfile />}></Route>}
            <Route path='/multiplayer' element = { <WebSocketServer />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      {/* <Footer /> */}
    </RecoilRoot>
  )
}

export default App
