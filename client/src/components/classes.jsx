import React from "react";
class Classes extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
     
    return (
        <div>
          <p>you'r schedule</p>
            <button onClick={this.props.searchClasses.bind(this)}>Classes</button>
            {
              this.props.result.map((data,indx)=>{
              // console.log('kdfk')
             return( <div key={indx}>
                <p>day:{data.day}</p>
                <p>at:{data.startHour}</p>
                <p>end:{data.endHour}</p>
                <br></br>
              </div>
             )
            })}
        </div>

    )
  }  
}
export default Classes;

// function (name, index) {
//   return(
//   <div key={name.id}>
//        <div>{name.img}</div>
//        <div >{name.name}</div>
//       <div>{name.summary}</div>
//       <div>{name.reat}</div>
//     <br></br>
//     </div>
//     )