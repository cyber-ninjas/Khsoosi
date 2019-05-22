import React from "react";

class ImageUpload extends React.Component {
  render() {
    const style = {
      float: "left",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div style={style}>
        <progress value={this.props.progress} max="100" />
        <br />
        <input
          type="file"
          accept="image/*"
          data-max-size="5000"
          onChange={this.props.handleImgChange.bind(this)}
        />

        <br />
        <img
          src={this.props.imgUrl || "https://via.placeholder.com/100x100"}
          alt="uploaded images"
          height="100"
          width="100"
        />
        <button onClick={this.props.handleImgUpload.bind(this)}>
          Upload Your Image Here
        </button>
      </div>
    );
  }
}

export default ImageUpload;
