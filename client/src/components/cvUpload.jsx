import React from 'react';

class CVUpload extends React.Component {
	render() {
		return (
			<div className="cvDiv">
				<div className="input-group">
					<div className="input-group-prepend">
						<button
							className="uploadBtn btn btn-outline-primary btn-sm"
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
					<div className="col-sm-12">
						<progress className="progBar" value={this.props.cvProgress} max="100" />
					</div>
				</div>
			</div>
		);
	}
}

export default CVUpload;
