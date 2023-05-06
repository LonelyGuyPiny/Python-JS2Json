import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, Button, Popup } from 'semantic-ui-react';

import { Block, Svg } from '../../..';
import { showSearchLayer, hideSelectedLayer } from '../../../../redux/modules/layers';
import { showSelectedLayerLegends, hideSelectedLayerLegends } from '../../../../redux/modules/legends';
import { checkboxChecked, checkbox } from '../../../../assets/images'
// import TransparencyBar from './TransparencyBar'
import { HandleTransparency } from './';

class LayerSearch extends Component {
  state = {
    layerOpts: [],
    loading: false,
    value: [],
    searchQuery: '',
    toggleSearch: false,
    // open: true
  }

  searchRef = React.createRef()

  componentDidMount = () => {
    this.createLayersList(this.props.allLayers);
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.allLayers !== this.props.allLayers) {
      this.createLayersList(nextProps.allLayers);
    }
  }

  //New Method of Arrays List
  createLayersList = (allLayers) => {
    const layerOpts = allLayers.filter(l => l.sublayerids === null);
    this.setState({
      layerOpts
    })
  }

  toggleSearch = () => {
    this.setState(({ toggleSearch }) => ({
      toggleSearch: !toggleSearch
    }), () => {
      if (this.state.toggleSearch) {
        // this.setState({
        //   open: true
        // });
        const searchDropDown = document.getElementById('layer-search-input');
        const searchDropDownMobile = document.getElementById('layer-search-input-mobile');
        if (searchDropDown) {
          searchDropDown.focus()
        }
        if (searchDropDownMobile) {
          searchDropDownMobile.focus()
        }
      }
    })
  }

  handleShowLayer = (e, { value }) => {
    const { visibleLayers, dispatch } = this.props;
    const { layerOpts } = this.state;
    this.setState({ value: [] });
    const layer = layerOpts.find(l => l.value === value[0]);
    if (layer) {
      this.setState({ loading: true });
      if (visibleLayers.includes(layer.layerid)) {
        dispatch(hideSelectedLayer(layer));
        dispatch(hideSelectedLayerLegends(layer.name, layer.layerid));
      } else {
        dispatch(showSearchLayer(layer));
        if (layer.groupname) {
          dispatch(showSelectedLayerLegends(layer, layer.url, layer.id, layer.parentlayerids[0], layer.groupname));
        } else {
          dispatch(showSelectedLayerLegends(layer, layer.url, layer.id, layer.parentlayerids[0]));
        }
      }
      this.setState({ loading: false });
    }
  }

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })
  handleClearSearch = () => this.setState({ searchQuery: '', toggleSearch: false })

  render() {
    const { translation, visibleLayers, direction } = this.props;
    const { layerOpts, loading, searchQuery, toggleSearch } = this.state;
    let ops = [];
    if (layerOpts) {
      ops = layerOpts.map(l => {
        l.image = { avatar: false, src: checkbox }
        if (visibleLayers.includes(l.layerid)) {
          l.image = { avatar: false, src: checkboxChecked }
        }
        return { ...l, exportcsv: undefined, exportkmz: undefined, exportshapezip: undefined, exportjson: undefined, exportkml: undefined, exportexcel: undefined };
      })
    }

    return (
      <Block className="headSearch searchLayers d-flex justify-content-center align-item-center justify-space-between img-dropdown">
        <Block className={`${toggleSearch ? 'show' : 'hide'}`}>
          <Button
            onClick={this.toggleSearch}
            className={`btn-none`}
            data-tooltip={translation.search} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}>
            <Svg className="search-layer-menu" name="search-layer-menu" />
          </Button>
          <Svg onClick={this.handleClearSearch} name='close-new' className="clearsearchlayer" />
          <Dropdown
            value={this.state.value}
            onChange={this.handleShowLayer}
            search
            placeholder={translation.searchLayer}
            options={ops}
            loading={loading}
            selection
            onSearchChange={this.handleSearchChange}
            searchQuery={searchQuery}
            noResultsMessage={translation.noresultfound}
            multiple
            // open={open}
            // onFocus={() => this.setState({ open: true})}
            // onBlur={() => this.setState({ open: false})}
            searchInput={{
              id: 'layer-search-input'
            }}
          />
        </Block>

        <Block className="mob-menu-icon">
          {/* <Svg className="mob-menu-new" name="mobile-menu" /> */}
        </Block>
        <Block className="header-title d-flex align-items-center">
          <h4 className="font-weight-medium">
            {translation.layers}
          </h4>
          <Block>
            <Button className="module-info-toc module-info-toc-header d-flex justify-content-end cursor-pointer btn-none" data-tooltip={translation.layerhedaer} data-position="bottom center">
              <Svg name="info-module" />
            </Button>
          </Block>
        </Block>
        <Block className="search-mobile-block">
          <Popup
            content={<div className='mobsearch-header'>
              <Dropdown
                value={this.state.value}
                onChange={this.handleShowLayer}
                search
                placeholder={translation.searchLayer}
                options={ops}
                loading={loading}
                selection
                onSearchChange={this.handleSearchChange}
                searchQuery={searchQuery}
                noResultsMessage={translation.search}
                multiple
                searchInput={{
                  id: 'layer-search-input-mobile'
                }}
              />
              <HandleTransparency />
            </div>}
            className='searchpopupMobile'
            on='click'
            pinned
            position={`bottom ${direction === 'LTR' ? 'right' : 'left'}`}
            trigger={
              <Button className="searchDropButton">
                <Svg name='verticalmenulayer' /></Button>
            } />
        </Block>
        <Block className="closeIcon">
          <Svg className="close-new" name="close-new" />
        </Block>
      </Block>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    layers: state.layers.layers,
    opacity: state.layers.opacity,
    allLayers: state.layers.allLayers,
    visibleLayers: state.layers.visibleLayers,
    visibleLayersCount: state.layers.visibleLayers.length,
    direction: state.translation.direction
  })
)(LayerSearch);