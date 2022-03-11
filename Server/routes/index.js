"use strict";

import { Router } from "express";

// Import routes
import catRoutes from "./catfacts.js";

const router = Router({
  caseSensitive: true,
});

// Use imported routes in router
router.use(catRoutes);

export default router;
