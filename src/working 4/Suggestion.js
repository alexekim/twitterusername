import React from 'react';

class Suggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      displaying: true
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  // componentWillUpdate(){
  //   if(this.state.selected == true){
  //     this.setState({
  //       displaying: false
  //     });
  //   }
  // }
  handleKeyUp(e){
    if (e.keyCode == (13 || 32)) {
      this.handleClick(e);
    }
  }
  handleClick(e){
    // console.warn(e);
    var name = this.props.screen_name;
    console.warn(name);
    this.props.onSelect(name);
    // var sugs = document.getElementsByClassName("suggestion");
    // for (var i = 0; i < sugs.length; i++) {
    //   sugs[i].style.display = "none";
    // }
  }

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  render(){
    if( this.state.displaying == true){
      return(
        <div className="suggestion" tabIndex="0" id={this.props.screen_name} onClick={this.handleClick} onKeyUp={this.handleKeyUp} role="option">
          <img className="suggestionContent thumbnail" src={this.props.src} alt={this.props.screen_name + " profile thumbnail"} title={this.props.screen_name + " profile thumbnail"} />
          <p className="suggestionContent"><strong>&nbsp;{this.props.name}&nbsp;</strong></p>
          {this.props.verified ?
            <img className="verified suggestionContent"
            src="https://i.ibb.co/WcBj34B/verified.png" alt="Verified Account Indicator" title="Verified Account Indicator"/>
            : <p className="suggestionContent"></p>}
          <p className="suggestionContent">@{this.props.screen_name}</p>
        </div>
      )
    }
  }
  // componentDidUpdate(){}
  // componentWillUnmount(){}

}





export default Suggestion;
