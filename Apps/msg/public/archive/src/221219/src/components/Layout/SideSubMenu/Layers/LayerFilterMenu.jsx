import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Popup, List } from 'semantic-ui-react';

import { Block, Svg } from '../../..';
import { LayersTransparencyBar, LayerExportMenu } from './';
import { handleLayerOpacity, setFilterMenuActive } from '../../../../redux/modules/layers'
import { setActiveMenuItem } from '../../../../redux/modules/menu'
import {
  onLayerChange
} from '../../../../redux/modules/toc';

// import { downloadKMZFile, getTokenForUrl, downloadFile } from '../../../../utils/common'
import {
  getPadding,
  // transExtent,
  // fitToMap, getPadding
} from '../../../../utils/map'

import { transformExtent } from 'ol/proj';
import menu from '../../../../config/mainMenu'

/**
 * Component
 * @name LayerFilterMenu
 * @description
 * This is the layer filter menu of the application. 
 * On open layer menu, this component is loaded
 */
class LayerFilterMenu extends Component {
  constructor(props) {
    super(props)
    this.csvLink = React.createRef();
    const { opacity, layerFilter } = this.props;
    const opacityValue = layerFilter ? layerFilter.opacity : opacity;
    this.state = {
      isOpen: false,
      opacity: opacityValue,
      isExport: false,
      isZoomExtent: false,
      isExportOpen: true,
      csvData: null,
      fitToLayer: false,
    }
  }

  UNSAFE_componentWillReceiveProps = ({ opacity, layerFilter }) => {
    if (opacity !== this.props.opacity && (!layerFilter || (layerFilter && !layerFilter.isLocked))) {
      this.setState({
        opacity
      });
    }
  }

  componentDidMount = () => {
    document.querySelector(".accordianMenus").addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate = async () => {
    const { setActiveFilterMenu, layer } = this.props;
    const { isOpen } = this.state;
    if (this.props.isSelectedLayer) {
      if (!isOpen && layer.layerId === setActiveFilterMenu) {
        document.querySelector(".bottomList0").addEventListener('scroll', this.handleScroll);
        this.setState({ isOpen: !isOpen }, () => {
          this.props.selectedActiveClass(layer.layerId)
        })
        this.props.dispatch(setFilterMenuActive(layer.layerId));
      } else if (isOpen && layer.layerId !== setActiveFilterMenu) {
        document.querySelector(".bottomList0").removeEventListener('scroll', this.handleScroll);
        this.setState({ isOpen: false })
        this.props.dispatch(setFilterMenuActive(null));
      }
    } else {
      if (!isOpen && layer.layerId === setActiveFilterMenu) {
        this.setState({ isOpen: !isOpen }, () => {
          this.props.activeClass(layer.layerId);
        })
      } else if (isOpen && layer.layerId !== setActiveFilterMenu) {
        this.setState({ isOpen: false }, () => {
          this.props.activeClass();
        })
      }
    }
  }

  componentWillUnmount = () => {
    document.querySelector(".accordianMenus").removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { isExportOpen } = this.state;
    if (isExportOpen) {
      this.setState({ isExportOpen: false });
    }
  }

  handleProgressBar = (opacityValue) => {
    const { dispatch, layer } = this.props;
    dispatch(handleLayerOpacity(layer, opacityValue));
    this.setState({
      opacity: opacityValue,
      isExportOpen: false
    });
  }

  exportMap = () => {
    const oldCanvas = document.getElementById('map').getElementsByTagName('canvas')[0];
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    context.drawImage(oldCanvas, 0, 0);
  }

  handleLinkToToc = () => {
    const { layer, selectedLayers, dispatch, isVisible } = this.props;
    if (isVisible) {
      const selectedLayer = selectedLayers[layer.layerId];
      dispatch(onLayerChange(selectedLayer));
    } else {
      const { name, id, layerId, minScale, maxScale, extent, url } = layer;
      dispatch(onLayerChange({ name, url, id, extent, layerId, minScale, maxScale }));
    }
    dispatch(setActiveMenuItem('layerRecords'));
  }

  fitToLayerExtent = (extent) => {
    let { map, projection } = this.props;
    // const { isOpen } = this.state;
    if (extent && extent.xmax && extent.spatialReference) {
      const ext = transformExtent([extent.xmin, extent.ymin, extent.xmax, extent.ymax], `EPSG:${extent.spatialReference.latestWkid}`, projection);
      const view = map.getView();
      view.fit(ext, {
        duration: 1000,
        padding: getPadding(),
        size: map.getSize()
      });
    } else {
      const ext = transformExtent([extent.xmin, extent.ymin, extent.xmax, extent.ymax], `EPSG:4326`, projection);
      const view = map.getView();
      view.fit(ext, {
        duration: 1000,
        padding: getPadding(),
        size: map.getSize()
      });
    }
    this.setState({ isExportOpen: false, fitToLayer: true });
  }

  handleMenuActiveClass = async (layerId) => {
    const { dispatch } = this.props;
    const { isOpen }  = this.state;
    await dispatch(setFilterMenuActive(layerId));
    if (this.props.isSelectedLayer) {
      this.setState({ isOpen: !isOpen }, () => {
        this.props.selectedActiveClass(layerId);
      });
    } else if (!this.props.isSelectedLayer && !isOpen) {
      this.setState({ isOpen: !isOpen }, () => {
        this.props.activeClass(layerId);
      });
    }
  }

  handleFirstPopupClose = async () => {
    await this.props.dispatch(setFilterMenuActive(null));
    if (this.props.isSelectedLayer) {
      this.setState({ isOpen: false }, () => {
        this.props.selectedActiveClass(null);
      });
    } else if (!this.props.isSelectedLayer) {
      this.setState({ isOpen: false }, () => {
        this.props.activeClass(null);
      });
    }
  }

  handleShowExportMenu = () => {
    this.setState({ isExportOpen: true });
  }

  render() {
    const { translation, layer, isVisible, direction, loadingLayerIds, allLayers } = this.props;
    const { opacity, isOpen, isExport, isZoomExtent, fitToLayer, isExportOpen } = this.state;
    const al = allLayers.find(al => al.layerid === layer.layerId);
    let extlayer = al.extent;
    if (al && layer && (layer.BoundingBox || layer.boundingbox)) {
      extlayer = {
        xmin: layer.BoundingBox? layer.BoundingBox[0].extent[0] : layer.boundingbox[0].extent[0],
        ymin: layer.BoundingBox ? layer.BoundingBox[0].extent[1] : layer.boundingbox[0].extent[1],
        xmax: layer.BoundingBox ? layer.BoundingBox[0].extent[2] : layer.boundingbox[0].extent[2],
        ymax: layer.BoundingBox ? layer.BoundingBox[0].extent[3] : layer.boundingbox[0].extent[3]
      }
    }

    if (isZoomExtent && extlayer && !fitToLayer) {
      this.fitToLayerExtent(extlayer);
    }

    return (
      <Block className="lm-menu-block" data-tooltip={translation.moreoption} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}>

        <Popup
          on='click'
          flowing
          // pinned
          basic
          position='left center'
          open={isOpen || isExport}
          className={`asideListPopup ${!isVisible ? 'lm-invisible' : ''}`}
          trigger={<Button className={isOpen ? 'ui button active' : ''} onClick={() => this.handleMenuActiveClass(layer.layerId)}><Svg name="verticalmenulayer" /></Button>}
          id={`lm-${layer.layerId}`}
        >
          <Block className="ulList">
            <Block className="closeforlayer">
              <Svg onClick={() => this.handleFirstPopupClose()} name='close-new' className="clearsearchlayer" />
            </Block>
            {isVisible &&
              <Block className="rangeSlider sm-slider slider-custom">
                <LayersTransparencyBar
                  valueNow={this.handleProgressBar}
                  defaultValue={opacity}
                  // value={opacityValue}
                  locked={false}
                />
                <Button className="eye open textperc">{(opacity * 100).toFixed(0)}%</Button>
              </Block>
            }
            <List>
              {!loadingLayerIds.includes(layer.layerId) && al && extlayer && isVisible &&
                // <List.Item onClick={() => this.fitToLayerExtent(al.extent)} className="list-custom d-flex mr-auto mt-13">
                //   <Svg name="extent" />&nbsp;{translation.extent}
                // </List.Item>
                <List.Item className="d-flex list-custom align-item-center mt-13 visible-sm">
                  <Svg name="extent" onClick={() => this.fitToLayerExtent(extlayer)}/>&ensp;
                  <Button onClick={() => this.fitToLayerExtent(extlayer)}>{translation.extent}</Button>
                </List.Item>
              }
              {loadingLayerIds.includes(layer.layerId) &&
                <List.Item className="d-flex list-custom align-item-center mt-13 visible-sm">
                  <Svg name="extent" onClick={() => this.setState({ isZoomExtent: true })}/>&ensp;
                  <Button loading={isZoomExtent} onClick={() => this.setState({ isZoomExtent: true })} >{translation.extent}</Button>
                </List.Item>
              }
              {isVisible && menu.mainMenu.includes('layerRecords') &&
                <List.Item onClick={this.handleLinkToToc} className="list-custom d-flex mr-auto mt-13"><Svg name="tocfilterlayer" />&ensp;{translation.tableOfContent}</List.Item>
              }
              <Block>
                {layer.export && layer.export.length !== 0 &&
                  <LayerExportMenu
                    isExportOpen={isExportOpen}
                    showMenu={this.handleShowExportMenu}
                    layer={layer} 
                    al={al} 
                  />
                }
              </Block>
            </List>
          </Block>
        </Popup>
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    direction: state.translation.direction,
    selectedLayers: state.layers.selectedLayers,
    opacity: state.layers.opacity,
    loadingLayerIds: state.layers.loadingLayerIds,
    layers: state.layers.layers,
    allLayers: state.layers.allLayers,
    map: state.map.map,
    projection: state.map.projection,
    setActiveFilterMenu: state.layers.setActiveFilterMenu
  })
)(LayerFilterMenu);