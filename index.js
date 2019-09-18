// ███╗   ███╗██╗██████╗ ██████╗ ██╗     ███████╗██╗    ██╗ █████╗ ██████╗ ███████╗
// ████╗ ████║██║██╔══██╗██╔══██╗██║     ██╔════╝██║    ██║██╔══██╗██╔══██╗██╔════╝
// ██╔████╔██║██║██║  ██║██║  ██║██║     █████╗  ██║ █╗ ██║███████║██████╔╝█████╗
// ██║╚██╔╝██║██║██║  ██║██║  ██║██║     ██╔══╝  ██║███╗██║██╔══██║██╔══██╗██╔══╝
// ██║ ╚═╝ ██║██║██████╔╝██████╔╝███████╗███████╗╚███╔███╔╝██║  ██║██║  ██║███████╗
// ╚═╝     ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2019-02-26
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Trim = require("./utils/trim");
const parser = require("mongo-qp");
const ParseQuery = parser.ParseQuery;
const filter = require("wordfilter");
const { errorHandler } = require("webux-errorhandler");

/**
 * check if the query parameters are safe.
 * @param {Array} blacklist The list of blacklisted elements, Mandatory
 * @param {Array} defaultSelect the default select valued, Mandatory
 * @return {VoidFunction} This is a middleware, if something wrong, return 400, otherwise continue.
 */
module.exports = (blacklist, defaultSelect) => {
  return (req, res, next) => {
    try {
      // Nothing to do
      if (!req.query) {
        return next();
      }
      
      // Define words blacklisted
      // When a user request specific information, we want to protect the sensitive datas.
      if (blacklist && blacklist.length > 0) {
        filter.addWords(blacklist);
        if (filter.blacklisted(JSON.stringify(req.query))) {
          throw new Error("Query may contains blacklisted items.");
        }
      }

      const parsedQuery = ParseQuery(req.query);

      // create custom projection
      if (parsedQuery.projection) {
        parsedQuery.projection = Trim(
          parsedQuery.projection,
          blacklist,
          defaultSelect
        );
      } else {
        parsedQuery.projection = defaultSelect; // return the default select
      }
      req.query = parsedQuery; // overwrite the req.query and continue...
      return next();
    } catch (e) {
      return next(errorHandler(400, "INVALID_REQUEST", {}, e));
    }
  };
};
