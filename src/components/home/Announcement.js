import React from "react";
import { Link } from "react-router-dom";

class Announcement extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4>{this.props.item.title}</h4>
          <p>{this.props.item.description}</p>
        </div>
        <div className="card-info">
          <div className="info-container">
            <p className="date">
              <span className="mdi mdi-calendar"></span>
              {this.props.item.date}
            </p>
          </div>
          <Link to={`/${this.props.item.id}`}>
            <button className="btn btn-dark">Read more</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Announcement;
