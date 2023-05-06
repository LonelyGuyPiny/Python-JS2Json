import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { setMapPadding } from './../../utils/map';
import { Svg, Block } from '../';

class ResizeSideMenu extends Component {
  constructor(props) {
    super(props);
    this.posX = 0;
    this.width = 0;
    this.preWidth = 386
  }

  componentDidMount = () => {
    const height = document.getElementById('root').offsetHeight;
    document.getElementById('resize').style.height = `${height}px`;
    this.resize();
    const self = this;
    document.getElementById('toggle-sbar').addEventListener('click', (e) => {
      const sidebar = document.getElementById('menuShowhide-block');
      if (!sidebar.classList.contains('hide')) {
        sidebar.style.width = `386px`;
      } else {
        sidebar.style.width = `${self.preWidth}px`;
      }
    }, false)
  }

  componentWillUnmount = () => {
    const sidebar = document.getElementById('menuShowhide-block');
    sidebar.style.width = `386px`;
  }

  resize = () => {
    const resize_el = document.getElementById("resize");
    resize_el.addEventListener("mousedown", this.onResizeStart, false);
  }

  onResizeStart = (e) => {
    this.posX = e.x;
    document.addEventListener("mousemove", this.onResize, false);
    document.addEventListener("mouseup", this.onResizeEnd, false);
    const sidebar = document.getElementById('menuShowhide-block');
    sidebar.style.transition = 'none';
    this.width = sidebar.offsetWidth;
  }

  onResize = (e) => { 
    const { lang } = this.props;
    const posX = this.posX;
    let dx = 0;
    let width = 0;
    if (lang !== 'HE') {
      dx = e.x - posX;
    } else {
      dx = posX - e.x;
    }
    width = this.width + dx;
    if (width < 0) { width = 1700 }
    else if (width > 1700) { width = 1700 }
    const sidebar = document.getElementById('menuShowhide-block');
    const root = document.getElementById('root');
    root.style.cursor = 'w-resize';
    sidebar.style.width = `${width}px`;
    this.preWidth= width;
  }

  onResizeEnd = () => {
    document.removeEventListener("mousemove", this.onResize, false);
    this.posX = 0;
    document.getElementById('root').style.cursor = 'default';
    document.getElementById('menuShowhide-block').style.transition = 'all 0.5s ease-in-out';
    // setMapPadding(this.props.map);
  }

  render() {
    return (
      <Block id="resize"><Svg name="resizeicon"/></Block>
    );
  }
}

export default connect(
  state => ({
    map: state.map.map,
    center: state.map.center,
    lang: state.translation.language
  })
)(ResizeSideMenu);

