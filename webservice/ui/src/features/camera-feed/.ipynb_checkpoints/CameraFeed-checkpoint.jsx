import React from "react";
import "./CameraFeed.css";
import { HTTP, SETTINGS } from "../../constants/constants";

class CameraFeed extends React.Component {
  constructor(props) {
    super(props);
    this.mjpgSrc = HTTP.CAMERA_FEED;
    this.refreshImage = this.refreshImage.bind(this);
    this.mjpgSrc = HTTP.CAMERA_FEED;

    this.state = {
      mjpgSrc: this.mjpgSrc,
      show: true,
      button_text: "HIDE",
    };
  }
  refreshImage() {
    const d = new Date();
    this.setState({ mjpgSrc: `${this.mjpgSrc}?ver=${d.getTime()}` });
  }
  operation() {

    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()

    if (this.state.show) {
      this.setState({
        show: this.state.show = false,
        button_text: this.state.button_text = "SHOW"
      })
    } else {
      this.setState({
        show: this.state.show = true,
        button_text: this.state.button_text = "HIDE"
      })
    }
  }

  

  render() {
    const width = SETTINGS.CAMERA_FEED_WIDTH;//640
    const imgStyle = { "maxWidth": `${width}px` };
    return (
      <div className="camera-feed" >
        <div className="camera-feed-container">
          <audio className="audio-element">
            <source src="https://www.soundjay.com/button/button-25.mp3"></source>
          </audio>
          <button className="flat_button" onClick={() => this.operation()} oncli> {this.state.button_text} </button>
          {
            this.state.show ?
              <img src={this.state.mjpgSrc} alt="camera feed" style={imgStyle} onClick={this.refreshImage} className="camera-feed-img" />
              : null
          }
        </div>
      </div>
    );
  }
}

export default CameraFeed;