import React from 'react'
import {connect} from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

class SignUpForm extends React.Component {
	state = {
		username: "",
		password: ""
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (e) => {
		fetch("http://localhost:3000/users", {
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
				}
			})
	}

	render(){
		return (
			<Form onSubmit={this.handleSubmit}>
		    <Form.Field>
		      <label>Username</label>
		      <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
		    </Form.Field>
		    <Form.Field>
		      <label>Password</label>
		      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
		    </Form.Field>
		    <Button type='submit'>Sign Up</Button>
		  </Form>
		)
	}
}

// export default SignUpForm
export default connect(null)(SignUpForm)
