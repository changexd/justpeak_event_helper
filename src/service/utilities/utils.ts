export function ThisWeek(date: Date) {
  const tempDate = new Date(date);
  const currentDay = date.getDay();
  // console.log(currentDay)
  const currentDate = date.getDate();
  if (currentDay < 5) {
    tempDate.setDate(6 - currentDay + currentDate);
  } else {
    tempDate.setDate(6 + 7 - currentDay + currentDate);
  }
  return tempDate;
}
