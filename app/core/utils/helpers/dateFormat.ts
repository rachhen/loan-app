import moment from "moment"

export const format = "DD MMM YYYY"
export const dateFormat = (date) => moment(date).format(format)
