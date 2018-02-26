import React from "react";
import Rank from "../Rank/Rank";

import "./RanksListing.scss"

class RanksListing extends React.Component {
  getRanksList() {
    const ranksList = [];
    this.props.ranks
    .sort((a,b) => b.doc.fonts_afegides - a.doc.fonts_afegides)
    .forEach(rank => {
        ranksList.push({
            position: ranksList.length,
            username: rank.doc.user_id,
            number: rank.doc.fonts_afegides
        });
    });
    return ranksList;
  }
  render() {
    const ranksList = this.getRanksList();
    return (
      <div className="md-grid md-grid--no-spacing md-cell--middle afterToolbar">
        {ranksList.map(rank => (
            <Rank info={rank} />
        ))}
      </div>
    );
  }
}

export default RanksListing;
