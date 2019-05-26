import React from "react";
import { storage } from "../../../server/database/firebase.js";
class CVUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cvFile: "",
      cvFileUrl: "",
      progress: ""
    };
  }
  handleFileChange(e) {
    if (e.target.files[0]) {
      const cvFile = e.target.files[0];
      this.setState(() => ({ cvFile }));
    }
  }
  handleFileUpload() {
    const { cvFile } = this.state;
    const uploadTask = storage.ref(`files/${cvFile.name}`).put(cvFile);
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
        // console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("files")
          .child(cvFile.name)
          .getDownloadURL()
          .then(cvFileUrl => {
            setTimeout(() => {
              this.setState({ cvFileUrl, cvFile: cvFile.name, progress: 0 });
            }, 2000);
            this.props.changeCV(cvFileUrl);
          });
      }
    );
  }
  render() {
    const style = {
      float: "left",
      height: "20vh",
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
              // id="inputGroupFileAddon01"
              onClick={this.handleFileUpload.bind(this)}
            >
              Upload
            </button>
          </div>
          <div className="custom-file">
            <input
              type="file"
              accept=".doc,.docx,.txt,.pdf"
              data-max-size="5000"
              onChange={this.handleFileChange.bind(this)}
              //   onClick={() => console.log("ggggg")}
            />
            <label

            // htmlFor="inputGroupFile01"
            >
              Choose file
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <input
              type="text"
              value={this.state.cvFile || "uploaded file"}
              height="100"
              width="100"
              readOnly
              disabled
            />
          </div>
          <div className="col-sm-4">
            <progress value={this.state.progress} max="100" />

            <label>{this.state.progress === 100 ? "Done!" : null}</label>
          </div>
          <div className="col-sm-4" />
        </div>
      </div>
    );
  }
}

export default CVUpload;
