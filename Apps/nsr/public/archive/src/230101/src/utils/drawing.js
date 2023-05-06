import store from 'store2';

const basepath = sessionStorage.getItem('basepath');

/**
 * @function
 * @name formatArea
 * @description
 * calculate the area of draw
 * @param {number} {area}
 * @returns {object} area object
 */
export const formatArea = (area) => {
  let output;
  output = `${(Math.round(area * 100) / 100)}`;
  if (store(`${basepath}-unitType`) === 'imperial') {

    let squareFeets = output * 10.76391042;
    if (squareFeets > 27878400) {
      let miles = squareFeets/27878400;
      output = { number: miles.toFixed(2), unit: 'milesSqaure', unitType: 'imperial' };
    } else {
      output = { number: squareFeets.toFixed(2), unit: 'feetSqaure', unitType: 'imperial' };
    }

  } else {

    if (area > 1000000) {
      output = { number: (Math.round(area / 1000000 * 100) / 100), unit: 'kmSquare', unitType: 'metric' };
    } else {
      output = { number: (Math.round(area * 100) / 100), unit: 'mSqaure', unitType: 'metric' };
    }

  }
  output.type = 'AREA';
  output.typeValue = area;
  output.value = numbersWithComa(output.number);
  return output;
};

/**
 * @function
 * @name lengthFunction
 * @description
 * calculate the length the draw
 * @param {number} {length}
 * @returns {object} length object
 */
export const lengthFunction = (length) => {
  let output;
  output = Math.round(length * 100) / 100;
  if (store(`${basepath}-unitType`) === 'imperial') {
    let feets = output * 3.2808;

    if (feets > 5280) {
      let miles = feets / 5280;
      output = { number: miles.toFixed(2), unit: 'mi', unitType: 'imperial' };
    } else {
      output = { number: feets.toFixed(2), unit: 'ft', unitType: 'imperial' };
    }

  } else {
    if (length > 1000) {
      output = { number: (Math.round(length / 1000 * 100) / 100), unit: 'km', unitType: 'metric' };
    } else {
      output = { number: length.toFixed(2), unit: 'm', unitType: 'metric' };
    }
    
  }
  output.type = 'LENGTH';
  output.typeValue = length;
  output.value = numbersWithComa(output.number);
  return output;
};

/**
 * @function
 * @name measureLength
 * @description
 * measure the length of line draw
 * @param {number} {length}
 * @returns {string} length with unit
 */
export const measureLength = (length) => {
  let output;
  let unit;
  const translation = store(`${basepath}-translation`);
  output = Math.round(length * 100) / 100;
  if (store(`${basepath}-unitType`) === 'imperial') {
    let feets = output * 3.2808;
    if (feets > 5280) {
      let miles = feets / 5280;
      unit = 'mi'
      output = miles.toFixed(2) + ` ${translation[unit]}`;
    } else {
      unit = 'ft'
      output = feets.toFixed(2) + ` ${translation[unit]}`;
    }
  } else {
    if (length > 1000) {
      unit = 'km'
      output = (Math.round(length / 1000 * 100) / 100) + ` ${translation[unit]}`;
    } else {
      unit = 'm'
      output = length.toFixed(2) + ` ${translation[unit]}`;
    }
  }
  return output;
};

/**
 * @function
 * @name measureArea
 * @description
 * measure the area of polygon draw
 * @param {number} {area}
 * @returns {string} area with unit
 */
export const measureArea = (area) => {
  let output;
  let unit;
  const translation = store(`${basepath}-translation`);
  const language = store(`${basepath}-lang`);
  output = `${(Math.round(area * 100) / 100)}`;
  if (store(`${basepath}-unitType`) === 'imperial') {
    let squareFeets = output * 10.76391042;
    if (squareFeets > 27878400) {
      let miles = squareFeets / 27878400;
      unit = 'milesSqaure'
      output = language === "HE" ? miles.toFixed(2) + ` ${translation[unit]}` : miles.toFixed(2) + ' mi\xB2';
    } else {
      unit = 'feetSqaure'
      output = language === "HE" ? squareFeets.toFixed(2) + ` ${translation[unit]}` : squareFeets.toFixed(2) + ' ft\xB2';
    }
  } else {
    if (area > 1000000) {
      unit = 'kmSquare'
      output = language === "HE" ? (Math.round(area / 1000000 * 100) / 100) + ` ${translation[unit]}` : (Math.round(area / 1000000 * 100) / 100) + ' km\xB2';
    } else {
      unit = 'mSqaure'
      output = language === "HE" ? (Math.round(area * 100) / 100) + ` ${translation[unit]}` : (Math.round(area * 100) / 100) + ' m\xB2';
    }
  }
  // console.log("output", output);
  return output;
};

/**
 * @function
 * @name areaOutput
 * @description
 * provide area output with translation
 * @param {object} {input}
 * @returns {string} area with translation
 */
export const areaOutput = (input) => {
  let output;
  const translation = store(`${basepath}-translation`);
  output = `${input.value} ${translation[input.unit]}`;
  return output;
};

/**
 * @function
 * @name stringDivider
 * @description
 * replace the white space
 * @param {string} {str, width, spaceReplacer}
 * @returns {string} str
 */
export const stringDivider = (str, width, spaceReplacer) => {
  if (str.length > width) {
    var p = width;
    while (p > 0 && str[p] !== ' ' && str[p] !== '-') {
      p--;
    }
    if (p > 0) {
      var left;
      if (str.substring(p, p + 1) === '-') {
        left = str.substring(0, p + 1);
      } else {
        left = str.substring(0, p);
      }
      var right = str.substring(p + 1);
      return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
    }
  }
  return str;
}

/**
 * @function
 * @name numbersWithComa
 * @description
 * add the comma in number
 * @param {number} {value}
 * @returns {string} comma added value
 */
export const numbersWithComa = value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

/**
 * @function
 * @name circleMeasurement
 * @description
 * set the circle area measurement
 * @param {number} {radius}
 * @returns {number} area
 */
export const circleMeasurement = (radius, selectedUnitType) => {
  let output;
  let ciclrArea =  Math.PI * radius * radius;
  if (store(`${basepath}-unitType`) === 'imperial') {

    let squareFeets = ciclrArea * 10.76391042;
    if (squareFeets > 27878400) {
      let miles = squareFeets/27878400;
      output = { number: miles.toFixed(2), unit: 'milesSqaure', unitType: 'imperial' };
    } else {
      output = { number: squareFeets.toFixed(2), unit: 'feetSqaure', unitType: 'imperial' };
    }

  } else {

    if (ciclrArea > 1000000) {
      output = { number: (Math.round(ciclrArea / 1000000 * 100) / 100), unit: 'kmSquare', unitType: 'metric' };
    } else {
      output = { number: (Math.round(ciclrArea * 100) / 100), unit: 'mSqaure', unitType: 'metric' };
    }

  }
  output.type = 'AREA';
  output.typeValue = ciclrArea;
  output.value = numbersWithComa(output.number);
  return output;
}