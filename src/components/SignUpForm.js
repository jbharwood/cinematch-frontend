import React from 'react'
import {connect} from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import API_URL from '../config.js'

class SignUpForm extends React.Component {

	constructor(props) {
    super(props)
    this.topRef = React.createRef()   // Create a ref for scrolling
  }

	state = {
		username: "",
		password: "",
		passwordConfirmation: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
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

	handleSubmit = (e) => {
		if(this.state.password === this.state.passwordConfirmation) {
			fetch(`${API_URL}/users`, {
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
	          this.props.dispatch({type: "SET_CURRENT_USER", payload: response})
						this.props.history.push(`/`)
						this.postToFeedUsers(response.user)
					}
				})
		} else {
			alert("Passwords don't match!")
		}
		//this.props.dispatch({type: "HIDE_APP", payload: false})
	}

	componentDidMount = () => {
		// let page = document.querySelector(".Dashboard-content-12")
		// page.scrollTo(0, 0)
		document.querySelector("main").scrollTo(0,0)
		//this.props.dispatch({type: "HIDE_APP", payload: true})
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
				<Form.Field>
		      <label>Password Confirmation</label>
		      <input onChange={this.handleChange} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} placeholder='Password Confirmation' />
		    </Form.Field>
		    <Button type='submit'>Sign Up</Button>
		  </Form>
			</div>
		)
	}
}

export default connect(null)(SignUpForm)
