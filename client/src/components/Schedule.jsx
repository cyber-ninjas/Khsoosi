import React from 'react';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { ScheduleVariables } = this.props;
    return (
      <div>
        <form >
          <input type="checkbox" /> <label>Sunday</label> <input placeholder="from"/> <input placeholder="to"/> <br />
          <input type="checkbox" /> <label>Monday</label>  <input placeholder="from"/> <input placeholder="to"/> <br />
          <input type="checkbox" /> <label>Tuesday</label> <input placeholder="from"/> <input placeholder="to"/> <br />
          <input type="checkbox" /> <label>Wednesday</label> <input placeholder="from"/> <input placeholder="to"/> <br />
          <input type="checkbox" /> <label>Thursday</label> <input placeholder="from"/> <input placeholder="to"/> <br />
          <input type="checkbox" /> <label>Friday</label> <input placeholder="from"/> <input placeholder="to"/> <br />
          <input type="checkbox" /> <label>Saturday</label> <input placeholder="from"/> <input placeholder="to"/>
        </form>
      </div>
    )
  }
}

export default Schedule;