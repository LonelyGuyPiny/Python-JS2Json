import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
//import { mathematicOperations } from '../../../../utils/common'

import {
  Dropdown,
  // Input,
  // Label,
} from 'semantic-ui-react';
import { Block } from '../../../';


class TOCBottomStatistics extends Component {

  constructor(props) {

    super(props)
    this.state = {
      column: null,
      columnHeadings: [],
      tableData: [],
      getMathValue: props.averageForData,
      countryOptions: [],
      selectedLayer: {},
      selectedValue: props.translation.avg
    }
  }

  // componentDidMount = () => {
  //   // const{dispatch ,columnHeadings, selectedTableData} = this.props;
  //   const { dispatch } = this.props;
  //   dispatch(fetchDataForStatistics());
  //   this.getAverage();
  // }

  UNSAFE_componentWillReceiveProps = ({ averageForData }) => {
    if (averageForData !== this.props.averageForData) {
      this.setState({
        getMathValue: averageForData,
      })
    }
  }

  filterArray = (key) => {
    let array = [];
    let dataArray = this.props.selectedTocData.tableData;
    dataArray.forEach((item) => {
      return Object.keys(item).map(k => k === key ? array.push(item[key]) : '');
    })
    return array.filter(i => i);
  }

  // getSum() {
  //   const sum = arr => arr.reduce((a, b) => { return a + b; }, 0);
  //   const { tocStatisticsData, columnHeadings } = this.props;
  //   const sumValue = mathematicOperations(columnHeadings, selectedTableData, sum)
  //   this.setState({
  //     getMathValue: sumValue
  //   })
  // }
    getSum(){
      const {tocStatisticsData, columnNames} = this.props;
      let sum = [];
      let value;
      columnNames.forEach(names => {
      tocStatisticsData.forEach(data => {
        if(data.columnName === names){
          if(data && data.data.SUM_EXPR0){
            value = data.data.SUM_EXPR0.toFixed();
          }
        sum.push({ 'name': data.columnName, value: data.data ? value : '-' })
      }
      })
    })
      this.setState({
        getMathValue: sum
      })
    }
  

    getAverage(){
      const {tocStatisticsData, columnNames} = this.props;
      let average = []
      let value;
      columnNames.forEach(names => {
      tocStatisticsData.forEach(data => {
        if(data.columnName === names){
          if(data && data.data.AVG_EXPR1){
            value = data.data.AVG_EXPR1.toFixed();
          }
          average.push({ 'name': data.columnName, value: data.data ? value : '-' })
        }
      })
    })
      this.setState({
        getMathValue: average
      })
    }

    getMaxValue(){
      const {tocStatisticsData, columnNames} = this.props;
      let average = []
      let value;
      columnNames.forEach(names => {
      tocStatisticsData.forEach(data => {
        if(data.columnName === names){
          if(data && data.data.MAX_EXPR4){
            value = data.data.MAX_EXPR4.toFixed();
          }
          average.push({ 'name': data.columnName, value: data.data ? value : '-' })
        }
      })
    })
      this.setState({
        getMathValue: average
      })
    }

    getMinValue(){
      const {tocStatisticsData, columnNames} = this.props;
      let average = []
      let value;
      columnNames.forEach(names => {
      tocStatisticsData.forEach(data => {
        if(data.columnName === names){
          if(data && data.data.MIN_EXPR3){
            value = data.data.MIN_EXPR3.toFixed();
          }
        average.push({ 'name': data.columnName, value: data.data ? value : '-' })
        }
      })
    })
      this.setState({
        getMathValue: average
      })
    }

    getCount(){
      const {tocStatisticsData,columnNames} = this.props;
      let count = []
      let value;
      columnNames.forEach(names => {
      tocStatisticsData.forEach(data => {
        if(data.columnName === names){
          if(data && data.data.COUNT_EXPR2){
            value = data.data.COUNT_EXPR2.toFixed();
          }
          count.push({ 'name': data.columnName, value: data.data ? value : '-' })
        }
      })
    })
      this.setState({
        getMathValue: count
      })
    }
 

  handleRendering = async (e, { value }) => {
    const {translation } = this.props;
    let data = ''
    if (value === 'Sum') {
      this.getSum();
      data = translation.sum
    } else if (value === 'Avg') {
      this.getAverage();
      data = translation.avg
    } else if (value === 'Max') {
      this.getMaxValue()
      data = translation.max
    } else if (value === 'Min') {
      this.getMinValue()
      data = translation.min
    } else {
      this.getCount();
      data = translation.count
    }
    this.setState({
      selectedValue: data
    })
  }

  render() {
     // const {averageForData,columnNames,  columnHeadings,tocStatisticsData ,filterState, translation, selectedTocData, columnHeadingsType, selectedLayerToc, modifiedTocData, selectedTableData } = this.props;
    // this.getAverage();
    const {translation} = this.props;
    const { selectedValue } = this.state;
    const dataRenderingOptions = [
      { key: translation.sum , text: translation.sum, value: 'Sum'},
      { key: translation.avg, text: translation.avg, value: 'Avg' },
      { key: translation.count, text: translation.count, value: 'Cnt' },
      { key: translation.min, text: translation.min, value:  'Min' },
      { key: translation.max, text: translation.max, value: 'Max' },
    ]
    return (
      <Fragment>
        <tr>
          <td>
            <Block className="">
              <Block className="toc-foot-right">
                <Dropdown
                  button
                  className='dropFooter button-border-dark d-flex'
                  floating
                  //selected={this.state.getMathValue}
                  onChange={this.handleRendering}
                  options={dataRenderingOptions}
                  text={selectedValue}
                // value= {selectedValue}
                />
              </Block>

            </Block>
          </td>
          {
            this.state.getMathValue && this.state.getMathValue.map((element, i) =>
              <td key={i}>
                <p>{element.value}</p>
                {/* <Label>{element.name}</Label> */}
                {/* <Input value={element.value} /> */}
              </td>
            )
          }
        </tr>
        {/* <CSVLink data={selectedTableData} headers={columnHeadings}>
            Download me
        </CSVLink> */}
      </Fragment>

    )
  }
}

export default connect(
  state => ({
    translation: state.translation.translation,
    lang: state.translation.language,
    selectedTocData: state.tocData.selectedTocData,
    columnHeadings: state.tocData.columnHeadings,
    selectedTableData: state.tocData.selectedTableData,
    averageForData: state.tocData.averageForData,
    // lastUpdatedAt: Date.now(),
    tocStatisticsData: state.tocData.tocStatisticsData,
    columnNames: state.tocData.columnNames
  })
)(TOCBottomStatistics);