import React, { Component } from "react";
import { DialogContainer, List, ListItem } from "react-md";
import Constants from '../../constants.jsx';
import mapboxgl from '../../vendor/mapbox-gl-dev.js';

import "./Map.scss";

class Map extends Component {
    state = { 
        visible: false, 
        properties: {
            toponim_PA: "",
            us: "",
            cabal: "",
            cabalAltres: "",
            observacions: ""
        } 
    };

    async componentDidMount() {
        
        this.map = await this.createMapOnline();
        this.map.on('load', this.loadFontsToMap.bind(this));

    }

    async createMapOnline() {

        let mapStyle = Constants.themes;
        mapStyle.sources.mtc25mgdb.tiles[0] = Constants.URL_MAPONLINE;
        mapStyle.sources.mtc25mgdb.maxzoom = 15;
        mapStyle.sources.mtc25mgdb.type = "vector";

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
                        "circle-radius": 10,
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
                        "circle-radius": 10,
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

    render() {
        const {visible, properties} = this.state;
        return (
            <div className="fullscreen-map">
                <DialogContainer
                    id = "popup-dialog"
                    visible = {visible}
                    title = "Propietats de la font"
                    onHide = {this.hide.bind(this)}
                >
                    <List>
                        <ListItem 
                            primaryText="Topònim"
                            secondaryText={properties.toponim_PA} />
                        <ListItem 
                            primaryText="Ús"
                            secondaryText={properties.us} />
                        <ListItem 
                            primaryText="Cabal"
                            secondaryText={properties.cabal} />
                        <ListItem 
                            visible={properties.cabalAltres !== ""}
                            primaryText="Cabal Altres"
                            secondaryText={properties.cabalAltres} />
                        <ListItem 
                            primaryText="Observacions"
                            secondaryText={properties.observacions} />
                    </List>
                </DialogContainer>
                <div id="map"
                    className="fullscreen-map"
                />
            </div>
        );
    }
}

export default Map;
