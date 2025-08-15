import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be at most 80 characters")
    .regex(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes, and hyphens allowed"),
  email: z.string().email("Invalid email address"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be at most 100 characters"),
  services: z
    .array(z.enum(["UI/UX", "Branding", "Web Dev", "Mobile App"]))
    .min(1, "Please select at least one service"),
  budgetUsd: z
    .number({ invalid_type_error: "Budget must be a number" })
    .int("Budget must be an integer")
    .min(100, "Minimum budget is 100 USD")
    .max(1000000, "Maximum budget is 1,000,000 USD")
    .optional(),
  projectStartDate: z
    .string()
    .refine((date) => {
      const today = new Date();
      const selected = new Date(date);
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, { message: "Start date must be today or later" }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
