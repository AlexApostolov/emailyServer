import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return 'Still deciding';
      case false:
        return 'I am logged out';
      default:
        return 'I am logged in';
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="" class="left brand-logo">
            Emaily
          </a>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

// Pass state.auth property to the Header using destructuring
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
