import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import Upload from "./views/Video/Upload";
import VideoDetails from "./views/Video/VideoDetails";
import subscriptionPage from "./views/SubscriptionPage/subscriptionPage";
import MyVideos from "./views/MyVideos.js/MyVideos";
import Update from "./views/Video/Update";
import MyInfo from "./views/User/MyInfo";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path='/' component={Auth(LandingPage, null)} />
          <Route exact path='/login' component={Auth(LoginPage, false)} />
          <Route exact path='/register' component={Auth(RegisterPage, false)} />
          <Route
            exact
            strict
            path='/video/upload'
            component={Auth(Upload, true)}
          />

          <Route
            exact
            strict
            path='/video/:videoId'
            component={Auth(VideoDetails, null)}
          />

          <Route
            exact
            strict
            path='/subscription'
            component={Auth(subscriptionPage, true)}
          />

          <Route
            exact
            strict
            path='/my-videos'
            component={Auth(MyVideos, true)}
          />

          <Route
            exact
            strict
            path='/update/:videoId'
            component={Auth(Update, true)}
          />

          <Route
            exact
            strict
            path='/user/:userId'
            component={Auth(MyInfo, true)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
