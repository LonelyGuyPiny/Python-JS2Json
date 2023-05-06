import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

import { Block, Svg } from '../../../';
import TOCClearAllFilters from './TOCClearAllFilters';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: props.total,
      filterTotal: props.filterTotal,
      page: 1,
      totalPage: Math.ceil((!props.showOnlySelectedRows && props.filterTotal !== null && props.filterTotal >= 0 ? props.filterTotal : props.total) / 100),
      offset: 0,
      limit: 100,
      open: false,
      sortingType: props.sortingType,
      showOnlySelectedRows: props.showOnlySelectedRows
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    const { filterTotal, sortingType, showOnlySelectedRows, selectedRowsTotal, total: totalRec } = props;
    if (
      filterTotal !== state.filterTotal ||
      sortingType !== state.sortingType ||
      showOnlySelectedRows !== state.showOnlySelectedRows
    ) {
      const total = showOnlySelectedRows ? selectedRowsTotal : totalRec;
      return ({
        ...state,
        total,
        filterTotal,
        sortingType,
        showOnlySelectedRows,
        page: 1,
        totalPage: Math.ceil((!showOnlySelectedRows && filterTotal !== null && filterTotal >= 0 ? filterTotal : total) / 100),
        offset: 0,
        limit: 100,
      });
    } else {
      return state;
    }
  }

  next = () => {
    const { offset, limit, page, totalPage } = this.state;
    if (page === totalPage) {
      return;
    }
    
    this.setState({
      offset: offset + limit,
      page: page + 1
    }, () => {
      this.props.onPageChange(this.state.offset, limit);
    });
  }

  previous = () => {
    const { offset, limit, page } = this.state;
    if (page === 1) {
      return;
    }

    this.setState({
      offset: offset - limit,
      page: page - 1
    }, () => {
      this.props.onPageChange(this.state.offset, limit);
    });
  }

  clearFilters = () => {
    this.setState({ open: false });
    this.props.clearFilters();
  }

  render() {
    const { total, page, totalPage, offset, limit, open } = this.state;
    const { translation, loading, filterTotal, direction, isFilter, showOnlySelectedRows } = this.props;

    return (
      <Block className="bottomfieldsselection d-flex justify-space-between if-basemap-show">
        <Block>
          <Block className="d-flex filter-total align-item-center">
            <h4 className={`${this.props.total ? '' : 'opc-2 color-primary-black'}`}><span className="txt label-green">{this.props.total}</span>  {translation.total}</h4>
            {isFilter && <h4 className="filter-text"><span className="txt label-yellow">{filterTotal}</span> {translation.filtered}</h4>}
            {isFilter &&
              <Button className="btn-none pl-1" onClick={() => this.setState({ open: true, size: 'large'})} data-tooltip={translation.clearAllFilters} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}>
                <Svg name="trashred" />
              </Button>
            }
          </Block>
        </Block>
        <Block className="d-flex align-item-center">
          {totalPage === 0 ?
           (<p className="mb-0 mr-2 font-weight-medium color-primary-black"></p> ) :
           (<>{direction === 'RTL' ? (
            <p className="mb-0 mr-2 font-weight-medium color-primary-black">{((!showOnlySelectedRows && filterTotal !== null && filterTotal >= 0 ? filterTotal : total) - (offset + limit)) + limit < limit ? (!showOnlySelectedRows && filterTotal !== null && filterTotal >= 0 ? filterTotal : total) : offset + limit}-{offset + 1}</p>
          ) : (
            <p className="mb-0 mr-2 font-weight-medium color-primary-black">{offset + 1}-{((!showOnlySelectedRows && filterTotal !== null && filterTotal >= 0 ? filterTotal : total) - (offset + limit)) + limit < limit ? (!showOnlySelectedRows && filterTotal !== null && filterTotal >= 0 ? filterTotal : total) : offset + limit}</p>
          )}</>)
          }
          
          <Block className="direction-arrow">
            <Button
              disabled={page === 1 || loading}
              icon
              onClick={this.previous}
              className="pagination-button "
            >

              <Icon name='left arrow' />
            </Button>
            <Button
              disabled={page === totalPage || loading || totalPage === 0}
              icon
              // labelPosition='right'
              onClick={this.next}
              className="pagination-button"
            >

              <Icon name='right arrow' />
            </Button>
          </Block>
        </Block>
        {open &&
          <TOCClearAllFilters
            clearFilters={this.clearFilters}
            close={() => this.setState({ open: false })}
          />
        }
      </Block>
    );
  }
}