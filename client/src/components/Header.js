import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Log in with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Log out</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="" className="left brand-logo">
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
