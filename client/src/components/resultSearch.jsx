import React, { Component } from "react";

class ResultSearch extends Component {
  stars(rate) {
    let items = [];
    for (let index = 0; index < Math.floor(rate / 2); index++) {
      items.push(<i className="fa fa-star" key={index} />);
    }
    return items;
  }

  render() {
    const that = this;

    return (
      <div>
        <br />
        {this.props.resultOfSer.length > 0 ? (
          this.props.resultOfSer.map(function(name, index) {
            return (
              <div
                key={index}
                className="card"
                name={name.id}
                onClick={that.props.openModal.bind(this, name.id)}
              >
                <img src={name.img} style={{ width: 100 + "%" }} />
                <h2 className="cardtext">{name.name}</h2>
                <h3 className="cardtext">{name.summary}</h3>
                <h3 className="cardtext">{name.reatingText}</h3>
                <span className="stars">Rate: {that.stars(name.rate)}</span>
                <br />
              </div>
            );
          })
        ) : (
          <h1 id="notfound">
            Sorry, we could not find a match for your search
          </h1>
        )}
      </div>
    );
  }
}

export default ResultSearch;
