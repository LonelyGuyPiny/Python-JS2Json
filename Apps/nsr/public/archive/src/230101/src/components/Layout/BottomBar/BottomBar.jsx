import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ScaleLine } from 'ol/control';
import { Block, Svg } from '../..'
import basemapList from '../../../config/basemaps';
import CoordinateBar from './CoordinateBar';
import Attribution from './Attribution';
//import { exportdataToApi } from '../../../redux/modules/export'

/**
 * Component
 * @name BottomBar
 * @description
 * This is the bottom bar component of the application. 
 * On application startup, this component is loaded
 */
class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackPopup: false
    };
    this.scaleControl = null;
    this.scaleControl2 = null;
    // this.attributation = (<div dangerouslySetInnerHTML={{__html: document.getElementById('attribution').innerHTML}} />);
  }

  componentDidMount = () => {
    this.createScaleline();
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (this.props.selectedUnitType !== nextProps.selectedUnitType) {
      this.scaleControl.setUnits(nextProps.selectedUnitType);
      this.scaleControl2.setUnits(nextProps.selectedUnitType);
    }
  }

  createScaleline = () => {
    this.scaleControl = new ScaleLine({
      units: this.props.selectedUnitType,
      target: "cus-scale-line",
      text: true,
      bar: true,
      className: "mi-scale-line"
    });
    this.scaleControl2 = new ScaleLine({
      units: this.props.selectedUnitType,
      target: "cus-scale-line-2",
      text: true,
      bar: false,
      className: "mi-scale-line-2"
    });
    this.props.map.addControl(this.scaleControl);
    this.props.map.addControl(this.scaleControl2);
  }


  render() {
    const { selectedBasemap, language, compareBasemap, translation, compareMap } = this.props;
    let basemapArr = [];
    if (basemapList.basemaps) {
      basemapArr = [...basemapArr, ...basemapList.basemaps];
    }
    if (basemapList.arialmaps) {
      basemapArr = [...basemapArr, ...basemapList.arialmaps];
    }
    const findBaseMap = basemapArr.find(m => m.slug === selectedBasemap)
    const currentBaseMap = findBaseMap ? findBaseMap : 'osm_map';
    const currentComBaseMap = basemapArr.find(m => m.slug === compareBasemap);
    return (
      <React.Fragment>
        <Block className="footer-menu">
          {/* {compareBasemap ? (
            <Block className="footer-compare-menu">
              <Block className="year left">
                {selectedBasemap === 'osm_map' ? <p id="attribution"></p> : currentBaseMap[`title_${language}`]}
              </Block>
              {compareBasemap &&
                <Fragment>
                  <Block className="icon"><Svg name='drag-icon' /></Block>
                  <Block className="year right">
                    {compareBasemap === 'osm_map' ? <p id="attribution"></p> : currentComBaseMap[`title_${language}`]}
                  </Block>
                </Fragment>
              }
            </Block>
          ) : (
              <Block className={`menu ${selectedBasemap === 'osm_map' ? 'map-open-menu' : ''}`}>
                <h5 className="cursor-pointer">{currentBaseMap[`title_${language}`]}  {selectedBasemap === 'osm_map' && <Svg className="infoiconnew cursor-pointer" name="infoiconnew" />}</h5>{selectedBasemap === 'osm_map' && <p id="attribution"></p>}
              </Block>
            )} */}

          <Block className={`${compareBasemap ? 'footer-compare-menu' : 'menu'}`}>
            <Block className="year left position-osp">
              {selectedBasemap === 'osm_map' ? <><p className="basemap-text">{currentBaseMap[`title_${language}`]}</p><Attribution attribution={currentBaseMap.attribution} translation={translation} direction={currentBaseMap.attribution_direction} /></> : (currentBaseMap.attribution ? <><p className="basemap-text">{currentBaseMap[`title_${language}`]}</p> <Attribution attribution={currentBaseMap.attribution} translation={translation} direction={currentBaseMap.attribution_direction}/></> : currentBaseMap[`title_${language}`])}
            </Block>
            {compareBasemap &&
              <Fragment>
                <Block className="icon att-icon-margin"><Svg name='drag-icon' /></Block>
                <Block className="year right position-osp">
                  {compareBasemap === 'osm_map' ? <><p className="basemap-text">{currentComBaseMap[`title_${language}`]}</p><Attribution attribution={currentComBaseMap.attribution} translation={translation} direction={currentComBaseMap.attribution_direction} /></> : (currentComBaseMap.attribution ? <><p className="basemap-text">{currentComBaseMap[`title_${language}`]}</p> <Attribution attribution={currentComBaseMap.attribution} translation={translation} direction={currentComBaseMap.attribution_direction}/></> : currentComBaseMap[`title_${language}`])}
                </Block>
              </Fragment>
            }
          </Block>

          <Block id="cus-scale-line-2" className="countno"></Block>
          <Block id="cus-scale-line" className="countno"></Block>
          <CoordinateBar compareMap={compareMap} />
        </Block>

      </React.Fragment>
    )
  }
}
export default connect(
  state => ({
    translation: state.translation.translation,
    language: state.translation.language,
    map: state.map.map,
    selectedBasemap: state.basemap.selectedBasemap,
    compareBasemap: state.basemap.selectedCompareMap,
    spatialReference: state.settings.selectedSpatialReference,
    selectedUnitType: state.settings.selectedUnitType
  }))(BottomBar)