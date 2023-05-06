import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Popup } from 'semantic-ui-react';
import {
  buffer as Buffer,
  point,
  polygon,
  multiLineString,
  multiPolygon,
  lineString
  // dissolve,
  // featureCollection
} from '@turf/turf'
import { fromLonLat, toLonLat } from 'ol/proj';
import { Polygon, MultiPolygon } from 'ol/geom';
import MultiLineString from 'ol/geom/MultiLineString';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {
  Style,
  Icon,
  Fill,
  Stroke,
} from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';

import { Svg } from '../../../';
import { onLayerChangeSpaitalIntersection } from '../../../../redux/modules/toc';
import { settings } from '../../../../config/settings';
import SpaitalIntersection from '../../SpaitalIntersection/SpaitalIntersection';
import { transCordinates } from '../../../../utils/map';
import { createRequestFeatureGeometry_MIDDLEWARE, setBufferEnable_Middleware } from '../../../../middlewares/toc/toc_middleware';

const bufferStyle = new Style({
  stroke: new Stroke({
    color: `rgb(255, 158, 85, 1)`,
    width: 3,
  }),
  fill: new Fill({
    color: `rgb(255, 158, 85, 0.5)`,
  }),
});

const style = new Style({
  stroke: new Stroke({
    color: `rgb(0,0,255, 1.0)`,
    width: 3
  }),
  fill: new Fill({
    color: `rgb(153,204,255, 0.5)`
  }),
});

const iconStyle = new Style({
  image: new Icon(({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 1,
    height: 400,
    width: 658,
    src: require("../../../../assets/images/point.png")
  }))
});

class SpaitialIntersection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: settings.defaultBuffer,
      isBuffer: false,
      layer: null,
      open: false,
      isSpatialIntersect: false,
      showBuffer: true
    }
    if (props.spaitalIntSecData) {
      const { buffer, isBuffer, layer } = props.spaitalIntSecData;
      this.state = {
        ...this.state,
        buffer,
        isBuffer,
        layer
      }
    }
    this.vectorLayer = null;
    this.source = new VectorSource();
    this.map = props.map;
  }

  componentDidMount = () => {
    this.vectorLayer = new VectorLayer({
      source: this.source,
      zIndex: 101,
      title: 'toc',
      style
    });
    this.map.addLayer(this.vectorLayer);
  }

  componentWillUnmount = () => {
    this.map.removeLayer(this.vectorLayer);
  }

  clearSource = () => {
    this.source.clear();
    this.setState({ open: false, isSpatialIntersect: false });
  }

  createFeatures = () => {
    try {
      const { selectedRows, isAllSlected, features } = this.props;
      const { buffer, isBuffer } = this.state;
      this.source.clear();
      if (isBuffer && Number(buffer)) {
        this.createBufferFeature(isAllSlected ? features : selectedRows);
      } else {
        (isAllSlected ? features : selectedRows).forEach(element => {
          const feature = this.createFeature(element);
          if (feature) {
            this.source.addFeature(feature);
          }
        })
      }
    } catch(err) {
      // console.log('create Features err', err);
    }
  }

  createBufferFeature = (rows) => {
    try {
      const { geometryType, OIDName, featuresGeometry, projection, crs } = this.props;
      const featuresArr = [];
      if (crs && (geometryType === 'geom' || geometryType === 'Shape')) {
        rows.forEach(rowData => {
          let geometry;
          if (rowData && rowData.attributes) {
            geometry = featuresGeometry[rowData.attributes[OIDName]];
          } else {
            return null;
          }
          const coProj = crs.properties.name.split('::')
          let bufferFeature;
          if (geometry.type === 'Point') {
            const cordTransFormed = transCordinates(geometry.coordinates, projection, `EPSG:${coProj[1]}`)
            bufferFeature = point(toLonLat(cordTransFormed, projection));
          } else if (geometry.type === 'LineString') {
            const lonLatLine = geometry.coordinates.map(a => {
              const cordTransFormed = transCordinates(a, projection, `EPSG:${coProj[1]}`)
              return toLonLat(cordTransFormed, projection)
            });
            bufferFeature = lineString(lonLatLine);
          } else if (geometry.type === 'MultiLineString') {
            const lonLatLine = geometry.coordinates.map(a => {
              return a.map(b => {
                const cordTransFormed = transCordinates(b, projection, `EPSG:${coProj[1]}`)
                return toLonLat(cordTransFormed, projection)
              })
            });
            bufferFeature = multiLineString(lonLatLine);
          } else if (geometry.type === 'Polygon') {
            const lonLatPolygon = geometry.coordinates.map(cordArr => {
              return cordArr.map(a => {
                const cordTransFormed = transCordinates(a, projection, `EPSG:${coProj[1]}`)
                return toLonLat(cordTransFormed, projection)
              });
            });
            bufferFeature = polygon(lonLatPolygon);
          } else {
            const lonLatPolygon = geometry.coordinates.map(cordArr => {
              return cordArr.map(a => {
                return a.map(b => {
                  const cordTransFormed = transCordinates(b, projection, `EPSG:${coProj[1]}`)
                  return toLonLat(cordTransFormed, projection)
                })
              });
            });
            bufferFeature = multiPolygon(lonLatPolygon);
          }
          const bufferC = this.getBuffer();
          const buffered = Buffer(bufferFeature, bufferC, { units: 'miles' });
          if (buffered.geometry.type === 'MultiPolygon') {
            buffered.geometry.coordinates.forEach(item => {
              featuresArr.push(polygon(item));
            });
          } else {
            featuresArr.push(buffered);
          }
        });
      } else {
        rows.forEach(rowData => {
          let geometry;
          if (rowData && rowData.attributes) {
            geometry = featuresGeometry[rowData.attributes[OIDName]];
          } else {
            return null;
          }

          let bufferFeature;
          if (geometryType === 'esriGeometryPoint') {
            bufferFeature = point(toLonLat([geometry.x, geometry.y], projection));
          } else if (geometryType === 'esriGeometryPolyline') {
            const lonLatLine = geometry.paths.map(a => {
              return a.map(b => toLonLat(b, projection))
            });
            bufferFeature = multiLineString(lonLatLine);
          } else {
            const lonLatPolygon = geometry.rings.map(a => {
              return a.map(b => toLonLat(b, projection))
            });
            bufferFeature = polygon(lonLatPolygon);
          }
          const bufferC = this.getBuffer();
          const buffered = Buffer(bufferFeature, bufferC, { units: 'miles' });
          if (buffered.geometry.type === 'MultiPolygon') {
            buffered.geometry.coordinates.forEach(item => {
              featuresArr.push(polygon(item));
            });
          } else {
            featuresArr.push(buffered);
          }
        });
      }
      if (featuresArr.length > 0) {
        // const dissolvedPolygon = dissolve(featureCollection(featuresArr));
        featuresArr.forEach(buffered => {
          let featureGeometry;
          let drawPolygon;
          if (buffered.geometry.type === 'MultiPolygon') {
            featureGeometry = buffered.geometry.coordinates.map(a => a.map(b => b.map(c => fromLonLat(c, projection))));
            drawPolygon = new MultiPolygon(featureGeometry);
          } else {
            featureGeometry = buffered.geometry.coordinates.map(a => a.map(b => fromLonLat(b, projection)));
            drawPolygon = new Polygon(featureGeometry);
          }
          const feature = new Feature(drawPolygon);
          feature.setStyle(bufferStyle);
          this.source.addFeature(feature);
        })
      }
    } catch(err) {
      // console.log("create buffer err", err);
    }
  }

  createFeature(rowData, hove = false) {
    try {
      const { geometryType, OIDName, featuresGeometry, crs, projection } = this.props;
      let feature;
      let geometry;
      if (rowData && rowData.attributes) {
        geometry = featuresGeometry[rowData.attributes[OIDName]];
      } else {
        return null;
      }
      if (crs) {
        // console.log("geometry", geometry);
        const coProj = crs.properties.name.split('::')
        if (geometry.type === 'Point') {
          const coordinate = geometry.coordinates;
          let point = new Point(coordinate);
          feature = new Feature({
            geometry: point,
            name: 'Null Island',
            population: 4000,
            rainfall: 500
          });
          feature.setStyle(iconStyle);
        } else if (geometry.type === 'LineString') {
          const cordinates = geometry.coordinates.map(cordArr => {
            return transCordinates(cordArr, projection, `EPSG:${coProj[1]}`)
          })
          let drawLine = new LineString(cordinates);
          feature = new Feature(drawLine);
          feature.setStyle(style);
        } else if(geometry.type === 'MultiLineString') {
          const cordinates = geometry.coordinates.map(cordArr => {
            return cordArr.map(coordinate => transCordinates(coordinate, projection, `EPSG:${coProj[1]}`))
          })
          let drawLine = new MultiLineString(cordinates);
          feature = new Feature(drawLine);
          feature.setStyle(style);
        } else if(geometry.type === 'Polygon') {
          const cordinates = geometry.coordinates.map(cordArr => {
            return cordArr.map(childCordArr => {
              return transCordinates(childCordArr, projection, `EPSG:${coProj[1]}`);
            })
          })
          const polygon = new Polygon(cordinates);
          feature = new Feature(polygon);
          feature.setStyle(style);
        } else {
          const cordinates = geometry.coordinates.map(cordArr => {
            return cordArr.map(childCordArr => {
              return childCordArr.map(coordinate => {
                return transCordinates(coordinate, projection, `EPSG:${coProj[1]}`);
              })
            })
          })
          const polygon = new MultiPolygon(cordinates);
          feature = new Feature(polygon);
          feature.setStyle(style);
        }
        return feature;
      } else {
        if (geometryType === 'esriGeometryPoint') {
          const ring = geometry;
          const coordinate = [ring.x, ring.y];
          let point = new Point(coordinate);
          feature = new Feature({
            geometry: point,
            name: 'Null Island',
            population: 4000,
            rainfall: 500
          });
          feature.setStyle(iconStyle);
        } else if (geometryType === 'esriGeometryPolyline') {
          let multilineData = new MultiLineString(geometry.paths);
          feature = new Feature(multilineData);
          feature.setStyle(style);
        } else {
          let drawPolygon = new Polygon(geometry.rings);
          feature = new Feature(drawPolygon);
          feature.setStyle(style);
        }
        return feature;
      }
    } catch(err) {
      // console.log("create feature err", err);
    }
  }

  getBuffer = () => {
    const { buffer } = this.state;
    const { selectedUnitType } = this.props;
    if (selectedUnitType === 'metric') {
      return buffer * 0.000621371;
    } else {
      return buffer * 0.000189394;
    }
  }

  handleBuffer = (e, { value }) => {
    if (value <= settings.maxBuffer) {
      this.setState({ buffer: value }, () => this.createFeatures());
    }
  }

  handleLayer = async (e, { value }) => {
    const { selectedLayers } = this.props;
    const layers = Object.keys(selectedLayers).map(key => selectedLayers[key]);
    const layer = layers.find(lf => lf.layerId === value);
    const bufEnMiddlewareData = {
      source: layer.type,
      projection: layer.projection
    }

    const setData = setBufferEnable_Middleware(bufEnMiddlewareData);
    this.setState({
      layer: value,
      showBuffer: setData
    })
  }

  toggleBuffer = async (e, { checked }) => {
    // setSlected(value);
    // dispatch(onLayerChange(selectedLayers[value]));
    this.setState({
      isBuffer: checked
    }, () => this.createFeatures())
  }

  handleSubmit = () => {
    const { isBuffer, buffer, layer } = this.state;
    const { selectedUnitType, selectedLayers, dispatch } = this.props;
    const distance = isBuffer && Number(buffer) ? buffer : 0;
    const units = selectedUnitType === 'metric' ? 'esriSRUnit_Meter' : 'esriSRUnit_Foot';
    const geometry = this.createRequestGeometry(distance, units);
    let filter = {
      distance,
      units,
      ...geometry
    };
    if (!isBuffer) {
      filter = {
        ...geometry
      }
    }
    const data = {
      features: this.source.getFeatures(),
      layer,
      isBuffer,
      buffer,
      filter,
      popupIntersection: false
    }
    dispatch(onLayerChangeSpaitalIntersection(selectedLayers[layer], data));
  }

  createRequestGeometry = (distance, units) => {
    try {
      const { geometryType, selectedRows, isAllSlected, features, OIDName, featuresGeometry,
        // crs,
        selectedLayers, allLayers } = this.props;
      const { layer } = this.state;
      const rows = (isAllSlected ? features : selectedRows);
      const geometry = rows.map(row => {
        return featuresGeometry[row.attributes[OIDName]];
      });
      const middlewareData = {
        source: selectedLayers[layer].type,
        allLayers,
        geometryType,
        layerId: selectedLayers[layer].layerId,
        geometries: geometry,
        distance,
        units
      }

      return createRequestFeatureGeometry_MIDDLEWARE(middlewareData)

      // if ((crs && crs.properties) || selectedLayers[layer].type === 'geoserver') {
      //   console.log("inside if")
      //   const findTheLayer = allLayers.find(al => al.layerid === selectedLayers[layer].layerId);
      //   const geometry = rows.map(row => {
      //     return featuresGeometry[row.attributes[OIDName]];
      //   });
      //   if (geometry[0].type === 'Point' || geometry[0].type === "MultiPoint") {
      //     let flatCordinates = "";
      //     geometry.forEach(geo => {
      //       const lastChar = flatCordinates.slice(-1);
      //       flatCordinates += lastChar !== "" ? `,(${geo.coordinates[0]} ${geo.coordinates[1]})` : `(${geo.coordinates[0]} ${geo.coordinates[1]})`;
      //     })
      //     return ({
      //       geometry: `INTERSECTS(${findTheLayer.geometrytype},MultiPoint(${flatCordinates}))`
      //     })
      //   } else if (geometryType === 'esriGeometryPoint') {
      //     let flatCordinates = "";
      //     geometry.forEach(geo => {
      //       const lastChar = flatCordinates.slice(-1);
      //       flatCordinates += lastChar !== "" ? `,(${geo.x} ${geo.y})` : `(${geo.x} ${geo.y})`;
      //     });
      //     return ({
      //       geometry: `INTERSECTS(${findTheLayer.geometrytype},MultiPoint(${flatCordinates}))`
      //     })
      //   } else if (geometry[0].type === 'LineString' || geometry[0].type === 'MultiLineString' || geometryType === 'esriGeometryPolyline') {
      //     let flatCordinates = "";
      //     if (geometry[0].type === 'LineString') {
      //       geometry.forEach(geo => {
      //         const lastChar = flatCordinates.slice(-1);
      //         flatCordinates += lastChar !== "" ? ",(" : "(";
      //         const rowsData = [];
      //         geo.coordinates.forEach(cordArr => {
      //           cordArr.forEach(cord => rowsData.push(cord));
      //         })
      //         const finalCordArr = rowsData.reduce(function (coordinates, coordinate, i) {
      //           if (i % 2 === 0) {
      //             coordinates.push([coordinate, rowsData[i + 1]]);
      //           }
      //           return coordinates;
      //         }, []);
      //         const finalArr = [];
      //         finalCordArr.forEach(tc => {
      //           tc.forEach(tca => {
      //             finalArr.push(tca);
      //           })
      //         })

      //         finalArr.forEach((coordinate, i) => {
      //           if (i === 0) {
      //             flatCordinates = flatCordinates + coordinate
      //           } else if (i % 2 === 0) {
      //             flatCordinates = flatCordinates + "," + coordinate;
      //           } else {
      //             flatCordinates = flatCordinates + " " + coordinate
      //           }
      //         });
      //         flatCordinates = flatCordinates + ")";
      //       });
      //     } else if (geometry[0].type === 'MultiLineString') {
      //       geometry.forEach(geo => {
      //         const lastChar = flatCordinates.slice(-1);
      //         flatCordinates += lastChar !== "" ? ",(" : "(";
      //         const rowsData = [];
      //         geo.coordinates.forEach(cordArr => {
      //           cordArr.forEach(cordinates => {
      //             cordinates.forEach(cord => rowsData.push(cord));
      //           })
      //         });
      //         const finalCordArr = rowsData.reduce(function (coordinates, coordinate, i) {
      //           if (i % 2 === 0) {
      //             coordinates.push([coordinate, rowsData[i + 1]]);
      //           }
      //           return coordinates;
      //         }, []);
      //         const finalArr = [];
      //         finalCordArr.forEach(tc => {
      //           tc.forEach(tca => {
      //             finalArr.push(tca);
      //           })
      //         })
      //         finalArr.forEach((coordinate, i) => {
      //           if (i === 0) {
      //             flatCordinates = flatCordinates + coordinate
      //           } else if (i % 2 === 0) {
      //             flatCordinates = flatCordinates + "," + coordinate;
      //           } else {
      //             flatCordinates = flatCordinates + " " + coordinate
      //           }
      //         });
      //         flatCordinates = flatCordinates + ")";
      //       });
      //     } else if (geometryType === 'esriGeometryPolyline') {
      //       geometry.forEach(geo => {
      //         const rowsData = [];
      //         const lastChar = flatCordinates.slice(-1);
      //         flatCordinates += lastChar !== "" ? ",(" : "(";
      //         geo.paths.forEach(path => {
      //           path.forEach(cordinates => {
      //             cordinates.forEach(cord => {
      //               rowsData.push(cord)
      //             })
      //           })
      //         });
      //         const finalCordArr = rowsData.reduce(function (coordinates, coordinate, i) {
      //           if (i % 2 === 0) {
      //             coordinates.push([coordinate, rowsData[i + 1]]);
      //           }
      //           return coordinates;
      //         }, []);
      //         const finalArr = [];
      //         finalCordArr.forEach(tc => {
      //           tc.forEach(tca => {
      //             finalArr.push(tca);
      //           })
      //         })
      //         finalArr.forEach((coordinate, i) => {
      //           if (i === 0) {
      //             flatCordinates = flatCordinates + coordinate
      //           } else if (i % 2 === 0) {
      //             flatCordinates = flatCordinates + "," + coordinate;
      //           } else {
      //             flatCordinates = flatCordinates + " " + coordinate
      //           }
      //         });
      //         flatCordinates = flatCordinates + ")";
      //       })
      //     }
      //     return ({
      //       geometry: `INTERSECTS(${findTheLayer.geometrytype},MultiLineString(${flatCordinates}))`
      //     })
      //   } else {
      //     let flatCordinates = "";
      //     if (geometry[0].type === 'Polygon') {
      //       geometry.forEach(geo => {
      //         const rowsData = [];
      //         const lastChar = flatCordinates.slice(-1);
      //         flatCordinates += lastChar !== "" ? ",((" : "((";
      //         geo.coordinates.forEach(cordArr => {
      //           cordArr.forEach(cord => {
      //             cord.forEach(cordinate => rowsData.push(cordinate))
      //           })
      //         })
      //         const finalCordArr = rowsData.reduce(function (coordinates, coordinate, i) {
      //           if (i % 2 === 0) {
      //             coordinates.push([coordinate, rowsData[i + 1]]);
      //           }
      //           return coordinates;
      //         }, []);
      //         const finalArr = [];
      //         finalCordArr.forEach(tc => {
      //           tc.forEach(tca => {
      //             finalArr.push(tca);
      //           })
      //         })
      //         finalArr.forEach((coordinate, i) => {
      //           if (i === 0) {
      //             flatCordinates = flatCordinates + coordinate
      //           } else if (i % 2 === 0) {
      //             flatCordinates = flatCordinates + "," + coordinate;
      //           } else {
      //             flatCordinates = flatCordinates + " " + coordinate
      //           }
      //         });
      //         flatCordinates = flatCordinates + "))";
      //       });
      //     } else if (geometryType === 'esriGeometryPolygon') {
      //       geometry.forEach(geo => {
      //         const rowsData = [];
      //         const lastChar = flatCordinates.slice(-1);
      //         flatCordinates += lastChar !== "" ? ",((" : "((";
      //         geo.rings.forEach(path => {
      //           path.forEach(cord => {
      //             cord.forEach(cordinate => rowsData.push(cordinate))
      //           });
      //         });
      //         const finalCordArr = rowsData.reduce(function (coordinates, coordinate, i) {
      //           if (i % 2 === 0) {
      //             coordinates.push([coordinate, rowsData[i + 1]]);
      //           }
      //           return coordinates;
      //         }, []);
      //         const finalArr = [];
      //         finalCordArr.forEach(tc => {
      //           tc.forEach(tca => {
      //             finalArr.push(tca);
      //           })
      //         })
      //         finalArr.forEach((coordinate, i) => {
      //           if (i === 0) {
      //             flatCordinates = flatCordinates + coordinate
      //           } else if (i % 2 === 0) {
      //             flatCordinates = flatCordinates + "," + coordinate;
      //           } else {
      //             flatCordinates = flatCordinates + " " + coordinate
      //           }
      //         });
      //         flatCordinates = flatCordinates + "))";
      //       });
      //     } else {
      //       geometry.forEach(geo => {
      //         geo.coordinates.forEach(cordArr => {
      //           const rowsData = [];
      //           const lastChar = flatCordinates.slice(-1);
      //           flatCordinates += lastChar !== "" ? ",((" : "((";
      //           cordArr.forEach(cord => {
      //             cord.forEach(cordinates => {
      //               cordinates.forEach(cordinate => rowsData.push(cordinate))
      //             })
      //           });
      //           const finalCordArr = rowsData.reduce(function (coordinates, coordinate, i) {
      //             if (i % 2 === 0) {
      //               coordinates.push([coordinate, rowsData[i + 1]]);
      //             }
      //             return coordinates;
      //           }, []);
      //           const finalArr = [];
      //           finalCordArr.forEach(tc => {
      //             tc.forEach(tca => {
      //               finalArr.push(tca);
      //             })
      //           })

      //           finalArr.forEach((coordinate, i) => {
      //             if (i === 0) {
      //               flatCordinates = flatCordinates + coordinate
      //             } else if (i % 2 === 0) {
      //               flatCordinates = flatCordinates + "," + coordinate;
      //             } else {
      //               flatCordinates = flatCordinates + " " + coordinate
      //             }
      //           });
      //           flatCordinates = flatCordinates + "))";
      //         });
      //       });
      //     }
      //     return ({
      //       geometry: `INTERSECTS(${findTheLayer.geometrytype},MultiPolygon(${flatCordinates}))`
      //     })
      //   }
      // } else {
      //   // if(crs && crs.properties) {}
      //   console.log("inside else");
      //   if (geometryType === 'esriGeometryPoint') {
      //     const rowsData = rows.map(row => {
      //       const geometry = featuresGeometry[row.attributes[OIDName]];
      //       return [geometry.x, geometry.y];
      //     });
      //     return ({
      //       geometry: JSON.stringify({
      //         points: rowsData
      //       }),
      //       geometryType: 'esriGeometryMultipoint'
      //     });
      //   } else if (geometryType === 'esriGeometryPolyline') {
      //     const rowsData = [];
      //     rows.forEach(row => {
      //       const geometry = featuresGeometry[row.attributes[OIDName]];
      //       geometry.paths.map(path => rowsData.push(path));
      //     });
      //     return ({
      //       geometry: JSON.stringify({
      //         paths: rowsData
      //       }),
      //       geometryType: 'esriGeometryPolyline'
      //     })
      //   } else {
      //     const rowsData = [];
      //     rows.forEach(row => {
      //       const geometry = featuresGeometry[row.attributes[OIDName]];
      //       geometry.rings.map(path => rowsData.push(path));
      //     });
      //     return ({
      //       geometry: JSON.stringify({
      //         rings: rowsData
      //       }),
      //       geometryType: 'esriGeometryPolygon',
      //       spatialRel: 'esriSpatialRelRelation',
      //       relationParam: 'T********'
      //     })
      //   }
      // }
    } catch(err) {
      // console.log("create request geometry err", err);
    }
  }

  render() {
    const { selectedLayers, translation, tocLayer, selectedUnitType } = this.props;
    const { buffer, isBuffer, layer, open, isSpatialIntersect, showBuffer } = this.state;
    const layers = Object.keys(selectedLayers).map(key => selectedLayers[key]);
    return (
      <Popup
        className="intersect-index"
        trigger={
          <Button onClick={() => this.setState({ open: true, isSpatialIntersect: true })} className={`button-border lined-button ${isSpatialIntersect ? 'lined-button-active': ''}`} ><Svg name="intersect" />  {translation.intersect}</Button>
        }
        on='click'
        position="top right"
        onOpen={this.createFeatures}
        open={open}
      >
        <SpaitalIntersection
          translation={translation}
          layer={layer}
          layers={layers}
          isBuffer={isBuffer}
          buffer={buffer}
          selectedUnitType={selectedUnitType}
          tocLayer={tocLayer}
          handleLayer={this.handleLayer}
          clearSource={this.clearSource}
          toggleBuffer={this.toggleBuffer}
          handleBuffer={this.handleBuffer}
          handleSubmit={this.handleSubmit}
          showBuffer={showBuffer}
        />
      </Popup>
    )
  }
}

export default connect(
  state => ({
    selectedLayers: state.layers.selectedLayers,
    translation: state.translation.translation,
    tocLayer: state.tocData.tocLayer,
    map: state.map.map,
    OIDName: state.tocData.OBJECTID,
    geometryType: state.tocData.geometryType,
    featuresGeometry: state.tocData.featuresGeometry,
    spaitalIntSecData: state.tocData.spaitalIntSecData,
    features: state.tocData.features,
    projection: state.map.projection,
    selectedUnitType: state.settings.selectedUnitType,
    crs: state.tocData.crs,
    allLayers: state.layers.allLayers,
    // showBuffer: state.tocData.intersectionBuffer
  })
)(SpaitialIntersection);