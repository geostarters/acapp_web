import React from "react";
import FontPreview from "../FontPreview/FontPreview";

class FontsListing extends React.Component {
  getFontList() {
    const fontList = [];
    this.props.fonts.forEach(font => {
      fontList.push({
        id: font._id,
        title: font.properties.toponim_PA,
        municipi: font.properties.municipi,
        conca: font.properties.conca,
        latitude: font.properties.latitude,
        longitude: font.properties.longitude,
        pathImatgeOficial: font.properties.fotografies[0].URLFoto,
        imatgeUsuari: (font.properties.images && font.properties.images.length > 0 ? font.properties.images[0].data : null)
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
