export default function DateInfo(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return year + (("00" + month.toString()).slice(-2)) + (("00" + day.toString()).slice(-2));
}
