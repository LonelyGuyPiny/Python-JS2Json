import { connect } from "react-redux";
import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import {
  Button
} from 'semantic-ui-react';
// import {
//   transformExtent
// } from 'ol/proj';
// import { Vector as VectorLayer } from 'ol/layer';
// import { Vector as VectorSource } from 'ol/source';
// import { Style, Fill, Stroke, Circle } from 'ol/style';
// import MultiPolygon from 'ol/geom/MultiPolygon';
// import Feature from 'ol/Feature';

import { Block, Loading, Svg } from '../../..';
import { setMap } from '../../../../redux/modules/map';
import { setCurrentScale } from '../../../../redux/modules/layers';
import { filterLegendsForExtent, setViewExtentMenu } from '../../../../redux/modules/legends';
import { mapData } from "../../../../config/settings";

/**
 * Component
 * @name Legends
 * @description
 * This is the Legends component of the application. 
 * On click on Legends menu, this component is loaded
 */
class Legends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legends: [],
      mapExtent: [],
      loading: false,
      viewExtent: '',
      scale: 0,
      activeIndexes: []
    }
    // this.vectorSource = new VectorSource();
  }

  componentDidMount = async () => {
    const { map, dispatch, currentViewExtent } = this.props;
    // const style = new Style({
    //   stroke: new Stroke({
    //     color: `rgb(0,0,255, 1.0)`,
    //     width: 3
    //   }),
    //   fill: new Fill({
    //     color: `rgb(153,204,255, 0.5)`
    //   }),
    //   image: new Circle({
    //     radius: 7,
    //     fill: new Fill({
    //       color: '#ffcc33'
    //     })
    //   })
    // });
    // this.vectorLayer = new VectorLayer({
    //   source: this.vectorSource,
    //   zIndex: 101,
    //   title: 'polygon',
    //   style
    // });
    // map.addLayer(this.vectorLayer);
    this.handleMapScale();
    map.on('moveend', this.handleMapScale);
    dispatch(setMap(map));
    var mapExtent = map.getView().calculateExtent(map.getSize());
    if (currentViewExtent === 'current') {
      this.setState({ loading: true })
      await dispatch(filterLegendsForExtent(mapExtent));
    }
    this.setState({ mapExtent, loading: false, viewExtent: currentViewExtent });
  }

  componentWillUnmount = () => {
    const { map, dispatch } = this.props;
    map.un('moveend', this.handleMapScale);
    map.removeLayer(this.vectorLayer);
    dispatch(setMap(map));
  }

  handleMapScale = async (e = undefined) => {
    const { map, dispatch } = this.props;
    const { viewExtent } = this.state;
    const cres = map.getView().getResolution();
    const scale = Math.round(39.3701 * (25.4 / 0.28) * cres);
    dispatch(setCurrentScale(scale));
    var mapExtent = map.getView().calculateExtent(map.getSize());
    //#region temp code
    // const x1 = mapExtent[0];
    // const y1 = mapExtent[1];
    // const x2 = mapExtent[2];
    // const y2 = mapExtent[3];
    // const coordinates = [[[x1, y1], [x2, y1], [x2, y2], [x1, y2], [x1, y1]]];
    // const polygon = new MultiPolygon([coordinates]);
    // const feature = new Feature(polygon);
    // this.vectorSource.clear();
    // this.vectorSource.addFeature(feature);
    //#endregion
    if (viewExtent === 'current') {
      this.setState({ loading: true })
      await dispatch(filterLegendsForExtent(mapExtent));
    }
    this.setState({ mapExtent, scale, loading: false });
  }

  createLegends = (AllLegends) => {
    const { scale, viewExtent, activeIndexes } = this.state;
    let legends = AllLegends;
    if (viewExtent === 'current') {
      legends = AllLegends.filter(l => {
        return (l.minScale >= scale || l.minScale === 0 || l.maxScaleDenominator >= scale || l.maxScaleDenominator === 0 || l.maxScaleDenominator === undefined) && (l.legends)
      });
    }

    return legends.map((layer, i) => {
      let layerLegends = layer.legends;
      if (layer.geoLegend) {
        let imageUrl = '';
        if(viewExtent === 'full') {
          imageUrl = layerLegends.graphicUrl + '&legend_options=bgColor:0xFCFCFC';
        } else if (viewExtent === 'current' && layer.inCurrentExtent === true) {
          imageUrl = `${layer.url}/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=${layer.name}&bbox=${layer.currentExtent}&srcwidth=768&srcheight=330&srs=EPSG:${mapData.latestWkid}&format=image/png&legend_options=countMatched:true;fontAntiAliasing:true;hideEmptyRules:true;bgColor:0xFCFCFC`;
        }
        if (imageUrl === '') {
          return null;
        }
        if (layerLegends.length === 0) {
          return null;
        }
        return (
          <Accordion key={i}>
            <Accordion.Title
              active={!activeIndexes.includes(layer.id)}
              index={layer.id}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
              {layer && layer.layerName}
            </Accordion.Title>
            <Accordion.Content active={!activeIndexes.includes(layer.id)}>
              <Block className="drawShapes ">
                <div className="d-flex align-item-center py-1">
                  <img src={imageUrl} alt={layerLegends.title} className="my-1" />
                </div>
              </Block>
            </Accordion.Content>
          </Accordion>
        )
      } else {
        if (viewExtent === 'current') {
          layerLegends = layerLegends.filter(l => l.inCurrentExtent === true);
        }
        if (layerLegends.length === 0) {
          return null;
        }
        return (
          <Accordion key={i}>
            <Accordion.Title
              active={!activeIndexes.includes(layer.id)}
              index={layer.id}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
              {layer && layer.name}
            </Accordion.Title>
            <Accordion.Content active={!activeIndexes.includes(layer.id)}>
              <Block className="drawShapes ">
                {layerLegends && layerLegends.map((legend, j) => (
                  <div key={j} className="d-flex align-item-center py-1">
                    <img src={`data:${legend.contentType};base64,${legend.imageData}`} alt={legend.label} className="my-1" />
                    <span>{legend.label}</span>
                  </div>
                ))}
              </Block>
            </Accordion.Content>
          </Accordion>
        )
      }
    })
  }

  handleChange = (viewExtent) => () => {
    const { mapExtent } = this.state;
    this.setState({ viewExtent });
    this.props.dispatch(setViewExtentMenu(viewExtent))
    if (viewExtent === 'current') {
      this.props.dispatch(filterLegendsForExtent(mapExtent));
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndexes: currentIndexes } = this.state;
    if (currentIndexes.includes(index)){
      this.setState({
        activeIndexes: currentIndexes.filter(i => i !== index)
      })
    } else {
      currentIndexes.push(index)
      this.setState({
        activeIndexes: currentIndexes
      })
    }
  }

  render() {
    const { translation, selectedLayerLegends, loadingLegends, currentViewExtent } = this.props;
    const { loading } = this.state;
    let legendsJsx;
    if (selectedLayerLegends) {
      legendsJsx = this.createLegends(selectedLayerLegends);
    }
    return (
      <Block className="">
        <Block className="headSearch searchLayers d-flex justify-content-center align-item-center justify-space-between">
          <Block className="">
            <Block className="mob-menu-icon">
              {/* <Svg className="mob-menu-new" name="mobile-menu" /> */}
            </Block>
          </Block>
          <Block className="d-flex align-items-center justify-content-center align-item-center justify-space-between">
            <h4 className="font-weight-medium mb-0 mt-5min">
              {translation.legends}
          </h4>
          <Block>
            <Button className="module-info-toc module-info-toc-header d-flex justify-content-end cursor-pointer btn-none" data-tooltip={translation.legendhedaer} data-position="bottom center">
              <Svg name="info-module" />
            </Button>
          </Block>
          </Block>
          <Block className="">
            {/* <Svg className="close-new" name="close-new" /> */}
          </Block>

        </Block>
        <Block className="switchToggle">
          <Block className="outerBlock">
            <Block onClick={this.handleChange('full')}  className={`handleSwitch ${currentViewExtent === 'full' ? 'active' : ''}`}>
              <Button className="ui toggle button">{translation.fullExtent}</Button>
            </Block>
            <Block onClick={this.handleChange('current')} className={`handleSwitch ${currentViewExtent === 'current' ? 'active' : ''}`}>
              <Button  className="ui toggle button"> {translation.currentExtent}</Button>
            </Block>
          </Block>
        </Block>
        <Block className="ol-popup acc scrolllegend">
          {legendsJsx}
          {(loadingLegends || loading) && <Loading />}
        </Block>
      </Block>
    )
  }
}

export default connect(
  state => ({
    selectedLayerLegends: state.legends.selectedLayerLegends,
    legends: state.legends.legends,
    loadingLegends: state.legends.loading,
    currentViewExtent: state.legends.currentViewExtent,
    translation: state.translation.translation,
    map: state.map.map,
    updateAt: Date.now()
  })
)(Legends);