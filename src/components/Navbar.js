import React from 'react'
import { Grid, Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class Navbar extends React.Component {

	logout = () => {
		this.props.logout()
		localStorage.clear()
	}

	render(){
		return (
			<Grid.Row>
				<Grid.Column width={16}>
				<Menu>
						{this.props.user || this.props.currentUser
							?
								<Menu.Menu>
									<Link className="item" to="/login" onClick={this.logout} >
										Logout
									</Link>
									<Link className="item" to="/search">
										Search
									</Link>
									<Link className="item" to="/watchlist">
										Watchlist
									</Link>
									<Link className="item" to="/chatbox">
										Chatbox
									</Link>
								</Menu.Menu>
							:
								<Menu.Menu>
									<Link className="item" to="/login">
										Log In
									</Link>
									<Link className="item" to="/signup">
										Sign Up
									</Link>
								</Menu.Menu>
						}
					</Menu>
				</Grid.Column>
			</Grid.Row>
		)
	}
}

function mapStateToProps(state){
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Navbar)
