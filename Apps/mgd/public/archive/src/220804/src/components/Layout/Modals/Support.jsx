import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  // Button,
  Modal,
  // Form,
  Popup } from 'semantic-ui-react';
import {
  // Field,
  reduxForm,
  // reset
} from 'redux-form';
// import { toastr } from 'react-redux-toastr';

import { Block, Svg } from '../..'
// import { TextBox, TextArea } from '../../../formInputs';
// import { sendFeedbackEmail } from '../../../redux/modules/support';
// import { phoneRegex, emailRegex } from '../../../constants';
// import { settings } from '../../../config/settings';
// import links from '../../../config/linksSupport';
import supportConfig from '../../../config/support'

/**
 * Component
 * @name Support
 * @description
 * This is the support component of the application. 
 * On application startup, this component is loaded
 */
class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitCondition: false
    };
  }

  // handleSubmit = async (formData) => {
  //   const { dispatch, close, translation } = this.props;
  //   formData['receivingEmail'] = settings.email;
  //   this.setState({
  //     submitCondition: true
  //   })
  //   const result = await dispatch(sendFeedbackEmail(formData));
  //   if (result) {
  //     this.setState({
  //       submitCondition: false
  //     })
  //     toastr.success(translation.success, translation.feedbacksubmit);
  //     close();
  //     dispatch(reset('support'));
  //   }else{
  //     this.setState({
  //       submitCondition: false
  //     })
  //     toastr.success(translation.failure, translation.feedbacknotsubmit);
  //     close();
  //   }
   
  // }

  // firstnameRequired = value => value && value.trim() ? undefined : this.props.translation.firstnameRequired
  // lastnameRequired = value => value && value.trim() ? undefined : this.props.translation.lastnameRequired
  // subjectRequired = value => value && value.trim() ? undefined : this.props.translation.titlenameRequired
  // messageRequired = value => value && value.trim() ? undefined : this.props.translation.messagenameRequired
  // emailRequired = value => value && value.trim() && emailRegex.test(value) ? undefined : this.props.translation.emailRequired
  // phoneRequired = value => value && value.trim() && value.match(phoneRegex) ? undefined : this.props.translation.phoneRequired

  render() {
    const {
      translation,
      // handleSubmit,
      open,
      close,
      language
    } = this.props;
    return (
      <Modal id="feedback" className="feedback supportPopup" size="mini" open={open} onClose={close}>
        <Modal.Header>
          <Block className="d-flex justify-content-end">
            {/* <Block className="popup-heading">
              {translation.contactUs}
            </Block> */}
            <Block className="cursor-pointer" onClick={close}>
              <Svg name="close-new" />
            </Block>
          </Block>
        </Modal.Header>
        <Modal.Content>
          {/* <Form onSubmit={handleSubmit(this.handleSubmit)}>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>{translation.firstName}</label>
                <Field
                  name="firstName"
                  component={TextBox}
                  className="abc"
                  validate={[this.firstnameRequired]}
                />
              </Form.Field>
              <Form.Field>
                <label>{translation.lastName}</label>
                <Field
                  name="lastName"
                  component={TextBox}
                  validate={[this.lastnameRequired]}
                />
              </Form.Field>
              <Form.Field>
                <label>{translation.email}</label>
                <Field
                  name="email"
                  component={TextBox}
                  validate={[this.emailRequired]}
                />
              </Form.Field>
              <Form.Field>
                <label>{translation.phone}</label>
                <Field
                  name="phone"
                  component={TextBox}
                  validate={[this.phoneRequired]}
                />
              </Form.Field>
              <Form.Field className="fullwidth">
                <label>{translation.messageTitle}</label>
                <Field
                  name="messageTitle"
                  component={TextBox}
                  validate={[this.subjectRequired]}
                />
              </Form.Field>
              <Form.Field className="fullwidth">
                <label>{translation.messageDetails}</label>
                <Field
                  name="messageDetails"
                  component={TextArea}
                  validate={[this.messageRequired]}
                />
              </Form.Field>
              <Button type='submit' className={`${this.state.submitCondition ? 'submit blue loading' : 'submit blue' }`}>{translation.submit}</Button>
            </Form.Group>
          </Form> */}

          <Block className="top-main-header">
            <Block className="border-botton-base">
              {/* <Svg name="logo"/> */}
              <h3 className="subtitle">
                {translation.contactUs}
              </h3>
              <Block className="logo-block contactUs d-flex align-item-center justify-content-center">
                {supportConfig.support_items.map((sItem, ind) => {
                  const imageSource = sItem.icon_path.includes('http') ? sItem.icon_path : require(`../../../assets/images/${sItem.icon_path}`);
                  return (
                    <Popup
                      key={ind}
                      className='SupportTooltipPopup'
                      trigger={<a href={sItem.url} target='_blank' rel='noopener noreferrer'><img className="size-default" alt="" src={imageSource} /></a>}
                      content={sItem[`${language}_tooltip`]}
                      position='top center'
                      inverted
                    />
                  )
                })}
                {/* <Popup
                  className='SupportTooltipPopup'
                  trigger={<a href="#"><img className="size-default" alt="" src={facebook} /></a>}
                  content='Facebook'
                  position='top center'
                  inverted
                />
                <Popup
                  className='SupportTooltipPopup'
                  trigger={<a href="#"><img className="size-default" alt="" src={twitter} /></a>}
                  content='Twitter'
                  position='top center'
                  inverted
                />
                <Popup
                  className='SupportTooltipPopup'
                  trigger={<a href="#"><img className="size-default" alt="" src={whattsapp} /></a>}
                  content='Whattsapp'
                  position='top center'
                  inverted
                />
                <Popup
                  className='SupportTooltipPopup'
                  trigger={<a href="#"><img className="size-default" alt="" src={phone} /></a>}
                  content='Phone'
                  position='top center'
                  inverted
                />
                <Popup
                  className='SupportTooltipPopup'
                  trigger={<a href="#"><img className="size-default" alt="" src={email} /></a>}
                  content='Email'
                  position='top center'
                  inverted
                /> */}
                {/* <a href="#"><img className="size-default" alt="" src={facebook} /></a>
                <a href="#"><img className="size-default" alt="" src={twitter} /></a>
                <a href="#"><img className="size-default" alt="" src={whattsapp} /></a>
                <a href="#"><img className="size-default" alt="" src={phone} /></a>
                <a href="#"><img className="size-default" alt="" src={email} /></a> */}
              </Block>
            </Block>
          </Block>

          <Block className="useful-links-block">
            <h3 className="subtitle">{translation.supportToolS}</h3>
            <Block className="logo-block support d-flex align-item-center justify-content-center">
              {supportConfig.support_tools.map((sTool, tInd) => {
                const imageSource = sTool.icon_path.includes('http') ? sTool.icon_path : require(`../../../assets/images/${sTool.icon_path}`);
                return (
                  <Popup
                    key={tInd}
                    className='SupportTooltipPopup'
                    trigger={<a href={sTool.url} target='_blank' rel='noopener noreferrer'><img className="size-default" alt="" src={imageSource} /></a>}
                    content={sTool[`${language}_tooltip`]}
                    position='top center'
                    inverted
                  />
                )
              })}
              {/* <Popup
                className='SupportTooltipPopup'
                trigger={<a href="#"><img className="size-default" alt="" src={teamviewer} /></a>}
                content='Teamviewer'
                position='top center'
                inverted
              />
              <Popup
                className='SupportTooltipPopup'
                trigger={<a href="#"><img className="size-default" alt="" src={anydesk} /></a>}
                content='Anydesk'
                position='top center'
                inverted
              /> */}
            </Block>
          </Block>
          <Block className="supportTool-block">
            <h3 className="subtitle">{translation.usefulLinks}</h3>
            {/* <p>{translation.supportToolDescription}:</p>
            <p>{translation.anydesk} - <a href="https://anydesk.com/"
            // eslint-disable-next-line
            target="_blank"
            // rel="noopener noreferrer"
            >https://anydesk.com/</a></p>
            <p>{translation.teamViewer}- <a href="https://www.teamviewer.com/"
            // eslint-disable-next-line
            target="_blank"
            // rel="noopener noreferrer"
            >https://www.teamviewer.com/</a></p> */}
          </Block>
          <Block className="link-fixedlogin">
            {supportConfig.useful_links.filter(l => l.language === language).map(link => (<a key={link.text} href={link.url} target="_blank" rel="noopener noreferrer" className="btn red link-buttonlogin">{link.text}</a>))}
          </Block>
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    language: state.translation.language,
    map: state.map.map,
    selectedBasemap: state.basemap.selectedBasemap,
    spatialReference: state.settings.selectedSpatialReference,
    selectedUnitType: state.settings.selectedUnitType
  }))(reduxForm({
    form: 'support',
    enableReinitialize: true,
    asyncBlurFields: ['name'],
  })(BottomBar)
  )
