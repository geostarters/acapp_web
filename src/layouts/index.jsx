import React from "react";
import Helmet from "react-helmet";
import "font-awesome/scss/font-awesome.scss";
import config from "../../data/SiteConfig";
import "./index.scss";
import "./global.scss";
import { Toolbar } from "react-md";
import UserLinks from "../components/UserLinks/UserLinks";
import Map from "../components/Map/Map";
import Ranquings from "../components/Ranquings/Ranquings";
import BackOffice from "../components/BackOffice/BackOffice";

export default class MainLayout extends React.Component {
  getCurrentPath() {

    const pathPrefix = config.pathPrefix ? config.pathPrefix : "/";
    const currentPath = this.props.location.pathname
      .replace(pathPrefix, "")
      .replace("/", "");

    return currentPath;

  }

  getLocalTitle() {
    const currentPath = this.getCurrentPath();
    let title = "";

    if (currentPath === "") {
      title = "Home";
    } else if (currentPath === "login/") {
      title = "Login";
    } else if (currentPath === "ranquings/") {
      title = "Rànquings";
    } else if (currentPath === "admin/") {
      title = "Administració";
    }
    return title;
  }

  getLink() {
    const currentPath = this.getCurrentPath();

    const rankingLinkConfig ={
      userLinks: [
        {
          url: "/ranquings/",
          label: "Rànquings",
          iconClassName: ""
        }
      ]
    };

    const mapLinkConfig ={
      userLinks: [
        {
          url: "/",
          label: "Mapa",
          iconClassName: ""
        }
      ]
    };

    if (currentPath === "") {
      return <UserLinks config={rankingLinkConfig} labeled="1" />;
    } else {
      return <UserLinks config={mapLinkConfig} labeled="1" />;
    }

  }

  render() {
    return (
      <div>
        <Toolbar
          id="fixed-toolbar"
          fixed
          colored
          title={this.getLocalTitle()}
          actions={this.getLink()}
        />
        <Helmet>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        {this.renderContent()}
      </div>
    );
  }

  renderContent() {

    const currentPath = this.getCurrentPath();

    if (currentPath === "") {
      return <Map />;
    } else if (currentPath === "ranquings/") {
      return <Ranquings />;
    } else if (currentPath === "login/") {
      return <Login />
    } else if (currentPath === "admin/") {
      return <BackOffice />
    }

  }
}
