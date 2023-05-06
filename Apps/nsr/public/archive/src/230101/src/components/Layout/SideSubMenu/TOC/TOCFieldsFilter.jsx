import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Button, Popup } from 'semantic-ui-react';

import { Block, Svg } from '../../../';
import { setVisibleFields } from '../../../../redux/modules/toc'

const TOCFieldsFilter = ({ translation, visibleFields, fields, dispatch }) => {
  const [innerDropDown, setinnerDropDown] = useState(false);
  const [cols, setCols] = useState([]);

  const handleCheckBox = (name) => {
    if (cols.includes(name)) {
      setCols(cols.filter(c => c !== name));
    } else {
      let arr = [...cols, name];
      arr = fields.filter(f => arr.includes(f.name)).map(f => f.name);
      setCols(arr);
    }
  }

  const updateFields = () => {
    dispatch(setVisibleFields(cols));
    setinnerDropDown(false);
  }

  const onClose = () => {
    setinnerDropDown(false);
    setCols(visibleFields);
  }

  useEffect(() => {
    setCols(visibleFields);
  }, [visibleFields]);

  if (!fields || fields.length === 0) {
    return null;
  }
  return (
    <Block className="toc-head-middle">
      <Block className="ui dropdown">
        <Popup
          onClose={onClose}
          on="click"
          className='scroll-pop'
          open={innerDropDown}
          position='bottom left'
          trigger={
            <Button onClick={() => setinnerDropDown(!innerDropDown)} className="btn-none">
              <Svg className="dropdown" name="menuvertical" />
              {translation.fields}
            </Button>
          }
          style={{ zIndex: 9999 }}
        >
          <Popup.Content className="fields-toc">
            <Button className="btn-none" onClick={() => setinnerDropDown(false)}>
              <Svg name="close-new" className="popclose cursor-pointer" />
            </Button>
            {fields.map(({ name, alias }) => {
              return (
                <Checkbox
                  key={name}
                  label={alias}
                  value={name}
                  checked={cols.includes(name)}
                  onClick={() => handleCheckBox(name)}
                />
              )
            })}
            <Block className="dropdown-btn-fixed">
              <Button className="button-border-dark " type="button" disabled={cols.length === 0} onClick={updateFields}>
                <Svg name="toc-submit-arrow" /> {translation.submit}
              </Button>
            </Block>
          </Popup.Content>
        </Popup>
      </Block>
    </Block>
  )
}

export default connect(
  state => ({
    translation: state.translation.translation,
    visibleFields: state.tocData.visibleFields,
    fields: state.tocData.fields
  })
)(TOCFieldsFilter);