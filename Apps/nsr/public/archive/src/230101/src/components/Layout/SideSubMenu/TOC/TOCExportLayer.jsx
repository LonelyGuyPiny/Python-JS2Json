import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { CSVLink } from "react-csv";
// import CsvDownloader from 'react-csv-downloader';

import { fetchExportRecords } from '../../../../redux/modules/toc';
import { Block, Svg } from '../../../';

class TOCExportLayer extends Component {
  state = {
    open: true,
    loading: false,
    data: null
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    let data = [];
    if (this.props.isAllSlected) {
      data = await this.props.dispatch(fetchExportRecords());
    } else {
      const { fields } = this.props;
      data = this.props.selectedRows.map(feature => {
        const obj = {};
        fields.forEach(f => {
          obj[f.alias] = feature.attributes[f.name]
        })
        return obj;
      });
    }
    this.setState({ loading: false, data })
  }

  setOpen = (open) => {
    this.setState({
      open
    })
  }

  render() {
    const { open, data, loading } = this.state;
    const { translation } = this.props;

    let csvData = [];
    if (data && data.length > 0) {
      csvData = data;
    }

    return (
      <Modal id="CancelPopup"
        className="CancelPopup"
        closeIcon
        open={open}
        onClose={this.props.close}
      >
        {/* <Modal.Header>{translation.confirm}</Modal.Header> */}
        <Modal.Content>
          <Block className="warningIcon"><Svg name="excel-export" /></Block>
          <p><strong>{translation.excelexportpopup}</strong></p>
          <p>{translation.excelexportpopupsecond}</p>
          {/* <Checkbox onChange={this.handleDontShowAgain} label={translation.dontShowAgain} /> */}
          <Block className="buttonsCol editButtons">
            {/* <Button onClick={this.deleteAllFeature} className="btn submitbtn">{translation.submit}</Button> */}
            {!loading &&
              // <CsvDownloader text="Download" datas={csvData} filename='layer.csv' bom={false} columns={csvColumns}>
              <CSVLink data={csvData} filename="layer.csv" className="linkbuttonexport">
                <Button className="btn submitbtn submit-export" onClick={this.props.close}>
                  {/* <Svg name="tocforward" /> &nbsp; */}
                  {translation.excel}
                </Button>
              </CSVLink>
              // </CsvDownloader>
            }
            {loading &&
              <Button loading={loading} className="button-border lined-button">
                {translation.excel}
              </Button>
            }
            <Button onClick={this.props.close} className="btn eraserbtn">{translation.cancel}</Button>
          </Block>
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(state => ({
  translation: state.translation.translation,
  fields: state.tocData.fields,
}))(TOCExportLayer)