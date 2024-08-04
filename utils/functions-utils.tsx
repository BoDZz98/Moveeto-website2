import { reviewObj } from "@/models/reviewsModel";

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

export function getCurrentDate() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // January is 0
  const year = currentDate.getFullYear();
  let newMonth = month.toString();
  month < 10 ? (newMonth = `0${month}`) : "";

  return `${year}-${newMonth}-${day}`;
}

export function getDate(days: number, identifier: string) {
  const currentDate = new Date();
  identifier === "prev"
    ? currentDate.setDate(currentDate.getDate() - days)
    : currentDate.setDate(currentDate.getDate() + days);

  const day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // January is 0
  const year = currentDate.getFullYear();
  let newMonth = month.toString();
  month < 10 ? (newMonth = `0${month}`) : "";

  return `${year}-${newMonth}-${day}`;
}

export function formatDate(dateGot: String | any) {
  var date = new Date(dateGot); // dateStr you get from mongodb

  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

export function getMostRepeatedRating(data: reviewObj[]) {
  const ratingArray = ["Skip", "Bad", "Meh", "Recommended", "Exeptional"];

  const ratingCount: { [key: string]: number } = {};

  data.forEach((item) => {
    if (ratingCount[item.rating]) {
      ratingCount[item.rating]++;
    } else {
      ratingCount[item.rating] = 1;
    }
  });

  let mostRepeatedRating = 0;
  let maxCount = 0;

  for (const [rating, count] of Object.entries(ratingCount)) {
    if (count > maxCount) {
      mostRepeatedRating = parseInt(rating);
      maxCount = count;
    }
  }
  // console.log(mostRepeatedRating);
  return ratingArray[mostRepeatedRating - 1];
}
