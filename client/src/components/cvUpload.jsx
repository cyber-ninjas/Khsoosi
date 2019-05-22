import React from 'react';

class CVUpload extends React.Component {
	render() {
		const style = {
			float: 'left',
			height: '20vh',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center'
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
				<button onClick={this.props.handleFileUpload.bind(this)}>Upload Your CV Here</button>
				<br />
				<input
					type="text"
					value={this.props.cvFile || 'uploaded file'}
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
