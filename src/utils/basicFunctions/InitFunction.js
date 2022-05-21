import { Linking } from "react-native";

const __selectDeselect = (value, data, matchKey) => {
  let checkData = data;

  if (
    checkData.filter((item) =>
      matchKey ? item[matchKey] === value[matchKey] : item === value
    ).length === 0
  ) {
    checkData.push(value);
  } else {
    checkData = checkData.filter((item) =>
      matchKey ? item[matchKey] !== value[matchKey] : item !== value
    );
  }
  return checkData;
};

function __localSearch(dataArray, searchText, searchableDataArray) {
  let text = searchText.replace(/[^\w\s]/gi, "");
  let regexp = new RegExp(text, "gi");
  let tempData = [];

  if (
    searchableDataArray &&
    searchableDataArray.length !== 0 &&
    searchableDataArray !== null &&
    searchableDataArray !== undefined
  ) {
    searchableDataArray.forEach((searchableValue) => {
      dataArray.forEach((dataValue) => {
        if (String(dataValue[searchableValue]).match(regexp)) {
          const isAvailable = tempData.some(
            (childValue) => dataValue == childValue
          );
          if (!isAvailable) {
            tempData.push(dataValue);
          }
        }
      });
    });
  } else {
    tempData = dataArray.filter((e) =>
      Object.values(e).join("").toLowerCase().match(regexp)
    );
  }
  return tempData;
}

function __arrangeSwipableData(data) {
  if (!data) return [];
  data = data.map((item, i) => {
    item.key = String(i);
    return item;
  });
  return data;
}

function __addDash(data, addAdditional) {
  let tempData = {};
  let checkArray = ["", "NaN", NaN, null, undefined, "undefined", "null"];
  checkArray =
    addAdditional && addAdditional.length >= 1
      ? [...checkArray, ...addAdditional]
      : checkArray;
  Object.keys(data).map((item) => {
    const check = checkArray.includes(data[item]);
    tempData = {
      ...tempData,
      [item]: check
        ? "-"
        : typeof data[item] == "string"
        ? data[item].trim()
        : data[item],
    };
  });
  return tempData;
}

function __createGroup(data, numColumns) {
  const dataGroup = [];
  let groupCount = 0;
  let group = [];
  data.map((item, index) => {
    if (groupCount === 0 && index !== 0) {
      dataGroup.push(group);
      group = [];
    }
    group.push(item);
    groupCount++;
    if (groupCount === numColumns) groupCount = 0;
    if (data.length - 1 === index) dataGroup.push(group);
  });
  return dataGroup;
}

function __addBlank(data, addAdditional) {
  let tempData = {};
  let checkArray = ["", "-", "NaN", NaN, null, undefined, "undefined", "null"];
  checkArray =
    addAdditional && addAdditional.length >= 1
      ? [...checkArray, ...addAdditional]
      : checkArray;
  Object.keys(data).map((item) => {
    const check = checkArray.includes(data[item]);
    tempData = {
      ...tempData,
      [item]: check
        ? ""
        : typeof data[item] == "string"
        ? data[item].trim()
        : data[item],
    };
  });
  return tempData;
}

function __openWhatsapp(number) {
  Linking.openURL(`https://wa.me/+91${number}`);
}

function __sendSMS(number) {
  Linking.openURL(`sms:${number}`);
}

function __doCall(number) {
  Linking.openURL(`tel:${number}`);
}

function __sendMail(email) {
  Linking.openURL(`mailto:${email}`);
}

export {
  __selectDeselect,
  __localSearch,
  __addDash,
  __addBlank,
  __openWhatsapp,
  __sendSMS,
  __doCall,
  __sendMail,
  __arrangeSwipableData,
  __createGroup,
};
