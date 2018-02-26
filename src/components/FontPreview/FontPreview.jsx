import React, { Component } from "react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Button from "react-md/lib/Buttons";
import Avatar from "react-md/lib/Avatars";
import CardText from "react-md/lib/Cards/CardText";
import FontIcon from "react-md/lib/FontIcons";
import Link from "gatsby-link";
import Media, { MediaOverlay } from "react-md/lib/Media";
import "./FontPreview.scss";

class FontPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: true
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    if (window.innerWidth >= 640) {
      this.setState({ mobile: false });
    } else {
      this.setState({ mobile: true });
    }
  }
  render() {
    const {fontInfo } = this.props;
    const { mobile } = this.state;
    const expand = mobile;
    /* eslint no-undef: "off"*/
    const cover = fontInfo.pathImatgeOficial.startsWith("/")
      ? __PATH_PREFIX__ + fontInfo.pathImatgeOficial
      : fontInfo.pathImatgeOficial;
    const coverHeight = mobile ? 162 : 225;
    return (
      <Card key={fontInfo.id} raise className="md-grid md-cell md-cell--12">
        <Link style={{ textDecoration: "none" }} to={fontInfo.id}>
          <Media
            style={{
              backgroundImage: `url(${cover})`,
              height: `${coverHeight}px`
            }}
            className="post-preview-cover"
          >
            <MediaOverlay>
              <CardTitle title={fontInfo.title}>
                <Button raised secondary className="md-cell--right">
                  Read
                </Button>
              </CardTitle>
            </MediaOverlay>
          </Media>
        </Link>
        <CardTitle
          expander={expand}
          avatar={<Avatar icon={<FontIcon iconClassName="fa fa-calendar" />} />}
          title={`${fontInfo.municipi}`}
          subtitle={`${fontInfo.conca}`}
        />

        <CardText expandable={expand}>
          Expand
        </CardText>
      </Card>
    );
  }
}

export default FontPreview;
