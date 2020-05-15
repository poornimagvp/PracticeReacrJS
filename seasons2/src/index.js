import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = { lat: null, errorMessage: null };

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude });
      },
      err => {
        this.setState({ errorMessage: err.message });
      }
    )
  }

  componentDidMount() {
    console.log('My Component was rendered to the screen');
  }

  componentDidUpdate() {
    console.log('My component was just updated - it re-rendered');
  }

  // render must always be defiened
  render(){
    if(!this.state.errorMessage && this.state.lat){
      return <div>Latitude is: {this.state.lat}</div>
    }

    if(!this.state.lat && this.state.errorMessage){
      return <div>Error:: {this.state.errorMessage}</div>
    }

    return <div>loading ... </div>
  }
}

ReactDOM.render(<App/>, document.querySelector('#root'));

/*
  When a state is changes, render method is called again
*/

/*
Life Cycle methods

 - Component Life cycle method is a function that we can call optionally define inside our class based components
    1. Constructor (Optional)
    2. render (required)
    3.  -- Content visible on the screen --
    4. ComponentDidMount
    5. -- sit and wait for an update
    6. ComponentDidUpdate
    7. -- sit and wait until this component is no longer shown

 - Constructor function: is a function that we can call optionally define, If we do it will be automatically called when a new instance of our component is created.
 - Immediately after a cmponent shows up on the screen of our browser a lifecycle method calls 'ComponentDidMount' is called
 - After the state is updated, the component will re-render itself or essentially update itself.
 - Then another lifecycle method is called Component Did Update will be called automatically, It will go on being called untill the state is updated
 - when the component is no longer shown the component will unmount method will be automatically called. This method will be usually used if we wnat to do some kind of clean up after our component 


  - The constructor function is a good place to do our state initialization, we can also do some data loading inside of a constructor
  - render should only return some JSX
  - ComponentDidMount: is a perfect location to do some initial data loading for your component, This method gets invoked only one time
  - ComponentDidUpdate: gets called every single time that a component is updated for any reasons. Maybe our state changes or our component gets a new set of propd from its parent
  - ComponentDidUpdate: Is used anythime that we are about to remove the component from the screen and we need to do some clean up after it. 
  - Other Life Cycle methods (rarely used)
    - shouldComponentUpdate
    - getDerivedStateFromProps
    - getSnapshotBeforeUpdate
*/