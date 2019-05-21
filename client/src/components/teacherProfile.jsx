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

			  <img src={this.props.teacherInfo.imgUrl || 'https://via.placeholder.com/100x100'} alt = 'uploaded images' height='100' width='100' /><br/>
				<a href = {this.props.teacherInfo.cvFileUrl || "javascript:alert('No file exist');" } > CV </a><br/>
				
					<p>Please select your class time:</p>
  				{/* <input type="radio" name="gender" value=""/> <br/>  */}
					<button onClick={this.props.gitTeacherProfile}>show</button>
				

      </div>
    )
  }
}

export default TeacherProfile;