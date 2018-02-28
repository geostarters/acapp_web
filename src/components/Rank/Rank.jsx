import React, { Component } from "react";
import { ListItem } from 'react-md';
import "./Rank.scss";

class Rank extends Component {
  render2() {
    const { info } = this.props;

    const username = info.username;
    const position = info.position;
    const number = info.number;

    return (
        <div className="md-grid md-cell--8 mobile-fix">
            <div className="md-grid md-cell-3 rank-icon">
                {this.renderIcon(position)}
            </div>
            <div className="md-grid md-cell-9 rank-name">
                {`${username}`}
            </div>
            <div className="md-grid md-cell-12 rank-number">
                {`${number} fonts afegides`}
            </div>
        </div>

    );
  }


  render(){

    const { info } = this.props;

    const username = info.username;
    const position = info.position;
    const number = info.number;
    const src = `/svg/rank${position+1}.svg`;

    return(
        <ListItem 
        primaryText={username} 
        secondaryText={`${number} fonts afegides`} 
        leftAvatar={<Avatar icon={<SVGIcon use={src} />} suffix="light-green" />}
        >
        
        </ListItem>
    );


  }

  renderIcon(position) {

    const src = `/svg/rank${position+1}.svg`;
    if (position < 3) {
        return <img src={src} />
    } else {
        return <div></div>;
    }

  }

}

export default Rank;
