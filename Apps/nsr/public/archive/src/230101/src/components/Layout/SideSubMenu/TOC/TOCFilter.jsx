import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import DatePicker from 'react-date-picker';
import {
  Dropdown, Select, Input, Button, Popup
} from 'semantic-ui-react';

import { Block, Svg } from '../../../';
import { Loader } from 'semantic-ui-react'
import {
  filterFeatures,
  // setCompareType
} from '../../../../redux/modules/toc';
import {
  sortObjArr
} from '../../../../utils/common';

class DropDownMenu extends Component {
  constructor(props) {
    super(props);
    const { filtersData, name, type } = props;
    let min = type === 'esriFieldTypeDate' ? new Date() : undefined;
    let max = type === 'esriFieldTypeDate' ? new Date() : undefined;
    let value = type === 'esriFieldTypeDate' ? new Date() : undefined;
    let isRange = false;
    let rangeCondition = 'showInRange';
    let condition = ['esriFieldTypeDouble', 'esriFieldTypeSingle'].includes(type) && !props.domainValues ? 'greater' : 'same';
    if (filtersData[name] && filtersData[name].isRange) {
      min = filtersData[name].value.min
      max = filtersData[name].value.max
      isRange = filtersData[name].isRange
      rangeCondition = filtersData[name].condition
    } else if (filtersData[name]) {
      value = filtersData[name].value
      condition = filtersData[name].condition
    }

    this.state = {
      isPopUp: false,
      min,
      max,
      value,
      condition,
      rangeCondition,
      isRange
    }

    this.domainValues = props.domainValues;
  }

  handleClose = () => {
    this.setState({ isPopUp: false })
  }

  // handleSelectComparisionType = (type) => {
  //   this.props.dispatch(setCompareType(type));
  // }

  handleSubmit = async (e) => {
    const {
      dispatch, name, type,
      // filtered, selectedTocData, alias, selectedLayerToc, columnHeadings, tocGeometry
    } = this.props;
    const {
      rangeCondition, min, max, value, condition, isRange
    } = this.state;

    if (!value && !isRange && type !== 'esriFieldTypeDate' && type !== 'date' && type !== 'date-time') {
      return;
    } else if (isRange && !min && !max && type !== 'esriFieldTypeDate' && type !== 'date' && type !== 'date-time') {
      return;
    }

    let filterData = {};
    if (type === 'esriFieldTypeString' || type === 'string') {
      filterData[name] = {
        field: name,
        type,
        value,
        condition,
        isRange: false
      }
      // dispatch(filterFeatures(filterData));
    } else if (['esriFieldTypeOID', 'esriFieldTypeDouble', 'esriFieldTypeSingle', 'esriFieldTypeInteger', 'esriFieldTypeSmallInteger', 'int', 'number'].includes(type)) {
      if(this.domainValues) {
        filterData[name] = {
          field: name,
          type,
          value,
          condition,
          isRange: false
        }
      } else {
        if (!isRange) {
          filterData[name] = {
            field: name,
            type,
            value: Number(value),
            condition,
            isRange
          }
        } else {
          filterData[name] = {
            field: name,
            type,
            value: {
              min: Number(min),
              max: Number(max)
            },
            condition: rangeCondition,
            isRange
          }
        }
      }
    } else if (type === 'esriFieldTypeDate' || type === 'date' || type === 'date-time') {
      // console.log("inside date filter")
      if (!isRange) {
        filterData[name] = {
          field: name,
          type,
          value: value,
          condition,
          isRange
        }
      } else {
        filterData[name] = {
          field: name,
          type,
          value: {
            min: min,
            max: max
          },
          condition: rangeCondition,
          isRange
        }
      }
    }

    filterData[name].isDomainValues = this.domainValues ? true : false;

    dispatch(filterFeatures(filterData));
    this.setState({ isPopUp: false })

    // filtered(true)
  }

  clear = () => {
    const {
      name,
      dispatch,
      // filtered
    } = this.props;
    dispatch(filterFeatures(null, name));
    this.setState({
      isPopUp: false,
      min: undefined,
      max: undefined,
      value: undefined,
      isRange: false,
    });
    // filtered(false)
  }

  setValue = (e, { value: val }) => this.setState({ value: val });

  // handleAddition = (e, { value: val }) => {
  //   console.log("value", val);
  //   this.setState({ value: val });
  // }

  renderFilterOpts = (type) => {
    if (this.domainValues || type === 'esriFieldTypeString' || type === 'string') {
      return this.renderStringFilter();
    } else if (['esriFieldTypeOID', 'esriFieldTypeDouble', 'esriFieldTypeSingle', 'esriFieldTypeInteger', 'esriFieldTypeSmallInteger', 'int', 'number'].includes(type)) {
      return this.renderNumberFilter();
    } else if (type === 'esriFieldTypeDate' || type === 'date' || type === 'date-time') {
      return this.renderDateFilter();
    }
  }

  renderStringFilter() {
    const { translation, fieldOptions, name,
      // isLoading,
      direction } = this.props;
    const { condition, value } = this.state;
    const stringValueOptions = [
      { key: 'same', value: 'same', text: translation.same },
      { key: 'differ', value: 'differ', text: translation.differ }
    ]
    let options = fieldOptions && fieldOptions[name] ? fieldOptions[name].map((v, i) => ({
      key: i,
      value: v,
      text: this.domainValues && this.domainValues[v] ? this.domainValues[v] : v
    })) : [];

    if (this.domainValues) {
      options = options.sort(sortObjArr('text'));
    }

    return (
      <Block className="tableDropdownToc">
        <Block className="d-flex align-item-center justify-space-between">
          <Block>
            <Button className="module-info-toc d-flex justify-content-end cursor-pointer btn-none" data-tooltip={translation.coloumnfilter} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}>
              <Svg name="info-module" />
            </Button>
          </Block>
          <Block className="close-pop">
            <Svg className="close-new cursor-pointer" onClick={this.handleClose} name="close-new" />
          </Block>
        </Block>
        <Block className='middleDropdownCol'>
          <Block className="select-field mt-1">
            <label>{translation.condition}</label>
            <Select
              onChange={(e, { value }) => this.setState({ condition: value })}
              value={condition}
              icon="angle down"
              options={stringValueOptions}
            />
          </Block>
          <Block className="select-field mt-1">
            <label>{translation.value}</label>
            {options.length <= 100000 && options.length !== 0 && <Dropdown
              onChange={(e, { value: val }) => this.setState({ value: val })}
              value={value}
              icon="angle down"
              options={options}
              multiple={true}
              selection
              search
              // loading={isLoading}
              // disabled={isLoading}
              // allowAdditions
              // onAddItem={this.handleAddition}
            />
            }
            {/* <Dropdown
              onChange={(e, { value: val }) => this.setState({ value: val })}
              value={value}
              icon="angle down"
              options={options}
              multiple={this.domainValues ? false : true}
              selection
              search
              loading={isLoading}
              // allowAdditions
              // onAddItem={this.handleAddition}
            /> */}
            {(options.length > 100000 || options.length === 0) && <Input onChange={(e, { value: val }) => this.setState({ value: [val] })} />}
          </Block>
          <Block className="buttonField mt-1 d-flex justify-space-between">
            <Button onClick={this.handleSubmit} className="button button-border-dark" type="button" value="Submit">
              {translation.submit} <Svg name="buttontick" />
            </Button>
            <Button onClick={this.clear} className="button button-border-red" type="button" value="Submit">
              {translation.clear} <Svg name="eraser" />
            </Button>
          </Block>
        </Block>
      </Block>
    );
  }

  renderNumberFilter() {
    const { translation, type, direction } = this.props;
    const { condition, value, isRange, min, max, rangeCondition } = this.state;
    let singleValueOptions = [
      { key: 'same', value: 'same', text: translation.same },
      { key: 'differ', value: 'differ', text: translation.differ },
      { key: 'greater than', value: 'greater', text: translation.greaterThan },
      { key: 'less than', value: 'less', text: translation.lessThan }
    ]
    if (type === 'esriFieldTypeDouble' || type === 'esriFieldTypeSingle') {
      singleValueOptions = [
        { key: 'greater than', value: 'greater', text: translation.greaterThan },
        { key: 'less than', value: 'less', text: translation.lessThan }
      ]
    }
    const rangeOptions = [
      { key: 'inRange', value: 'showInRange', text: translation.withInRange },
      { key: 'outRange', value: 'outRange', text: translation.outsideRange },
    ]

    return (
      <Block className="tableDropdownToc">
        <Block className="d-flex align-item-center justify-space-between">
          <Block>
            <Button className="module-info-toc d-flex justify-content-end cursor-pointer btn-none" data-tooltip={translation.coloumnfilter} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}>
              <Svg name="info-module" />
            </Button>
          </Block>
          <Block className="close-pop">
            <Svg className="close-new cursor-pointer" onClick={this.handleClose} name="close-new" />
          </Block>
        </Block>

        <Block className='middleDropdownCol'>
          <Block className="actionBtns toc-swap-button">
            <Button.Group>
              <Button positive={!isRange} onClick={() => this.setState({ isRange: false })}>{translation.selectValue}</Button>
              <Button.Or text={translation.or} />
              <Button positive={isRange} onClick={() => this.setState({ isRange: true })}>{translation.selectRange}</Button>
            </Button.Group>
          </Block>
          {/* <Block className="switchToggle">
            <Block className="outerBlock">
              <Block className={`handleSwitch ${isRange ? '' : 'active'}`}>
                <Button
                  onClick={() => this.setState({ isRange: false })}
                >{translation.selectValue}</Button>
              </Block>
              <Block className={`handleSwitch ${isRange ? 'active' : ''}`}>
                <Button
                  onClick={() => this.setState({ isRange: true })}
                >{translation.selectRange}</Button>
              </Block>
            </Block>
          </Block> */}
          {isRange ? (
            <Block className="inputFields mt-1">
              <Block className="rangefields">
                <Block className="select-field mt-1">
                  <label>{translation.condition}</label>
                  <Select
                    placeholder={translation.enterValue}
                    onChange={(e, { value }) => this.setState({ rangeCondition: value })}
                    defaultValue={rangeCondition}
                    icon="angle down"
                    options={rangeOptions}
                  >
                  </Select>
                </Block>
                <Block className="inputField">
                  <label>{translation.min}</label>
                  <Input onChange={(e, { value }) => this.setState({ min: value })} placeholder="" type='number' defaultValue={min} />
                </Block>
                <Block className="dateRangePicker">
                  <label>{translation.max}</label>
                  <Input onChange={(e, { value }) => this.setState({ max: value })} placeholder="" type='number' defaultValue={max} />
                </Block>
              </Block>
            </Block>
          ) : (
            <>
              <Block className="select-field mt-1">
                <label>{translation.condition}</label>
                <Select
                  onChange={(e, { value: val }) => this.setState({ condition: val })}
                  defaultValue={condition}
                  icon="angle down"
                  options={singleValueOptions}
                />
              </Block>
              <Block className="select-field mt-1">
                <label>{translation.value}</label>
                <Input
                  onChange={this.setValue}
                  placeholder=""
                  defaultValue={value}
                  type="number"
                />
              </Block>
            </>)}
          <Block className="buttonField mt-1 d-flex justify-space-between">
            <Button onClick={this.handleSubmit} className="button button-border-dark" type="button" value="Submit">
              {translation.submit} <Svg name="buttontick" />
            </Button>
            <Button onClick={this.clear} className="button button-border-red" type="button" value="Submit">
              {translation.clear} <Svg name="eraser" />
            </Button>
          </Block>
        </Block>
      </Block>
    );
  }

  renderDateFilter() {
    const { translation, direction } = this.props;
    const { condition, value, isRange, min, max, rangeCondition } = this.state;
    const singleValueOptions = [
      { key: 'same', value: 'same', text: translation.same },
      { key: 'differ', value: 'differ', text: translation.differ },
      { key: 'greater than', value: 'greater', text: translation.greaterThan },
      { key: 'less than', value: 'less', text: translation.lessThan }
    ]
    const rangeOptions = [
      { key: 'inRange', value: 'showInRange', text: translation.withInRange },
      { key: 'outRange', value: 'outRange', text: translation.outsideRange },
    ]

    return (
      <Block className="tableDropdownToc">
        <Block className="d-flex align-item-center justify-space-between">
          <Block>
            <Button className="module-info-toc d-flex justify-content-end cursor-pointer btn-none" data-tooltip={translation.coloumnfilter} data-position={`${direction === 'RTL' ? 'left' : 'right'} center`}>
              <Svg name="info-module" />
            </Button>
          </Block>
          <Block className="close-pop">
            <Svg className="close-new cursor-pointer" onClick={this.handleClose} name="close-new" />
          </Block>
        </Block>
        <Block className='middleDropdownCol'>
        <Block className="actionBtns toc-swap-button">
            <Button.Group>
              <Button positive={!isRange} onClick={() => this.setState({ isRange: false })}>{translation.selectValue}</Button>
              <Button.Or text={translation.or} />
              <Button positive={isRange} onClick={() => this.setState({ isRange: true })}>{translation.selectRange}</Button>
            </Button.Group>
          </Block>
          {/* <Block className="switchToggle">
            <Block className="outerBlock">
              <Block className={`handleSwitch ${isRange ? '' : 'active'}`}>
                <Button
                  onClick={() => this.setState({ isRange: false })}
                >{translation.selectValue}</Button>
              </Block>
              <Block className={`handleSwitch ${isRange ? 'active' : ''}`}>
                <Button
                  onClick={() => this.setState({ isRange: true })}
                >{translation.selectRange}</Button>
              </Block>
            </Block>
          </Block> */}
          {isRange ? (
            <Block className="inputFields mt-1">
              <Block className="rangefields">
                <Block className="select-field mt-1">
                  <label>{translation.condition}</label>
                  <Select
                    placeholder={translation.enterValue}
                    onChange={(e, { value }) => this.setState({ rangeCondition: value })}
                    value={rangeCondition}
                    icon="angle down"
                    options={rangeOptions}
                  >
                  </Select>
                </Block>
                <Block className="inputField select-field">
                  <label>{translation.min}</label>
                  <DatePicker
                    onChange={(val) => this.setState({ min: val })}
                    value={min || new Date()}
                    format="dd/MM/y"
                    maxDate={max}
                    locale={direction === 'RTL' ? 'he-HE' : 'en-EN'}
                  />
                </Block>
                <Block className="dateRangePicker mt-1 select-field">
                  <label>{translation.max}</label>
                  <DatePicker
                    onChange={(val) => this.setState({ max: val })}
                    value={max || new Date()}
                    format="dd/MM/y"
                    minDate={min}
                    locale={direction === 'RTL' ? 'he-HE' : 'en-EN'}
                  />
                </Block>
              </Block>
            </Block>
          ) : (
            <>
              <Block className="select-field mt-1">
                <label>{translation.condition}</label>
                <Select
                  onChange={(e, { value: val }) => this.setState({ condition: val })}
                  value={condition}
                  icon="angle down"
                  options={singleValueOptions}
                />
              </Block>
              <Block className="select-field mt-1">
                <label>{translation.value}</label>
                <DatePicker
                  onChange={(val) => this.setState({ value: val })}
                  value={value || new Date()}
                  format="dd/MM/y"
                  locale={direction === 'RTL' ? 'he-HE' : 'en-EN'}
                />
              </Block>
            </>)}
          <Block className="buttonField mt-1 d-flex justify-space-between">
            <Button onClick={this.handleSubmit} className="button button-border-dark" type="button" value="Submit">
              {translation.submit} <Svg name="buttontick" />
            </Button>
            <Button onClick={this.clear} className="button button-border-red" type="button" value="Submit">
              {translation.clear} <Svg name="eraser" />
            </Button>
          </Block>
        </Block>
      </Block>
    );
  }

  render() {
    const { type, name, filtersData, direction, filterLoading } = this.props;
    const { isPopUp } = this.state;
    return (
      <>
        <Loader active={filterLoading} inline size='mini' />
        {!filterLoading && <Popup
        style={{
          zIndex: 9999
        }}
        open={isPopUp}
        position={`bottom ${direction === 'RTL' ? 'left' : 'right'}`}
        onClose={() => this.setState({ isPopUp: false })}
        on="click"
        className="filter-popup-condition"
        trigger={<Block onClick={() => { this.setState(() => ({ isPopUp: !isPopUp })) }} className={`d-flex justify-content-around${isPopUp ? ' filter-glossy' : ''}`}>
          {filtersData[name] ? (<Svg name="tocfilterorg" />) : (<Svg name="tocfilter" />)}
        </Block>}
      >
        {this.renderFilterOpts(type)}
      </Popup>}
      </>
    );
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    isAllFetched: state.tocData.isAllFetched,
    fieldOptions: state.tocData.fieldOptions,
    filtersData: state.tocData.filtersData,
    direction: state.translation.direction,
    // isLoading: state.tocData.isFilterOptionsLoading
    // compareType: state.tocData.compareType
  })
)(reduxForm({
  form: 'select-basemap',
  enableReinitialize: true,
})(DropDownMenu));