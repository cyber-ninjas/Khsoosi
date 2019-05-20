import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <div className="topnav">
        <a className="active" href="#home">Home</a>
        <a className="sign" href="/SignIn">Sign In</a>
        <a  href="/SignUp">Sign Up</a>

      </div>
    )
  }
}

export default Header;