import React from 'react';
import moment from 'moment';
import { Form, Input, Icon } from "semantic-ui-react"; // eslint-disable-line
import DayPickerInput from "react-day-picker/DayPickerInput"; // eslint-disable-line
import 'react-day-picker/lib/style.css';
import DropDown from "./DropDown"; // eslint-disable-line
// import * as dateUtils from '../../utils/dateUtils';
// import constants from '../../constants/constants';
const MONTHS_LIST = [
  { text: 'January', value: 0 },
  { text: 'February', value: 1 },
  { text: 'March', value: 2 },
  { text: 'April', value: 3 },
  { text: 'May', value: 4 },
  { text: 'June', value: 5 },
  { text: 'July', value: 6 },
  { text: 'August', value: 7 },
  { text: 'September', value: 8 },
  { text: 'October', value: 9 },
  { text: 'November', value: 10 },
  { text: 'December', value: 11 }
];

const DATE_FORMAT = 'YYYY-MM-DD';

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0).getMonth();
const toMonth = new Date(currentYear + 10, 11);

export default class DatePicker extends React.Component {
  state = {
    date: fromMonth,
    month: fromMonth,
    year: currentYear
  };

  handleYearMonthChange = (date, year, month) => {
    this.setState({ date, year, month });
  };

  setDatePickerMonth = () => {
    const { input } = this.props;
    let month = new Date(input.value).getMonth() || new Date().getMonth();
    this.setState({ month });
  };

  handleDayChange = (day, { disabled }) => {
    if (disabled) {
      return;
    }

    const { input } = this.props;
    input.onChange(moment(day).format(DATE_FORMAT));
  };

  render() {
    const { input, label, meta, ...custom } = this.props;
    const disabledDays = custom.disabledDays;

    delete custom.disabledDays;
    const { touched, error } = meta || {};
    const hasError = (touched && !!error);
    const { date, month, year } = this.state;

    if (custom.disabled) {
      return (
        <Form.Field className="form-group">
          {label && <label className="control-label">{label}</label>}
          <Input
            className="disabled"
            defaultValue={input.value || custom.emptyValue || ''}
          />
        </Form.Field>
      );
    }

    const dayProps = {
      todayButton: 'Go to Today',
      month: date,
      captionElement: (<YearMonthForm month={month} year={year} onChange={this.handleYearMonthChange} />),
      navbarElement: (<DatePickerNavBar onChange={this.handleYearMonthChange} month={month} year={year} />)
    };

    if (disabledDays) {
      dayProps.disabledDays = disabledDays;
    }

    return (
      <Form.Field error={hasError} className="form-group">
        {label && <label className="control-label">{label}</label>}
        <DayPickerInput
          placeholder={custom.placeholder || DATE_FORMAT}
          format={custom.format || DATE_FORMAT}
          value={input.value ? input.value : ''}
          onDayChange={this.handleDayChange}
          classNames={{
            container: 'DayPickerInput ui input',
            overlayWrapper: 'DayPickerInput-OverlayWrapper',
            overlay: 'DayPickerInput-Overlay'
          }}
          dayPickerProps={dayProps}
          onClick={this.setDatePickerMonth}
          readOnly
          inputProps={{
            readOnly: true
          }}
          {...custom}
        />
      </Form.Field>
    );
  }
}

// eslint-disable-next-line no-unused-vars
function YearMonthForm (props) {
  const months = MONTHS_LIST;

  const years = [];
  for (let i = 1950; i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const changeMonth = (month) => {
    props.onChange(new Date(props.year, month), props.year, month);
  };

  const changeYear = (year) => {
    props.onChange(new Date(year, props.month), year, props.month);
  };

  const getMonths = months.map((month, i) => {
    return {
      key: i,
      value: month.value,
      text: month.text
    };
  });

  const getYears = years.map((year, i) => {
    return {
      key: i,
      value: year,
      text: year
    };
  });

  const navMonth = props.date.getMonth();
  const navYear = props.date.getFullYear();

  return (
    <div className="DayPicker-Caption ">
      <div className="month float-left">
        <DropDown
          name="month"
          onChange={changeMonth}
          options={getMonths}
          fluid
          selection
          value={navMonth}
        />
      </div>

      <div className="year float-left">
        <DropDown
          name="year"
          onChange={changeYear}
          options={getYears}
          fluid
          selection
          value={navYear}
        />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function DatePickerNavBar ({ className, onChange, year, month }) {
  const styleLeft = {
    float: 'left',
    cursor: 'pointer'
  };

  const styleRight = {
    float: 'right',
    cursor: 'pointer'
  };

  const nextMonth = () => {
    onChange(new Date(year, month + 1), year, month + 1);
  };

  const prevMonth = () => {
    onChange(new Date(year, month - 1), year, month - 1);
  };

  return (
    <div className={className}>
      <Icon style={styleLeft} name="chevron left" onClick={() => prevMonth()} />
      <Icon style={styleRight} name="chevron right" onClick={() => nextMonth()} />
    </div>
  );
}

YearMonthForm.defaultProps = {
  date: null
};

DatePickerNavBar.defaultProps = {
  className: null,
  onChange: null,
  year: null,
  month: null
};
