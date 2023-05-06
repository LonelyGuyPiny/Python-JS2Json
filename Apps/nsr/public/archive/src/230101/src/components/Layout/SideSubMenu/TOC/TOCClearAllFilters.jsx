import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';

import { Block, Svg } from '../../../';

class TOCClearAllFilters extends Component {
  render() {
    const { translation } = this.props;
    return (
      <Modal id="CancelPopup" className="CancelPopup"
        closeIcon
        open={true}
        size="mini"
        onClose={this.props.close}
      >
        {/* <Modal.Header>{translation.confirm}</Modal.Header> */}
        <Modal.Content>
          <Block className="warningIcon"><Svg name="delete-info" /></Block>
          <p><strong>{translation.confirmDeleteheading}</strong></p>
          <p>{translation.confirmDeletefilter}</p>
          <Block className="buttonsCol editButtons">
            <Button onClick={this.props.clearFilters} className="btn submitbtn">{translation.submit}</Button>
            <Button onClick={this.props.close} className="btn eraserbtn">{translation.cancel}</Button>
          </Block>
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(state => ({
  translation: state.translation.translation
}))(TOCClearAllFilters)