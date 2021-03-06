import React from 'react'
import {connect} from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import API_URL from '../config.js'

class LoginForm extends React.Component {

	constructor(props) {
    super(props)
    this.topRef = React.createRef()   // Create a ref for scrolling
  }

	state = {
		username: "",
		password: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	postUser = () => {
		fetch(`${API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then((response) => {
			if (response.errors) {
				alert(response.errors)
			} else {
					// we need to login at the top level where we are holding our current user!
					// setState in App to currentuser
				this.props.setCurrentUser(response.user)
				this.props.dispatch({type: "SET_CURRENT_USER", payload: response.user})
				localStorage.setItem('jwt', response.jwt)
				this.props.history.push(`/`)
				this.postToFeedUsers(response.user)
			}
		})
	}

	postToFeedUsers = (user) => {
		fetch(`${API_URL}/feed_users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify({username: user.username, feed_id: 1, user_id: user.id})
		})
		.then(res => res.json())
		.then((response) => {
			if (response.errors) {
				alert(response.errors)
			} else {
				this.props.dispatch({type: "SET_FEED_USER", payload: response})
			}
		})
	}

	handleSubmit = () => {
		this.postUser()
	}

	componentDidMount = () => {
		document.querySelector("main").scrollTo(0,0)
	}

	render(){
		return (
			<div className="top" ref={this.topRef}>
			<Form onSubmit={this.handleSubmit}>
		    <Form.Field>
		      <label>Username</label>
		      <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
		    </Form.Field>
		    <Form.Field>
		      <label>Password</label>
		      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
		    </Form.Field>
		    <Button type='submit'>Log In</Button>
		  </Form>
			</div>
		)
	}
}

export default connect(null)(LoginForm)
