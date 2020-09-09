import React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import {
  detailAnnouncement,
  getSimilarAnnouncementsAction,
  deleteAnnouncementAction,
  editAnnouncementAction,
} from "../store/home/actions/homeActions";
import SimilarAnnouncements from "../components/detailAnnouncement/SimilarAnnouncements";

class DetailAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isActive: "",
      allowMount: false,
    };
  }

  componentDidMount() {
    this.getDetailAnnouncement();
    this.getSimilarAnnouncements();
  }

  getDetailAnnouncement = () => {
    const id = this.props.match.params.id;
    this.props.detailAnnouncement(id);
  };

  getSimilarAnnouncements = () => {
    this.props.getSimilarAnnouncementsAction();
  };

  deleteAnnouncement = (id) => {
    this.props.deleteAnnouncementAction(id);
    this.setState({ redirect: true });
  };

  editAnnouncement = () => {
    const title = document.getElementById("title-edit-js");
    const description = document.getElementById("description-edit-js");
    const announcement = this.props.announcement;

    if (this.state.isActive === "active") {
      this.setState({ isActive: "" });
      description.removeEventListener("keydown", resize);
    } else {
      this.setState({ isActive: "active" });
      description.addEventListener("keydown", resize);
      title.value = announcement.title;
      description.value = announcement.description;
      description.style.cssText = "height:" + description.scrollHeight + "px";
    }

    function resize() {
      let el = this;
      el.style.cssText = "height:auto; padding:0";
      el.style.cssText = "height:" + el.scrollHeight + "px";
    }
  };

  submitEditing = () => {
    const title = document.getElementById("title-edit-js");
    const description = document.getElementById("description-edit-js");

    const form = {
      id: this.props.announcement.id,
      title: title.value,
      description: description.value,
    };

    this.props.editAnnouncementAction(form);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    if (this.props.error) {
      return <Redirect push to="/404" />;
    } else {
      return (
        <div className="detail-article">
          <div className="container">
            <div className="col-auto">
              <div className="card">
                <div className="card-body">
                  <h3>{this.props.announcement.title}</h3>
                  <p className="date">
                    <span className="mdi mdi-calendar"></span>
                    {this.props.announcement.date}
                  </p>
                  <p>{this.props.announcement.description}</p>
                </div>
                <div className="card-info">
                  <div
                    className={`edit-container ${this.state.isActive}`}
                    id="edit-article-js"
                  >
                    <input
                      type="text"
                      placeholder="title"
                      className="form-control"
                      id="title-edit-js"
                    />
                    <textarea
                      type="textarea"
                      placeholder="description"
                      className="form-control"
                      id="description-edit-js"
                      rows="2"
                      placeholder="description"
                    />
                    <div
                      className="btn btn-success"
                      onClick={() => this.submitEditing()}
                    >
                      Submit
                    </div>
                  </div>
                  <div className="btns-container">
                    <div
                      className="btn btn-info"
                      onClick={() => this.editAnnouncement()}
                    >
                      <span className="mdi mdi-pencil"></span>
                      Edit
                    </div>
                    <div
                      className="btn btn-danger"
                      onClick={() =>
                        this.deleteAnnouncement(this.props.announcement.id)
                      }
                    >
                      <span className="mdi mdi-delete"></span>
                      Delete
                    </div>
                  </div>
                </div>
              </div>
              <SimilarAnnouncements
                similarAnnouncements={this.props.similarAnnouncements}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    announcement: state.detailAnnouncement,
    similarAnnouncements: state.similarAnnouncements,
    announcements: state.announcements,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    detailAnnouncement: (id) => {
      dispatch(detailAnnouncement(id));
    },
    getSimilarAnnouncementsAction: () => {
      dispatch(getSimilarAnnouncementsAction());
    },
    deleteAnnouncementAction: (id) => {
      dispatch(deleteAnnouncementAction(id));
    },
    editAnnouncementAction: (form) => {
      dispatch(editAnnouncementAction(form));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailAnnouncement);
