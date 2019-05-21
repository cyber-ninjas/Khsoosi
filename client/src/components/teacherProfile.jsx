import React from 'react';

class TeacherProfile extends React.Component {
  
	render() {
    // const style = {
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center'
    // };
    
    return (
      <div >

			  <img src={this.props.imgUrl || 'https://via.placeholder.com/100x100'} alt = 'uploaded images' height='100' width='100' /><br/>
				<a href = {this.props.cvFileUrl || "javascript:alert('No file exist');" } > CV </a><br/>
				<form>
					<p>Please select your class time:</p>
  				{/* <input type="radio" name="gender" value=""/> <br/>  */}
  				<input type="submit" value="Submit"/>
				</form>

      </div>
    )
  }
}

export default TeacherProfile;