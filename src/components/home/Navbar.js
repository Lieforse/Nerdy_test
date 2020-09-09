import React from "react";
import { connect } from "react-redux";
import {
  searchAnnouncements,
  addAnnouncement,
} from "../../store/home/actions/homeActions";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createAnnouncement: "",
      isActive: "",
    };
  }

  announcementsFilterSearch = (event) => {
    let value = event.target.value;
    this.props.searchAnnouncements(value);
  };

  openAddSection = () => {
    let description = document.getElementById("description-js");
    if (this.state.isActive === "active") {
      this.setState({ isActive: "" });
      description.removeEventListener("keydown", resize);
    } else {
      this.setState({ isActive: "active" });
      description.addEventListener("keydown", resize);
    }

    function resize() {
      let el = this;
      el.style.cssText = "height:auto; padding:0";
      el.style.cssText = "height:" + el.scrollHeight + "px";
    }
  };

  submitAddition = () => {
    let title = document.getElementById("title-js");
    let description = document.getElementById("description-js");

    const form = {
      title: title.value,
      description: description.value,
    };

    this.props.addAnnouncement(form);
    this.setState({ isActive: "" });
    title.value = "";
    description.value = "";
  };

  render() {
    return (
      <React.Fragment>
        <div className="sort-bar">
          <div className="container">
            <p className="results">
              Showing {this.props.announcements.length} results{" "}
            </p>

            <input
              type="text"
              className="form-control"
              placeholder="search"
              onChange={this.announcementsFilterSearch}
            />

            <div
              className="btn btn-success"
              onClick={() => this.openAddSection()}
            >
              <span className="mdi mdi-plus"></span>Add
            </div>
          </div>
        </div>
        <div
          className={`container create-article ${this.state.isActive}`}
          id="create-article-js"
        >
          <input
            type="text"
            placeholder="title"
            className="form-control"
            id="title-js"
          />
          <textarea
            type="textarea"
            placeholder="title"
            className="form-control"
            id="description-js"
            rows="1"
            placeholder="description"
          />
          <div
            className="btn btn-success"
            onClick={() => this.submitAddition()}
          >
            Submit
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchAnnouncements: (value) => {
      dispatch(searchAnnouncements(value));
    },
    addAnnouncement: (form) => {
      dispatch(addAnnouncement(form));
    },
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
