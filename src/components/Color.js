import React from "react";
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { SketchPicker } from 'react-color';


class Color extends React.Component {

  state = {
      background: '#fff',
    };

    handleChangeComplete = (color) => {
      this.setState({ background: color.hex });
      console.log(color.hex);
      this.props.dispatch({type: "SET_PRIMARY_COLOR", payload: color.hex})
    };

    renderColorPicker = () => {
      if (this.props.open === true) {
        return (
          <div className="colorPicker">
            <SketchPicker
              color={ this.state.background }
              onChangeComplete={ this.handleChangeComplete }
            />
          </div>
        )
      } else {
        return (
          <div className="colorPickerOpen">
            <SketchPicker
              color={ this.state.background }
              onChangeComplete={ this.handleChangeComplete }
            />
          </div>
        )
      }
    }

    componentDidMount = () => {
      document.querySelector("main").scrollTo(0,0)
    }

    render() {
      return (
        <div>
          {this.renderColorPicker()}
        </div>
      );
    }

}

function mapStateToProps(state){
  return {
    primaryColor: state.primaryColor,
  }
}

export default connect(mapStateToProps)(Color)
