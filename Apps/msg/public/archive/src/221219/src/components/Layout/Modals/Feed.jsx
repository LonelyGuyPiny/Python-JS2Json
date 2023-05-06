import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  // Button,
  Modal
} from 'semantic-ui-react';
import { Block, Svg } from '../..'
// import configTranslation from '../../../config/translation'
import feeds from '../../../config/feed'
import moment from 'moment'
class Feed extends Component {
  render() {
    const { open, close, lang, translation } = this.props;
    // const transL = configTranslation[lang];
    return (
      <Modal id="termspopup" className="termsCondition" size="small" open={open} onClose={close}>
        <Modal.Header>

          <Block className="d-flex justify-space-between">
            <Block>
              {translation.whatsnew}
            </Block>
            <Block className="cursor-pointer" onClick={close}>
              <Svg name="close-new" />
            </Block>
          </Block>
        </Modal.Header>
        <Modal.Content className="whatsnew-section">
          {/* <p>{transL.termsAndConditionContent}</p> */}
          
            <table>
              <tbody>
              {feeds.map((f, i) => (
                <tr key={i} className="new-box-new">
                  <td>
                    <span className="yellow-dot"></span>
                  </td>
                  <td className="date-width">
                    <strong>{moment(f.date,'DD/MM/YYYY').format('DD/MM/YYYY')}</strong>
                  </td>
                  <td>
                    <div dangerouslySetInnerHTML={{ __html: f[`${lang}_text`] }} />
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    lang: state.translation.language
  })
)(Feed);