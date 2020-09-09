import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import DetailAnnouncement from "./pages/DetailAnnouncement";
import Footer from "./components/Footer";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/404"} exact component={PageNotFound} />
        <Route path={"/:id(\\d+)"} component={DetailAnnouncement} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
