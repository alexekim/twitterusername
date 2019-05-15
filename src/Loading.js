import React from 'react';

const displayYes = { display: "block", width: "60px"};
const displayNo = {display: "none" };

class Loading extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render(){
    if(this.props.loading){
      var style = displayYes;
    } else {
      var style = displayNo;
    }
    return (
      <div>
        <img style={style} src="https://i.imgur.com/DshER6z.gif" alt="loading indicator" title="loading indicator" />
        {/*}<img style={this.props.loading ? {displayYes}: {displayNo}} src="https://www.lung.org/images/loading.gif"/>*/}
      </div>
    )
  }
}

export default Loading;
