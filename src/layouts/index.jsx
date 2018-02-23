import React from "react";
import Helmet from "react-helmet";
import "font-awesome/scss/font-awesome.scss";
import config from "../../data/SiteConfig";
import "./index.scss";
import "./global.scss";
import { Toolbar } from "react-md";
import UserLinks from "../components/UserLinks/UserLinks";
import Map from "../components/Map/Map";

export default class MainLayout extends React.Component {
  getLocalTitle() {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const pathPrefix = config.pathPrefix ? config.pathPrefix : "/";
    const currentPath = this.props.location.pathname
      .replace(pathPrefix, "")
      .replace("/", "");
    let title = "";
    if (currentPath === "") {
      title = "Home";
    } else if (currentPath === "login") {
      title = "Login";
    } else if (currentPath === "fonts") {
      title = "Fonts";
    }
    return title;
  }
  render() {
    const linkConfig ={
      userLinks: [
        {
          url: "/about",
          label: "Rànquings",
          iconClassName: ""
        }
      ]
    };

    return (
      <div>
        <Toolbar
          id="fixed-toolbar"
          fixed
          colored
          title={this.getLocalTitle()}
          actions={<UserLinks config={linkConfig} labeled="1" />}
        />
        <Helmet>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <Map />
      </div>
    );
  }
}
