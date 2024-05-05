import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
import AddAccount from "./pages/AddAccount";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UpdatePassword from "./pages/UpdatePassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <ChakraProvider>
          <ChatProvider>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/Updatepassword" element={<UpdatePassword />} />
              {/* <Route path="/Add" element={<AddAccount/>} /> */}
              <Route path="/home" element={<Home />} />
              <Route path="/chat" element={<ChatPage/>} />
            </Routes>
          </ChatProvider>
        </ChakraProvider>
      </BrowserRouter>
    </>
  );
}
