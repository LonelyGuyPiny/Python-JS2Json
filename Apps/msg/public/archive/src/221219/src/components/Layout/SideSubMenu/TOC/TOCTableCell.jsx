import React, { Component } from 'react';
import { Table, Popup, Button } from 'semantic-ui-react';

import { Svg } from '../../../';
import { isFloat, ismatch, dateFunction } from '../../../../utils/common';
import conditionModule from '../../../../config/conditions';

export default class TOCTableCell extends Component {
  render() {
    let { cellData, fieldName, fields } = this.props;
    const fieldData = fields.find(f => f.name === fieldName);
    let jsx = isFloat(cellData) ? cellData.toFixed(2) : cellData;

    if (fieldData && fieldData.domainValues) {
      cellData = fieldData.domainValues[cellData];
      // cellData = 'domian field'
    }

    if (typeof cellData === 'string' || cellData instanceof String) {
      if (ismatch(cellData, conditionModule[0].linkConditions)) {
        jsx = <a className="ui button button-link-rounded" href={cellData} target="_blank" rel="noopener noreferrer"><Svg className="linkicon" name="linkicon" /></a>
      } else if (fieldData && fieldData.type !== 'esriFieldTypeDate') {
        if (cellData.length > 20) {
          jsx = (
            <Popup
              trigger={<Button className="btn-none">{cellData.substr(0, 19)}...</Button>}
              on="hover"
              style={{zIndex: 9999}}
            >
              {<div dangerouslySetInnerHTML={{ __html: cellData.replace(/\n/g, '<br/><br/>') }} />}
            </Popup>
          )
        } else {
          jsx = <div dangerouslySetInnerHTML={{ __html: cellData.replace(/\n/g, '<br/><br/>') }} />
        }
      }
    }
    // const isvalid = (new Date(cellData)).getTime() > 0;
    if (fieldData && fieldData.type === 'esriFieldTypeDate') {
      jsx = cellData ? dateFunction(cellData) : null
    }
    return (
      <Table.Cell>
        {jsx}
      </Table.Cell>
    )
  }
}