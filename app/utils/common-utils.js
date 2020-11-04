import moment from "moment";

const sortByDate = (posters) => {
    return posters.sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
};
export {sortByDate};
