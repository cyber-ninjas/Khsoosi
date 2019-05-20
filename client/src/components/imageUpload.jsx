import React from 'react';

class ImageUpload extends React.Component {
  
	render() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    
    return (
      <div style={style}>
        <h1>hi </h1>
				<progress value={this.props.progress} max='100' />
				<br/>
        <input type = 'file' accept="image/*" data-max-size="5000" onChange={this.props.handleImgChange.bind(this)} />
        <button onClick= {this.props.handleImgUpload.bind(this)} >Upload Your Image Here</button>
			  <br/>
			  <img src={this.props.imgUrl || 'https://via.placeholder.com/100x100'} alt = 'uploaded images' height='100' width='100' />
      </div>
    )
  }
}

export default ImageUpload;