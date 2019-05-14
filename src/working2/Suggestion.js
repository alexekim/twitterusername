import React from 'react';

class Suggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      displaying: true
    }
  }
  // componentWillUpdate(){
  //   if(this.state.selected == true){
  //     this.setState({
  //       displaying: false
  //     });
  //   }
  // }


  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  render(){
    if( this.state.displaying == true){
      return(
        <li tabIndex="0" id={this.props.screen_name} >
          <img className="suggestionContent" src={this.props.src}/>
          <p className="suggestionContent">{this.props.screen_name}</p>
        </li>
      )
    }
  }
  // componentDidUpdate(){}
  // componentWillUnmount(){}

}





export default Suggestion;
