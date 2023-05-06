import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';

class Example extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { show, children, title, close } = this.props;
    return (
      <div>
        <Modal
          show={show}
          bsSize="large"
          onHide={close}
          aria-labelledby="contained-modal-title-lg"
          className="common-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {children}
          </Modal.Body>
          {/* <Modal.Footer></Modal.Footer> */}
        </Modal>
      </div>
    );
  }
}

Example.propTypes = {
  children: PropTypes.any,
  show: PropTypes.any,
  close: PropTypes.any,
  title: PropTypes.any
};

Example.defaultProps = {
  children: null,
  show: true,
  close: null,
  title: undefined
};

export default Example;
