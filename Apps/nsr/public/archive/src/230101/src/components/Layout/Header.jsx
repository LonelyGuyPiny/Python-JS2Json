import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import phoneic from '../../style/images/phone-ic.png';
import accountic from '../../style/images/account-ic.png';
import { Svg } from '../../components';

export default class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollClass: ''
    };
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
    document.body.addEventListener('click', () => { this.toggleClass('remove'); });
    document.getElementById('nav-btn').addEventListener('click', (ev) => {
      this.toggleClass('add');
      ev.stopPropagation();
    });
  }

  handleScroll = () => {
    const lastScrollY = window.scrollY;
    const { scrollClass } = this.state;

    if (lastScrollY >= 40) {
      if (scrollClass !== 'fixed-header') {
        this.setState({
          scrollClass: 'fixed-header'
        });
      }
    } else if (scrollClass !== '') {
      this.setState({
        scrollClass: ''
      });
    }
  };

  toggleClass = (type = 'add') => {
    if (type === 'add') {
      document.getElementById('nav-btn').classList.add('active');
      document.getElementById('header-nav').classList.add('open');
      document.body.classList.add('menu-open');
    } else {
      document.getElementById('nav-btn').classList.remove('active');
      document.getElementById('header-nav').classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  }

  render() {
    const { scrollClass } = this.state;
    return (
      <header className={scrollClass}>
        <div className="container">
          <div className="logo-area">
            <Link to="/">
              {scrollClass === '' &&
                <Svg type="logo-shape-1" />
              }
              {scrollClass === 'fixed-header' &&
                <Svg type="logo-shape-2" />
              }
            </Link>
          </div>
          <div className="row-spacing">&nbsp;</div>

          <button id="nav-btn" className="mat-button-wrapper menu-toggle">
            <i className="material-icons">menu</i>
          </button>

          <div id="header-nav" className="mobile-right-side">
            <div className="header-link">
              <ul>
                <li><a href="#">Nos perfomances</a></li>
                <li><a href="#">QUI SOMMES-NOUS</a></li>
                <li><a href="#">services</a></li>
                <li><a href="#">blog</a></li>
                <li><a href="#">contact</a></li>
              </ul>
            </div>

            <div className="phone-link top-right-links">
              <a href="#"><img src={phoneic} alt="" /> <span>512 345 678</span></a>
            </div>

            <div className="account-link top-right-links">
              <a href="#"><img src={accountic} alt="" /> <span>my account</span></a>
            </div>
          </div>

          <div className="top-right-btn">
            <a href="#" className="">become a client</a>
          </div>
        </div>

      </header>
    );
  }
}

