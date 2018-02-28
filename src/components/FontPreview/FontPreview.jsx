import React, { Component } from "react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Button from "react-md/lib/Buttons";
import Avatar from "react-md/lib/Avatars";
import CardText from "react-md/lib/Cards/CardText";
import FontIcon from "react-md/lib/FontIcons";
import Link from "gatsby-link";

import { Grid, Cell , Divider, List, ListItem, Subheader } from 'react-md';
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

  renderImage(fontInfo){

    const { mobile } = this.state;
    const expand = mobile;
    const cover = fontInfo.imatgeUsuari.startsWith("/")
      ? __PATH_PREFIX__ + fontInfo.imatgeUsuari
      : fontInfo.imatgeUsuari;

    const coverHeight = mobile ? 240 : 320;
    const username = `Usuari: ${fontInfo.username}`;

    return(
      <Media
      style={{
        backgroundImage: `url(${cover})`,
        height: `${coverHeight}px`
      }}
      className="post-preview-cover"
    >
      <MediaOverlay>
        <CardTitle title={fontInfo.toponim_PA} subtitle={username}>
        </CardTitle>
      </MediaOverlay>
    </Media>
    );
  }

  getCabalValue(cabal, cabalAltres){
    if(cabal  === 'N') return 'No raja';
    if(cabal === 'ALTRES') return cabalAltres;
    if(cabal === '') return '-';
    return '-';
  }

  getUsValue(us){
    if(us  === 'N') return 'No';
    if(us === 'S') return 'Sí';
    if(us === 'SN') return 'No ho sé';
    if(us === '') return '-';
    return '-';

  }

  renderInfo(fontInfo){


    return(
    
      <List className="dividers__example">
        
        <Subheader primaryText="Dades recollides:" />

        <ListItem primaryText="Ús" leftAvatar={<Avatar icon={<FontIcon iconClassName="fa fa-hand-paper-o" />} />}>
        {this.getUsValue(fontInfo.us)}
        </ListItem>
        

        <ListItem primaryText="Cabal" leftAvatar={<Avatar icon={<FontIcon iconClassName="fa fa-tint" />} />} >
        {this.getUsValue(fontInfo.cabal, fontInfo.cabalAltres)}
        </ListItem>
        <ListItem primaryText="Observacions" leftAvatar={<Avatar icon={<FontIcon iconClassName="fa fa-eye" />} />} >
        {fontInfo.observacions}
        </ListItem>
        
        <Divider inset />
        <ListItem primaryText="Coordenades"  leftAvatar={<Avatar icon={<FontIcon iconClassName="fa fa-map-marker" />} />} >
          {fontInfo.latitude} , {fontInfo.longitude}
        </ListItem>
        
        
      </List>
    );
  }

  render() {

    const {fontInfo } = this.props;
    
    
    /* eslint no-undef: "off"*/



    return (
      <Card key={fontInfo.id} raise className="md-grid md-cell md-cell--12">


        <Grid className="grid-example">

          <Cell size={6}>
            {this.renderImage(fontInfo)}
          </Cell>

          <Cell size={6}>
            {this.renderInfo(fontInfo)}
          </Cell>
          
        </Grid>
        
  
      
      </Card>
    );

/*     return (
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
    ); */
  }
}

export default FontPreview;
