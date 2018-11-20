import React, { Component } from 'react';
import UserInfoComponent from './UserInfoComponent';
import StoreInventoryComponent from './StoreInventoryComponent';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteDream } from '../../actions/actions';

class AuthDreamInventory extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.deleteDream = deleteDream.bind(this);
  }

  deleteDream = (id) => {
    console.log('DELETE: ', id);
    this.props.dispatch(this.deleteDream(id));
    window.alert('are you sure?');
  }
  
  render() {
    console.log(this.props, 'wya');
    if (this.props.dreamProps !== undefined) {
    return this.props.dreamProps.map(dreams =>
      <div className='AuthDreamInventory'>
        <Link key={dreams.id} to={"/dreams/" + dreams.id}>
          <div className="dream-list">
            <div className="img-wrapper">
              <img className="dream-images" src={dreams.dream_images} alt="No Images" />
            </div>
            <div className="copy">
              <h3>{dreams.title}</h3>
              <p>${dreams.price}</p>
            </div>
          </div>
        </Link>
        <button onClick={() => this.props.deleteDream(dreams.id)}>Delete</button>
        <Link to={'/edit_dream/' + dreams.id}><button>Edit</button></Link>
      </div>
    )
  } else {
    return (
      <div>Hi</div>
    )
  }
  }
}



export default AuthDreamInventory;
