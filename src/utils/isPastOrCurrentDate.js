import moment from "moment";

export const isPastAndTodayDate = (date) => {
    return moment(date).isSameOrBefore(moment());
};