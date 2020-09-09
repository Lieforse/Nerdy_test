export function searchAnnouncements(value) {
  return {
    type: "SEARCH_ANNOUNCEMENTS",
    value,
  };
}

export function detailAnnouncement(id) {
  return {
    type: "DETAIL_ANNOUNCEMENT",
    id,
  };
}

export function getSimilarAnnouncementsAction() {
  return {
    type: "SIMILAR_ANNOUNCEMENTS",
  };
}

export function addAnnouncement(form) {
  return {
    type: "ADD_ANNOUNCEMENT",
    form,
  };
}

export function deleteAnnouncementAction(id) {
  return {
    type: "DELETE_ANNOUNCEMENT",
    id,
  };
}

export function editAnnouncementAction(form) {
  return {
    type: "EDIT_ANNOUNCEMENT",
    form,
  };
}
