import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react'
import { Block, Svg } from '../..'
class Attribution extends Component {
  render() {
    const { open, attribution, close,
      direction,
      translation } = this.props;
    return (
      <Modal size="small" open={open} onClose={close}>
        <Modal.Header>            
          <Block className="d-flex justify-space-between">
            <Block>
              {translation.attribution}
            </Block>
            <Block className="cursor-pointer" onClick={close}>
              <Svg name="close-new" />
            </Block>
          </Block>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Block className={`directionenglish ${direction === 'RTL' ? 'basemap-hebrew' : ''}`}>
            <div dangerouslySetInnerHTML={{ __html: attribution }} />
            </Block>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(
  state => ({
  })
)(Attribution);