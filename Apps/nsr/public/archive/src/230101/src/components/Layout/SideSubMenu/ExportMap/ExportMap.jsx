import React, { Component } from "react";
// import store from 'store2';
// import ReactSlider from 'react-slider';
import {
  Block,
  Svg, 
  // Loading
} from "../../..";
import { connect } from "react-redux";
import { Select, Radio, Label, Input, Button, Dropdown } from "semantic-ui-react";
import { point, distance, circle } from "@turf/turf";
import { fromLonLat, toLonLat } from "ol/proj";
// import circleToPolygon from "circle-to-polygon";

import { createExport, setTitle, setExportTab, setLegendValue, setPageSize, setDPIValue, setScaleValue, setFormatValue } from "../../../../redux/modules/export";
import { getLayerId, getMainLayerParentId } from "../../../../utils/layer";
import { filterLegendsForExtent } from "../../../../redux/modules/legends";
import { getTokenObj } from "../../../../utils/common";
import { transExtent } from "../../../../utils/map";
import { mapData } from "../../../../config/settings";
import exportList from "../../../../config/export";
import SOURCE from '../../../../middlewares/sources';
import baseMaps from '../../../../config/basemaps';
import {getStoreData} from '../../../../redux/modules/drawing';

/**
 * Component
 * @name ExportMap
 * @description
 * This is the ExportMap component of the application. 
 * On ExportMap, this component is loaded
 */

class ExportMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // pageSize: '',
      resolution: "",
      allowLegends: true,
      horizontalOrientation: true,
      // orientation: 'Landscape',
      filetype: "pdf",
      // title: "",
      // loading: false,
      // scale: "",
      pageOptions: [],
      // layout_template: "",
      dpis: null,
      scale: null,
      format: null,
      // scaleOptions: [],
      // formatOptions: []
    };
    this.legendsDataForExport = [];
    this.projection = this.props.latestWkid;
    this.portraitOptions = [];
    this.landscapeOptions = [];
    this.scaleOptions = [];
    this.formatOptions = [];
  }

  componentDidMount() {
    document.querySelector(".selectsearchexport").addEventListener('keydown', this.handleScaleValueChange);
    const { dispatch, map, language, pageSize, exportTab, defaultDPI, defaultScale, defaultFormat, translation } = this.props;
    // this.createLegends(selectedLayerLegends);
    // this.legendsData();
    var mapExtent = map.getView().calculateExtent(map.getSize());
    dispatch(filterLegendsForExtent(mapExtent));
    exportList[0].landscape_templates.forEach((template) => {
      const option = {
        key: template.source.toLowerCase(),
        value: template.source,
        text: template[`${language}_text`],
      };
      this.landscapeOptions.push(option);
    });
    exportList[0].portrait_templates.forEach((template) => {
      const option = {
        key: template.source.toLowerCase(),
        value: template.source,
        text: template[`${language}_text`],
      };
      this.portraitOptions.push(option);
    });
    this.scaleOptions.push({ key: "Current Scale", value: "current", text: translation.currentScale });
    exportList[0].scales.forEach(scale => {
      let scaleValue;
      if(scale.includes(':')) {
        scaleValue = scale.split(':')[1]
      } else {
        scaleValue = scale
      }
      const sOption = {
        key: scaleValue,
        value: scaleValue,
        text: scale
      }
      this.scaleOptions.push(sOption);
    });
    let scaleArr = [];
    this.scaleOptions.forEach(scaleVal => {
      scaleArr.push(scaleVal.value);
    })
    if(!scaleArr.includes(defaultScale) && defaultScale !== null) {
      const sOption = {
        key: defaultScale,
        text: `1:${defaultScale}`,
        value: defaultScale
      }
      this.scaleOptions.push(sOption)
    }
    this.scaleOptions.sort((a,b) => a.value - b.value);
    exportList[0].output_formats.forEach(format => {
      const fOption = {
        key: format,
        text: format,
        value: format
      }
      this.formatOptions.push(fOption);
    });
    let pages;
    let firstPage;
    if(exportTab === 'horizontal') {
      pages = this.landscapeOptions;
      firstPage = this.landscapeOptions[0].value;
    } else if(exportTab === 'portrait') {
      pages = this.portraitOptions;
      firstPage = this.portraitOptions[0].value;
    }
    // const setScale = defaultScale === 'current' ? `${scale}` : defaultScale;
    this.setState({
      pageOptions: pages,
      dpis: defaultDPI,
      scale: defaultScale,
      format: defaultFormat
    });
    if(pageSize) {
      firstPage = pageSize;
    }
    this.props.dispatch(setPageSize(firstPage))
  }

  print() {
    var content = document.getElementById("map");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }

  getBaseMap = () => {
    const {
      basemapList,
      basemap,
      // latestWkid
    } = this.props;

    let url = "";
    let projection = null;
    let cProj = null;
    let layer = null;
    let tileMatrixSet = null;
    let urlTemplate = null;
    let osm = false;
    let wmts = false;
    let xyz = false;

    let baseMapData;
    // if (basemap === "osm_map") {
    //   baseMapData = {
    //     title: "OpenStreetMap",
    //     baseMapLayers: [
    //       {
    //         type: "OpenStreetMap",
    //         opacity: 1,
    //       },
    //     ],
    //   };
    //   this.projection = 3857;
    //   this.cProj = "EPSG:3857";
    // } else {
      basemapList.arialmaps.forEach((item) => {
        if (item.slug === basemap) {
          const proj = item.projection.split(":");
          projection = proj[1];
          cProj = item.projection;

          if(item.type === SOURCE.WMTS) {
            url = item.url;
            wmts = true;
            layer = item.layer;
            tileMatrixSet = item.tileMatrixSet;
          } else if(item.type === SOURCE.XYZ) {
            xyz = true;
            urlTemplate = item.url;
          } else {
            url = item.url;
          }

        }
      });
      basemapList.basemaps.forEach((item) => {
        if (item.slug === basemap) {
          if(basemap === 'osm_map') {
            osm = true;
            projection = 3857;
            cProj = "EPSG:3857";
          // } else if(basemap.includes('osm') && item.url && item.type !== SOURCE.XYZ) {
          //   url = item.url;
          //   projection = 3857;
          //   cProj = "EPSG:3857";
          } else if(item.type === SOURCE.XYZ) {
            const proj = item.projection.split(":");
            xyz = true;
            urlTemplate = item.url;
            projection = proj[1];
            cProj = item.projection;
          } else {
            url = item.url;
            const proj = item.projection.split(":");
            projection = proj[1];
            cProj = item.projection;
          }
        }
      });
      if(osm) {
        baseMapData = {
          title: "OpenStreetMap",
          baseMapLayers: [
            {
              type: "OpenStreetMap",
              opacity: 1,
            },
          ],
        };
      } else if(wmts) {
        baseMapData = {
          title: basemap,
          baseMapLayers: [
            {
              type: 'wmts',
              url: url,
              layer, //optional
              tileMatrixSet
              // opacity: 1,
            },
          ],
        };
      } else if(xyz) {
        baseMapData = {
          title: basemap,
          baseMapLayers:  [
            {
              type: "WebTiledLayer",
              urlTemplate,
            }
          ]
        }
      } else {
        baseMapData = {
          title: basemap,
          baseMapLayers: [
            {
              // type: "OpenStreetMap",
              url: url,
              // opacity: 1,
            },
          ],
        }
      }
      this.projection = projection;
      this.cProj = cProj;
    // }
    return baseMapData;
  };

  createMap = async () => {
    // debugger;
    const { dispatch, layers, visibleLayers, filterLayers, map, title, legendOption } = this.props;
    // this.setState({ loading: true, loadingMore: true });
    let legendsData = [];
    let layerModuleObject = this.createLayersData(
      layers,
      visibleLayers,
      filterLayers
    );
    layerModuleObject = layerModuleObject.filter(
      (l) => l.visibleLayers.length > 0
    );

    if (legendOption) {
      legendsData = this.legendsData(layerModuleObject);
    } else {
      legendsData = [];
    }

    layerModuleObject = this.addDarwingLayers(layerModuleObject);
    // return;
    const basemapData = this.getBaseMap();
    var mapExtent = map.getView().calculateExtent(map.getSize());
    let scale = null;
    if(this.state.scale === "current") {
      const cres = map.getView().getResolution();
      scale = Math.round(39.3701 * 90.5 * cres);
    } else {
      scale = this.state.scale;
    }
    var rotation = map.getView().getRotation();
    let degrees = rotation * 57.295779513;

    let result = [];
    if (this.cProj !== mapData.projection) {
      const coordinateArr = [
        mapExtent[0],
        mapExtent[1],
        mapExtent[2],
        mapExtent[3],
      ];
      result = transExtent(coordinateArr, this.cProj);
    } else {
      result = [mapExtent[0], mapExtent[1], mapExtent[2], mapExtent[3]];
    }

    let data = {
      mapOptions: {
        showAttribution: true,
        extent: {
          xmin: result[0],
          ymin: result[1],
          xmax: result[2],
          ymax: result[3],
        },
        spatialReference: {
          wkid: this.projection,
          latestWkid: this.projection,
        },
        scale: scale,
        rotation: -degrees,
      },
      operationalLayers: layerModuleObject,
      baseMap: basemapData,
      exportOptions: {
        outputSize: [null, null],
        dpi: this.state.dpis,
      },
      layoutOptions: {
        titleText: title,
        scaleBarOptions: {
          metricUnit: "esriKilometers",
          metricLabel: "km",
          nonMetricUnit: "esriMiles",
          nonMetricLabel: "mi",
        },
        legendOptions: {
          operationalLayers: legendsData,
        },
      },
    };

    const res = await dispatch(
      createExport(JSON.stringify(data), this.props.pageSize, this.state.format)
    );
    if (!res) {
      alert("error");
    }
    // this.setState({ loading: false, loadingMore: false });
  };

  addDarwingLayers = (layerModuleObject) => {
    try {
      const {
        drawingData,
        latestWkid,
        map,
        language,
        translation,
        dispatch
      } = this.props;
      const drawingStoreData = dispatch(getStoreData());
      let textDirection = false;
      if (language === 'HE') {
        textDirection = true;
      }
      if (drawingStoreData) {
        const rotation = map.getView().getRotation();
        const degrees = rotation * 57.295779513;
        // const features = drawingData.VectorSource.getFeatures();
        const measureFeatures = drawingData.measureVectorSource.getFeatures();
        const features = drawingStoreData.vectorFeatures;
        const getAlpha = (o) => Math.round(o * 100 * 2.5);
        // const overlays = drawingData.overlays.filter(o => features.findIndex(f => {
        //   return(o.getId() === `draw-overlay-${f.getProperties().id}`);
        // }) !== -1).filter((item, pos, self) => {
        //   return self.findIndex(f => f.getId() === item.getId() && f.getPosition() !== undefined) === pos;
        // });
        const overlays = drawingStoreData.overlays;
        let lt = {
          id: "drawingText",
          title: "",
          opacity: 1,
          minScale: 0,
          maxScale: 0,
          url: null,
          token: null,
          featureCollection: {
            layers: [
              {
                layerDefinition: {
                  name: "textLayer",
                  geometryType: "esriGeometryPoint"
                },
                featureSet: {
                  geometryType: "esriGeometryPoint",
                  features: []
                }
              }
            ]
          }
        };

        // console.log("drawingData", drawingData);

        features.forEach((f) => {
          const properties = f;
          let finalOverlayPostion = null;
          let measurementValue = null;
          if (properties.shape !== "Point" && properties.shape !== "Text") {
            // finalOverlayPostion = overlays.find(ol => ol.id === `draw-overlay-${properties.id}`).getPosition();
            finalOverlayPostion = overlays[properties.id];
            // const measurementHtml = document.getElementById(`area${properties.id}`).innerHTML;
            const measurementObj = drawingStoreData.measurements[properties.id];
            const measurementHtml = `${measurementObj.value} ${translation[measurementObj.unit]}`;
            measurementValue = measurementHtml;
          }
          const flatCordinates = properties.geometry.flatCoordinates;
          // console.log("properties", properties);

          if (properties.shape && properties.shape === "Point") {
            const color = properties.outline.color;
            const opacity = getAlpha(properties.outline.opacity);
            const l = {
              id: "map_graphics",
              featureCollection: {
                layers: [
                  {
                    layerDefinition: {
                      name: "pointLayer",
                      geometryType: "esriGeometryPoint",
                    },
                    featureSet: {
                      features: [
                        {
                          geometry: {
                            x: flatCordinates[0],
                            y: flatCordinates[1],
                            spatialReference: {
                              wkid: latestWkid,
                            },
                          },
                          symbol: {
                            type: "esriSMS",
                            style: "esriSMSCircle",
                            color: [color.r, color.g, color.b, opacity],
                            size: properties.outline.size,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            };
            layerModuleObject.push(l);
          } else if (properties.shape && properties.shape === "Text") {
            const color = properties.text.color;
            const outline = properties.text.strokeColor;
            const text = properties.text;
            const l = {
              id: "draw-point",
              featureCollection: {
                layers: [
                  {
                    layerDefinition: {
                      name: "pointLayer",
                      geometryType: "esriGeometryPoint",
                    },
                    featureSet: {
                      features: [
                        {
                          geometry: {
                            x: flatCordinates[0],
                            y: flatCordinates[1],
                            spatialReference: {
                              wkid: latestWkid,
                            },
                          },
                          symbol: {
                            type: "esriTS",
                            text: text.content,
                            color: [
                              color.r,
                              color.g,
                              color.b,
                              getAlpha(text.opacity),
                            ],
                            haloSize: text.strokeSize,
                            haloColor: [
                              outline.r,
                              outline.g,
                              outline.b,
                              getAlpha(text.opacity),
                            ],
                            verticalAlignment: "middle",
                            horizontalAlignment: "center",
                            rightToLeft: false,
                            angle: 360 - Number(text.rotation),
                            xoffset: 0,
                            yoffset: 0,
                            kerning: true,
                            font: {
                              family: text.font,
                              size: Number(text.size),
                              style: "normal",
                              weight: text.isBold ? "bold" : "normal",
                              decoration: "none",
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            };
            layerModuleObject.push(l);
          } else if (properties.shape && properties.shape === "LineString") {
            const newArray = flatCordinates.reduce(function (
              coordinates,
              coordinate,
              i
            ) {
              if (i % 2 === 0) {
                coordinates.push([coordinate, flatCordinates[i + 1]]);
              }
              return coordinates;
            },
              []);
            const color = properties.outline.color;
            const opacity = getAlpha(properties.outline.opacity);
            // console.log("opacity", opacity);

            const l = {
              id: "draw-line",
              featureCollection: {
                layers: [
                  {
                    layerDefinition: {
                      name: "LineLayer",
                      geometryType: "esriGeometryPolyline",
                    },
                    featureSet: {
                      features: [
                        {
                          geometry: {
                            paths: [newArray],
                            spatialReference: {
                              wkid: latestWkid,
                            },
                          },
                          symbol: {
                            type: "esriSLS",
                            style: "esriSLSSolid",
                            color: [color.r, color.g, color.b, opacity],
                            width: properties.outline.size,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            };
            const textGeometry = {
              geometry: {
                spatialReference: {
                  wkid: latestWkid
                },
                x: finalOverlayPostion[0],
                y: finalOverlayPostion[1]
              },
              symbol: {
                type: "esriTS",
                color: [
                  10,
                  10,
                  10,
                  255
                ],
                font: {
                  family: "Arial",
                  size: 12
                },
                horizontalAlignment: "center",
                kerning: true,
                haloColor: [
                  245,
                  245,
                  245,
                  204
                ],
                haloSize: 1.5,
                rotated: false,
                text: measurementValue,
                xoffset: 0,
                yoffset: 0,
                angle: degrees,
                rightToLeft: textDirection
              }
            }
            layerModuleObject.push(l);
            if (drawingStoreData.showMeasurement[properties.id]) {
              lt.featureCollection.layers[0].featureSet.features.push(textGeometry);
            }
          } else if (properties.shape && properties.shape === "Circle") {
            const from = point(toLonLat([flatCordinates[0], flatCordinates[1]]), this.props.projection);
            const to = point(toLonLat([flatCordinates[2], flatCordinates[3]]), this.props.projection);
            const options = { units: "kilometers" };

            const dist = distance(from, to, options);

            var coordinates = toLonLat([flatCordinates[0], flatCordinates[1]], this.props.projection);

            var radius = dist;

            var circleOptions = {
              // steps: 10,
              units: "kilometers",
              // properties: { foo: "bar" },
            };
            var polygon = circle(coordinates, radius, circleOptions);
            // const coordinates = [-27.4575887, -58.99029]; //[lon, lat]
            // const radius = 100; // in meters
            // const numberOfEdges = 32; //optional that defaults to 32

            // let polygon = circleToPolygon(coordinates, radius, numberOfEdges);
            const newArray = polygon.geometry.coordinates.map((a) =>
              a.map((b) => fromLonLat(b, this.props.projection))
            );

            const fill = properties.fill;
            const outline = properties.outline;
            // const opacity = getAlpha(properties.outline.opacity);
            // console.log("opacity", opacity);
            const l = {
              id: "draw-polygon",
              featureCollection: {
                layers: [
                  {
                    layerDefinition: {
                      name: "LineLayer",
                      geometryType: "esriGeometryPolygon",
                    },
                    featureSet: {
                      features: [
                        {
                          geometry: {
                            rings: newArray,
                            spatialReference: {
                              wkid: latestWkid,
                            },
                          },
                          symbol: {
                            type: "esriSFS",
                            style: "esriSFSSolid",
                            color: [
                              fill.color.r,
                              fill.color.g,
                              fill.color.b,
                              getAlpha(fill.opacity),
                            ],
                            outline: {
                              type: "esriSLS",
                              style: "esriSLSSolid",
                              color: [
                                outline.color.r,
                                outline.color.g,
                                outline.color.b,
                                getAlpha(outline.opacity),
                              ],
                              width: properties.outline.size,
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            };
            const textGeometry = {
              geometry: {
                spatialReference: {
                  wkid: latestWkid
                },
                x: finalOverlayPostion[0],
                y: finalOverlayPostion[1]
              },
              symbol: {
                type: "esriTS",
                color: [
                  10,
                  10,
                  10,
                  255
                ],
                font: {
                  family: "Arial",
                  size: 12
                },
                horizontalAlignment: "center",
                kerning: true,
                haloColor: [
                  245,
                  245,
                  245,
                  204
                ],
                haloSize: 1.5,
                rotated: false,
                text: measurementValue,
                xoffset: 0,
                yoffset: 0,
                angle: degrees,
                rightToLeft: textDirection
              }
            }
            layerModuleObject.push(l);
            if (drawingStoreData.showMeasurement[properties.id]) {
              lt.featureCollection.layers[0].featureSet.features.push(textGeometry);
            }
          } else if (properties.shape) {
            const newArray = flatCordinates.reduce(function (
              coordinates,
              coordinate,
              i
            ) {
              if (i % 2 === 0) {
                coordinates.push([coordinate, flatCordinates[i + 1]]);
              }
              return coordinates;
            },
              []);
            // const color = properties.outline.color;
            const fill = properties.fill;
            const outline = properties.outline;
            // const opacity = getAlpha(properties.outline.opacity);
            // console.log("[newArray]", [newArray]);
            const l = {
              id: "draw-polygon",
              featureCollection: {
                layers: [
                  {
                    layerDefinition: {
                      name: "LineLayer",
                      geometryType: "esriGeometryPolygon",
                    },
                    featureSet: {
                      features: [
                        {
                          geometry: {
                            rings: [newArray],
                            spatialReference: {
                              wkid: latestWkid,
                            },
                          },
                          symbol: {
                            type: "esriSFS",
                            style: "esriSFSSolid",
                            color: [
                              fill.color.r,
                              fill.color.g,
                              fill.color.b,
                              getAlpha(fill.opacity),
                            ],
                            outline: {
                              type: "esriSLS",
                              style: "esriSLSSolid",
                              color: [
                                outline.color.r,
                                outline.color.g,
                                outline.color.b,
                                getAlpha(outline.opacity),
                              ],
                              width: properties.outline.size,
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            };
            const textGeometry = {
              geometry: {
                spatialReference: {
                  wkid: latestWkid
                },
                x: finalOverlayPostion[0],
                y: finalOverlayPostion[1]
              },
              symbol: {
                type: "esriTS",
                color: [
                  10,
                  10,
                  10,
                  255
                ],
                font: {
                  family: "Arial",
                  size: 12
                },
                horizontalAlignment: "center",
                kerning: true,
                haloColor: [
                  245,
                  245,
                  245,
                  204
                ],
                haloSize: 1.5,
                rotated: false,
                text: measurementValue,
                xoffset: 0,
                yoffset: 0,
                angle: degrees,
                rightToLeft: textDirection
              }
            }
            layerModuleObject.push(l);
            if (drawingStoreData.showMeasurement[properties.id]) {
              lt.featureCollection.layers[0].featureSet.features.push(textGeometry);
            }
          }
        });

        measureFeatures.forEach((f) => {
          const properties = f.getProperties();
          // const properties = f;
          let finalOverlayPostion = null;
          let measurementValue = null;
          finalOverlayPostion = drawingData.measurementsToolTip[properties.id].tipPosition.flatCoordinates;
          const measurementHtml = drawingData.measurementsToolTip[properties.id].innerHTML;
          measurementValue = measurementHtml;

          const segmentOverlay = drawingData.measurementsSegmentsToolTip[properties.id];
          const flatCordinates = properties.geometry.flatCoordinates;

          if (properties.shape && properties.shape === "LineString") {
            const newArray = flatCordinates.reduce(function (
              coordinates,
              coordinate,
              i
            ) {
              if (i % 2 === 0) {
                coordinates.push([coordinate, flatCordinates[i + 1]]);
              }
              return coordinates;
            },
              []);
            const l = {
              id: "measure-draw-line",
              featureCollection: {
                layers: [
                  {
                    layerDefinition: {
                      name: "LineLayer",
                      geometryType: "esriGeometryPolyline",
                    },
                    featureSet: {
                      features: [
                        {
                          geometry: {
                            paths: [newArray],
                            spatialReference: {
                              wkid: latestWkid,
                            },
                          },
                          symbol: {
                            type: "esriSLS",
                            style: "esriSLSDash",
                            color: [74, 144, 226, 255],
                            lineDash: [10, 10],
                            width: 2,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            };
            const textGeometry = {
              geometry: {
                spatialReference: {
                  wkid: latestWkid
                },
                x: finalOverlayPostion[0],
                y: finalOverlayPostion[1]
              },
              symbol: {
                type: "esriTS",
                color: [
                  10,
                  10,
                  10,
                  255
                ],
                font: {
                  family: "Arial",
                  size: 12
                },

                horizontalAlignment: "center",
                kerning: true,
                haloColor: [
                  245,
                  245,
                  245,
                  204
                ],
                haloSize: 1.5,
                rotated: false,
                text: measurementValue,
                xoffset: 0,
                yoffset: 0,
                angle: degrees,
                rightToLeft: textDirection
              }
            }
            layerModuleObject.push(l);
            if (drawingData.showMeasurement[properties.id]) {
              lt.featureCollection.layers[0].featureSet.features.push(textGeometry);
              segmentOverlay.forEach(segmentOverlayparam => {
                // if (segmentOverlayparam.innerHTML.includes("0.00")) {
                //   return;
                // }
                const segmentGeometry = {
                  geometry: {
                    spatialReference: {
                      wkid: latestWkid
                    },
                    x: segmentOverlayparam.tipPosition.flatCoordinates[0],
                    y: segmentOverlayparam.tipPosition.flatCoordinates[1]
                  },
                  symbol: {
                    type: "esriTS",
                    color: [
                      10,
                      10,
                      10,
                      255
                    ],
                    font: {
                      family: "Arial",
                      size: 12
                    },

                    horizontalAlignment: "center",
                    kerning: true,
                    haloColor: [
                      245,
                      245,
                      245,
                      204
                    ],
                    haloSize: 1.5,
                    rotated: false,
                    text: segmentOverlayparam.innerHTML,
                    xoffset: 0,
                    yoffset: 0,
                    angle: degrees,
                    rightToLeft: textDirection
                  }
                }
                lt.featureCollection.layers[0].featureSet.features.push(segmentGeometry);
              })
            }
          } else if (properties.shape) {
            const newArray = flatCordinates.reduce(function (
              coordinates,
              coordinate,
              i
            ) {
              if (i % 2 === 0) {
                coordinates.push([coordinate, flatCordinates[i + 1]]);
              }
              return coordinates;
            },
              []);
            const l = {
              id: "measure-draw-polygon",
              featureCollection: {
                layers: [
                  {
                    layerDefinition: {
                      name: "LineLayer",
                      geometryType: "esriGeometryPolygon",
                    },
                    featureSet: {
                      features: [
                        {
                          geometry: {
                            rings: [newArray],
                            spatialReference: {
                              wkid: latestWkid,
                            },
                          },
                          symbol: {
                            type: "esriSFS",
                            style: "esriSFSSolid",
                            color: [
                              0,
                              0,
                              0,
                              // getAlpha(0.2),
                              0
                            ],
                            outline: {
                              type: "esriSLS",
                              style: "esriSLSDash",
                              color: [74, 144, 226, 255],
                              lineDash: [10, 10],
                              width: 2,
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            };
            const textGeometry = {
              geometry: {
                spatialReference: {
                  wkid: latestWkid
                },
                x: finalOverlayPostion[0],
                y: finalOverlayPostion[1]
              },
              symbol: {
                type: "esriTS",
                color: [
                  10,
                  10,
                  10,
                  255
                ],
                font: {
                  family: "Arial",
                  size: 12
                },
                horizontalAlignment: "center",
                kerning: true,
                haloColor: [
                  245,
                  245,
                  245,
                  204
                ],
                haloSize: 1.5,
                rotated: false,
                text: measurementValue,
                xoffset: 0,
                yoffset: 0,
                angle: degrees,
                rightToLeft: textDirection
              }
            }
            layerModuleObject.push(l);
            if (drawingData.showMeasurement[properties.id]) {
              lt.featureCollection.layers[0].featureSet.features.push(textGeometry);
              segmentOverlay.forEach(segmentOverlayparam => {
                // if (segmentOverlayparam.innerHTML.includes("0.00")) {
                //   return;
                // }
                const segmentGeometry = {
                  geometry: {
                    spatialReference: {
                      wkid: latestWkid
                    },
                    x: segmentOverlayparam.tipPosition.flatCoordinates[0],
                    y: segmentOverlayparam.tipPosition.flatCoordinates[1]
                  },
                  symbol: {
                    type: "esriTS",
                    color: [
                      10,
                      10,
                      10,
                      255
                    ],
                    font: {
                      family: "Arial",
                      size: 12
                    },

                    horizontalAlignment: "center",
                    kerning: true,
                    haloColor: [
                      245,
                      245,
                      245,
                      204
                    ],
                    haloSize: 1.5,
                    rotated: false,
                    text: segmentOverlayparam.innerHTML,
                    xoffset: 0,
                    yoffset: 0,
                    angle: degrees,
                    rightToLeft: textDirection
                  }
                }
                lt.featureCollection.layers[0].featureSet.features.push(segmentGeometry);
              })
            }
          }
        });
        layerModuleObject.push(lt);
      }
      return layerModuleObject;
    } catch (err) {
      console.log("export err", err);
    }
  };

  handleResolution = (e, { value }) => {
    this.setState({
      resolution: value,
    });
  };

  handleLayout = (e, { value }) => {
    // this.setState({
    //   layout_template: value,
    // });
    this.props.dispatch(setPageSize(value))
  };

  handleLegends = () => {
    //const { selectedLayerLegends } = this.props;
    // this.setState({
    //   allowLegends: !this.state.allowLegends,
    // });
    // }, () => {
    //   if (this.state.allowLegends) {
    //     this.legendsData(selectedLayerLegends)
    //   } else {
    //     this.legendsDataForExport = [];
    //   }
    // })
    this.props.dispatch(setLegendValue(!this.props.legendOption))
  };

  handleOrientation = (e, value) => {
    let firstPage;
    if (value === "horizontal") {
      firstPage = this.landscapeOptions[0].value
      this.setState({
        pageOptions: this.landscapeOptions
      });
    } else {
      firstPage = this.portraitOptions[0].value
      this.setState({
        pageOptions: this.portraitOptions,
      });
    }
    this.props.dispatch(setExportTab(value))
    this.props.dispatch(setPageSize(firstPage))
  };

  handleTitle = (e, { value }) => {
    this.props.dispatch(setTitle(value))
  };

  handleScale = (e, { value }) => {
    this.setState({
      scale: value,
    });
  };

  createLayersData = (layers, allVisibleLayers, filterLayers) => {
    const { basemap, islabelLayer } = this.props;
    const exportLayers = [];
    layers && layers.forEach((layer) => {
      if(layer.groupname) {
        return;
      }
      const ind = exportLayers.findIndex((l) => l.id === layer.layerId);
      if (ind === -1) {
        let visibleLayers = allVisibleLayers.filter(
          (l) => getMainLayerParentId(l) === layer.layerId
        );
        const exportOpacityLayers = [];
        visibleLayers.forEach((vl) => {
          if (filterLayers[vl]) {
            visibleLayers = visibleLayers.filter((l) => l !== vl);
            exportOpacityLayers.push({
              id: vl,
              title: layer.name,
              opacity: filterLayers[vl].opacity,
              minscale: layer.minScale,
              maxscale: layer.maxScale,
              ...getTokenObj(layer.url),
              url: layer.url,
              visibleLayers: [getLayerId(vl)],
            });
          }
        });

        if (visibleLayers.length > 0 || exportOpacityLayers.length === 0) {
          const filterLayer = filterLayers[layer.layerId];
          const exportLayer = {
            id: layer.layerId,
            title: layer.name,
            opacity:
              filterLayer && Number(filterLayer.opacity) > -1
                ? filterLayer.opacity
                : this.props.opacity,
            minscale: layer.minScale,
            maxscale: layer.maxScale,
            url: layer.url,
            ...getTokenObj(layer.url),
            visibleLayers: visibleLayers.map((l) => getLayerId(l)),
          };
          exportLayers.push(exportLayer);
        }
        if (exportOpacityLayers.length > 0) {
          exportOpacityLayers.map((l) => exportLayers.push(l));
        }
      }
    });
    if(baseMaps.labelmap && !basemap.includes("osm") && islabelLayer) {
      const exportLayer = {
        id: `label-${baseMaps.labelmap.id}`,
        title: baseMaps.labelmap.title_HE,
        opacity: 1,
        // minscale: 0,
        // maxscale: 0,
        url: baseMaps.labelmap.url,
        ...getTokenObj(baseMaps.labelmap.url),
        visibleLayers: '*',
      };
      exportLayers.splice(0, 0, exportLayer);
    }
    return exportLayers;
  };

  legendsData = (layersData) => {
    const { selectedLayerLegends } = this.props;
    const exportLegends = [];
    layersData.forEach((layer) => {
      if(layer.url.includes('gs')) {
        return;
      }
      let subLayerIds = [];
      if (layer.id.split("-").length === 2) {
        subLayerIds = selectedLayerLegends
          .filter((l) => getMainLayerParentId(l.id) === layer.id)
          .map((l) => Number(l.layerId));
        subLayerIds = subLayerIds.filter(
          (l) => layer.visibleLayers.findIndex((vl) => vl === l) !== -1
        );
      } else {
        const layerLegend = selectedLayerLegends.find((l) => l.id === layer.id);
        if (layerLegend) {
          subLayerIds = [layerLegend.layerId];
        }
      }

      exportLegends.push({
        id: layer.id,
        subLayerIds,
      });
    });
    return exportLegends;
  };

  handleDPIChange = (dpi) => {
    this.setState({ dpis: dpi });
    this.props.dispatch(setDPIValue(dpi));
  }

  handleScaleChange = (e, {value}) => {
    let scaleValue;
    if(value.includes(':')) {
      scaleValue = value.split(':')[1];
    } else {
      scaleValue = value;
    }
    this.setState({ scale: scaleValue });
    this.props.dispatch(setScaleValue(scaleValue));
  }

  handleFormatChange = (e, {value}) => {
    this.setState({ format: value });
    this.props.dispatch(setFormatValue(value));
  }

  handleAddition = (e, { value }) => {
    let scaleText;
    if(value.includes(':')) {
      scaleText = value
    } else {
      scaleText = `1:${value}`
    }
    this.scaleOptions.push({ key: value, text: scaleText, value: value });
    this.setState({ scale: value });
    this.props.dispatch(setScaleValue(value));
  }

  handleScaleValueChange = (e) => {
    var invalidChars = [
      "-",
      "+",
      "e",
      "."
    ];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  }
  componentWillUnmount = () => {
    document.querySelector(".selectsearchexport").removeEventListener('keydown', this.handleScaleValueChange);
  }

  render() {
    const { translation, loadingLegends, title, exportTab, pageSize, legendOption, loadingExport, defaultDPI } = this.props;
    const { pageOptions, scale, format } = this.state;

    return (
      <Block className="drawShapes searchFields">
        <Block className="headSearch searchLayers d-flex justify-content-center align-item-center justify-space-between">
          {loadingLegends && <Block>Loading... Legends</Block>}
          <Block className=""></Block>
          <Block className="d-flex align-items-center">
            <h4 className="font-weight-medium mb-0">{translation.export}</h4>
            <Button
              className="module-info-toc module-info-toc-header d-flex justify-content-end cursor-pointer btn-none"
              data-tooltip={translation.mapexporthedaer}
              data-position="bottom center"
            >
              <Svg name="info-module" />
            </Button>
          </Block>
          <Block className="">
            {/* <Svg className="close-new" name="close-new" /> */}
          </Block>
        </Block>
        {/* <Block className="exportserchhead">
          <Input placeholder={translation.titlePlaceholder} onChange={this.handleTitle} />
        </Block> */}
        <Block className="exportBottom">
          <Block className="fieldsBlock stblocks">
            <Block className="d-flex align-item-center mt-1 justify-space-between">
              <label className="font-medium label-export">
                {translation.title}
              </label>
              <Block className="stSelectFull">
                <Input
                  type="text"
                  placeholder={translation.titlePlaceholder}
                  onChange={this.handleTitle}
                  value={title}
                />
              </Block>
            </Block>
            <Block className="d-flex align-item-center mt-1 justify-space-between">
              <label className="font-medium label-export">
                {translation.pagedirection}
              </label>
              <Block className="actionBtns btn-export-new">
                <Button.Group>
                  <Button
                    className={`${
                      exportTab === "horizontal"
                        ? "horizontal-export"
                        : "portrait-export d-flex align-item-center flex-d"
                    }`}
                    onClick={(e) => this.handleOrientation(e, "horizontal")}
                  >
                    <Svg name="exporthorizontal" />
                    &nbsp; {translation.horizontal}{" "}
                  </Button>
                  <Button.Or text={translation.or} />
                  <Button
                    className={`d-flex align-item-center flex-d ${
                      exportTab === "portrait"
                        ? "horizontal-export"
                        : "portrait-export "
                    }`}
                    onClick={(e) => this.handleOrientation(e, "portrait")}
                  >
                    <Svg name="exportportrait" />
                    &nbsp; <span>{translation.vertical}</span>
                  </Button>
                </Button.Group>
              </Block>
            </Block>
            <Block className="d-flex align-item-center mt-1 justify-space-between">
              <label className="font-medium label-export">
                {translation.pageSize}
              </label>
              <Block className="stSelectFull">
                <Select
                  placeholder={translation.selectSizePlaceholder}
                  className="searchSelect"
                  icon="angle down"
                  onChange={this.handleLayout}
                  value={pageSize}
                  options={pageOptions}
                ></Select>
              </Block>
            </Block>
            <Block className="d-flex align-item-center mt-1 justify-space-between">
              <label className="font-medium label-export">
              {translation.resolution}
              </label>
              {/* <Block className="stSelectFull">
                <ReactSlider
                  defaultValue={defaultDPI}
                  className="horizontal-slider"
                  thumbClassName="example-thumb"
                  trackClassName="example-track"
                  // renderThumb={this.renderThumb}
                  onChange={this.handleDPIChange}
                  min={exportList[0].dpi[0].min}
                  max={exportList[0].dpi[0].max}
                  step={1}
                />
              </Block> */}
              <Block className="ui input sizeCol w-non-100">
                <Input
                  type="number"
                  min={exportList[0].dpi[0].min}
                  max={exportList[0].dpi[0].max}
                  defaultValue={defaultDPI}
                  onChange={(e, { value }) => this.handleDPIChange(value)}
                  className="size-input" />
                <span>dpi</span>
              </Block>
            </Block>
            <Block className="d-flex align-item-center mt-1 justify-space-between">
              <label className="font-medium label-export">
              {translation.scale}
              </label>
              <Block className="stSelectFull">
                <Dropdown
                  placeholder={translation.selectSizePlaceholder}
                  className="searchSelect selectsearchexport"
                  search
                  selection
                  allowAdditions
                  additionLabel={translation.exportAdd}
                  searchInput='number'
                  icon="angle down"
                  onAddItem={this.handleAddition}
                  onChange={this.handleScaleChange}
                  value={scale}
                  options={this.scaleOptions}
                />
                {/* </Select> */}
              </Block>
            </Block>
            <Block className="d-flex align-item-center mt-1 justify-space-between">
              <label className="font-medium label-export">
              {translation.fileformat}
              </label>
              <Block className="stSelectFull">
                <Select
                  placeholder={translation.selectSizePlaceholder}
                  className="searchSelect"
                  icon="angle down"
                  onChange={this.handleFormatChange}
                  value={format}
                  options={this.formatOptions}
                ></Select>
              </Block>
            </Block>

            {/* <label>Page size </label>
              <select id="format">
                <option value="a0">A0 (slow)</option>
                <option value="a1">A1</option>
                <option value="a2">A2</option>
                <option value="a3">A3</option>
                <option value="a4" selected>A4</option>
                <option value="a5">A5 (fast)</option>
              </select> */}
            {/* <label className="font-medium mb-1 mt-1">Scale</label>
            <Block className="stSelectFull">
              <Input type="text" placeholder='please enter scale' onChange={this.handleScale} />
            </Block> */}
            {/* <label className="font-medium mb-1 mt-2">Resolution</label>
            <Block className="stSelectFull">
              <Select placeholder={translation.selectSizePlaceholder}
                className="searchSelect"
                icon="angle down"
                onChange={this.handleResolution}
                value={this.state.resolution}
                options={resoltion}>
              </Select>
            </Block> */}
            {/* <label className="font-medium mb-1 mt-2">{translation.pageDirection}</label> */}
            {/* <Block className="position-relative left-17 mt-1">
              <Block className="map-export">
                <Block
                  className="ui radio checkbox"
                  onClick={(e) => this.handleOrientation(e, "horizontal")}
                >
                  <input
                    type="radio"
                    checked={this.state.orientation === "Landscape"}
                    name="radio"
                  />
                  <label>
                    {translation.horizontal}&ensp;
                    <Svg name="horizontal" />
                  </label>
                </Block>
              </Block>
              <Block className="map-export">
                <Block
                  className="ui radio checkbox"
                  onClick={(e) => this.handleOrientation(e, "Portrait")}
                >
                  <input
                    type="radio"
                    checked={this.state.orientation === "Portrait"}
                    name="radio"
                  />
                  <label>
                    {translation.vertical} &ensp; <Svg name="vertical" />
                  </label>
                </Block>
              </Block>
            </Block> */}

            <Block className="fieldwithswitchs">
              <Label className="font-medium legend-export">{translation.showlegend}</Label>
              <Block className="switch">
                <Radio
                  checked={legendOption}
                  onChange={this.handleLegends}
                  toggle
                />
              </Block>
            </Block>

            {/* {loading ? <Loading /> : null} */}
            {/* <Block className="mx-auto">
              <Button id="export-png" className="button-border-dark" onClick={this.pngFunctionality}>{translation.submit} <Svg name="buttontick" /></Button>
              <a id="image-download" download="map.png"></a> 
            </Block> */}
            {/* <div id="map" class="map"></div> */}
            <Block className="buttonsCol text-center">
              <Button
                onClick={this.createMap}
                id="export-pdf"
                className={`button-border-dark ${loadingExport ? 'button-export' : ''}`}
                loading={loadingExport}
                disabled={loadingExport}
                primary={loadingExport}
              >
                {translation.exportMapModule}
              </Button>
              {/* <button
                onClick={this.createMap}
                id="export-pdf"
                className="ui button button-border-dark"
                loading={loadingExport}
              >
                {translation.export}
              </button> */}
            </Block>
            {/* <a id="export-png" class="btn btn-default"><i class="fa fa-download" onClick={this.exportFunctionality}></i> Download PNG</a>
                  <a id="image-download" download="map.png"></a> */}
          </Block>
        </Block>
      </Block>
    );
  }
}

export default connect((state) => ({
  selectedLayerLegends: state.legends.selectedLayerLegends,
  map: state.map.map,
  translation: state.translation.translation,
  scale: state.layers.scale,
  opacity: state.layers.opacity,
  basemapList: state.basemap.list,
  basemap: state.basemap.selectedBasemap,
  isBasemap: state.basemap.isBasemapVisible,
  islabelLayer: state.basemap.islabelLayer,
  selectedLayers: state.layers.selectedLayers,
  initialValues: {
    basemap: state.basemap.selectedBasemap,
  },
  allLayers: state.layers.allLayers,
  visibleLayers: state.layers.visibleLayers,
  layers: state.layers.layers,
  filterLayers: state.layers.filterLayers,
  tocGeometry: state.tocData.tocGeometry,
  loadingLegends: state.legends.loading,
  latestWkid: state.map.latestWkid,
  projection: state.map.projection,
  drawingData: state.drawing.data,
  language: state.translation.language,
  title: state.exports.currentTitle,
  exportTab: state.exports.exportTab,
  pageSize: state.exports.pageSize,
  legendOption: state.exports.legendOption,
  loadingExport: state.exports.loading,
  defaultDPI: state.exports.dpi,
  defaultScale: state.exports.scale,
  defaultFormat: state.exports.format,
}))(ExportMap);
