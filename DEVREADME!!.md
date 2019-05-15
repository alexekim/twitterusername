<!-- # Sprout Social Applicant Homework -->
# Twitter UserName AutoSuggest

## Requirements:

1. **"When typing a message, the typeahead will search for screen name suggestions after inserting or editing an @ followed by 2 alphanumeric characters (a-z, 0-9)"**:
  - Each time a character is typed or removed from the `<textarea>`, the `value` of that text is set to state via `handleChange()`. `this.setState({ currentInput: e.target.value})`.
  - the text is `split()` as `this.state.currentInput.split(" ")` and a `for` loop looks for words that are meant to be tags
  - this is done with a few RegEx booleans.
  - --does it start with "@"?
  - --is it three characters long at this point? `@a` will not pass but `@ab` does.
  - --is the second character a letter, a number, or an underscore?
  - if these register as true, a query is allowed! (and later, debouncing status and whether or not the search has already been made are checked)

2. **"The typeahead should display suggestions for the appropriate mention when updating a message that contains multiple screen names"**:
  - assume at this point that the `@tag` passes the previous test
  - if debouncing is not happening, an XHR request is allowed and will trigger using `axios`
  - `axios.get("/twitter/user/search?username=" + cleanSearch)` where `cleanSearch` is the tag being queried. it was named `cleanSearch` because the "@" is taken off.
  - the first 6 results are pushed into the array `const results`
  - `results` is looped through and `objects` are made out of it, added to `this.state.prevSearches`
  - `this.state.prevSearches` is an archive of any username that has been typed in and queried via `axios`
  - `this.setState({ prevSearches: results });`
  - in the `render()` function, I set up a `.map()` that loops through the `this.state.prevSearches` array and creates an `array` of Child components `<Suggestion/>`
  - `<Suggestion />` has a few props as well
  - `<Suggestion screen_name={user.screen_name} name={user.name} src={user.profile_image_url} verified={user.verified} onSelect={this.handleSelect} key={index}/>`
  - these props are turned into data to be displayed (picture, name, username), verified account
  - the last prop `onSelect` is used to pick a suggestion (see next)

  3. **"Screen name suggestions should display in a list. When a user selects a suggested screen name, either by clicking or using a keyboard shortcut, it should replace the screen name in the typeahead"**:
    - this list appears on the DOM as blocked elements.
    - it is a Child component of `<TwitterTextArea/>`
    - a user can select by clicking AND/OR using the keyboard: tab/enter
    - upon selection, the tag will change to whatever account is chosen and its corresponding username
    - several attributes are added. `id`, `tabIndex`, `className`, `onClick`, `onKeyUp`, `role`, `src`, `alt`, `title`, placed where appropriate.
    - the `onClick` and `onKeyUp` are event handlers tied to methods within the class/component `<Suggestion/>`
    - `this.handleKeyUp()` simply refers to `this.handleClick()`
    - `handleClick()` gets the prop data, `this.props.screen_name`, and calls the prop `this.props.onSelect` passing in that screen_name data. `this.props.onSelect` is actually tied to the the parent's method `this.handleSelect()` which accepts the parameter `this.props.screen_name`!
    - this is a classic React example of a Child component passing data to its Parent component
    - THEN...
    - the parent component method `handleSelect` loops through all the text in the textarea, and if `this.state.currentSearch` == the currently iterated value, the text will be swapped out with the new, selected username!
    - `.focus()` is brought back to the `<textarea>` manually after that.
    - lastly, `this.state.currentInput` is modified with the newly updated `.value` of `<textarea>`


## Additonal Features:

1. **Prevent duplicate requests**
  - all requests made to the TwitterAPI are cached in `this.state.prevSearches` as an object like so
  - SEE App.js `this.state`
  - `this.state = { prevSearches:
      { possibleUsername : [
        { screen_name: "user1", profile_image_url: "user1.jpg" },
        { screen_name: "user2", profile_image_url: "user2.jpg" }
      ]
  }  
}`

  - each time a `@username` is identified in the `<textarea>`, an if statement sees if the search has already been made and stored
  - if it has NOT already been searched, an `axios` call is made, data is stored in `this.state.prevSearches`, and then that data is queried and put on the screen as suggestions
  - if it HAS already been searched, no `axios` call is made, and the data that already exists in `this.state.prevSearches` is used. No duplicate XHR request!

2. **Debounce**
   - Debounce was created using the `this.state.allowXHR` in the component `<TwitterTextArea>`.
   - This was a boolean state of `allowXHR: bool` in which XHR requests could be made while the state was `true`.
   - At first, lodash debounce was used. However, I did not fully understand the code or syntax, and had trouble getting it to fire properly. With too many bugs from using a system that I didn't write, I opted to create my own kind of debounce.
   - On each `handleChange()` of the `<textarea>`, the `state` value is set to false, so no XHR requests are made using `axios()`.
   - `this.setState({ allowXHR: false });`
   - immediately after, a `setTimeout(this.allowXHR, 250)` is called that calls the `this.allowXHR` method which changes the state back
   - `this.setState({ allowXHR: true});`
   - thus, after a short delay, additional tags to searches can be made
   - the shortcoming and bug of this system is that if the last character of a tag is typed while `allowXHR: false`, it will not register. If I had more time, I would write something that handles this, perhaps testing for inactivity while an "@" tag is being typed up.

3. **Design**
  - Mostly copies modern twitter
  - modern twitter is nuts. the place to type a tweet is incredibly complicated. not even a textarea! which is how they style the `@tags` differently

4. **Keyboard Navigation**
   - Suggestions are given keyboard functionality. The mouse does not have to be used at all.

5. **Characters Remaining**
  - `this.state.charactersLeft` starts at `280` and each time `handleChange()` is called, the characters update.

6. **WAI-ARIA attributes**
  - ADA roles are given to <div> elements that actually act as `<ul>` and `<li>` elements which would not be clear to a screen reader. However, these are not used throughout the application.

## Notes

- several comments and `console.log()`s are left behind for reference as to what the code is doing or what I was trying to figure out
- `handleChange()` is a bit long. perhaps it could be refactored into a few different methods that can be called as helpers, such as the `axios()` call
- the app can handle multiple `@tags` in one tweet but is unable to edit tags after additional text has been added
