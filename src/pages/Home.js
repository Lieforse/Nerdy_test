import React from "react";
import { connect } from "react-redux";

import Navbar from "../components/home/Navbar";
import Announcements from "../components/home/Announcements";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar announcements={this.props.announcements} />
        <div className="container announcements-container">
          <Announcements announcements={this.props.announcements} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    announcements: state.filteredAnnouncements,
  };
};

export default connect(mapStateToProps)(Home);
