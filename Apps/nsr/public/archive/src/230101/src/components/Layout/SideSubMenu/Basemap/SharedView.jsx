import React from 'react';
import { connect } from 'react-redux';

class SharedView extends React.Component {
  constructor(props) {
    super(props);
    this.compareBasemap = props.compareBasemap;
    this.compareMap = props.compareMap;
    this.map = props.map;
  }

  componentDidMount = () => {
    const { compareBasemapLayer } = this.props
    this.compareMap.addLayer(compareBasemapLayer);
    this.compareMap.updateSize();
    this.map.updateSize();
    this.handleLables(this.props);
  }

  componentWillUnmount = () => {
    // const { labelLayer, cLabelLayer, islabelLayer } = this.props;
    // if (islabelLayer) {
    //   labelLayer.setVisible(true);
    //   cLabelLayer.setVisible(true);
    // }
    setTimeout(() => {
      this.compareMap.removeLayer(this.props.compareBasemapLayer);
      this.compareMap.updateSize();
      this.map.updateSize();
    }, 100);
  }

  shouldComponentUpdate = (nextProps) => {
    const { compareBasemap, compareBasemapLayer } = nextProps;
    if (compareBasemap !== this.props.compareBasemap) {
      this.compareBasemap = this.props.compareBasemap;
      this.compareMap.removeLayer(this.props.compareBasemapLayer);
      this.compareMap.addLayer(compareBasemapLayer);
    }
    this.handleLables(nextProps);
    return true;
  }

  handleLables = (props) => {
    const { selectedCompareBasemapType, basemapType, labelLayer, cLabelLayer, islabelLayer } = props;
    
    if (islabelLayer && basemapType === 'ARIAL') {
      labelLayer.setVisible(true);
    } else if (islabelLayer && basemapType !== 'ARIAL') {
      labelLayer.setVisible(false);
    }

    if (islabelLayer && selectedCompareBasemapType === 'ARIAL') {
      cLabelLayer.setVisible(true);
    } else if (islabelLayer && selectedCompareBasemapType !== 'ARIAL') {
      cLabelLayer.setVisible(false);
    }
  }


  render() {
    return null;
  }
}

export default connect((state) => ({
  translation: state.translation.translation,
  compareBasemap: state.basemap.selectedCompareMap,
  labelLayer: state.basemap.labelLayer,
  cLabelLayer: state.basemap.cLabelLayer,
  islabelLayer: state.basemap.islabelLayer,
  basemap: state.basemap.selectedBasemap,
  compareBasemapType: state.basemap.selectedCompareType,
  selectedCompareBasemapType: state.basemap.selectedCompareBasemapType,
  basemapType: state.basemap.basemapType,
  compareMap: state.map.compareMap,
  compareBasemapLayer: state.basemap.selectedCompareLayer,
  map: state.map.map
}))(SharedView);