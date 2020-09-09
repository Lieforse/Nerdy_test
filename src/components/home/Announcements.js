import React from "react";
import Announcement from "./Announcement";
import { Pagination } from "../Pagination";

class Announcements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsPerPage: 10,
      currentPage: 1,
    };

    this.paginateAnnouncements = this.paginateAnnouncements.bind(this);
  }

  paginateAnnouncements = () => {
    const indexOfLastPost = this.state.postsPerPage * this.state.currentPage;
    const indexOfFistPost =
      (this.state.currentPage - 1) * this.state.postsPerPage;
    const currentPosts = this.props.announcements.slice(
      indexOfFistPost,
      indexOfLastPost
    );

    return currentPosts.map((item) => (
      <Announcement item={item} key={item.id} />
    ));
  };

  paginate = (number) => {
    this.setState({ currentPage: number });
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div className="col-auto">
        {this.paginateAnnouncements()}
        <Pagination
          announcements={this.props.announcements}
          postsPerPage={this.state.postsPerPage}
          paginate={this.paginate}
        />
      </div>
    );
  }
}

export default Announcements;
