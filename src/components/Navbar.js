import React from 'react'
import { Grid, Menu, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class Navbar extends React.Component {

	logout = () => {
		this.props.logout()
		// localStorage.removeItem('userId')
	}

	render(){
		return (
			<Grid.Row>
      <h1>Cinematch</h1>
				<Grid.Column width={16}>
				<Menu>
					<Link className="item" to="/search">
						Search
					</Link>
					<Link className="item" to="/watchlist">
						Watchlist
					</Link>
						{this.props.user
							?
								<Menu.Menu position="right">
									<Link className="item" to="/login" onClick={this.logout} >
										Logout
									</Link>
								</Menu.Menu>
							:
								<Menu.Menu position="right">
									<Link className="item" to="/login">
										Login
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
