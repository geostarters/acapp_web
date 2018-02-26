import React, { Component } from "react";

import Constants from '../../constants.jsx';
import RanksListing from "../RanksListing/RanksListing";
import "./Ranquings.scss";

class Ranquings extends Component {

    state = {
        ranquings: undefined
    }

    componentDidMount() {
        
        fetch(Constants.ranquingsURL).then(
            async (response) => {
            
                this.setState({ranquings: await response.json()});
                
            }
        );

    }

    render() {
        const ranksToList = this.state.ranquings;
        if (!ranksToList) {

            return (
                <div>Loading...</div>
            );

        } else {

            return (
                <RanksListing ranks={ranksToList} />
            );

        }
    }
}

export default Ranquings;