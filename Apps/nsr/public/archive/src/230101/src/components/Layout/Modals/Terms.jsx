import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { Block, Svg } from '../..'
import configTranslation from '../../../config/translation'

class Terms extends Component {
  render() {
    const { open, close, lang, translation } = this.props;
    const transL = configTranslation[lang];
    return (
      <Modal id="termspopup" className="termsCondition" size="small" open={open} onClose={close}>
        <Modal.Header>

          <Block className="d-flex justify-space-between">
            <Block className="popup-heading">
              {translation.termsAndCondition}
            </Block>
            <Block className="cursor-pointer" onClick={close}>
              <Svg name="close-new" />
            </Block>
          </Block>
        </Modal.Header>
        <Modal.Content>
          <p>{transL.termsAndConditionContent}</p>
          <Button onClick={close} className="button-primary">{translation.close}</Button>
        </Modal.Content>
        {/* <Modal.Actions>
            <Button negative>No</Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Yes'
            />
          </Modal.Actions> */}
      </Modal>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    lang: state.translation.language
  })
)(Terms);