import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Button, Label } from 'semantic-ui-react';

import { Block, Svg } from '../../../';
import { Links } from './';
import { fetchDataForSearch, setActiveSearch, setValues } from '../../../../redux/modules/search';
import { fillTemplate } from '../../../../utils/common';
import {
  createSearchOptions_MIDDLEWARE,
  createSearchRowData_MIDDLEWARE,
  createSearchLinks_MIDDLEWARE,
  createSearchGeomerty_MIDDLEWARE
} from '../../../../middlewares/search/search_middleware';

/**
 * Component
 * @name Search
 * @description
 * This is the search group component of the application. 
 * On application startup, this component is loaded
 */
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comboboxes: props.comboboxes,
      comboboxOptns: {},
      comboboxData: {},
      comboboxValues: {},
      loading: {},
      links: {},
    };
    this.geoData = {};
  }

  componentDidMount = () => {
    const { comboboxes } = this.props;
    if (comboboxes && comboboxes.length > 0) {
      // this.fetchDataForComboboxes(null, true);
      this.setIntialDataForComboboxes();
    }
  }

  componentDidUpdate = ({ comboboxUdatedAt }) => {
    if (this.props.comboboxUdatedAt !== comboboxUdatedAt) {
      this.setIntialDataForComboboxes();
    }
  }

  setIntialDataForComboboxes = () => {
    const { comboboxesData, searchId, comboboxes, dropDownOptions } = this.props;
    if (comboboxesData[searchId]) {
      for (const cb_id in comboboxesData[searchId]) {
        const data = comboboxesData[searchId][cb_id];
        const combobox = comboboxes.find(c => c.cb_id === Number(cb_id));
        this.setState(({ comboboxOptns, comboboxData, loading }) => ({
          comboboxOptns: { ...comboboxOptns, [combobox.cb_id]: dropDownOptions[searchId][cb_id] },
          comboboxData: { ...comboboxData, [combobox.cb_id]: data },
          loading: { ...loading, [combobox.cb_id]: false }
        }))
        
      }
    }
  }

  fetchDataForComboboxes = (change_cb_id = null, isParent = false) => {
    const { comboboxes } = this.props;
    const { comboboxValues, comboboxOptns } = this.state;
    comboboxes.forEach(combobox => {
      if (combobox.filters && combobox.filters.length > 0) {
        const filter = combobox.filters.find(f => f.cb_id === change_cb_id);
        if (filter) {
          const isFetch = combobox.filters.filter(f => f.required === true).map(f => {
            if (comboboxValues[f.cb_id]) {
              return true;
            }
            return false;
          });
          if (!isFetch.includes(false)) {
            this.getDataForComboBox(combobox, isParent);
            this.setState(({ comboboxValues: prevComboboxValues }) => ({ ...prevComboboxValues, [combobox.cb_id]: null }));
          }
        }
      } else {
        if (!comboboxOptns[combobox.cb_id]) {
          this.getDataForComboBox(combobox, isParent);
        }
      }
    })
  }

  getDataForComboBox = async (combobox, isParent = false) => {
    const { dispatch, searchId, searchData } = this.props;
    const { comboboxValues } = this.state;
    this.setState(({ loading }) => ({ loading: { ...loading, [combobox.cb_id]: true } }));
    const searchGroup = searchData.find(sd => sd.id === searchId);
    const data = await dispatch(fetchDataForSearch(searchId, combobox, comboboxValues, isParent, searchGroup.type, combobox.layer, combobox.field));
    let options = [];
    if (data && data.features) {
      const middlewareData = {
        source: searchGroup.type,
        data,
        comboboxField: combobox.field
      };
      options = createSearchOptions_MIDDLEWARE(middlewareData);
    }
    this.setState(({ comboboxOptns, comboboxData, loading }) => ({
      comboboxOptns: { ...comboboxOptns, [combobox.cb_id]: options },
      comboboxData: { ...comboboxData, [combobox.cb_id]: data },
      loading: { ...loading, [combobox.cb_id]: false }
    }))
  }

  handleChange = (combobox, { value }) => {
    this.setState(({ comboboxValues }) => ({
      comboboxValues: { ...comboboxValues, [combobox.cb_id]: value }
    }), () => {
      this.fetchDataForComboboxes(combobox.cb_id);
      this.handleDraw(combobox, value);
      this.handleLinks(combobox, value);
      const { dispatch, searchId } = this.props;
      dispatch(setActiveSearch(searchId, combobox.cb_id));
      dispatch(setValues(searchId, this.state.comboboxValues));
    });
  }

  handleLinks = (combobox, value) => {
    const { comboboxData } = this.state;
    const { links, searchId, layersData } = this.props;
    const searchLayer = layersData.find(l => l.id === searchId && l.cb_id === combobox.cb_id);
    if (searchLayer) {
      let currentLinks = [];
      const layerName = searchLayer.layerData.name || searchLayer.layerData.Title;
      let rows = [];
      const middlewareData = {
        source: searchLayer.type,
        comboboxData,
        cb_id: combobox.cb_id,
        field: combobox.field,
        value,
        geoData: this.geoData
      };
      const { geoData, row } = createSearchRowData_MIDDLEWARE(middlewareData);
      if (geoData) {
        this.geoData = { ...this.geoData, ...geoData }
        rows[0] = this.geoData;
      } else {
        rows = row;
      }
      if (rows.length === 1) {
        const rowData = {};
        Object.keys(rows[0]).forEach(key => { rowData[key.replaceAll('.', '_')] = rows[0][key] });
        const middlewareData = {
          source: searchLayer.type,
          links,
          layerName
        };
        currentLinks = createSearchLinks_MIDDLEWARE(middlewareData);
        currentLinks = currentLinks.map((l, i) => {
          const link = fillTemplate(l.url, rowData);
          return ({
            ...l,
            link
          });
        });
      }
      this.setState(({ links: prevLinks }) => ({
        links: { ...prevLinks, [combobox.cb_id]: currentLinks }
      }))
    }
  }

  handleDraw = (combobox, value) => {
    const { comboboxData } = this.state;
    const { searchData, searchId } = this.props;
    if (comboboxData[combobox.cb_id]) {
      const searchGroup = searchData.find(sd => sd.id === searchId);
      const middlewareData = {
        source: searchGroup.type,
        comboboxData,
        cb_id: combobox.cb_id,
        field: combobox.field,
        value
      };
      const geometry = createSearchGeomerty_MIDDLEWARE(middlewareData);
      this.props.createFeature(geometry, geometry[0].type, this.props.searchId, combobox.cb_id, comboboxData[combobox.cb_id].crs);
    }
  }

  clearValue = (cb_id) => {
    this.props.removeFeature(this.props.searchId, cb_id);
    let { comboboxValues, links } = this.state;
    comboboxValues = { ...comboboxValues, [cb_id]: null }
    links = { ...links, [cb_id]: null }
    const { comboboxes } = this.props;
    comboboxes.forEach(combobox => {
      if (combobox.filters && combobox.filters.length > 0) {
        const filter = combobox.filters.find(f => f.cb_id === cb_id);
        if (filter) {
          this.props.removeFeature(this.props.searchId, combobox.cb_id);
          comboboxValues = { ...comboboxValues, [combobox.cb_id]: null };
          links = { ...links, [combobox.cb_id]: null };
        }
      }
    });

    this.setState({
      comboboxValues,
      links
    }, () => {
      const { comboboxOptns } = this.state;
      comboboxes.forEach(combobox => {
        if (combobox.filters && combobox.filters.length > 0) {
          const filter = combobox.filters.find(f => f.cb_id === cb_id);
          if (filter) {
            const isFetch = combobox.filters.filter(f => f.required === true).map(f => {
              if (comboboxValues[f.cb_id]) {
                return true;
              }
              return false;
            });
            if (!isFetch.includes(false)) {
              this.getDataForComboBox(combobox);
            }
          }
        } else {
          if (!comboboxOptns[combobox.cb_id]) {
            this.getDataForComboBox(combobox);
          }
        }
      })
    });
  }

  isDisabled = combobox => {
    if (!combobox.filters) {
      return false;
    }
    const { comboboxValues } = this.state;
    const isDisable = combobox.filters.filter(f => f.required === true).map(f => {
      if (comboboxValues[f.cb_id]) {
        return true;
      }
      return false;
    });
    if (isDisable.includes(false)) {
      return true
    }
    return false;
  }

  render() {
    const { comboboxes, comboboxOptns, comboboxValues, loading, links } = this.state;
    const { lang, translation, searchId, comboboxLoading } = this.props;
    
    return (
      <React.Fragment>
        <Block className="searchDropdowns">
          {comboboxes && comboboxes.length > 0 &&
            comboboxes.map((combobox) => (
              <Block
                className="searchDropdownLists"
                key={combobox[`${lang}_name`]}
              >
                <Label>{combobox[`${lang}_name`]}</Label>
                <Block className="dropdownListswrap">
                  {comboboxValues[combobox.cb_id] &&
                    < Button onClick={() => this.clearValue(combobox.cb_id)} className="closeIcon">
                      <Svg className="close-new" name="close-new" />
                    </Button>
                  }
                  <Dropdown
                    placeholder={translation.select}
                    selectOnBlur={false}
                    search
                    selection
                    loading={comboboxLoading[searchId][combobox.cb_id] || loading[combobox.cb_id]}
                    // loading={comboboxLoading[searchId][combobox.cb_id]}
                    options={comboboxOptns[combobox.cb_id] || []}
                    onChange={(e, data) => this.handleChange(combobox, data)}
                    value={comboboxValues[combobox.cb_id] || null}
                    disabled={this.isDisabled(combobox) || comboboxLoading[searchId][combobox.cb_id] || loading[combobox.cb_id]}
                    lazyLoad
                  />
                </Block>
                {
                  links[combobox.cb_id] && links[combobox.cb_id].length > 0 &&
                  <Links links={links[combobox.cb_id]} />
                }
              </Block>
            ))
          }
        </Block>
      </React.Fragment >
    );
  }
}

export default connect(
  state => ({
    lang: state.translation.language,
    translation: state.translation.translation,
    layersData: state.search.layersData,
    comboboxesData: state.search.searchQueryData,
    comboboxLoading: state.search.comboboxLoading,
    comboboxUdatedAt: state.search.comboboxUdatedAt,
    links: state.links.links,
    dropDownOptions: state.search.comboboxOptions,
    searchData: state.search.searchData
  })
)(Search);
