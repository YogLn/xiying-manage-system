import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const DATA_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(utcString, dateFormat = DATA_FORMAT) {
  return dayjs.utc(utcString).utcOffset(8).format(dateFormat)
}
