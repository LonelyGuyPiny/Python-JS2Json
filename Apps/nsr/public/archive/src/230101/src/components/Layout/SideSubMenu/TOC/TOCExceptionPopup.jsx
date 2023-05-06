import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';
import { Block, Svg } from '../../..';
import { setOldLayer } from '../../../../redux/modules/toc';
import { setActiveMenuItem } from '../../../../redux/modules/menu';

class TOCExceptionPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  componentDidMount = () => {
    const { intersectionPopup } = this.props;
    this.setState({ open: intersectionPopup });
  }

  handleClose = () => {
    const { open } = this.state;
    const { popupIntersection } = this.props;
    this.setState({ open: !open });
    this.props.dispatch(setOldLayer());
    if (popupIntersection) {
      this.props.dispatch(setActiveMenuItem(null));
    }
  }

  render() {
    const { open } = this.state;
    const { translation } = this.props;
    return (
      <Modal size="mini" open={open} onClose={this.handleClose}>
        <Modal.Header>
          <Block className="d-flex justify-space-between">
            <Block>
              {translation.spatialintersection}
            </Block>
            <Block className="cursor-pointer" onClick={this.handleClose}>
              <Svg name="close-new" />
            </Block>
          </Block>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {/* <Block className={`directionenglish ${direction === 'RTL' ? 'basemap-hebrew' : ''}`}>
              <div dangerouslySetInnerHTML={{ __html: attribution }} />
            </Block> */}
            <Block className="d-flex justify-content-center norecord-intersect">
            {translation.nointersected}
            </Block>            
          </Modal.Description>
          <Block className="d-flex justify-content-center">
            <Button onClick={this.handleClose} className="button-primary mt-1 ">{translation.close}</Button>
          </Block>
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    popupIntersection: state.tocData.popupIntersection
  })
)(TOCExceptionPopup);