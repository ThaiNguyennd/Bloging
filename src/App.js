import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth-context";
import DashBoard from "./pages/DashBoard";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import PostPage from "./pages/PostPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AddPost from "./posts/AddPost";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
          <Route path="/detail" element={<DetailPage></DetailPage>}></Route>
          <Route path="/manage/posts" element={<PostPage></PostPage>}></Route>
          <Route path="/manage/add_post" element={<AddPost></AddPost>}></Route>
          <Route path="/*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
