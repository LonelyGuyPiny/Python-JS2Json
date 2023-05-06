import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal
} from 'semantic-ui-react';

import Feature from 'ol/Feature';
import Geolocation from 'ol/Geolocation';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { containsCoordinate } from 'ol/extent';

import {
  centerOnMap
} from '../../../utils/map'

import { mapData, settings } from '../../../config/settings';

import { Block, Svg } from '../../';

const headingStyle = new Style({
  image: new Icon(({
    anchor: [0.5, 25],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 1,
    height: 400,
    width: 658,
    src: require("../../../assets/images/heading.png")
  }))
});
const positionStyle = new Style({
  image: new CircleStyle({
    radius: 6,
    fill: new Fill({
      color: '#3399CC',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 2,
    }),
  }),
});
// const iconStyle = new Style({
//   image: new Icon(({
//     anchor: [0.5, 46],
//     anchorXUnits: 'fraction',
//     anchorYUnits: 'pixels',
//     opacity: 1,
//     height: 400,
//     width: 658,
//     src: require("../../../assets/images/point.png")
//   }))
// });
// feature.setStyle(iconStyle);

/**
 * Component
 * @name MapHistory
 * @description
 * This is the geolocation component of the application. 
 * On click on geolocation, this component is loaded
 */

class MapHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTracking: false,
      isOpen: false
    };
    this.rotation = 0;
    this.view = props.map.getView();
    this.compareMapView = props.compareMap.getView();
    this.geolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: this.view.getProjection(),
    });
    this.compareGeolocation = new Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: this.compareMapView.getProjection(),
    });
  }

  componentDidMount = async () => {
    const self = this;
    self.positionFeature = new Feature();
    self.positionFeature.setStyle(positionStyle);

    self.comparePositionFeature = new Feature();
    self.comparePositionFeature.setStyle(positionStyle);

    self.accuracyFeature = new Feature();
    self.compareAccuracyFeature = new Feature();

    self.geolocation.on('change:accuracyGeometry', function () {
      self.accuracyFeature.setGeometry(self.geolocation.getAccuracyGeometry());
    });

    self.compareGeolocation.on('change:accuracyGeometry', function () {
      self.compareAccuracyFeature.setGeometry(self.compareGeolocation.getAccuracyGeometry());
    });

    self.layer = new VectorLayer({
      map: self.props.map,
      source: new VectorSource({
        features: [self.accuracyFeature, self.positionFeature],
      }),
    });

    self.layer = new VectorLayer({
      map: self.props.compareMap,
      source: new VectorSource({
        features: [self.compareAccuracyFeature, self.comparePositionFeature],
      }),
    })

    // self.geolocation.on('change:heading', function () {
    //   // alert(self.geolocation.getHeading());
    //   self.rotation = self.geolocation.getHeading();
    //   // self.view.fit({ rotation: Number(self.rotation) * 57.2958});
    // });

    self.geolocation.on('change:position', function () {
      const coordinates = self.geolocation.getPosition();
      let isInExtent = true;
      if (mapData.extent) {
        const extent = [mapData.minx, mapData.miny, mapData.maxx, mapData.maxy];
        isInExtent = containsCoordinate(extent, coordinates);
      }
      if (isInExtent) {
        self.positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
        self.comparePositionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
        centerOnMap(coordinates, self.props.map, settings.isZoomGeolocation, settings.zoomGeolocation)
        centerOnMap(coordinates, self.props.compareMap, settings.isZoomGeolocation, settings.zoomGeolocation)
      } else {
        // alert('out of extent');
        self.toggleTracking();
      }
      if (self.isLocatedMe) {
        self.isLocatedMe = false;
        self.geolocation.setTracking(false);
      }
    });
  }

  toggleTracking = () => {
    this.setState(({ isTracking }) => ({
      isTracking: !isTracking,
      isLocated: false,
      isOpen: true
    }), () => {
      const { isTracking } = this.state;
      this.props.setTracking(isTracking)
      this.geolocation.setTracking(isTracking);
      this.compareGeolocation.setTracking(isTracking);
      if (!isTracking) {
        this.positionFeature.setStyle(positionStyle);
        this.comparePositionFeature.setStyle(positionStyle);
        //   this.positionFeature.setGeometry(null);
        //   this.accuracyFeature.setGeometry(null);
      } else {
        this.positionFeature.setStyle(headingStyle);
        this.comparePositionFeature.setStyle(headingStyle);
      }
    });
  }

  locateMe = () => {
    this.setState(({ isLocated }) => ({
      isLocated: !isLocated,
      isTracking: !isLocated
    }), () => {
      this.isLocatedMe = this.state.isLocated;
      this.geolocation.setTracking(this.state.isLocated);
      this.compareGeolocation.setTracking(this.state.isLocated);
      this.positionFeature.setStyle(positionStyle);
      // this.positionFeature.setStyle(iconStyle);
      this.comparePositionFeature.setStyle(positionStyle);
      // this.comparePositionFeature.setStyle(iconStyle);
      if (!this.state.isLocated) {
        this.positionFeature.setStyle(positionStyle);
        this.comparePositionFeature.setStyle(positionStyle);
        this.positionFeature.setGeometry(null);
        this.comparePositionFeature.setGeometry(null);
        this.accuracyFeature.setGeometry(null);
        this.compareAccuracyFeature.setGeometry(null);
        this.props.setTracking(false);
      }
    });
    // console.log("isLocated", this.state.isLocated)
  }

  render() {
    const { isLocated,
      // isTracking
      isOpen
    } = this.state;
    const { translation, direction } = this.props;
    return (
      <Block className="prev-next-loacation top-aside-links geo-location">
        <Block className="geobutton">
          <Button onClick={this.locateMe} className={`magnifierBtn${isLocated ? ' active' : ''}`} data-tooltip={translation.mylocation} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}><Svg className="geoicon" name="geoicon" /><Svg className="close-icon" name="close-icon" /></Button>
        </Block>
        {/* {isLocated &&
          <Block className="arrowbutton arrow-tobeleft geo-mob">
            <Button onClick={this.toggleTracking} className={`magnifierBtn cursor-pointer${isTracking ? ' active' : ''}`} data-tooltip={translation.followme} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}>
              <Svg className="extent" name="extent" />
            </Button>
          </Block>
        } */}
        <Modal className="CancelPopup " size="mini"
          closeIcon
          open={isOpen}
          onClose={() => this.setState({ isOpen: !isOpen})}
        >
          <Modal.Content>
            <Block className="warningIcon"><Svg name="nolocation" /></Block>
            <p><strong>{translation.Locationout}</strong></p>
            <Block className="buttonsCol editButtons">
              {/* <Button onClick={() => this.setState({ isOpen: !isOpen })} className="btn submitbtn">{translation.submit}</Button> */}
              <Button onClick={() => this.setState({ isOpen: !isOpen })} className="btn eraserbtn">{translation.close}</Button>
            </Block>
          </Modal.Content>
        </Modal>
      </Block>

    );
  }
}
export default connect((state) => {
  return ({
    translation: state.translation.translation,
    direction: state.translation.direction,
    map: state.map.map
  })
})(MapHistory);