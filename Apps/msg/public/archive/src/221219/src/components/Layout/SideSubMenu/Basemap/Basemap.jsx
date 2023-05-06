import React, { Component } from 'react';
import { Radio, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { Block, Svg } from '../../..';
import { setBasemap, setCompareBasemap } from '../../../../redux/modules/basemap';
// import { 
//   Accordion, 
//   // Icon 
// } from 'semantic-ui-react';
import { ToggleBasemap, ToggleLabels } from './';

import Loading from '../../../Loading';

/**
 * Component
 * @name Basemap
 * @description
 * This is the Basemap component of the application. 
 * On basemap menu open, this component is loaded
 */
class Basemap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 1
    }
  }

  onChangeBasemap = (basemap, basemapType) => {
    this.props.dispatch(setBasemap(basemap, basemapType));
  }

  handleCompareLayer = (basemap, basemapType) => {
    const { compareMap } = this.props;

    if (compareMap !== basemap) {
      this.props.dispatch(setCompareBasemap(basemap, basemapType));
    } else {
      this.props.dispatch(setCompareBasemap());
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { basemapList, lang, translation, isBasemap, basemap, isLabels, compareMap, isMapComparison, direction, errorMaps, isBasemapLoading } = this.props;
    // const { activeIndex } = this.state
    const basemapOps = basemapList.basemaps ? basemapList.basemaps.map(b => ({ value: b.slug, text: b[`title_${lang}`] })) : []
    const yearmapOps = basemapList.arialmaps ? basemapList.arialmaps.map(b => ({ value: b.slug, text: b[`title_${lang}`] })) : []
    let unAvailableMaps = []
    if(errorMaps) {
      unAvailableMaps = Object.values(errorMaps)
    }
    const vectorMap = basemapList.basemaps.filter(bm => bm.url !== 'OSM')[0] ? basemapList.basemaps.filter(bm => bm.url !== 'OSM')[0]: null
    return (
      <Block>
        <Block className="headSearch searchLayers basemapHead d-flex justify-content-center align-item-center justify-space-between basemap-tooltip">
          <Block className="font-weight-regular basemap-header-switch" data-tooltip={translation.showbasemap} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}>
            <ToggleBasemap />
          </Block>
          <Block className="header-title d-flex align-items-center">
            <h4 className="font-weight-medium basemap-heading">
              {translation.basemap}
            </h4>
            <Block>
              <Button className="module-info-toc module-info-toc-header d-flex justify-content-end cursor-pointer btn-none" data-tooltip={translation.basemaphedaer} data-position="bottom center">
                <Svg name="info-module" />
              </Button>
            </Block>
          </Block>
          <Block className="mob-menu-icon">
            {/* <Svg className="mob-menu-new" name="mobile-menu" /> */}
          </Block>
          <Block className="">
          </Block>
        </Block>
        <Block className="acc acc-basemap">
          <Block className="d-flex justify-space-between map-section">
            <Block className="font-weight-medium">{translation.maps}</Block>
            <Block className="font-weight-regular"></Block>
            {isBasemapLoading && <Loading />}
          </Block>

          <Block className="fieldsBlockOuter scrolllegend">
            {!isBasemapLoading && basemapOps && basemapOps.length > 0 &&
              <Block className="fieldsBlock ">
                <Block className="basemap-field">
                  {basemapOps.map(bmap => (
                    <Block className="base-field" key={bmap.value}>
                      {!unAvailableMaps.includes(bmap.value) && <Radio
                        checked={bmap.value === basemap}
                        onChange={this.onChangeBasemap.bind(this, bmap.value, 'VECTOR')}
                        label={bmap.text}
                        disabled={!isBasemap || compareMap === bmap.value}
                      />}
                      {bmap.value !== basemap && isMapComparison && !unAvailableMaps.includes(bmap.value) &&
                        <Block className="dragIcon active">
                          <Button
                            onClick={this.handleCompareLayer.bind(this, bmap.value, 'VECTOR')}
                            className={`d-icon ${compareMap === bmap.value ? 'active' : ''}`}
                            data-tooltip={translation.comparemap} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}
                            disabled={!isBasemap}
                          >
                            <Svg name='drag-icon' />
                          </Button>
                        </Block>
                      }
                    </Block>
                  ))}
                </Block>
              </Block>
            }
            {!isBasemapLoading && yearmapOps && yearmapOps.length > 0 && ((vectorMap !== null && yearmapOps.length !== unAvailableMaps.filter(l => l !== vectorMap.slug).length) || (vectorMap === null && yearmapOps.length !== unAvailableMaps.length)) &&
              <Block className="fieldsBlock ">
                <Block className="withswitch d-flex">
                  <Block>
                    <h4 className="font-weight-medium  mt-1 mb-1">{translation.aerialphotos}</h4>
                  </Block>
                  {isLabels &&
                    <Block className="toggle-basemap">
                      <ToggleLabels />
                    </Block>
                  }
                </Block>
                <Block className="basemap-field">
                  {yearmapOps.map(bmap => (
                    <Block className="base-field" key={bmap.value}>
                      {!unAvailableMaps.includes(bmap.value) && <Radio
                        checked={bmap.value === basemap}
                        onChange={this.onChangeBasemap.bind(this, bmap.value, 'ARIAL')}
                        label={bmap.text}
                        disabled={!isBasemap || compareMap === bmap.value}
                      />}
                      {bmap.value !== basemap && isMapComparison && !unAvailableMaps.includes(bmap.value) &&
                        <Block className="dragIcon active">
                          <Button
                            onClick={this.handleCompareLayer.bind(this, bmap.value, 'ARIAL')}
                            className={`d-icon ${compareMap === bmap.value ? 'active' : ''}`}
                            data-tooltip={translation.comparemap} data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}
                            disabled={!isBasemap}
                          >
                            <Svg name='drag-icon' />
                          </Button>
                        </Block>
                      }
                    </Block>
                  ))}
                </Block>
              </Block>
            }
          </Block>
        </Block>
      </Block>
    )
  }
}

export default connect(
  state => ({
    map: state.map.map,
    basemapLayer: state.basemap.selectedBasemapLayer,
    translation: state.translation.translation,
    lang: state.translation.language,
    basemapList: state.basemap.list,
    basemap: state.basemap.selectedBasemap,
    isBasemap: state.basemap.isBasemapVisible,
    isLabels: state.basemap.isLabels,
    compareMap: state.basemap.selectedCompareMap,
    isMapComparison: state.basemap.isMapComparison,
    direction: state.translation.direction,
    errorMaps: state.basemap.unavailableBaseMaps,
    isBasemapLoading: state.basemap.isBasemapLoading
  })
)(Basemap);