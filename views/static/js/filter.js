const { isSameDay } = require("date-fns");
const { format } = require("date-fns-tz");

function reformPostDate(postObjDate) {
  const currentDate = new Date();
  const postDate = new Date(postObjDate.setHours(postObjDate.getHours() +9))

  if (isSameDay(postDate, currentDate)) {
    return format(postDate, "kk:mm");
  } else {
    return format(postDate, "yyyy-MM-dd");
  }
}

function reformPostDateRaw(postObjDate) {
  const dateObj = new Date(postObjDate);
  const currentDate = new Date();
  const postDate = new Date(dateObj.setHours(dateObj.getHours() +9))
  
  if (isSameDay(postDate, currentDate)) {
    return format(postDate, "kk:mm");
  } else {
    return format(postDate, "yyyy-MM-dd");
  } 

}

async function paginatedResults(page, selectedData) {
  const take = 6;
  const totalDataCount = selectedData.length;
  const startIndex = (page - 1) * take;
  const endIndex = page * take;

  const slicedData = selectedData.slice(startIndex, endIndex);
  const lastPage = Math.ceil(totalDataCount / take);

  const unitSize = 3;
  const numOfUnits = Math.floor((page - 1) / unitSize);
  const unitStart = numOfUnits * unitSize + 1;
  const unitEnd = unitStart + (unitSize - 1);
  const paginatedDemand = { page, slicedData, lastPage, unitStart, unitEnd };

  return {
    ...paginatedDemand,
  };
}

module.exports = {
  reformPostDate,
  paginatedResults,
  reformPostDateRaw
};
