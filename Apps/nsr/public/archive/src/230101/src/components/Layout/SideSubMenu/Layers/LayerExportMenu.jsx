import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Block, Svg } from '../../..';
import { Button, Popup, List, Icon } from 'semantic-ui-react';
import { LayerExportCSV } from './';
// import SOURCE from '../../../../middlewares/sources';
import { export_MIDDLEWARE } from '../../../../middlewares/layers/layer_middleware';

/**
 * Component
 * @name LayerExportMenu
 * @description
 * This is the layer export menu of the application. 
 * On open layer filter menu, this component is loaded
 */
class LayerExportMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: '',
      isDownloading: false,
      popupOpen: false,
      isExport: false
    }
  }

  handleDownloadFile = async (extension) => {
    const { layer } = this.props;
    this.setState({ downloading: extension, isDownloading: true });
    // if (extension === 'csv') {
    //   // this.props.csvExport(true);
    //   this.setState({ isExport: true, isDownloading: false, downloading: '' });
    // } else {
      let middleware_data = {
        source: layer.type,
        layer,
        type: extension
      };
      const res = await export_MIDDLEWARE(middleware_data);
      if (res && res.export) {
        this.setState({ isExport: true, isDownloading: false, downloading: '' });
      } else if (res) {
        this.setState({
          downloading: '',
          isDownloading: false
        })
      }
    // }
    // } else {
    //   const middleware_data = {
    //     source: layer.type,
    //     url: layer.url,
    //     id: layer.id
    //   }
    //   if (extension === 'kmz') {
    //     middleware_data.type = 'kmz';
    //     await export_MIDDLEWARE(middleware_data);
    //     this.setState({ downloading: '', isDownloading: false });
    //   } else if (extension === 'csv') {
    //     // this.props.csvExport(true);
    //     this.setState({ isExport: true, isDownloading: false, downloading: '' });
    //   } else {
    //     middleware_data.type = 'json';
    //     await export_MIDDLEWARE(middleware_data);
    //     this.setState({ downloading: '', isDownloading: false });
    //   }
    // }
    // this.props.hideMenu(false);
  }

  handleCsvClose = () => {
    // this.props.csvExport(false);
    this.setState({ isExport: false });
  }

  handleMenuOpenClose = () => {
    const { popupOpen } = this.state;
    this.setState({ popupOpen: !popupOpen });
    this.props.showMenu();
  }

  componentDidUpdate = () => {
    const { isExportOpen } = this.props;
    const { popupOpen } = this.state;
    if (!isExportOpen && popupOpen) {
      this.setState({ popupOpen: false });
    }
  }

  render() {
    const { translation, layer, isExportOpen } = this.props;
    const { downloading, popupOpen, isExport, isDownloading } = this.state;
    // let nameArr = '';
    // let path

    // if (layer && (layer.Name || layer.groupname)) {
    //   const nameData = layer.Name ? layer.Name.split(':') : layer.groupname.split(':');
    //   const typeNames = layer.groupname;
    //   nameArr = nameData[1];
    //   path = `${layer.url}/${nameData[0]}/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=${typeNames}&outputFormat=`
    // }
    return (
      <Block>
        {isExport &&
          <LayerExportCSV
            close={this.handleCsvClose}
            layer={layer}
          />
        }
        <Popup
          open={(isExport || popupOpen || isDownloading) && isExportOpen}
          on="click"
          flowing
          // pinned
          basic
          position='right center'
          className='trigger-position secondExport'
          trigger={<Button onClick={() => this.handleMenuOpenClose()} className={(popupOpen && `exportBtn active`) || `exportBtn`}><span className='txtLeft'><Svg name="tocfiltershare" /> {translation.layerExport}</span> <Icon link name='angle right' /></Button>}
          // onClose={() => this.setState({ popupOpen: false })}
        >
          <Block className="ulList">
            <Block className="closeforlayer">
              <Svg onClick={() => this.setState({ popupOpen: false })} name='close-new' className="clearsearchlayer" />
            </Block>
            <List>
              {layer.export.map((element, ind) => {
                return <List.Item key={ind} className={`d-flex align-item-center mt-13 justify-content-center`}>
                  <div onMouseDown={() => this.handleDownloadFile(element)}>
                    <Button loading={downloading === element}>{translation[element]}</Button>
                  </div>
                </List.Item>
              })}
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
  })
)(LayerExportMenu);