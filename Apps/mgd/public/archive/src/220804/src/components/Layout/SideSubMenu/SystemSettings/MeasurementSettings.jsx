import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Icon } from 'semantic-ui-react';

import { Block } from '../../..';
import { distanceForImperial, distanceForMetric, areaForImperial, areaForMetric } from '../../../../constants';
import { saveMesasurement } from '../../../../redux/modules/systemSettings';
import { updateMeasurementsOnUnitChange } from '../../../../redux/modules/drawing';

class MeasurementSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imperial: true,
      distance: distanceForImperial,
      area: areaForImperial,
      selUnitType: this.props.selectedUnitType,
      selDistanceUnit: this.props.selectedDistanceUnit,
      selAreaUnit: this.props.selectedAreaUnit,
      loading: false,
      activeIndex: 0
    }
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex });
  }
  componentDidMount() {
    const { selectedAreaUnit, selectedDistanceUnit, selectedUnitType } = this.props;
    if (selectedUnitType === 'imperial') {
      this.setState({
        distance: distanceForImperial,
        area: areaForImperial
      })
    }
    else {
      this.setState({
        distance: distanceForMetric,
        area: areaForMetric
      })
    }
    this.setState({
      imperial: selectedUnitType === 'imperial' ? true : false,
      selDistanceUnit: selectedDistanceUnit,
      selAreaUnit: selectedAreaUnit
    })
  }

  toggleMeasurement = () => {
    this.setState(({ imperial }) => ({
      imperial: !imperial
    }), () => {
      if (this.state.imperial) {
        this.setState({
          distance: distanceForImperial,
          area: areaForImperial,
          selUnitType: 'imperial'
        })
      } else {
        this.setState({
          distance: distanceForMetric,
          area: areaForMetric,
          selUnitType: 'metric'
        })
      }
    });
  }

  saveMeasurementSettings = async (value) => {
    const { dispatch } = this.props;
    await dispatch(saveMesasurement('', '', value));
    dispatch(updateMeasurementsOnUnitChange());
  }

  distanceUnitChange = (e, { value }) => {
    this.setState({
      selDistanceUnit: value
    })
  }

  areaUnitChange = (e, { value }) => {
    this.setState({
      selAreaUnit: value
    })
  }

  render() {
    const { translation } = this.props;
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
              {translation.units}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0} className="">
              <Block className="">
                <Block className="ui radio checkbox" onClick={e => this.saveMeasurementSettings('metric')}>
                  <input type="radio" name="radio" defaultChecked ={this.props.selectedUnitType === 'metric' ? true : false} />
                  <label>{translation.metric}</label>
                </Block>
                <Block className="ui radio checkbox d-block" onClick={e => this.saveMeasurementSettings('imperial')}>
                  <input type="radio" name="radio" defaultChecked ={this.props.selectedUnitType === 'imperial' ? true : false}  />
                  <label>{translation.imperial}</label>
                </Block>
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
    translation: state.translation.translation,
    selectedAreaUnit: state.settings.selectedAreaUnit,
    selectedDistanceUnit: state.settings.selectedDistanceUnit,
    selectedUnitType: state.settings.selectedUnitType
  })
)(MeasurementSettings);