import React from "react";
import FotosNotificacions from '../FotosNotificacionsPreview/FotosNotificacions';

class FontsNotificationsListing extends React.Component {
  getFontList() {
    const fontsfotoList = [];
    this.props.fonts.forEach(font => {
      
      fontsfotoList.push({
        id: font._id,
        title: font.properties.toponim_PA,
        municipi: font.properties.municipi,
        provincia: font.properties.provincia,
        latitude: font.properties.latitude,
        longitude: font.properties.longitude,
        pathImatgeOficial: (font.properties.fotografies.length>0 ?  font.properties.fotografies[0].URLFoto : logo ),
        images: font.images
        
      });
    });
    return fontsfotoList;
  }

  render() {
    const fontsfotoList = this.getFontList();
    return (
      <div className="md-grid md-grid--no-spacing md-cell--middle">
        <div className="md-grid md-cell--8 mobile-fix">
          {fontsfotoList.map(font => (
            <FotosNotificacions key={font.title} fontInfo={font} />
          ))}
        </div>
      </div>
    );
  }
}

export default FontsNotificationsListing;
