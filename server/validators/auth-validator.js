import { z } from "zod";

export const signupSchema = z
  .object({
    firstname: z.string({ required_error: "First name is required" })
      .trim()
      .min(3, { message: "First name must be at least 3 characters long" }),

    lastname: z.string({ required_error: "Last name is required" })
      .trim()
      .min(3, { message: "Last name must be at least 3 characters long" }),

    email: z.string({ required_error: "Email is required" })
      .email({ message: "Invalid email format" })
      .transform((val) => val.toLowerCase()), // store lowercase like mongoose

    password: z.string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
        message: "Password must contain uppercase, lowercase, and a number",
      }),

    confirmPassword: z.string({ required_error: "Confirm password is required" }),

    role: z.enum(["seller", "renter"], {
      required_error: "Role is required",
    }),

    aadharCard: z.string().optional(), // will validate manually if seller
  })
  .superRefine((data, ctx) => {
    // Password confirmation check
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }

    // Aadhaar validation if role === seller
    if (data.role === "seller") {
      if (!data.aadharCard || !/^\d{12}$/.test(data.aadharCard)) {
        ctx.addIssue({
          code: "custom",
          message: "Aadhar must be exactly 12 digits",
          path: ["aadharCard"],
        });
      }
    }
  });
