import React, { Component } from "react";

import Constants from '../../constants.jsx';
import FontsListing from '../FontsListing/FontsListing';
import FotosNotificacionsListing from '../FotosNotificacionsListing/FotosNotificacionsListing';

import { TabsContainer, Tabs, Tab } from 'react-md';
import { Button, SVGIcon } from 'react-md';

import "./BackOffice.scss";

class BackOffice extends Component {

    constructor(props) {

    	super(props);
        this.state = {
            fontsUsuaris: null,
            fotosUsuaris: null,
            showDialogUpdate: false,
            showDialogDownload: false
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

    downloadFonts(){

        fetch(Constants.fontsUsuariURL).then(
            async (response) => {
                //console.log(response.json());
                this.setState({fontsUsuaris: await response.json()});     
            }
        );

    }

    updateFonts(){

        fetch(Constants.updateFonstOficialsURL).then(
            async (response) => {
                
                console.log(response.json());

                this.setState({showDialogUpdate: true});     
            }
        );

    }

    downloadFonts(){

        fetch(Constants.downloadFontsURL).then(
            async (response) => {
                
                console.log(response.json());

                this.setState({showDialogDownload: true});     
            }
        );

    }

    hide = () => {
        this.setState({ showDialogUpdate: false });
        this.setState({ showDialogDownload: false });
      };

    renderDialogUpdate(){
        return(
        <DialogContainer
          id="simple-list-dialog"
          visible={this.state.showDialogUpdate}
          title="Actualització"
          onHide={this.hide}
        >
            <p>Fonts Oficials actualitzades</p>
        </DialogContainer>
        );
    }

    renderDialogDownload(){
        return(
        <DialogContainer
          id="simple-list-dialog"
          visible={this.state.showDialogUpdate}
          title="Exportació"
          onHide={this.hide}
        >
            <p>Fonts d'usuaris exportades</p>
        </DialogContainer>
        );
    }

    renderButtons(){

        return(
            <div className="container-buttons">
                
 
                    <Button onClick={this.downloadFonts()} className="my-button" raised primary iconClassName="fa fa-download">Descarregar fonts</Button>


              
                    <Button onClick={this.updateFonts()} className="my-button" raised primary iconClassName="fa fa-cloud-upload">Actualitzar fonts</Button>
              
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
                      {this.renderDialogUpdate()}
                      {this.renderDialogDownload()}
                </div>

            );
            
            

        }
    }
}

export default BackOffice;