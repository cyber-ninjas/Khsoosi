import React, { Component } from 'react';

class ImageUpload extends Component {
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
				<progress value={props.progress} max='100' />
				<br/>
        <input type = 'file' onChange={e => props.onChange(e)} />
        <button onClick= {e => props.onClick(e)} >Upload Your Image Here</button>
			  <br/>
			  <img src={props.urlImg || 'https://via.placeholder.com/400x300'} alt = 'uploaded images' height='300' width='400' />
      </div>
    )
  }
}

export default ImageUpload;