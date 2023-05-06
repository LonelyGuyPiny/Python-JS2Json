import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { Button, Form, Segment, Container, Header, Message, Input } from 'semantic-ui-react';

import './Login.css';
import { loginAll, load } from '../../redux/modules/auth';
import { settings, languageMenu } from '../../config/settings';
import {
  TextBox
} from '../../formInputs';
import { Block, Svg, Language, PreLoader } from '../../components';
import logo from '../../assets/images/logo-new.png';
// import logomain from '../../assets/images/mainlogo.png';
// import links from '../../config/linksSupport';
import supportConfig from '../../config/support';
import { setDirToHtml } from '../../utils/common';
import { changeLanguage } from '../../redux/modules/translation';
import configTranslation from '../../config/translation'
import appHeader from '../../config/appHeader';

/**
 * Component
 * @name Login
 * @description
 * This is the login component of the application. 
 * On application startup, this component is loaded
 */
class Login extends PureComponent {
  urlQuery = '';
  state = {
    isPassword: false,
    showLoader: true
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(load());
    this.urlQuery = sessionStorage.getItem("urlQuery");
    setTimeout(() => {
      this.setState({ showLoader: false })
    }, 1000);
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (this.props.language !== nextProps.language) {
      this.props.dispatch(reset('login'));
      //   window.location.reload();
    }
  }

  handleSubmit = async (formData) => {
    const { username, password } = formData;
    const { dispatch } = this.props;
    await dispatch(loginAll(username, password));
    if (this.props.me && this.urlQuery) {
      this.returnToDashboard();
    }
  }

  usernameRequired = value => value && value.trim() ? undefined : this.props.translation.usernameRequired
  passwordRequired = value => value && value.trim() ? undefined : this.props.translation.passwordRequired

  returnToDashboard = () => {
    this.props.history.push(`/${this.urlQuery}`);
    sessionStorage.removeItem("urlQuery");
  }

  changeLang = (e, value) => {
    let lang = ''
    if (value === 'English') {
      lang = 'EN';
    } else {
      lang = 'HE';
    }
    const { language, dispatch } = this.props;
    if (lang !== language) {
      setDirToHtml(lang);
      dispatch(changeLanguage(lang));
    }
  }

  togglePassword = () => {
    this.setState(({ isPassword }) => ({ isPassword: !isPassword }))
  }

  render() {
    const { translation, handleSubmit, loginError, loading, me, location, language } = this.props;
    const { isPassword, showLoader } = this.state;
    const transL = configTranslation[language];
    let isImage = false;
    let imageName = '';
    let appHeaderText = '';
    let appHeaderBackground = false;
    var imagePath;
    if (appHeader.length > 0) {
      imageName = appHeader[0].appLogo;
      imagePath = imageName;
      appHeaderText = appHeader[0].appHeaderText[language];
      appHeaderBackground = appHeader[0].whiteBackground;
      if (imageName) {
        var image = new Image();
        try {
          imagePath = require('../../config/images/' + imageName);
        } catch (err) {
          imagePath = '';
        }
        image.src = imagePath;
        if (image.width === 0) {
          isImage = false;
        } else {
          isImage = true
        }
      }
    }

    if ((me && !this.urlQuery) || !settings.login) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location }
          }}
        />
      );
    }

    const langVal = Object.values(languageMenu).filter(lf => lf === true);

    return (
      <Container className="login-container">
        {showLoader &&
          <PreLoader />
        }
        <Language />
        <Block className="loginimg">
          {langVal.length > 1 && <Block className="lang-login">
            <Block className="ui small basic buttons lang-login-button">
              <Button onClick={e => this.changeLang(e, 'English')} className={`icon${language === 'EN' ? ' active' : ''}`}>English</Button>
              <Button onClick={e => this.changeLang(e, 'Hebrew')} className={`icon${language === 'HE' ? ' active' : ''}`}>עברית</Button>
            </Block>
          </Block>
          }
          <Block className="d-flex align-item-center justify-space-between">
            <Block>
            <Block className={`${appHeaderBackground ? 'bg-white-logo' : ''} ${appHeaderText === '' ? 'without-text' : ''}`}>
                {/* <Svg name="logo"/> */}
                {isImage && <Block className="logo-block">
                  <img className="logo-main-size-login" alt="" src={require(`../../config/images/${imageName}`)} />
                </Block>}                
              </Block>
            </Block>
            <Block>
              <img alt="" src={logo} />
            </Block>

          </Block>
          <h1 className="font-regular">{transL.welcometoup}</h1>
          <p>{transL.welcomebottomtext}</p>
          <Svg className="login-img" name="login" />
          <Block className="link-fixedlogin">
            {supportConfig.useful_links.filter(l => l.language === language).map(link => (<a key={link.text} href={link.url}
              // eslint-disable-next-line
              target="_blank"
              // rel="noopener noreferrer"
              className="btn red link-buttonlogin">{link.text}</a>))}
          </Block>
        </Block>
        <Block className="loginright">
          <Block className="loginFormCenter">
            <Svg className="pin" name="pin" />
            <Block className="inner-container">
              <Segment className="form-wrapper">
                <Block className="mobile-logo"><img alt="" src={logo} /></Block>
                <Header textAlign="left" className="text-dark">{translation.login}</Header>
                <p className="left font-regular">{translation.loginPageTitle}</p>
                <Form className="loginform" onSubmit={handleSubmit(this.handleSubmit)}>
                  <Form.Field className='email-field'>
                    <Field
                      name="username"
                      component={TextBox}
                      label={translation.username}
                      placeholder={translation.enterYourUsername}
                      type="text"
                      maxLength="50"
                      validate={[this.usernameRequired]}
                    />
                  </Form.Field>
                  <Form.Field className='password-field'>
                    <Field
                      name="password"
                      component={Input}
                      label={translation.password}
                      placeholder={translation.enterYourPassword}
                      type={isPassword ? "text" : "password"}
                      maxLength="50"
                      validate={[this.passwordRequired]}
                      icon={{ name: isPassword ? 'eye' : 'eye slash', circular: false, link: true, onClick: () => this.togglePassword() }}
                    />
                  </Form.Field>
                  <Button loading={loading} disabled={loading} type='submit' className="btn-blue btn-full">{translation.login}</Button>
                </Form>
                {loginError &&
                  <Message className="center" color='red'>{loginError}</Message>
                }
              </Segment>
            </Block>
          </Block>
        </Block>
      </Container>
    );
  }
}

export default connect(
  state => ({
    me: state.auth.user,
    loading: state.auth.loginBusy,
    loginError: state.auth.loginError,
    translation: state.translation.translation,
    language: state.translation.language,
    setLogin: state.auth.setLogin
  })
)(reduxForm({
  form: 'login',
  enableReinitialize: true
})(Login));
