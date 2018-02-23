import React from "react";
import Helmet from "react-helmet";
import "font-awesome/scss/font-awesome.scss";
import config from "../../data/SiteConfig";
import "./index.scss";
import "./global.scss";
import { Toolbar } from "react-md";

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
    const { children } = this.props;
    return (
      <div>
        <Toolbar
          id="fixed-toolbar"
          fixed
          colored
          title={this.getLocalTitle()}
        />
        <Helmet>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        {children()}
      </div>
    );
  }
}
