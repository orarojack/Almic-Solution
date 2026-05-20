import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactSubmissionsTable, insertContactSchema } from "@workspace/db";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = insertContactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.issues });
    return;
  }

  try {
    const [submission] = await db
      .insert(contactSubmissionsTable)
      .values(parsed.data)
      .returning();
    req.log.info({ id: submission.id }, "Contact submission saved");
    res.status(201).json({ success: true, id: submission.id });
  } catch (err) {
    req.log.error({ err }, "Failed to save contact submission");
    res.status(500).json({ error: "Failed to save submission" });
  }
});

export default router;
