import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'semantic-ui-react';

import { Block } from '../../..';
import UrlLink from '../../UrlLink';

class Links extends React.Component {
  render() {
    const { links } = this.props;
    return (
      <Block className="popUplist">
        {links.map((l, i) => (
          <Label key={i}>
            <UrlLink
              link={l.link}
              type={l.type}
              text={l.text}
            />
          </Label>
        ))}
        {/* <Label className="disable">
          <a href="#">Lorem</a>
        </Label> */}
      </Block>
    );
  }
}

export default connect(
  state => ({
    // translation: state.translation.translation,
    // selectedVectorLayersSearching: state.search.selectedVectorLayersSearching,
    // dataForSearching: state.search.dataForSearching,
    // activeSearch: state.search.activeSearch
  })
)(Links);

