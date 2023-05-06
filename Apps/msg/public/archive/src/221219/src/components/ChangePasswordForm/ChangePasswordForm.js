import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { reduxFormValidator } from 'valirator';
import { Row, Col } from 'react-bootstrap';

import { Block, Button } from './../../components';


import TextBox from '../../formInputs/TextBox';
import { changePassword } from '../../redux/modules/auth';

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'password',
      typeNew: 'password',
      typeCon: 'password'

    };
  }
  handleChangePassword = (formData) => {
    const { dispatch } = this.props;
    const { oldpassword, password, confirmpassword } = formData;
    dispatch(changePassword(oldpassword, password, confirmpassword));
  }


  showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    });
  }


  showNewHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      typeNew: this.state.typeNew === 'input' ? 'password' : 'input'
    });
  }


  showConHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      typeCon: this.state.typeCon === 'input' ? 'password' : 'input'
    });
  }

  render() {
    const { handleSubmit, changePwd, translation } = this.props;
    return (
      <div className="app-content">
        <Row>
          <Col sm={12} md={12}>
            <Block className="tile fund-list-area">
              <Block className="tile-header-part d-flex justify-content-between align-items-center mb-4">
                <h3 className="tile-title">{translation.ChangePassword}</h3>
              </Block>
              <Row>
                <Col sm={12} md={6} className="col-lg-4">
                  <form className="" onSubmit={handleSubmit(this.handleChangePassword)}>
                    <Block className="position-relative">
                      <Field
                        name="oldpassword"
                        component={TextBox}
                        label={translation.OldPassword}
                        placeholder="Old Password"
                        type={this.state.type}
                      />
                      <span className="eye_ic" onClick={this.showHide}> {this.state.type === 'input' ? <i className="material-icons">remove_red_eye</i> : <i className="material-icons">visibility_off</i>}</span>
                    </Block>

                    <Block className="position-relative">
                      <Field
                        name="password"
                        component={TextBox}
                        label="New Password: "
                        placeholder="New Password"
                        type={this.state.typeNew}
                      />
                      <span className="eye_ic" onClick={this.showNewHide}> {this.state.typeNew === 'input' ? <i className="material-icons">remove_red_eye</i> : <i className="material-icons">visibility_off</i>}</span>
                    </Block>

                    <Block className="position-relative">
                      <Field
                        name="confirmpassword"
                        component={TextBox}
                        label={translation.ConfirmPassword}
                        placeholder="Confirm Password"
                        type={this.state.typeCon}
                      />
                      <span className="eye_ic" onClick={this.showConHide}> {this.state.typeCon === 'input' ? <i className="material-icons">remove_red_eye</i> : <i className="material-icons">visibility_off</i>}</span>
                    </Block>
                    <div className="form-group btn-container d-flex justify-content-start">
                      <Button type="submit" className="btn btn-primary btn-block submit-btn">{translation.Update}</Button>
                    </div>
                    {changePwd &&
                      <div className="alert alert-primary mt-3 text-align">{changePwd}</div>
                    }
                  </form>
                </Col>

              </Row>
            </Block>
          </Col>
        </Row>
      </div>

    );
  }
}

ChangePasswordForm.propTypes = {
  dispatch: PropTypes.func,
  handleSubmit: PropTypes.func,
  translation: PropTypes.any.isRequired,
  changePwd: PropTypes.string
};

ChangePasswordForm.defaultProps = {
  dispatch: null,
  handleSubmit: null,
  location: {},
  changePwd: undefined
};

export default connect(
  state => ({
    changePwd: state.auth.changePassword,
    changePasswordError: state.auth.changePasswordError,
    translation: state.translation.keys
  })
)(reduxForm({
  form: 'changepasswordform',
  enableReinitialize: true,
  validate: reduxFormValidator({
    oldpassword: {
      required: true,
    },
    password: {
      required: true,
      minLength: 6,
    },
    confirmpassword: {
      rules: {
        required: true,
        matchToProperty: 'password',
        minLength: 6,
      }
    },
  }),
})(ChangePasswordForm));
