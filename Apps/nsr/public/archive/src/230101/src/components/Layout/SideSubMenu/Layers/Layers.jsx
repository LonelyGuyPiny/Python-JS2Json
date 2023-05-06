import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Block, Loading } from '../../../';
import { setCurrentScale } from '../../../../redux/modules/layers';
import { setMap } from '../../../../redux/modules/map';
import { HandleTransparency, ParentMenu, LayerSearch, SelectedLayers } from './';

class Layers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: props.opacity,
      loading: false
    }
  }

  componentDidMount = async () => {
    const { map, dispatch, layers } = this.props;
    if (!layers) {
      // this.setState({ loading: true });
      // await dispatch(fetchLayers())
      // this.setState({ loading: false });
    }
    this.handleMapScale();
    map.on('moveend', this.handleMapScale);
    dispatch(setMap(map));
  }

  componentWillUnmount = () => {
    const { map, dispatch } = this.props;
    map.un('moveend', this.handleMapScale);
    dispatch(setMap(map));
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (nextProps.lang !== this.props.lang) {
      this.setState({
        opacity: this.props.opacity
      });
    }
  }

  handleMapScale = (e = undefined) => {
    const { map, dispatch } = this.props
    const cres = map.getView().getResolution();
    const scale = Math.round(39.3701 * (25.4 / 0.28) * cres);
    dispatch(setCurrentScale(scale));
  }

  render() {
    const { layers } = this.props;
    const { loading } = this.state;
    let layersJsx;
    if (layers && layers.length) {
      layersJsx = layers.map(l => {
        return (<ParentMenu key={l.layerId} layer={l} />);
      })
    }

    return (
      <Fragment>
        <LayerSearch />
        <HandleTransparency />
        <Block className="layersSelected"><SelectedLayers /></Block>
        <Block className="accordianMenus">
          <Block className="layer-menu-block">
            {loading && <Loading />}
            {layersJsx}
          </Block>
        </Block>
      </Fragment>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    layers: state.layers.layers,
    selectedLayers: state.layers.selectedLayers,
    lang: state.translation.language,
    map: state.map.map
  })
)(Layers);