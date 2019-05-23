import React from "react";

class CVUpload extends React.Component {
<<<<<<< HEAD
	render() {
		return (
			<div>
				<div className="input-group">
					<div className="input-group-prepend">
						<button
							type="button"
							id="inputGroupFileAddon01"
							onClick={this.props.handleFileUpload.bind(this)}
						>
							Upload
						</button>
					</div>
					<div className="custom-file">
						<input
							className="custom-file-input"
							id="inputGroupFile01"
							aria-describedby="inputGroupFileAddon01"
							type="file"
							accept=".doc,.docx,.txt,.pdf"
							data-max-size="5000"
							onChange={this.props.handleFileChange.bind(this)}
						/>
						<label className="custom-file-label" htmlFor="inputGroupFile01">
							Choose file
						</label>
					</div>
				</div>
				<div className="row">
					<div className="cvDiv col-sm-4"> </div>
					<div className="col-sm-4">
						<progress className="center" value={this.props.cvProgress} max="100" />
					</div>
					<div className="col-sm-4" />
				</div>
			</div>
		);
	}
=======
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
        <progress value={this.props.progress} max="100" />
        <br />
        <input
          type="file"
          accept=".doc,.docx,.txt,.pdf"
          data-max-size="5000"
          onChange={this.props.handleFileChange.bind(this)}
        />
        <button onClick={this.props.handleFileUpload.bind(this)}>
          Upload Your CV Here
        </button>
        <br />
        <input
          type="text"
          value={this.props.cvFile || "uploaded file"}
          height="100"
          width="100"
          readOnly
          disabled
        />
      </div>
    );
  }
>>>>>>> 21236832d5ef59d647b965a40e7e9bf92b917aa6
}

export default CVUpload;
