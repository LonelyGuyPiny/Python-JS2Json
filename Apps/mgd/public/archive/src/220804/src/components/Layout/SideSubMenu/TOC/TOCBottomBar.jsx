import React, { Fragment } from "react";
import { Button, Popup, List } from "semantic-ui-react";
import { connect } from "react-redux";
import Polygon from "ol/geom/Polygon";
import MultiLineString from "ol/geom/MultiLineString";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import { Style, Fill, Stroke, Icon } from "ol/style";
// import { getCenter } from 'ol/extent';
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";

import { Block, Svg } from "../../../";
import UrlLink from "../../UrlLink";
import { fillTemplate } from "../../../../utils/common";
import { downloadKMZ, setAutoFocus, downloadGeoJSON } from "../../../../redux/modules/toc";
import TOCExportLayer from "./TOCExportLayer";
import SpaitialIntersection from "./TOCSpaitialIntersection";
import { fitToMap } from "../../../../utils/map";

const style = new Style({
  stroke: new Stroke({
    color: `rgb(0,0,255, 1.0)`,
    width: 3,
  }),
  fill: new Fill({
    color: `rgb(153,204,255, 0.5)`,
  }),
  image: new Icon({
    anchor: [0.5, 15],
    anchorXUnits: "fraction",
    anchorYUnits: "pixels",
    opacity: 1,
    height: 400,
    width: 658,
    src: require("../../../../assets/images/point.png"),
  }),
});

/**
 * Component
 * @name TOCBottomBar
 * @description
 * This is the bottom bar of the toc. 
 * On selecting row from toc, this component is loaded
 */

class TOCBottomBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExport: false,
      isPop: false,
      isDrop: false,
      loadingKmz: '',
      isAutoFocus: props.isAutoFocus,
      isExportOpen: false,
      isOpen: false
    };
    this.vectorLayer = null;
    this.source = new VectorSource();
    this.map = props.map;
  }

  componentDidMount = () => {
    this.vectorLayer = new VectorLayer({
      source: this.source,
      zIndex: 101,
      title: "toc-focus",
      style,
    });
    this.map.addLayer(this.vectorLayer);

    // const { isAllSlected, isFilter, filterTotal } = this.props;
    // console.log('=>>>', this.props.isAutoFocus, isAllSlected, isFilter, filterTotal);
    this.handleAutoFocus();
  };

  componentDidUpdate = (prevProps) => {
    const { isAutoFocus } = this.props;
    if (isAutoFocus && isAutoFocus !== prevProps.isAutoFocus) {
      this.source.clear();
      this.handleAutoFocus();
    }
  }

  componentWillUnmount = () => {
    this.map.removeLayer(this.vectorLayer);
  };

  handleAutoFocus = () => {
    if (this.props.isAutoFocus) {
      setTimeout(() => {
        this.focusFunctionality();
      }, 500);
      this.props.dispatch(setAutoFocus(false));
    }
  }

  createFeature(rowData) {
    try {
      const { geometryType, OIDName, featuresGeometry } = this.props;
      let geometry;
      if (rowData && rowData.attributes) {
        geometry = featuresGeometry[rowData.attributes[OIDName]];
      } else {
        return null;
      }

      if (geometryType === "esriGeometryPoint") {
        return new Feature(new Point([geometry.x, geometry.y]));
      } else if (geometryType === "esriGeometryPolyline") {
        return new Feature(new MultiLineString(geometry.paths));
      }
      return new Feature(new Polygon(geometry.rings));
    } catch {}
  }

  focusFunctionality = () => {
    const { features, selectedRows, isAllSlected } = this.props;
    (isAllSlected ? features : selectedRows).forEach((element) => {
      const feature = this.createFeature(element);
      if (feature) {
        this.source.addFeature(feature);
      }
    });

    let extent = this.source.getExtent();
    // console.log("extent", extent)
    try {
      fitToMap(extent, this.props.map);
    } catch {}
  };

  exportLayer = () => {
    this.setState({
      isExport: true,
    });
  };

  downloadKMZ = async () => {
    const { selectedRows, OIDName } = this.props;
    this.setState({ loadingKmz: true });
    let where = null;
    if (selectedRows.length > 0) {
      const Ids = selectedRows.map((r) => r.attributes[OIDName]).join(",");
      where = `${OIDName} IN (${Ids})`;
    }
    await this.props.dispatch(downloadKMZ(where));
    this.setState({ loadingKmz: false });
  };

  handleIsAutoFocus = () => {
    this.setState(
      ({ isAutoFocus }) => ({
        isAutoFocus: !isAutoFocus,
      }),
      () => {
        if (!this.state.isAutoFocus) {
          this.source.clear();
        } else {
          this.focusFunctionality();
        }
      }
    );
  };

  handleDownloadFile = async (type) => {
    this.setState({ loadingKmz: type });
    if(type === 'csv') {
      this.setState({
        isExport: true,
      });
    } else if(type === 'kmz') {
      const { selectedRows, OIDName } = this.props;
      // this.setState({ loadingKmz: '' });
      let where = null;
      if (selectedRows.length > 0) {
        const Ids = selectedRows.map((r) => r.attributes[OIDName]).join(",");
        where = `${OIDName} IN (${Ids})`;
      }
      await this.props.dispatch(downloadKMZ(where));
      // this.setState({ loadingKmz: '' });
    } else if(type === 'GeoJSON') {
      const { selectedRows, OIDName } = this.props;
      // this.setState({ loadingKmz: type });
      let where = null;
      if (selectedRows.length > 0) {
        const Ids = selectedRows.map((r) => r.attributes[OIDName]).join(",");
        where = `${OIDName} IN (${Ids})`;
      }
      await this.props.dispatch(downloadGeoJSON(where));
      // this.setState({ loadingKmz: type });
    }
    this.setState({ loadingKmz: '' })
  }

  render() {
    const {
      selectedRows,
      translation,
      links,
      fieldsData,
      tocLayer,
      setShowOnlySelectedRows,
      showOnlySelectedRows,
      isAllSlected,
      total,
      filterTotal,
      isFilter,
      isAllFetched,
      allLayers,
    } = this.props;
    const { isExport, loadingKmz, isAutoFocus, isOpen, isExportOpen } = this.state;
    const currentLinks = links.filter((l) => l.layerName === tocLayer.text);
    let urls;
    if (
      selectedRows &&
      selectedRows.length === 1 &&
      currentLinks &&
      currentLinks.length > 0 &&
      fieldsData
    ) {
      const vars = {};
      Object.keys(fieldsData).map(
        (v) => (vars[fieldsData[v].replaceAll(".", "_")] = selectedRows[0][v])
      );
      urls = currentLinks.map((l, i) => {
        const link = fillTemplate(l.url, vars);
        return { ...l, link };
      });
    }

    let totalSelected = isAllSlected
      ? isFilter
        ? filterTotal
        : total
      : selectedRows
      ? selectedRows.length
      : 0;
    const layer = allLayers.find((l) => l.layerid === tocLayer.layerId);
    return (
      <Block className="bottomfieldsselection d-flex justify-space-between if-basemap-show">
        <Block className="bottomfieldRight">
          <h4 className="row-selected">
            <span className="txt label-green">{totalSelected}</span>{" "}
            {translation.featuresSelected}
          </h4>
        </Block>
        <Block className="bottomfieldLeft">
          {!isAllSlected && (
            <Fragment>
              {!showOnlySelectedRows ? (
                <Block className="field-col col2">
                  <Button onClick={setShowOnlySelectedRows}>
                    <Svg name="checkeditem" />
                    {translation.showCheckedItems}
                  </Button>
                </Block>
              ) : (
                <Block className="field-col col2">
                  <Button
                    className="button-primary"
                    onClick={setShowOnlySelectedRows}
                  >
                    <Svg name="checkeditem" />
                    {translation.showAllItems}
                  </Button>
                </Block>
              )}
            </Fragment>
          )}

          {(isAllSlected && isFilter && filterTotal <= 1000) ||
          isAllFetched ||
          !isAllSlected ? (
            <Block className="field-col col3 ">
              <Button
                className={`button-border focus lined-button ${
                  isAutoFocus ? "lined-button-active" : ""
                }`}
                onClick={this.handleIsAutoFocus}
              >
                <Svg name="toctarget" />
                {translation.focus}
              </Button>
            </Block>
          ) : (
            <Popup
              className="z-index-high popup-black"
              trigger={
                <Button
                  style={{ opacity: 0.5 }}
                  className="button-border lined-button"
                >
                  <Svg name="toctarget" /> {translation.focus}
                </Button>
              }
              position="top center"
              onOpen={this.createFeatures}
            >
              {translation.thousandrecord}
            </Popup>
          )}

          <Block className="field-col col4">
            {(isAllSlected && isFilter && filterTotal <= 1000) ||
            isAllFetched ||
            !isAllSlected ? (
              <SpaitialIntersection
                selectedRows={selectedRows}
                isAllSlected={isAllSlected}
              />
            ) : (
              <Popup
                className="z-index-high popup-black"
                trigger={
                  <Button
                    style={{ opacity: 0.5 }}
                    className="button-border lined-button"
                  >
                    <Svg name="intersect" /> {translation.intersect}
                  </Button>
                }
                // on='click'
                position="top center"
                onOpen={this.createFeatures}
              >
                {translation.thousandrecord}
              </Popup>
            )}

            {urls &&
              urls.length === 1 &&
              urls.map((l, i) => (
                <UrlLink
                  key={i}
                  link={l.link}
                  type={l.type}
                  text={l.text}
                  urlFor="TOC"
                />
              ))}

            {urls && urls.length > 1 && (
              <Popup
                trigger={
                  <Button className="button-link">
                    <Svg name="verticalmenulayer" /> {translation.more}
                  </Button>
                }
                on="click"
                className="multiMorepopup"
              >
                <Popup.Content>
                  <ul>
                    {urls.map((l, i) => (
                      <UrlLink
                        key={i}
                        link={l.link}
                        type={l.type}
                        text={l.text}
                      />
                    ))}
                  </ul>
                </Popup.Content>
              </Popup>
            )}

          </Block>

          {isExport && (
            <TOCExportLayer
              close={() => this.setState({ isExport: false })}
              selectedRows={selectedRows}
              isAllSlected={isAllSlected}
            />
          )}

          <Block className="field-col col5">
            {layer.export && layer.export.length !== 0 && <Popup
              open={isOpen}
              on="click"
              pinned
              // basic
              // position='right center'
              position="top right"
              className='z-index-high trigger-position secondExport exportInToc'
              trigger={<Button onClick={() => this.setState({ isOpen: true, isExportOpen: true })} className={`button-border lined-button exportBtn ${isExportOpen ? 'lined-button-active' : ''}`}><Svg name="tocfiltershare" /> {translation.layerExport}</Button>}
              onOpen={this.createFeatures}
            >
              {/* {translation.thousandrecord} */}
              <Block className="ulList">
                <Block className="closeforlayer">
                  <Svg onClick={() => this.setState({ isOpen: false, isExportOpen: false })} name='close-new' className="clearsearchlayer" />
                </Block>
                <List>
                  {layer.export.map((element, ind) => {
                    return <List.Item key={ind} className={`d-flex align-item-center mt-13 justify-content-center`}><Button
                    loading={loadingKmz === element}
                    className="uiButton"
                    onClick={() => this.handleDownloadFile(element)}
                  >
                    {/* <Svg name="tocforward" /> */}
                    &nbsp;
                    {translation[element]}
                  </Button></List.Item>
                  })}
                </List>

              </Block>
            </Popup>}       
          </Block>

        </Block>
      </Block>
    );
  }
}
export default connect((state) => ({
  map: state.map.map,
  translation: state.translation.translation,
  tocLayer: state.tocData.tocLayer,
  geometryType: state.tocData.geometryType,
  featuresGeometry: state.tocData.featuresGeometry,
  isAutoFocus: state.tocData.isAutoFocus,
  tocSelectedLayers: state.tocData.tocSelectedLayers,
  OIDName: state.tocData.OBJECTID,
  features: state.tocData.features,
  total: state.tocData.total,
  filterTotal: state.tocData.filterTotal,
  isFilter: state.tocData.isFilter,
  links: state.links.links,
  fieldsData: state.tocData.fieldsData,
  isAllFetched: state.tocData.isAllFetched,
  direction: state.translation.direction,
  allLayers: state.layers.allLayers,
}))(TOCBottomBar);
