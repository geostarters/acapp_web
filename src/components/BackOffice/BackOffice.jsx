import React, { Component } from "react";

import Constants from '../../constants.jsx';
import FontsListing from '../FontsListing/FontsListing';
import FotosNotificacionsListing from '../FotosNotificacionsListing/FotosNotificacionsListing';

import { TabsContainer, Tabs, Tab } from 'react-md';
import { Button, SVGIcon } from 'react-md';

import "./BackOffice.scss";

class BackOffice extends Component {

    constructor(props) {

    	super(props)
        this.state = {
            fontsUsuaris: null,
            fotosUsuaris: null
        };
    }

    componentDidMount() {
        
        fetch(Constants.userUpdatedFontsURL).then(
            async (response) => {
            
                this.setState({fotosUsuaris: await response.json()});
                
            }
        );

        fetch(Constants.fontsUsuariURL).then(
            async (response) => {
                //console.log(response.json());
                this.setState({fontsUsuaris: await response.json()});     
            }
        );



    }

    renderTabContainer(){

        return (
            <TabsContainer panelClassName="md-grid" colored>
            <Tabs tabId="simple-tab">
                
                {this.renderUserFonts()}

                {this.renderNotificationsFonts()}

            </Tabs>
          </TabsContainer>
        );


    }

    renderUserFonts(){

        return (
            <Tab label="Llistat de Fonts d'usuaris:">
                <FontsListing fonts={this.state.fontsUsuaris} />
            </Tab>
        );

    }

    renderNotificationsFonts(){
        return (
            <Tab label="Llistat de fotos enviades:">
                <h3>Col·laboracions d'usuaris a fonts oficials:</h3>
                <FotosNotificacionsListing fonts={this.state.fotosUsuaris} />
            </Tab>
        );
    }

    renderButtons(){

        return(
            <div className="container-buttons">
                
 
                    <Button className="my-button" raised primary iconClassName="fa fa-download">Descarregar fonts</Button>


              
                    <Button className="my-button" raised primary iconClassName="fa fa-cloud-upload">Actualitzar fonts</Button>
              
            </div>
        );

    }

    render() {
        const fontsToList = this.state.fontsUsuaris;
        const fotosToList = this.state.fotosUsuaris;
        
        if (!fontsToList || !fotosToList) {

            return (
                <div className="my-content">Loading...</div>
            );

        } else {

            console.log(fontsToList);
            console.log(fotosToList);

/*             return (
                <FontsListing fonts={fontsToList} />
            ); */
            return (
                <div className="my-content">
                    {this.renderButtons()}
                    <div className=" md-grid md-grid--no-spacing md-cell--middle mobile-fix">
                    
                       

                        {this.renderTabContainer()}
                        
                      </div>
                </div>

            );
            
            

        }
    }
}

export default BackOffice;