import React, { Component } from "react";
import { DialogContainer, List, ListItem, Media } from "react-md";
import Constants from '../../constants.jsx';
import mapboxgl from '../../vendor/mapbox-gl-dev.js';

import "./Map.scss";
import logo from '../../images/logo.svg';

class Map extends Component {

    constructor(props){

        super(props);

        this.state = { 
            visible: false, 
            properties: {
                toponim_PA: "",
                us: "",
                cabal: "",
                cabalAltres: "",
                observacions: "",
                fotografies: [],
                username: ''
            } 
        };
    }



    async componentDidMount() {
        
        this.map = await this.createMapOnline();
        this.map.on('load', this.loadFontsToMap.bind(this));

    }

    async createMapOnline() {

        mapboxgl.accessToken = Constants.MAPBOX_GL_TOKEN;

        let mapStyle = Constants.themes;

        return new mapboxgl.Map({
            style: mapStyle,
            container: 'map',
            center: [2.03796,41.53737],
            zoom: 7,
            maxZoom: 14.99,
            hash : true
        });

    }

    loadFontsToMap() {

        const fontsOficials = fetch(Constants.fontsOficialsURL).then(
            async (response) => {
                this.map.addLayer({
                    'id': 'fonts-oficials',
                    'type': 'circle',
                    'source': this.sourceFromServerData(await response.json()),
                    "paint": {
                        "circle-stroke-color": "#ffffff",        
                        "circle-stroke-width": 2,        
                        "circle-radius": 7,
                        "circle-color": "#00BCD4"
                    }
                });
            }
        );

        const fontsUsuaris = fetch(Constants.fontsUsuariURL).then(
            async (response) => {
                this.map.addLayer({
                    'id': 'fonts-usuaris',
                    'type': 'circle',
                    'source': this.sourceFromServerData(await response.json()),
                    "paint": {
                        "circle-stroke-color": "#ffffff",
                        "circle-stroke-width": 2,
                        "circle-radius": 9,
                        "circle-color": "#FFAE00"
                    }
                });       
            }
        );

        this.map.on('click', 'fonts-oficials', this.openModalDataFont.bind(this));
        this.map.on('click', 'fonts-usuaris', this.openModalDataFont.bind(this));

    }

    openModalDataFont(event) {
        this.show(event.features[0]);
    }

    show(target) {
        this.setState({visible: true, properties: target.properties});
    }

    hide() {
        this.setState({visible: false});
    }

    sourceFromServerData(data) {

        const source = {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                "features": []
            }
        };

        data.forEach((value) => source.data.features.push(value.doc));

        return source;

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

    renderInfoFont(properties){

        let url = logo;
/*         if(properties.fotografies){
            const fotografies = JSON.parse(properties.fotografies);
            url = (fotografies.length>0 && !properties.username ?  fotografies[0].URLFoto : __PATH_PREFIX__ + logo );
        } */


        return(
            <List>
                <ListItem>
                    <Media>
                    <img src={url} alt="Something" />
                    </Media>
                </ListItem>
                <ListItem 
                    primaryText="Topònim"
                    secondaryText={properties.toponim_PA} />
                <ListItem 
                    primaryText="Ús"
                    secondaryText={this.getUsValue(properties.us)} />
                <ListItem 
                    primaryText="Cabal"
                    secondaryText={this.getCabalValue(properties.cabal, properties.cabalAltres)} />

                <ListItem 
                    primaryText="Observacions"
                    secondaryText={properties.observacions} />
            </List>
        );

    }

    render() {
        const {visible, properties} = this.state;
        return (
            <div className="fullscreen-map">
                <DialogContainer
                    id = "popup-dialog"
                    visible = {visible}
                    title = "Dades de la font"
                    onHide = {this.hide.bind(this)}
                >
                {this.renderInfoFont(properties)}

                </DialogContainer>
                <div id="map"
                    className="fullscreen-map"
                />
            </div>
        );
    }
}

export default Map;
