import moment from "moment";

export const sortByDate = (posters) => {
    return posters.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
};
