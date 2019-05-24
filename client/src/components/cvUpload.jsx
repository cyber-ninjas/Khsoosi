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
            this.setState({ cvFileUrl, cvFile: cvFile.name });
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
      <div style={style}>
        <progress value={this.state.progress} max="100" />
        <br />
        <label>{this.state.progress === 100 ? "Done!" : null}</label>
        <input
          type="file"
          accept=".doc,.docx,.txt,.pdf"
          data-max-size="5000"
          onChange={this.handleFileChange.bind(this)}
        />
        <button onClick={this.handleFileUpload.bind(this)}>
          Upload Your CV Here
        </button>
        <br />
        <input
          type="text"
          value={this.state.cvFile || "uploaded file"}
          height="100"
          width="100"
          readOnly
          disabled
        />
      </div>
    );
  }
}

export default CVUpload;
