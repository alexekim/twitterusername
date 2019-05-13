import React from 'react';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      h1 : "Twïttėr"
    }
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  handleMouseOver(e){
    this.setState({
      h1 : "Definitely Real Twïttėr"
    });
  }
  handleMouseLeave(e){
    this.setState({
      h1 : "Twïttėr"
    });
  }
  render() {
    return (
      <div id="header">
        <h1 onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
          <i id="bird" className="fab fa-twitter"></i> {this.state.h1}
        </h1>
      </div>
    )
  }

}

export default Header;
