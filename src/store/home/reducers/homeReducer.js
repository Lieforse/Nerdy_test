const initialState = {
  announcements: [
    {
      id: 1,
      title: "Non ullamco laborum eiusmod culpa.",
      description: "Eu sunt est velit consequat magna sint minim cillum ea ex.",
      date: "02.03.2020",
    },
    {
      id: 2,
      title: "Est cupidatat id dolor tempor voluptate.",
      description:
        "Amet sunt sunt amet qui irure labore ut laborum enim nulla in labore voluptate.",
      date: "02.05.2020",
    },
    {
      id: 3,
      title: "Morbi quis lectus ligula.",
      description:
        "Nulla pharetra tristique leo sit amet suscipit. Curabitur tempus non nisi eget imperdiet.",
      date: "10.05.2020",
    },
    {
      id: 4,
      title: "Maecenas pulvinar sed lacus non cursus.",
      description:
        "Integer non fringilla odio. Etiam imperdiet erat erat, id cursus lectus consectetur eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "15.06.2020",
    },
    {
      id: 5,
      title: "Nam luctus laoreet velit id vehicula.",
      description:
        "Etiam quam turpis, porttitor vestibulum dapibus in, pharetra id libero. Vivamus dignissim volutpat pellentesque.",
      date: "20.06.2020",
    },
    {
      id: 6,
      title: "Ut accumsan tempus lorem, sed malesuada magna facilisis eu.",
      description:
        "Suspendisse congue mauris erat, eu dapibus lacus fermentum maximus. Nulla eget dui sem.",
      date: "30.06.2020",
    },
    {
      id: 7,
      title: "Ut tristique sapien libero, id consectetur ante commodo id.",
      description:
        "Proin vestibulum eros non sapien feugiat luctus. Nulla ac varius neque, ac sagittis orci. Donec a sagittis odio, sit amet blandit nisl.",
      date: "11.07.2020",
    },
    {
      id: 8,
      title: "Vivamus eget faucibus sem, a blandit tellus.",
      description:
        "In placerat aliquet nulla, ac congue diam varius eu. Sed id justo lacus. Suspendisse sit amet erat ac urna dignissim bibendum eu nec enim.",
      date: "20.08.2020",
    },
  ],
  filteredAnnouncements: [
    {
      id: 1,
      title: "Non ullamco laborum eiusmod culpa.",
      description: "Eu sunt est velit consequat magna sint minim cillum ea ex.",
      date: "02.03.2020",
    },
    {
      id: 2,
      title: "Est cupidatat id dolor tempor voluptate.",
      description:
        "Amet sunt sunt amet qui irure labore ut laborum enim nulla in labore voluptate.",
      date: "02.05.2020",
    },
    {
      id: 3,
      title: "Morbi quis lectus ligula.",
      description:
        "Nulla pharetra tristique leo sit amet suscipit. Curabitur tempus non nisi eget imperdiet.",
      date: "10.05.2020",
    },
    {
      id: 4,
      title: "Maecenas pulvinar sed lacus non cursus.",
      description:
        "Integer non fringilla odio. Etiam imperdiet erat erat, id cursus lectus consectetur eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      date: "15.06.2020",
    },
    {
      id: 5,
      title: "Nam luctus laoreet velit id vehicula.",
      description:
        "Etiam quam turpis, porttitor vestibulum dapibus in, pharetra id libero. Vivamus dignissim volutpat pellentesque.",
      date: "20.06.2020",
    },
    {
      id: 6,
      title: "Ut accumsan tempus lorem, sed malesuada magna facilisis eu.",
      description:
        "Suspendisse congue mauris erat, eu dapibus lacus fermentum maximus. Nulla eget dui sem.",
      date: "30.06.2020",
    },
    {
      id: 7,
      title: "Ut tristique sapien libero, id consectetur ante commodo id.",
      description:
        "Proin vestibulum eros non sapien feugiat luctus. Nulla ac varius neque, ac sagittis orci. Donec a sagittis odio, sit amet blandit nisl.",
      date: "11.07.2020",
    },
    {
      id: 8,
      title: "Vivamus eget faucibus sem, a blandit tellus.",
      description:
        "In placerat aliquet nulla, ac congue diam varius eu. Sed id justo lacus. Suspendisse sit amet erat ac urna dignissim bibendum eu nec enim.",
      date: "20.08.2020",
    },
  ],
  detailAnnouncement: {},
  similarAnnouncements: [],
  error: false,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_ANNOUNCEMENTS": {
      let newState = { ...state };
      const value = action.value.toLowerCase();
      newState.filteredAnnouncements = state.announcements.filter((item) =>
        item.title.toLowerCase().includes(value)
      );
      return newState;
    }
    case "DETAIL_ANNOUNCEMENT": {
      let newState = { ...state };
      const id = action.id;
      let announcement = state.filteredAnnouncements.filter(
        (item) => item.id === Number(id)
      );

      if (announcement.length !== 0) {
        newState.detailAnnouncement = announcement[0];
      } else {
        newState.error = true;
      }
      return newState;
    }
    case "SIMILAR_ANNOUNCEMENTS": {
      if (state.error) {
        return state;
      }
      let newState = { ...state };
      let item = (
        state.detailAnnouncement.title +
        " " +
        state.detailAnnouncement.description
      )
        .toLowerCase()
        .replace(/[.,]/g, "")
        .split(" ");

      let similarAnnouncementsIDs = [];
      state.announcements.forEach((elem) => {
        if (state.detailAnnouncement.id !== elem.id) {
          let announcementsItem = (elem.title + " " + elem.description)
            .toLowerCase()
            .replace(/[.,!?]/g, "")
            .split(" ");

          announcementsItem = new Set(announcementsItem);
          let res = new Set(item.filter((i) => announcementsItem.has(i)));

          let obj = {
            id: elem.id,
            similarities: Array.from(res).length,
          };

          similarAnnouncementsIDs.push(obj);
        }
      });

      similarAnnouncementsIDs = similarAnnouncementsIDs
        .sort((a, b) => b.similarities - a.similarities)
        .splice(0, 3);

      const similarAnnouncements = [];

      state.announcements.forEach((element) => {
        similarAnnouncementsIDs.forEach((item) => {
          if (item.id === element.id) {
            similarAnnouncements.push(element);
          }
        });
      });

      newState.similarAnnouncements = similarAnnouncements;

      return newState;
    }
    case "ADD_ANNOUNCEMENT": {
      const form = action.form;
      const rawDate = new Date();

      let date = `${
        rawDate.getDate() < 10 ? "0" + rawDate.getDate() : rawDate.getDate()
      }.${
        rawDate.getMonth() < 10
          ? "0" + (rawDate.getMonth() + 1)
          : rawDate.getMonth() + 1
      }.${rawDate.getFullYear()}`;

      let newElem = {
        id: state.announcements[state.announcements.length - 1].id + 1,
        title: form.title,
        description: form.description,
        date: date,
      };

      return {
        ...state,
        announcements: [...state.announcements, newElem],
        filteredAnnouncements: [...state.filteredAnnouncements, newElem],
      };
    }
    case "DELETE_ANNOUNCEMENT": {
      let newState = { ...state };
      const id = action.id;
      const elemId = state.announcements.findIndex((item) => item.id === id);
      let announcements = state.announcements;
      announcements.splice(elemId, 1);

      newState.announcements = announcements;
      newState.filteredAnnouncements = announcements;

      return newState;
    }
    case "EDIT_ANNOUNCEMENT": {
      const form = action.form;
      const rawDate = new Date();

      let date = `${
        rawDate.getDate() < 10 ? "0" + rawDate.getDate() : rawDate.getDate()
      }.${
        rawDate.getMonth() < 10
          ? "0" + (rawDate.getMonth() + 1)
          : rawDate.getMonth() + 1
      }.${rawDate.getFullYear()}`;

      let editedAnnouncements = state.announcements.map((item) =>
        item.id === form.id
          ? {
              ...item,
              title: form.title,
              description: form.description,
              date: date,
            }
          : item
      );

      let editedAnnouncementID = editedAnnouncements.findIndex(
        (item) => item.id === form.id
      );

      return Object.assign({}, state, {
        announcements: editedAnnouncements,
        filteredAnnouncements: editedAnnouncements,
        detailAnnouncement: editedAnnouncements[editedAnnouncementID],
      });
    }
    default:
      return state;
  }
};

export default homeReducer;
