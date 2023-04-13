const dateFormatter = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  const orderDate = [year, month, day, hours, minutes, seconds, milliseconds];
  return orderDate;
};

module.exports = { dateFormatter };
