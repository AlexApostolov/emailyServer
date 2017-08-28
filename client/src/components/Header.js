import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="" class="left brand-logo">
            Emaily
          </a>
          <ul className="right">
            <li>
              <a href="">Login With Google</a>
            </li>
          </ul>
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
