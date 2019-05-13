import React from 'react';

class Header extends React.Component {
  constructor(props){
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
  }
  handleMouseOver(e){

  }
  render() {
    return (
      <div id="header">
        <h1 onMouseOver={this.handleMouseOver}>
          <i id="bird" className="fab fa-twitter"></i> Twïttėr
        </h1>
      </div>
    )
  }

}

export default Header;
