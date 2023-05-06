import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { CSVLink } from "react-csv";
// import CsvDownloader from 'react-csv-downloader';

// import { layersCsvData } from '../../../../redux/modules/layers';
import { export_MIDDLEWARE } from '../../../../middlewares/layers/layer_middleware';
import { Block, Svg } from '../../../';

/**
 * Component
 * @name LayerExportCSV
 * @description
 * This is the layer csv export. 
 * On exporting csv for arcgis, this component is loaded
 */
class LayerExportCSV extends Component {
  state = {
    open: true,
    loading: false,
    data: null
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    // let data = await this.props.dispatch(layersCsvData(this.props.layer));
    const data = await export_MIDDLEWARE('arcgis', 'csv', this.props.layer);
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
      <Modal id="CancelPopup" size="mini" className="CancelPopup CSVPopup"
        closeIcon
        open={open}
        onClose={this.props.close}
      >
        <Modal.Content>
          <Block className="warningIcon"><Svg name="excel-export" /></Block>
          <p className='csvTextTop'><strong>{translation.excelexportpopup}</strong></p>
          <p>{translation.excelexportpopupsecond}</p>
          <Block className="buttonsCol editButtons">
            {!loading &&
              <CSVLink data={csvData} filename="layer.csv" className="linkBtn">
                <Button className="btn submitbtn submit-export " onClick={this.props.close}>
                  
                  {translation.csvdownload}
                </Button>
              </CSVLink>
            }
            {loading &&
              <Button loading={loading} className="button-border lined-button">
                {translation.csvdownload}
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
}))(LayerExportCSV)