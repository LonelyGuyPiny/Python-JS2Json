import React from 'react';
import { connect } from 'react-redux';
import { Accordion, Menu } from 'semantic-ui-react';

import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Polygon from 'ol/geom/Polygon';
import MultiPolygon from 'ol/geom/MultiPolygon';
import MultiLineString from 'ol/geom/MultiLineString';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Point from 'ol/geom/Point';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';
import { Icon } from 'ol/style';

import {
  Block,
  // Loading,
  Svg } from '../../../';
import {
  Button
} from 'semantic-ui-react'
import { SearchGroup } from './';
import {
  // fetchSearchLayersData,
  setActiveSearch,
  setActiveSearchId
} from '../../../../redux/modules/search'
import {
  centerOnMap,
  fitToMap,
  transCordinates
} from '../../../../utils/map';

/**
 * Component
 * @name Search
 * @description
 * This is the search component of the application. 
 * On application startup, this component is loaded
 */
class Search extends React.Component {
  constructor(props) {
    super(props);
    const { searchData, prevActiveSearchId } = this.props;
    this.state = {
      activeIndex: prevActiveSearchId || (searchData && searchData.length > 0 ? searchData[0].id : 0),
      // activeIndex: 1,
      // loading: true,
      lastDrawId: null
    };
    this.map = props.map;
    this.compareMap = props.compareMap;
    this.vectorSource = new VectorSource();
    this.vectorLayer = null;
  }

  componentDidMount = async () => {
    // const { dispatch } = this.props;
    this.createVectorLayer();
    // this.setState({ loading: true });
    // await dispatch(fetchSearchLayersData());
    // this.setState({ loading: false });
  }

  componentWillUnmount = () => {
    this.map.removeLayer(this.vectorLayer);
    this.compareMap.removeLayer(this.compareVectorLayer);
    const { dispatch } = this.props;
    dispatch(setActiveSearch(null, null));
  }

  createVectorLayer = () => {
    const style = new Style({
      stroke: new Stroke({
        color: `rgb(0,0,255, 1.0)`,
        width: 3
      }),
      fill: new Fill({
        color: `rgb(153,204,255, 0.5)`
      }),
      image: new Circle({
        radius: 7,
        fill: new Fill({
          color: '#ffcc33'
        })
      })
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      zIndex: 105,
      title: 'address',
      style
    });
    this.compareVectorLayer = new VectorLayer({
      source: this.vectorSource,
      zIndex: 105,
      title: 'address',
      style
    });

    this.map.addLayer(this.vectorLayer);
    this.compareMap.addLayer(this.compareVectorLayer);
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.props.dispatch(setActiveSearchId(newIndex));
    this.setState({ activeIndex: newIndex })
  }

  removeFeature = (searchId, cb_id) => {
    if (this.state.currentFeatureId === `f-${searchId}-${cb_id}`) {
      this.vectorSource.clear();
    }
  }

  createFeature = (geometry, geometryType, searchId, cb_id, crs) => {
    try {
      this.setState({ currentFeatureId: `f-${searchId}-${cb_id}` });
      this.vectorSource.clear();
      if (crs) {
        const { projection } = this.props;
        const coProj = crs.properties.name.split('::')
        if (geometryType === 'Point') {
          geometry.forEach(feat => {
            let coordinate = feat.coordinates;
            coordinate = transCordinates(coordinate, projection, `EPSG:${coProj[1]}`);
            const point = new Point(coordinate);
            const feature = new Feature({
              geometry: point,
              name: 'Null Island',
              population: 4000,
              rainfall: 500
            });
            const iconStyle = new Style({
              image: new Icon(({
                anchor: [0.5, 15],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                height: 400,
                width: 658,
                src: require("../../../../assets/images/point.png")
              }))
            });
            feature.setStyle(iconStyle);
            this.vectorSource.addFeature(feature);
            if (geometry.length === 1) {
              setTimeout(() => centerOnMap(coordinate, this.map, true), 20);
            }
          })
        } else if (geometryType === 'LineString') {
          geometry.forEach(feat => {
            const cordinates = feat.coordinates.map(cordArr => {
              return transCordinates(cordArr, projection, `EPSG:${coProj[1]}`)
            })
            let drawLine = new MultiLineString(cordinates);
            const feature = new Feature(drawLine);
            this.vectorSource.addFeature(feature);
          })
          setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
        } else if (geometryType === 'MultiLineString') {
          geometry.forEach(feat => {
            const cordinates = feat.coordinates.map(cordArr => {
              return cordArr.map(coordinate => transCordinates(coordinate, projection, `EPSG:${coProj[1]}`))
            })
            let drawLine = new MultiLineString(cordinates);
            const feature = new Feature(drawLine);
            this.vectorSource.addFeature(feature);
          })
          setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
        } else if (geometryType === 'Polygon') {
          geometry.forEach(feat => {
            const cordinates = feat.coordinates.map(cordArr => {
              return cordArr.map(childCordArr => {
                return transCordinates(childCordArr, projection, `EPSG:${coProj[1]}`);
              })
            })
            const polygon = new Polygon(cordinates);
            const feature = new Feature(polygon);
            this.vectorSource.addFeature(feature);
          })
          setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
        } else {
          geometry.forEach(feat => {
            const cordinates = feat.coordinates.map(cordArr => {
              return cordArr.map(childCordArr => {
                return childCordArr.map(coordinate => {
                  return transCordinates(coordinate, projection, `EPSG:${coProj[1]}`);
                })
              })
            })
            const polygon = new MultiPolygon(cordinates);
            const feature = new Feature(polygon);
            this.vectorSource.addFeature(feature);
          })
          setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
        }
      } else {
        if (geometryType === 'esriGeometryPoint') {
          geometry.forEach(ring => {
            const coordinate = [ring.x, ring.y];
            let point = new Point(coordinate);
            const feature = new Feature({
              geometry: point,
              name: 'Null Island',
              population: 4000,
              rainfall: 500
            });
            var iconStyle = new Style({
              image: new Icon(({
                anchor: [0.5, 15],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 1,
                height: 400,
                width: 658,
                src: require("../../../../assets/images/point.png")
              }))
            });
            feature.setStyle(iconStyle);
            this.vectorSource.addFeature(feature);
            if (geometry.length === 1) {
              setTimeout(() => centerOnMap(coordinate, this.map, true), 20);
            }
          });
          if (geometry.length > 1) {
            setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
          }
        } else if (geometryType === 'esriGeometryPolyline') {
          geometry.forEach(({ paths }) => {
            // let coordinate = paths[0];
            let drawLine = new MultiLineString(paths);
            const feature = new Feature(drawLine);
            this.vectorSource.addFeature(feature);
          });
          setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
        } else {
          geometry.forEach(({ rings }) => {
            const polygon = new Polygon(rings);
            const feature = new Feature(polygon);
            this.vectorSource.addFeature(feature);
          });
          setTimeout(() => fitToMap(this.vectorSource.getExtent(), this.map), 20);
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  render() {
    const { activeIndex } = this.state;
    const { searchData, lang, translation, searchLoading } = this.props;
    // searchData.sort((a, b) => { return a.title.EN.localeCompare(b.title.EN)})
    return (
      <Block className="searchBlockMain">
        <Block className="headSearch searchLayers d-flex justify-content-center align-item-center justify-space-between">
          <Block className="mob-menu-icon">
          </Block>
          <Block className="titleText d-flex align-items-center headSearchBlockMain mx-auto">
            <h4 className="font-weight-medium text-center mb-0">{translation.search}</h4>
            <Block>
              <Button className="module-info-toc module-info-toc-header d-flex justify-content-end cursor-pointer btn-none" data-tooltip={translation.Searchhedaer} data-position="bottom center">
                <Svg name="info-module" />
              </Button>
            </Block>
          </Block>
        </Block>
        
        <Block className="serchBlockcontent">
          {/* {searchLoading && <Loading />} */}
          {!searchLoading &&
            <Accordion as={Menu} vertical>
              {searchData && searchData.length > 0 &&
                searchData.map((search, index) => (
                  <Menu.Item key={index}>
                    <Accordion.Title
                      active={activeIndex === search.id}
                      content={search.title[lang]}
                      index={search.id}
                      onClick={this.handleClick}
                    />
                    {activeIndex === search.id && <Accordion.Content active={activeIndex === search.id} content={
                      <SearchGroup
                        createFeature={this.createFeature}
                        removeFeature={this.removeFeature}
                        comboboxes={search.comboboxes}
                        searchId={search.id}
                      />
                    } />}
                  </Menu.Item>
                ))
              }
            </Accordion>
          }
        </Block>
      </Block>
    );
  }
}

export default connect(
  state => ({
    searchData: state.search.searchData,
    prevActiveSearchId: state.search.prevActiveSearchId,
    lang: state.translation.language,
    map: state.map.map,
    compareMap: state.map.compareMap,
    translation: state.translation.translation,
    searchLoading: state.search.loading,
    projection: state.map.projection
  })
)(Search);

