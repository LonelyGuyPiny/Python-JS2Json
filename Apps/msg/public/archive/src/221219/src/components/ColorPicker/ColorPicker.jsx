import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class SketchExample extends React.Component {
  constructor(props) {
    super(props);
    const { r, g, b } = props.color;
    this.state = {
      displayColorPicker: false,
      color: {
        r,
        g,
        b,
        a: '1',
      },
    };
  }

  UNSAFE_componentWillReceiveProps({ color }){ 
    const { color: currColor } = this.state;
    if (color !== currColor) {
      this.setState({
        color: { ...color, a: '1' }
      });
    }
  }

  componentDidMount = () => {
    const { r, g, b } = this.props.color;
    this.setState({
      displayColorPicker: false,
      color: {
        r,
        g,
        b,
        a: '1',
      },
    });
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.props.onChange(color);
    this.setState({ color: color.rgb });
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '34px',
          height: '20px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '0px',
          background: '#fff',
          border:'1px solid #253C4F',
          borderRadius: '3px',
          // boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }
      </div>
    )
  }
}

export default SketchExample