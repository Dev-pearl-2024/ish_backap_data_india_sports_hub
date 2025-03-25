import moment from "moment";

export const isLessThan24Hours = (date) => {
  return moment().diff(moment(date), 'hours') < 24;
};