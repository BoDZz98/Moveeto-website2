export function convertMinutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return { hours, minutes: remainingMinutes };
}

export function convertToShortForm(num: number) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + " B";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + " M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + " K";
  }
  return num.toString();
}
