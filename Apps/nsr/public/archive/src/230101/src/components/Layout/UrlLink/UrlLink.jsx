import React from 'react';
import superagent from 'superagent';
import { Button, Popup } from 'semantic-ui-react';

import { Block } from '../../';

export default class UrlLink extends React.Component {
  constructor(props) {
    super(props);
    const { link, type, text } = props;
    this.state = {
      link,
      type,
      text,
      isVisible: type === 'URL'
    }
  }

  componentDidMount = () => {
    if (this.state.type === 'REQUEST') {
      this.updateLink();
    }
  }

  UNSAFE_componentWillReceiveProps = ({ link, type, text }) => {
    if (this.props.link !== link && type === 'URL') {
      this.setState({
        link,
        text
      });
    } else if (this.props.link !== link && type === 'REQUEST') {
      this.setState({
        link,
        text,
        isVisible: false
      }, () => this.updateLink());
    }
  }

  updateLink = async () => {
    const { link } = this.state;
    try {
      const res = await superagent.get(link);
      if (res.body && res.body['@link']) {
        this.setState({
          link: res.body['@link'].replace(/\\\//g, "/"),
          isVisible: true
        });
      } else if (res.text) {
        const text = JSON.parse(res.text);
        if (text && text['@link']) {
          this.setState({
            link: text['@link'].replace(/\\\//g, "/"),
            isVisible: true
          });
        }
      }
    } catch (err) {
    }
  }

  render() {
    const { link, text, isVisible, urlFor } = this.state;

    if (!isVisible) {
      return null;
    }

    if (urlFor === 'TOC') {
      return (
        <Popup
          className='linkButton'
          trigger={
            <Button className="button-link">
              <a
                // eslint-disable-next-line
                target="_blank"
                // rel="noopener noreferrer"
                href={link}
              >
                {text}
              </a>
            </Button>
          }
          content={text}
          basic
        />
      )
    }

    return (
      <Block className="link-toc-button">
        <a className="button-link"
        // eslint-disable-next-line
          target="_blank"
          // rel="noopener noreferrer"
          href={link}
        >
          {text}
        </a>
      </Block>
    );
  }
}