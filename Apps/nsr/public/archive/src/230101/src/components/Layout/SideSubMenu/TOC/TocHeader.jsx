import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  Loader,
  Button,
} from 'semantic-ui-react';

import { Block, Svg } from '../../../';
import { DrawingComponent } from './';
import { updateDrawingState } from '../../../../redux/modules/toc';
import TOCFieldsFilter from './TOCFieldsFilter';
import TOCSelectLayer from './TOCSelectLayer';

class TOCHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedFilter: true,
      // spatialFilter: this.props.spatialFilterState ? this.props.spatialFilterState.spatialState : false,
      drawing: this.props.drawingState === 'DRAWING',
      layerOptions: [],
      selectedValue: this.props.tocLayer ? this.props.tocLayer.value : null,
      loading: false,
      drawingFilter: false,
      innerDropDown: true,
      columnData: []
    }
    this.draw = null;
    this.isLoadingMore = false;
  }

  handleDrwaingButton = () => {
    const { dispatch } = this.props;
    this.setState(({ drawing }) => ({
      drawing: !drawing
    }), () => {
      if (this.state.drawing) {
        dispatch(updateDrawingState('DRAWING'));
      } else {
        dispatch(updateDrawingState('SPAITAL'));
      }
    });
  }

  render() {
    const { translation, tocLayer, loading, geometry, bufferData } = this.props;
    const { drawing } = this.state;
    return (
      <Block className="height-0">
        <Block className="headSearch searchLayers d-flex justify-content-center align-item-center justify-space-between">
          <Block className="d-flex filter-total align-item-center w-33">
          </Block>
          <Block className=" header-toc w-33 d-flex align-items-center">
            <h4 className="font-weight-medium text-center">
              {translation.layerRecords}
            </h4>
            <Block>
            <Button className="module-info-toc d-flex justify-content-end cursor-pointer btn-none" data-tooltip={translation.layerrecordhedaer} data-position="bottom center">
              <Svg name="info-module" />
            </Button>
          </Block>   
          </Block>
          <Block className="w-33">
          </Block>
        </Block>
        <Block className="headSearch tocSearchHeader header-filter d-flex">
          <TOCSelectLayer />
          <TOCFieldsFilter />
          {loading && <Loader active inline />}
          {tocLayer &&
            <Block className="toc-head-right">
              <Button className=" background-grey mr-2 position-relative btn-draw-custom" onClick={this.handleDrwaingButton}>
                <Button.Content visible><Svg name="drawfilter" />&ensp;{translation.drawFilter}  <Svg name="drawfilterarrow" className={` ${this.state.drawing ? 'drawfilterarw' : ''} `} /></Button.Content>
                {((geometry && Object.keys(geometry).length > 0) || bufferData) && <span className="filter-open"></span>}
              </Button>
              {drawing &&
                <DrawingComponent
                  // drawing={this.state.drawing}
                />
              }
            </Block>
          }
        </Block >
      </Block >
    )
  }
}

export default connect(
  state => ({
    map: state.map.map,
    translation: state.translation.translation,
    selectedLayers: state.layers.selectedLayers,
    tocLayer: state.tocData.tocLayer,
    geometry: state.tocData.geometry,
    loading: state.tocData.loading,
    drawingState: state.tocData.drawingState,
    bufferData: state.tocData.bufferData,

    // filterState: state.tocData.filterState,
    // columnHeadings: state.tocData.columnHeadings,
    // selectedTableData: state.tocData.selectedTableData,
    // selectedRowProjection: state.tocData.selectedRowProjection,
    // modifiedTocData: state.tocData.modifiedTocData,
    // selectedTocData: state.tocData.selectedTocData,
    // recordsCount: state.tocData.recordsCount,
    // selectedTocDropdownColumns: state.tocData.selectedTocDropdownColumns,
    // filteredRecordsCount: state.tocData.filteredRecordsCount,
    // tocSortingParameter: state.tocData.tocSortingParameter,
    // tocGeometry: state.tocData.tocGeometry,
    // tocStatisticsData: state.tocData.tocStatisticsData,
    // columnNames: state.tocData.columnNames,
    // tocLayerFilterColumnName: state.tocData.tocLayerFilterColumnName,
    // tocFilterCondition: state.tocData.tocFilterCondition,
    // tocSourceDrawing: state.tocData.tocSourceDrawing,
    // tocIntersectionGeometry: state.tocData.tocIntersectionGeometry,
    // direction: state.translation.direction
  })
)(reduxForm({
  form: 'select-basemap',
  enableReinitialize: true,
})(TOCHeader));