import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Scrollbars } from 'react-custom-scrollbars';
import { Table } from 'semantic-ui-react';
// import _ from 'lodash';
// import Polygon from 'ol/geom/Polygon';
// import MultiLineString from 'ol/geom/MultiLineString';
// import Point from 'ol/geom/Point';
// import Feature from 'ol/Feature';

import { Block } from '../../../';
import { fetchNextRecords, handleSorting, filterFeatures, setSelectedFeatures } from '../../../../redux/modules/toc';
import TOCTableRow from './TOCTableRow';
import TOCTableHeader from './TOCTableHeader';
import TOCBottomBar from './TOCBottomBar';
import TOCPagination from './TOCPagination';

import { Vector as VectorSource } from 'ol/source';

// import { fitToMap } from '../../../../utils/map';

class TOCTable extends Component {
  constructor(props) {
    super(props);
    const selectedRowIds = props.selectedFeatures.map(f => f.attributes[props.OIDName]);
    this.state = {
      isAllSlected: props.isAllFeaturesSelected,
      selectedRowIds,
      selectedRows: props.selectedFeatures,
      isLoading: false,
      loading: false,
      rowsData: props.features.slice(0, 100),
      showOnlySelectedRows: false,
      sortingFieldName: null,
      sortingType: null,
      isSorting: false,
      sortingData: null,
      updatedAt: props.updatedAt,
      clearFiltered: false
    }
    this.source = new VectorSource();
  }

  static getDerivedStateFromProps = (props, state) => {
    if (state.updatedAt !== props.updatedAt) {
      const { features, selectedFeatures, OIDName, isAllFeaturesSelected } = props;
      const selectedRowIds = selectedFeatures.map(f => f.attributes[OIDName]);
      return ({
        ...state,
        rowsData: features.slice(0, 100),
        selectedRows: selectedFeatures,
        selectedRowIds,
        isAllSlected: isAllFeaturesSelected,
        sortingFieldName: null,
        sortingType: null,
        isSorting: false,
        sortingData: null,
        limit: 100,
        updatedAt: props.updatedAt,
        showOnlySelectedRows: false
      });
    }
    return state;
  }

  selectAllCheckboxes = async (checked) => {
    if (checked) {
      this.setState({ loading: true, selectedRowIds: [], selectedRows: [], isAllSlected: true });
      this.props.dispatch(setSelectedFeatures([], true));
    } else {
      this.setState({ loading: false, selectedRowIds: [], selectedRows: [], isAllSlected: false });
      this.props.dispatch(setSelectedFeatures([], false));
    }
  }

  toggleRow = (e, checked, row) => {
    // console.log("Selectedall")
    e.stopPropagation();
    const { OIDName, setSelectedRows } = this.props;
    let { selectedRows, selectedRowIds } = this.state;
    if (checked) {
      if (!selectedRowIds.includes(row.attributes[OIDName])) {
        selectedRows.push(row);
        selectedRowIds.push(row.attributes[OIDName])
      }
    } else {
      selectedRows = selectedRows.filter(r => r.attributes[OIDName] !== row.attributes[OIDName]);
      selectedRowIds = selectedRowIds.filter(rId => rId !== row.attributes[OIDName]);
    }
    setSelectedRows(selectedRows);
    this.props.dispatch(setSelectedFeatures(selectedRows, false));
    this.setState({
      selectedRows,
      selectedRowIds
    });
  }

  loadTableRows = async (offset, limit) => {
    const { dispatch, tocLayer, features } = this.props;
    if (features.length > offset) {
      this.setState(() => ({
        rowsData: features.slice(offset, offset + limit)
      }));
      return;
    }

    const res = await dispatch(fetchNextRecords(tocLayer, offset, limit));
    if (res) {
      this.setState({ rowsData: this.props.features.slice(offset, offset + limit) });
    }
  }

  setShowOnlySelectedRows = () => {
    const { OIDName, features } = this.props;
    this.setState(({ showOnlySelectedRows, selectedRowIds }) => {
      let rowsData = [];
      if (!showOnlySelectedRows) {
        rowsData = features.filter(f => selectedRowIds.includes(f.attributes[OIDName])).slice(0, 100)
      } else {
        rowsData = features.slice(0, 100)
      }
      return ({
        showOnlySelectedRows: !showOnlySelectedRows,
        rowsData
      });
    });
  }

  handleSorting = async (fieldName) => {
    const { dispatch } = this.props;
    const features = await dispatch(handleSorting(fieldName));
    this.setState(({ sortingFieldName, sortingType, limit }) => {
      let type = 'ASC';
      if (sortingFieldName === fieldName && sortingType === 'ASC') {
        type = 'DESC';
      }

      return ({
        sortingFieldName: fieldName,
        sortingType: type,
        isSorting: true,
        rowsData: features.slice(0, limit),
        selectedRows: [],
        selectedRowIds: []
      })
    })
  }

  clearFilters = () => {
    this.props.dispatch(filterFeatures(null, 'ALL'));
    const { isAllSlected } = this.state
    if(isAllSlected) {
      this.setState({ isAllSlected: false })
    }
  }

  // componentDidUpdate = () => {
  //   const { filterTotal } = this.props
  //   const { isAllSlected } = this.state
  //   if(filterTotal > 0 && !isAllSlected) {
  //     this.setState({ isAllSlected: true })
  //     const { features } = this.props;
  //     features.forEach(element => {
  //       const feature = this.createFeature(element);
  //       if (feature) {
  //         this.source.addFeature(feature);
  //       }
  //     });

  //     let extent = this.source.getExtent();
  //     try {
  //       fitToMap(extent, this.props.map);
  //     } catch {}
  //   }
  // }

  // createFeature(rowData) {
  //   try {
  //     const { geometryType, OIDName, featuresGeometry } = this.props;
  //     let geometry;
  //     if (rowData && rowData.attributes) {
  //       geometry = featuresGeometry[rowData.attributes[OIDName]];
  //     } else {
  //       return null;
  //     }

  //     if (geometryType === 'esriGeometryPoint') {
  //       return new Feature(new Point([geometry.x, geometry.y]));
  //     } else if (geometryType === 'esriGeometryPolyline') {
  //       return new Feature(new MultiLineString(geometry.paths));
  //     }
  //     return new Feature(new Polygon(geometry.rings));
  //   } catch { }
  // }

  // handleClearFilter = (value) => {
  //   if(value) {
  //     this.setState({
  //       isAllSlected: true,
  //       clearFiltered: true
  //     })
  //   } else {
  //     this.setState({
  //       isAllSlected: false,
  //       clearFiltered: false
  //     })
  //   }
  // }

  render() {
    const {
      handleRowClick, OIDName, onRowHover, onRowOut, total,
      isFilter, translation, filterTotal, direction, loading,
      tocLayer, links, createFeature, features
      // toc
    } = this.props;
    const { isAllSlected, selectedRowIds, selectedRows, rowsData, showOnlySelectedRows, sortingFieldName, sortingType,
      // clearFiltered
    } = this.state;

    const currentLinks = tocLayer ? links.filter(l => l.layerName === tocLayer.name || l.groupUrl === tocLayer.url) : [];

    // if(filterTotal > 0 && !isAllSlected && clearFiltered) {
    //   this.setState({ isAllSlected: true })
    //   const { features } = this.props;
    //   features.forEach(element => {
    //     const feature = this.createFeature(element);
    //     if (feature) {
    //       this.source.addFeature(feature);
    //     }
    //   });

    //   let extent = this.source.getExtent();
    //   try {
    //     fitToMap(extent, this.props.map);
    //   } catch {}
    // }

    return (
      <Block className={`table-main${((selectedRows && selectedRows.length > 0) || isAllSlected) ? ' table-responsive-main' : ''}`}>
        <Block className="table-box app-checkbox">
          <Block className={`responsive-table sticky-more-links ${showOnlySelectedRows ? 'show-scroller' : ''}`}>
            <Table celled>
              <TOCTableHeader
                selectAllCheckboxes={this.selectAllCheckboxes}
                handleSorting={this.handleSorting}
                sortingColumn={sortingFieldName}
                isAllSlected={isAllSlected}
                showOnlySelectedRows={showOnlySelectedRows}
                isCurrentLinks={currentLinks.length > 0}
                // filterCleared={this.handleClearFilter}
              />
              <Table.Body>
                {rowsData && rowsData.length > 0 && rowsData.map((rowData, i) => (
                  <TOCTableRow
                    key={i}
                    rowData={rowData}
                    handleRowClick={handleRowClick}
                    toggleRow={this.toggleRow}
                    showOnlySelectedRows={showOnlySelectedRows}
                    onRowHover={onRowHover}
                    onRowOut={onRowOut}
                    isAllSlected={isAllSlected}
                    selected={selectedRowIds.includes(rowData.attributes[OIDName]) || isAllSlected}
                    currentLinks={currentLinks}
                  />
                ))}
              </Table.Body>
            </Table>

          </Block>
        </Block>
        <Block className="tocFooterCol">
          <Block className="toc-foot-top">
            {((selectedRows && selectedRows.length > 0) || isAllSlected) && tocLayer &&
              <TOCBottomBar
                selectedRows={selectedRows}
                selectedRowIds={selectedRowIds}
                selectedRowsTotal={selectedRowIds.length}
                isAllSlected={isAllSlected}
                loading={this.props.loading}
                setShowOnlySelectedRows={this.setShowOnlySelectedRows}
                showOnlySelectedRows={showOnlySelectedRows}
                createFeature={createFeature}
              />
            }
            {total && total > 0 &&
              <TOCPagination
                total={total}
                filterTotal={filterTotal}
                isFilter={isFilter}
                onPageChange={this.loadTableRows}
                translation={translation}
                sortingType={sortingType}
                direction={direction}
                clearFilters={this.clearFilters}
                loading={loading}
                showOnlySelectedRows={showOnlySelectedRows}
                selectedRowsTotal={selectedRowIds.length}
                features={features}
              />
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
    toc: state.tocData,
    features: state.tocData.features,
    // fields: state.tocData.fields,
    isFilter: state.tocData.isFilter,
    tocLayer: state.tocData.tocLayer,
    geometryType: state.tocData.geometryType,
    featuresGeometry: state.tocData.featuresGeometry,
    total: state.tocData.total,
    filterTotal: state.tocData.filterTotal,
    OIDName: state.tocData.OBJECTID,
    updatedAt: state.tocData.updatedAt,
    loading: state.tocData.loading,
    selectedFeatures: state.tocData.selectedFeatures,
    isAllFeaturesSelected: state.tocData.isAllFeaturesSelected,
    translation: state.translation.translation,
    direction: state.translation.direction,
    links: state.links.links,
  })
)(TOCTable);