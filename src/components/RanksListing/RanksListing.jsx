import React from "react";
import Rank from "../Rank/Rank";
import {  List, Subheader } from 'react-md';

import "./RanksListing.scss";

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


      <List className="dividers__example">
              
      <Subheader primaryText="Rànquings d'usaris:" />


        {ranksList.map(rank => (
            <Rank info={rank} />
        ))}



      </List>


    );

  }
}

export default RanksListing;
