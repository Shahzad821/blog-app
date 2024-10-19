import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Projects from "./pages/Projects";
import FooterCom from "./components/Footer";
import Privateroot from "./components/Privateroot";
import Dashboard from "./pages/Dashboard";
import OnlyAdminPrivateroot from "./components/OnlyAdminPrivateroot";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
const App = () => {
  return (
    <div>
      <ScrollToTop></ScrollToTop>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/search" element={<Search />} />
        <Route element={<Privateroot />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateroot />}>
          <Route path="create-post" element={<CreatePost />}></Route>
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />}></Route>
      </Routes>
      <FooterCom></FooterCom>
    </div>
  );
};

export default App;
