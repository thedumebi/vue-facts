"use strict";

import fetch from "node-fetch";
import config from "../../config.js";
import model from "../../models/index.js";
import resolve from "../../utils/promises/index.js";

const Facts = model.Cats;

const functions = {
  getListFromAPI: async function () {
    const path = "/facts";

    const [facts, factsError] = await resolve(Facts.findAll());
    if (factsError) {
      throw factsError;
    }
    if (facts && facts.length > 0) {
      return facts;
    }

    const [res, error] = await resolve(
      fetch(`${config.source.url}${path}`, {
        compress: true,
        timeout: 60e3, // 60s timeout as default
        follow: 0,
        headers: {
          "content-type": "application/json",
        },
      })
    );

    if (error) {
      console.log(error);
      throw error;
    } else {
      const result = await res.json();
      await Promise.all(
        result.map((result) => {
          const cat = Facts.create(result);
          return cat;
        })
      );
      return result;
    }
  },
  getCatFact: async (id) => {
    const [fact, error] = await resolve(Facts.findByPk(id));
    if (error) throw error;

    return fact;
  },
  editCatFact: async (id, body) => {
    const [fact, error] = await resolve(Facts.findByPk(id));
    if (error) throw error;
    if (!fact) {
      return false;
    }
    await fact.update(body);

    return fact;
  },
  deleteCatFact: async (id) => {
    const [fact, error] = await resolve(Facts.findByPk(id));
    console.log(fact);
    if (error) throw error;
    if (!fact) {
      return false;
    }
    await fact.destroy();

    return { message: "Cat Deleted!" };
  },
};

export default functions;
