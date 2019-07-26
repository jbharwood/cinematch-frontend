import React from "react"
import {connect} from 'react-redux'


const Home = (props) => {

  const renderPic = () => {
		// let container = document.querySelector("div.Dashboard-tableContainer-14")
    // if (container !== null) {
    //   container.innerHTML = "<img src=https://visualhunt.com/photos/1/night-television-tv-video.jpg?s=l className=mainImage width=100% height=100%>"
    // }
    return "<img src=https://visualhunt.com/photos/1/night-television-tv-video.jpg?s=l className=mainImage width=100% height=100%>"
	}

  return (
    <div className="mainImage">
      <img src="https://visualhunt.com/photos/1/night-television-tv-video.jpg?s=l" className="mainImage" width="100%" height="100%"/>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    isHidden: state.isHidden
  }
}

export default connect(mapStateToProps)(Home);
