import { ZodSchema } from "zod";


export const validate = (schema) => {
  return async(req, res, next) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody; // Assign the parsed body back to req.body
      next();
    } catch (error) {
      if (error instanceof Error && "format" in error) {
        // If error is ZodError
        const formatted = error.format();
        return res.status(400).json({ errors: formatted });
      }

      // Generic fallback
      return res.status(400).json({ message: "Invalid request data" });
    }
  };
};
