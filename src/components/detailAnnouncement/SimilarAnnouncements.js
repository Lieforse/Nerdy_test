import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  detailAnnouncement,
  getSimilarAnnouncementsAction,
} from "../../store/home/actions/homeActions";

class SimilarAnnouncements extends React.Component {
  updateDetailAnnouncement = (id) => {
    this.props.detailAnnouncement(id);
    this.props.getSimilarAnnouncementsAction();
  };

  render() {
    return (
      <div className="row">
        {this.props.similarAnnouncements.map((item) => (
          <div className="col" key={item.id}>
            <div className="card similar-card">
              <div className="card-body">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
              <div className="card-info">
                <p className="date">
                  <span className="mdi mdi-calendar"></span>
                  {item.date}
                </p>
                <Link to={`/${item.id}`}>
                  <button
                    className="btn btn-dark"
                    onClick={() => this.updateDetailAnnouncement(item.id)}
                  >
                    Read more
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    detailAnnouncement: (id) => {
      dispatch(detailAnnouncement(id));
    },
    getSimilarAnnouncementsAction: () => {
      dispatch(getSimilarAnnouncementsAction());
    },
  };
};

export default connect(null, mapDispatchToProps)(SimilarAnnouncements);
