"use strict";

import { Router } from "express";
import resolve from "../utils/promises/index.js";
import handler from "./handlers/catfactsHandler.js";

const router = Router();

router.get("/fromSource", async (req, res, next) => {
  // Call handler to response with data
  const [result, error] = await resolve(handler.getListFromAPI());
  if (error) {
    next(error);
  } else {
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(500);
    }
  }
});

router
  .route("/fromSource/:id")
  .get(async (req, res, next) => {
    const [fact, error] = await resolve(handler.getCatFact(req.params.id));

    if (error) {
      next(error);
    } else {
      if (fact) {
        res.status(200).json(fact);
      } else {
        res.status(404);
        next(new Error("Could not find Fact"));
      }
    }
  })
  .patch(async (req, res, next) => {
    const [fact, error] = await resolve(
      handler.editCatFact(req.params.id, req.body)
    );
    if (error) {
      next(error);
    } else {
      if (fact) {
        res.status(200).json(fact);
      } else {
        res.status(400);
        next(new Error("Could not find Fact"));
      }
    }
  })
  .delete(async (req, res, next) => {
    const [message, error] = await resolve(
      handler.deleteCatFact(req.params.id)
    );
    if (error) {
      next(error);
    } else {
      if (message) {
        res.status(200).json(message);
      } else {
        res.status(400);
        next(new Error("Invalid Fact ID"));
      }
    }
  });

export default router;
