import React from "react";

class SignUp extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state={
  //     is_teacher: false
  //   }
  // }
  // onchangingRideo(e){
  //   e.target.id === "teacher" ?
  //   this.setState({is_teacher:true}):
  //   this.setState({is_teacher:false})
      
  // }
  render(){
  
    return(
      <div>
        <h2>SignUp</h2>
        <label htmlFor="student"></label>
        <input type="radio" name="is_teacher" id="student" value = "false" onChange={this.props.onchangingSignUp.bind(this)}/>
        <label htmlFor="taecher"></label>
        <input type="radio" name="is_teacher" id="teacher" value = "true" onChange={this.props.onchangingSignUp.bind(this)}/>
        <input type="text" name="userName" placeholder="your name" onChange={this.props.onchangingSignUp.bind(this)}/>
        <input type="text" name="email" placeholder="eng.aymanhariri@gmaill.com" onChange={this.props.onchangingSignUp.bind(this)}/>
        <input type="text" name="password" placeholder="*****" onChange={this.props.onchangingSignUp.bind(this)}/>
        <input type="text" name="phone" placeholder="780045533" onChange={this.props.onchangingSignUp.bind(this)}/>
        <input type="text" name="location" placeholder="Amman" onChange={this.props.onchangingSignUp.bind(this)}/>
        <input type="button" value="SignUp" onClick={this.props.onSignUp.bind(this)}/>
      </div>
    )
  }
}
export default SignUp;