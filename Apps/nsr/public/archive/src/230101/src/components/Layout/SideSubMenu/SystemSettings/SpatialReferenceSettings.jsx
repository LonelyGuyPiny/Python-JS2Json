import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Accordion, Icon
} from 'semantic-ui-react'
import { Block } from '../../..';
import spatialReference from '../../../../config/spatialRef';
import { setSpatialReference } from '../../../../redux/modules/systemSettings';


class SpatialReferenceSettings extends Component {
  state = { activeIndex: 0 }
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
    // spatialReference.push({
    //   proj: 'EPSG:3857' ,
    //   dec_digits: 1,
    //   title_HE: '3857',
    //   title_EN: '3857'
    // });
  }
  handleChange = (value) => {
    const { dispatch } = this.props;
    this.setState({
      selectedProjection: value,
    })
    dispatch(setSpatialReference(value));
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { translation, selectedSpatialReference, lang } = this.props;
    const { activeIndex } = this.state;
    return (
      <Block className="fieldsBlock acc">
        <Accordion styled>
          <Block>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
              {/* {element.title.eng} */}
              {translation.spatialReference}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0} className="">
              <Block className="">
                {spatialReference && spatialReference.length > 0 &&
                  spatialReference.map((s, i) => (
                    <Block key={`${s.proj}-${i}`} className="ui radio checkbox d-block">
                      <input type="radio" checked={s.proj === selectedSpatialReference} onChange={() => this.handleChange(s.proj)} />
                      <label>{s[`title_${lang}`]}</label>
                    </Block>
                  ))
                }
              </Block>
            </Accordion.Content>
          </Block>
        </Accordion>       
      </Block>
    )
  }
}

export default connect(
  state => ({
    map: state.map.map,
    lang: state.translation.language,
    selectedSpatialReference: state.settings.selectedSpatialReference,
    translation: state.translation.translation
  })
)(SpatialReferenceSettings);