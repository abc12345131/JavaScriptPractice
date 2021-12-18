import format from 'date-fns/format'

export default function () {
  const formatTime = (value: number | Date, formatStr: string='yyyy-MM-dd HH:mm:ss'): string => {
    return format(value, formatStr);
  }
  return formatTime
};
