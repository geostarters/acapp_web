import React from "react";
import FontPreview from "../FontPreview/FontPreview";
import logo from '../../images/logo.svg';


class FontsListing extends React.Component {

   getFontList() {
    const fontList = [];
    this.props.fonts.forEach(font => {

      console.log(font);

      const fotografies = [];
      if(font.doc._attachments){
        const fotografiesIds = Object.keys(font.doc._attachments);
        for(let index of fotografiesIds){
            fotografies.push({
                id: index,
                URLFoto: `data:image/jpeg;base64,${font.doc._attachments[index].data}`
            });
        }
      }

      fontList.push({

        id: font.doc.properties._id,
        toponim_PA: font.doc.properties.toponim_PA,
        username: font.doc.properties.username,
        cabal: font.doc.properties.cabal,
        cabalAltres: font.doc.properties.cabalAltres,
        estat_validacio: font.doc.properties.cabalAltres,
        fotografies,
        observacions: font.doc.properties.observacions,
        latitude: font.doc.properties.latitude,
        longitude: font.doc.properties.longitude,
        us: font.doc.properties.us,
        username: font.doc.properties.username,
        imatgeUsuari: (fotografies.length>0 ?  fotografies[0].URLFoto : logo )
        //imatgeUsuari: (font.properties.images && font.properties.images.length > 0 ? font.properties.images[0].data : null)
    
      });
    });

    return fontList;

  }


  render() {
    const fontList = this.getFontList();
    return (
      <div className="md-grid md-grid--no-spacing md-cell--middle">
        <div className="md-grid md-cell--8 mobile-fix">
          {fontList.map(font => (
            <FontPreview key={font.title} fontInfo={font} />
          ))}
        </div>
      </div>
    );
  }
}

export default FontsListing;
