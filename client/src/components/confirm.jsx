import React from "react";

class Conform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookes: []
    };
  }
  componentDidMount() {
    this.confirm();
  }
  confirm(e) {
    // e.preventDefault();
    // console.log(this.props.current_teacherId, "from cccccccccc");
    return fetch(`/conform?teacherId=${this.props.current_teacherId}`, {
      method: "GET",
      header: {
        Accept: "application/json"
      }
    })
      .then(result => (result = result.json()))
      .then(result => {
        this.setState({ bookes: result });
        // console.log(this.state.bookes);
      })
      .catch(err => {
        console.log({ err: "error" }, err);
      });
  }
  answer(e) {
    e.preventDefault();
    // console.log(e.target.name, e.target.value);
    fetch(
      `/conformAnswer?id=${e.target.name}&confirmed=${
        e.target.value
      }&teacherId=${this.props.current_teacherId}`,
      {
        method: "GET",
        header: {
          Accept: "application/json"
        }
      }
    )
      .then(result => (result = result.json()))
      .then(result => {
        // console.log(this.state.bookes);
        this.setState({ bookes: result });
        // console.log(this.state.bookes);
      });
  }
  render() {
    var is_disabled = true;
    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <h3>Confirm</h3>
            <table className="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">Student Name</th>
                  <th scope="col">Day</th>
                  <th scope="col">Start Hour</th>
                  <th scope="col">End Hour</th>
                  <th scope="col">Confirmed</th>
                  <th scope="col">-</th>
                  <th scope="col">-</th>
                </tr>
              </thead>
              <tbody>
                {this.state.bookes.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.name}</td>
                      <td>{data.day}</td>
                      <td>{data.start}</td>
                      <td>{data.end}</td>
                      <td>{data.confirmed}</td>
                      {data.confirmed === "Yes" || data.confirmed === "No"
                        ? (is_disabled = true)
                        : (is_disabled = false)}
                      <td>
                        <button
                          className="btn btn-primary"
                          name={data.id}
                          value="Yes"
                          disabled={is_disabled}
                          onClick={e => this.answer(e)}
                        >
                          Accept
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          name={data.id}
                          value="No"
                          disabled={is_disabled}
                          onClick={e => this.answer(e)}
                        >
                          No
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default Conform;
