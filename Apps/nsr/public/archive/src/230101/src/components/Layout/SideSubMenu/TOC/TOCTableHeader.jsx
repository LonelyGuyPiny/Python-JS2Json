import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Checkbox } from 'semantic-ui-react';

import { Block, Svg } from '../../../';
// import { DropDownMenu } from './';
import TOCFilter from './TOCFilter';

class TOCTableRow extends Component {
  state = {
    columnName: null
  }

  dropDownMenuFunction = (e, name) => {
    e.stopPropagation();
    this.setState(({ columnName }) => ({
      columnName: columnName === name ? null : name
    }));
  }

  // hanldeFilter = (value) => {
  //   // alert("value "+value)
  //   const { filterCleared } = this.props
  //   filterCleared(value)
  // }

  render() {
    const {
      visibleFields,
      fields,
      handleSorting,
      selectAllCheckboxes,
      loading,
      sorting,
      isAllSlected,
      showOnlySelectedRows,
      isCurrentLinks,
      filterLoader
    } = this.props;

    if (!fields || (fields && fields.length === 0)) {
      return null;
    }
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell collapsing>
            <Block className="table-head-text app-checkbox">
              <Checkbox
                className="checkbox"
                onChange={(e, { checked }) => selectAllCheckboxes(checked)}
                checked={isAllSlected}
                disabled={showOnlySelectedRows}
              />
            </Block>
          </Table.HeaderCell>
          {
            visibleFields.map((field, index) => {
              const element = fields.find(h => h.name === field) || {};
              // console.log('element', element);
              return (
                <Table.HeaderCell key={index}
                // sorted={column === 'age' ? direction : null}
                >
                  <Block className="table-head-text app-checkbox">
                    {!element.domainValues &&
                      <Block className="w-20 cursor-pointer" onClick={() => handleSorting(element.name)}>
                        <Svg
                          name={sorting && sorting.fieldName === element.name ? (sorting.type === 'ASC' ? 'sorttoc' : 'sortdesc') : 'sorttocdefault'}
                          className="sorttoc icon-sort cursor-pointer"
                        />
                      </Block>
                    }
                    {visibleFields.length > 6 || (element && element.alias && element.alias.length > 12) ? (
                      <Block id={element.name} className="head-text" data-tooltip={element.alias} data-position="bottom center">
                        {element && element.alias && element.alias.length > 12 ? (<React.Fragment>{element.alias.substr(0, 9)} <Svg name="text-tooltip" /> </React.Fragment>) : element ? element.alias : ''}
                      </Block>
                    ) : (
                      <Block id={element ? element.name : ''} className="head-text">
                        <span id={`${element ? element.name : ''}-text`}>{element ? element.alias : ''}</span>
                      </Block>
                    )}
                    <Block
                      className="w-20 cursor-pointer"
                      onClick={(e) => this.dropDownMenuFunction(e, element.name)}
                    >
                      {!loading && <TOCFilter domainValues={element.domainValues} name={element.name} alias={element.alias} type={element.type} 
                      // filtered={this.hanldeFilter}
                        filterLoading={filterLoader.includes(element.name)}
                      />}
                    </Block>
                  </Block>
                </Table.HeaderCell>
              )
            })
          }
          {isCurrentLinks &&
            <Table.HeaderCell>
            </Table.HeaderCell>
          }
        </Table.Row>
      </Table.Header>
    )
  }
}

export default connect(
  state => ({
    visibleFields: state.tocData.visibleFields,
    fields: state.tocData.fields,
    selectedTableData: state.tocData.selectedTableData,
    filterState: state.tocData.filterState,
    loading: state.tocData.loading,
    sorting: state.tocData.sorting,
    filterLoader: state.tocData.filterLoader
  })
)(TOCTableRow);

// const Column = ({ element }) => {
//   useEffect(() => {

//   })
//   return (
//     <Block id={element.name} className="head-text">
//       <Block id={element.name} className="head-text-col">{[1,2,3,4,5,6].map(e => (element ? element.alias : ''))}</Block>
//       <span id={`${element.name}-text`}>{[1,2,3,4,5,6].map(e => (element ? element.alias : ''))}</span>
//     </Block>
//   );
// }