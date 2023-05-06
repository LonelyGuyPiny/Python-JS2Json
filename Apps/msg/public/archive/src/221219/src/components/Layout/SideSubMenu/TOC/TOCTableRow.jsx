import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Checkbox, Popup, Button } from 'semantic-ui-react';

import TOCTableCell from './TOCTableCell';
import { fillTemplate } from '../../../../utils/common';
import { Svg } from '../../../';
import UrlLink from '../../UrlLink';

class TOCTableRow extends Component {
  render() {
    const {
      rowData, selected, handleRowClick, visibleFields, onRowHover,
      onRowOut, toggleRow, fields, isAllSlected, showOnlySelectedRows,
      currentLinks
    } = this.props;
    let urls = [];
    if (currentLinks && currentLinks.length > 0) {
      const vars = {};
      Object.keys(rowData.attributes).map(v => vars[v.replaceAll('.', '_')] = rowData.attributes[v] );
      urls = currentLinks.map((l, i) => {
        const link = fillTemplate(l.url, vars);
        return ({ ...l, link });
      })
    }

    // console.log("selected", selected)
    // console.log("visibleFields", visibleFields)
    return (
      <Table.Row
        onClick={e => handleRowClick(e, rowData)}
        onMouseOver={() => onRowHover(rowData)}
        onMouseOut={() => onRowOut(rowData)}
        className={`${selected ? 'bg-red' : ''}`}
      >
        <Table.Cell>
          <Checkbox
            className="checkbox"
            checked={selected}
            onChange={(e, { checked }) => toggleRow(e, checked, rowData)}
            disabled={isAllSlected || showOnlySelectedRows}
          />
        </Table.Cell>
        {visibleFields && visibleFields.map((fieldName, indx) => (
          <TOCTableCell
            cellData={rowData.attributes[fieldName]}
            key={fieldName}
            fieldName={fieldName}
            fields={fields}
          />
        ))}
        {currentLinks && currentLinks.length > 0 &&
          <Table.Cell className="sticky-more-links-child">
            <Popup
              trigger={<Button onClick={e => e.stopPropagation()} className="button-link"><Svg name="linkicon" /></Button>}
              on='click'
              className='popup-zindex'
              position="left center"
            >
              <Popup.Content>
                <ul>
                  {urls.map((l, i) => (
                    <UrlLink
                      key={i}
                      link={l.link}
                      type={l.type}
                      text={l.text}
                    />
                  ))}
                </ul>
              </Popup.Content>
            </Popup>
          </Table.Cell>
        }
      </Table.Row>
    )
  }
}

export default connect(
  state => ({
    visibleFields: state.tocData.visibleFields,
    fields: state.tocData.fields,
  })
)(TOCTableRow);