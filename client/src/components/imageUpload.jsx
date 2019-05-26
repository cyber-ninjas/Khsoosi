import React from "react";
import { storage } from "../../../server/database/firebase.js";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imgUrl: "",
      progress: 0
    };
  }
  componentDidMount() {
    this.setState({
      imgUrl: this.props.imgUrl
    });
  }
  handleImgChange(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
      // this.setState({ image });
    }
  }

  handleImgUpload() {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //progress function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(imgUrl => {
            setTimeout(() => {
              this.setState({ imgUrl, progress: 0 }, () =>
                this.props.changeImg(this.state.imgUrl)
              );
            }, 2000);
          });
      }
    );
  }

  render() {
    const style = {
      float: "left",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    };

    return (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button
              type="button"
              //   id="inputGroupFileAddon02"
              onClick={this.handleImgUpload.bind(this)}
            >
              Upload
            </button>
          </div>
          <div className="custom-file">
            <input
              className="custom-file-input"
              //   id="inputGroupFile02"
              aria-describedby="inputGroupFileAddon02"
              type="file"
              accept="image/*"
              data-max-size="5000"
              onChange={this.handleImgChange.bind(this)}
            />
            <label
              className="custom-file-label"
              //   htmlFor="inputGroupFile02"
              value=""
            >
              Choose file
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <img
              src={
                this.props.imgUrl ||
                "https://firebasestorage.googleapis.com/v0/b/khsoosi-upload-file-img.appspot.com/o/images%2Fcbde4e59089dcada08218b49a815175d.svg?alt=media&token=0804202d-9e8f-4a41-9be6-836a37a5475e"
              }
              alt="uploaded images"
              height="100"
              width="100"
            />
          </div>
          <div className="col-sm-4">
            <progress value={this.state.progress} max="100" />
          </div>
          <div className="col-sm-4" />
        </div>
      </div>
    );
  }
}

export default ImageUpload;
