import React, { Component } from "react";

import Constants from '../../constants.jsx';
import FontsListing from "../FontsListing/FontsListing";
import "./BackOffice.scss";

class BackOffice extends Component {

    state = {
        fonts: undefined
    }

    componentDidMount() {
        
        fetch(Constants.userUpdatedFontsURL).then(
            async (response) => {
            
                this.setState({fonts: await response.json()});
                
            }
        );

    }

    render() {
        const fontsToList = this.state.fonts;
        if (!fontsToList) {

            return (
                <div>Loading...</div>
            );

        } else {

            return (
                <FontsListing fonts={fontsToList} />
            );

        }
    }
}

export default BackOffice;