import React from 'react';

class ImageUpload extends React.Component {
	render() {
		const style = {
			float: 'left',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center'
		};

		return (
			<div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<button
							className="uploadBtn btn btn-outline-primary btn-sm"
							type="button"
							id="inputGroupFileAddon01"
							onClick={this.props.handleImgUpload.bind(this)}
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
							accept="image/*"
							data-max-size="5000"
							onChange={this.props.handleImgChange.bind(this)}
						/>
						<label className="custom-file-label" htmlFor="inputGroupFile01" value="">
							Choose file
						</label>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-4">
						<img
							src={
								this.props.imgUrl ||
								'https://firebasestorage.googleapis.com/v0/b/khsoosi-upload-file-img.appspot.com/o/images%2Fcbde4e59089dcada08218b49a815175d.svg?alt=media&token=0804202d-9e8f-4a41-9be6-836a37a5475e'
							}
							alt="uploaded images"
							height="100"
							width="100"
						/>
					</div>
					<div className="col-sm-4">
						<progress value={this.props.imageProgress} max="100" />
					</div>
					<div className="col-sm-4" />
				</div>
			</div>
		);
	}
}

export default ImageUpload;
