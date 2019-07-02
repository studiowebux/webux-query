// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: trim.js
 * Author: Tommy Gingras
 * Date: 2018-07-05
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

/**
 * check if the object is empty
 * @param {Object} object mandatory
 * @return {Boolean} if empty or not
 */
const isEmptyObject = object => {
  return !Object.keys(object).length;
};

/**
 * check against an array of limitation a field provided in the query
 * @param {Array} select The value of the query parameters, Mandatory
 * @param {Array} limitation The list of blacklisted elements, Mandatory
 * @param {Array} validSelect the default select valued, Mandatory
 * @return {Array} The select fields (projection) or false,
 */
module.exports = (select, limitation, validSelect) => {
  try {
    if (!select || !limitation) {
      throw new Error(
        "the select and limitation fields are required and must be an array"
      );
    }
    limitation.forEach(element => {
      delete select[element];
    });

    // if nothing is provide in the select variable, return the default one.
    if (validSelect && isEmptyObject(select)) {
      return validSelect;
    } else {
      return select;
    }
  } catch (e) {
    return false;
  }
};
