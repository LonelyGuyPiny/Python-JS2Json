import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Block } from '../../..';
import { setDirToHtml } from '../../../../utils/common';
import { changeLanguage } from '../../../../redux/modules/translation';
import { Accordion, Icon } from 'semantic-ui-react';
import { languageMenu } from '../../../../config/settings'

class LanguageSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
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

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const {
       language, translation
    } = this.props;
    const { activeIndex } = this.state;
    const langVal = Object.values(languageMenu).filter(lf => lf === true);
    return (
      <Block className="fieldsBlock acc">
        {langVal.length > 1 && <Accordion styled>
          <Block>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
              {translation.languagesetting}              
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0} className="">
              <Block className="">
                <Block className="ui radio checkbox d-block" onClick={e => this.changeLang(e, 'English')}>
                  <input type="radio" name="radio1" defaultChecked={language === 'EN'} />
                  <label>English</label>
                </Block>
                <Block className="ui radio checkbox" onClick={e => this.changeLang(e, 'Hebrew')}>
                  <input type="radio" name="radio1"  defaultChecked={language === 'HE'}/>
                  <label>עברית</label>
                </Block>
              </Block>
            </Accordion.Content>
          </Block>
        </Accordion>}
      </Block>
    )
  }
}

export default connect(
  state => ({
    // map: state.map.map,
    translation: state.translation.translation,
    language: state.translation.language
  })
)(LanguageSettings);