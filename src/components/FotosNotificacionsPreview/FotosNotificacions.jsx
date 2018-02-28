import React, {Component} from 'react';
import { Grid, Cell, GridList, CardTitle, CardText, Avatar, FontIcon, Card, Media , MediaOverlay} from 'react-md';

import "./FotosNotificacions.scss";


class FotosNotificacions extends Component {
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

    renderImage(img, key){

        console.log(img);
        const url = `data:image/jpeg;base64, ${img.data}`;
        return(
            <Card key={key}>
            <Media>
              <img src={url} alt="Something" />
            </Media>
          </Card>
        );
    }


    renderPicturesGrid(images){


          return(
            <GridList container="pictures" size={1} component="section">
            {images.map( (img, key) => (
                this.renderImage(img, key)
            ))}
          </GridList>
          );
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
            
              <Media
                style={{
                  backgroundImage: `url(${cover})`,
                  height: `${coverHeight}px`
                }}
                className="post-preview-cover"
              >
                <MediaOverlay>
                  <CardTitle title={fontInfo.title}>
                  </CardTitle>
                </MediaOverlay>
              </Media>
            
            <CardTitle
              expander={expand}
              avatar={<Avatar icon={<FontIcon iconClassName="fa fa-map-pin" />} />}
              title={`${fontInfo.municipi}`}
              subtitle={`${fontInfo.provincia}`}
            />
    
            <CardText expandable={expand}>
              {this.renderPicturesGrid(fontInfo.images)}
            </CardText>
          </Card>
        );
      }




}


export default FotosNotificacions;