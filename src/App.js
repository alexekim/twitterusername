import React, {Component} from 'react';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';
import Suggestion from './Suggestion';
import Loading from './Loading';
import Submit from './Submit';
import Header from './Header';

class TwitterTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: "",
      currentSearch: "",
      selected: "",
      charactersLeft: 280,

      prevSearches : {
         // "sprout" : [
         //    {"screen_name": "SproutSocial", "profile_image_url": "sprout.jpg"},
         //    {"screen_name": "SproutSupport", "profile_image_url": "support.jpg"}
         // ]
       },
       loading: false,
       searchingNow: false,
       allowXHR: true

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.allowXHR = this.allowXHR.bind(this);
  }
  allowXHR(){
    //END DEBOUNCE
    this.setState({ allowXHR: true});
    // console.log(2, "setTimeout is done, allowXHR is now TRUE");
  }
  handleChange(e) {
    var currentText = e.target.value; // this is the entire value of textarea

    //DEBOUNCE
    this.setState({
      allowXHR: false,

      currentInput: currentText,
      charactersLeft: 280 - currentText.length
    });
    // console.log(1, "setState allowXHR FALSE: ");
    // console.log(2, "setTimeout to allowXHR TRUE in .5 seconds...");
    setTimeout(this.allowXHR, 200);

    var currentTextArray = currentText.split(" ");
    // going to split(" ") by each word
    //now looking for any possible tagging and then making possible changes
    for (var i = 0; i < currentTextArray.length; i++) {


      if (/[a-zA-Z0-9_]/.test(currentTextArray[i].charAt(1)) && /^(@)/.test(currentTextArray[i]) && currentTextArray[i].length >= 3 && currentTextArray[i].charAt(currentTextArray[i].length) !== " ") {

        let cleanSearch = currentTextArray[i].slice(1); // just getting rid of the @ sign for search
        this.setState({ currentSearch: cleanSearch, searchingNow: true })
        console.log(1, cleanSearch, "is a valid search");

        //dependent on state based debounce

          // CHECKING IF WE ALREADY HAVE SEARCHED THIS
          if ( !Boolean(this.state.prevSearches[cleanSearch]) ) {
            // let's search for it now
            // then get the results and store it in THIS.STATE
            // then we're going to put that shit on the page.
            console.log("2A and it,", cleanSearch, " has never been searched before");
            if(this.state.allowXHR){
              this.setState({loading: true});
              // if first character is @ and second character is letter or number
              //continue search

              var results = [];
              console.warn("3A: and XHR is allowed right now. about to do AXIOS with:", cleanSearch);

              axios.get("/twitter/user/search?username=" + cleanSearch)
              .then(res => {
                // console.log(res.data.users);
                const allUsers = res.data.users;
                const sixSuggestions = allUsers.slice(0, 6);
                // console.log(sixSuggestions);
                // looping through the 6 item array to get the info we want
                for (let k = 0; k < sixSuggestions.length; k++) {
                  let screen_name = sixSuggestions[k].screen_name;  // CUBS
                  let name = sixSuggestions[k].name;  // Chicago Cubs
                  let verified = sixSuggestions[k].verified;  // Chicago Cubs
                  let profile_image_url = sixSuggestions[k].profile_image_url; //cubs.jpg
                  results.push({"screen_name": screen_name, "name": name, "verified": verified, "profile_image_url": profile_image_url});
                }
                var thisstateprevSearches = this.state.prevSearches; //creating pseuedo object
                thisstateprevSearches[cleanSearch] = results;  // adding to that pseudo object
                this.setState({ prevSearches : thisstateprevSearches, loading: false, searchingNow: false});  // setting state to pseudo object

              }) // END AXIOS CALL

            } else {
              console.warn("3B: but we can't do XHR yet:", cleanSearch, "did NOT get searched.");
              this.setState({searchingNow: false})
            }
          } else {
            this.setState({loading: false, searchingNow: false});
            console.log("@2B", cleanSearch, " and it has already has been searched. now checking state for info we already have. no XHR request needed!");
          }






      } else {
        // this is just a normal word being typed. NOT a tag
        this.setState({currentSearch: ""});
      }
    }// END FOR LOOP THAT GOES THROUGH EACH WORD
  }

  handleSelect(name){
    console.log(1, "name", name);
    // this.setState({ selected: name });
    // console.log("1a", this.state.selected);
    var currentTextArray = this.state.currentInput.split(" ");
    console.log(2, "Cta", currentTextArray);
    for (var i = 0; i < currentTextArray.length; i++) {
      console.log(3, currentTextArray[i]);
      console.log(4, "@"+this.state.currentSearch);
      if( currentTextArray[i] === ("@"+this.state.currentSearch) ){
        console.log(5, name);
        var newversion = "@"+name+" ";
        console.log(6, newversion);
        currentTextArray[i] = newversion;
        console.log(7, currentTextArray[i]);
      }
    }
    var currentTextArrayJoined = currentTextArray.join(" ");
    console.log(8, currentTextArrayJoined);
    document.getElementById("tweetTextarea").value = currentTextArrayJoined;
    document.getElementById("tweetTextarea").focus();
    this.setState({ currentInput: currentTextArrayJoined, currentSearch: "" });

  }
  render() {
    // console.log("render=====");
    // console.log(Boolean(this.state.currentSearch));
    // console.log(this.state.currentSearch);
    // console.log(this.state.prevSearches[this.state.currentSearch]);
    if (this.state.currentSearch) {
      var currentSearch = this.state.currentSearch;
      var dataArray = this.state.prevSearches[currentSearch];
      // console.log("dataArray", dataArray);
      if(dataArray){
        // console.log("aaa");
        var displaySuggestions =  dataArray.map((user, index) =>
          <Suggestion screen_name={user.screen_name} name={user.name} src={user.profile_image_url} verified={user.verified} onSelect={this.handleSelect} key={index}/>
        )
      } else{
        // console.log("bbb");
        var displaySuggestions = "";
      }
    } else {
      // console.log("not yet");
    }


    return (
      <div id="app">
        <Header/>
        <div id="tweetContainer" className="row">
          <div id="tweetTextareaDiv" className="col s12">
            <textarea
              type="text"
              id="tweetTextarea"
              onChange={this.handleChange}
              maxLength="280"
              tabIndex="0">
              </textarea>
              <p id="charLeft">{this.state.charactersLeft}</p>
              <Submit />
            </div>
            <Loading loading={this.state.loading}/>

            <div>
              <div id="displaySuggestions">{displaySuggestions}</div>
            </div>
          </div>
      </div>);
      }
    }

export default TwitterTextArea;
