import React from 'react'
import adapter from '../services/adapter';
import {connect} from 'react-redux'

class PostForm extends React.Component {
  state = {
    value: ''
  };

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    adapter.createPost({ content: this.state.value, feed_id: 1, user_id: this.props.user.id })
      .then(post => {
        // this.props.addPost(post)
      })

    this.setState({
      value: ''
    });
  };

  render() {
    return (
      <div className="ui secondary segment postForm">
        <form onSubmit={this.handleSubmit} action="">
          <div className="ui fluid input">
            <input
              onChange={this.onChange}
              value={this.state.value}
              type="text"
            />
            <button className="ui basic blue button" type="submit">
              Add a Post
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(PostForm);
