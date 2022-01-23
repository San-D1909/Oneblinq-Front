import React, { Component } from "react";
import { NavMenu } from "../components/NavMenu";
import { PluginCard } from "../components/PluginCard";
import { Footer } from "../components/Footer";
import axios from "axios";
import "./CSS/SearchBox.css";

function PluginList(props) {
  const { plugins } = props;
  console.log(plugins);
  const listItems = plugins.map((plugin, i) => (
    <div key={i} className="col-12 col-lg-4 col-md-6 py-3">
      <PluginCard data={plugin} />
    </div>
  ));
  return <div className="row">{listItems}</div>;
}

function PluginBundleList(props) {
  const { bundles } = props;
  console.log(bundles);
  const listItems = bundles.map((bundle, i) => (
    <div key={i} className="col-12 col-lg-4 col-md-6 py-3">
      <BundleCard bundle={bundle} />
    </div>
  ));

  return <div className="row">{listItems}</div>;
}
function BundleCard(props) {

  const bundleCardTitleStyle = {
    backgroundColor: "#deeff4",
    color: "#02021E",
  };
  const textStyle = {
    color: "inherit",
  };
  const textDecoNone = {
    textDecoration: "none",
  };
  const { bundle } = props;
  let image = bundle.image ? bundle.image.imageData : "https://via.placeholder.com/344x216.png";
  console.log(image)

  return (
    <a
      style={textDecoNone}
      className="card plugin"
      href={"/Bundle/" + bundle.id}
    >
      <div className="card-body">
        <img
          src={image}
          alt={bundle.bundleName}
        />
      </div>
      <div style={bundleCardTitleStyle} className="card-footer">
        <span style={textStyle}>{bundle.bundleName}</span>
        <span style={textStyle} className="float-end">
          <span style={textStyle}>
            <i className="far fa-sm fa-comment"></i>10
          </span>
          <span style={textStyle}>&euro;{bundle.price}</span>
          <span style={textStyle} className="pl-2">
            <i className="fas fa-sm fa-arrow-down"></i> 1.7k
          </span>
        </span>
      </div>
    </a>
  );
}

export class Plugins extends Component {
  static displayName = Plugins.name;
  constructor(props) {
    super(props);
    this.state = {
      plugins: [],
      bundles: [],
      hover: false,
      searchString: "",
    };
    this.fetchPlugins = this.fetchPlugins.bind(this);
    this.fetchBundles = this.fetchBundles.bind(this);
    this.GetBundleSearchResults = this.GetBundleSearchResults.bind(this);
    this.GetPluginSearchResults = this.GetPluginSearchResults.bind(this);
  }

  async componentDidMount() {
    this.setState({
      plugins: await this.fetchPlugins(),
      bundles: await this.fetchBundles(),
      hover: false,
    });
  }

  async fetchBundles() {
    return await axios
      .get(process.env.REACT_APP_API_BACKEND + "/api/v1/PluginBundle")
      .then((response) => response.data);
  }

  async fetchPlugins() {
    return await axios
      .get(process.env.REACT_APP_API_BACKEND + "/api/v1/Plugin")
      .then((response) => response.data);
  }

  hrStyling = {
    height: "2px",
    opacity: 0.8,
    color: "#edeffc",
  };

  GetPluginSearchResults = (event) => {
    var self = this;
    axios({
      method: "Post",
      url: process.env.REACT_APP_API_BACKEND + "/api/v1/Plugin/SearchForPlugin",
      params: {
        searchString: event.target.value,
      },
    }).then((data) => {
      self.setState({ plugins: data.data });
      console.log(data.data);
      this.render();
    });
  };

  GetBundleSearchResults = (event) => {
    var self = this;
    axios({
      method: "Post",
      url:
        process.env.REACT_APP_API_BACKEND +
        "/api/v1/PluginBundle/SearchForPluginBundle",
      params: {
        searchString: event.target.value,
      },
    }).then((data) => {
      self.setState({ bundles: data.data });
      console.log(data.data);
      this.render();
    });
  };

  showMoreHoverStyling = {};

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };

  render() {
    var btnStyle;
    if (this.state.hover) {
      btnStyle = {
        color: "#edeffc",
        borderColor: "#edeffc",
        backgroundColor: "#efa9ae",
      };
    } else {
      btnStyle = {
        color: "#edeffc",
        borderColor: "#edeffc",
        backgroundColor: "transparent",
      };
    }
    return (
      <>
        <NavMenu />

        <h1
          className="row m-0 justify-content-center"
          style={{ color: "#edeffc" }}
        >
          Plugin Bundles
        </h1>
        <div className="search-box" style={{ margin: "auto", padding: "10px" }}>
          <button className="btn-search">
            <i className="fas fa-search"></i>
          </button>
          <input
            type="text"
            style={{ color: "#FFAFAF" }}
            className="input-search"
            placeholder="Type to Search..."
            onChange={(e) => this.GetBundleSearchResults(e)}
          ></input>
        </div>
        <hr style={this.hrStyling} className="container" />
        <div className="container">
          <PluginBundleList bundles={this.state.bundles} />
        </div>
        <h1
          className="row m-0 justify-content-center"
          style={{ color: "#edeffc" }}
        >
          Plugins
        </h1>
        <div className="search-box" style={{ margin: "auto", padding: "10px" }}>
          <button style={{ color: "#ffffff" }} className="btn-search">
            <i className="fas fa-search"></i>
          </button>
          <input
            type="text"
            className="input-search"
            style={{ background: "#FFAFAF" }}
            placeholder="Type to Search..."
            onChange={(e) => this.GetPluginSearchResults(e)}
          ></input>
        </div>
        <hr style={this.hrStyling} className="container" />
        <div className="container">
          <PluginList plugins={this.state.plugins} />
          {/* <div className="row m-0 justify-content-center">
                        <button style={btnStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} className="btn btn-outline-pastel w-25 m-2"><span>Show More</span></button>
                    </div> */}
        </div>
        <Footer />
      </>
    );
  }
}
