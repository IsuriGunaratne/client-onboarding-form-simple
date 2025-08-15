import { onboardingSchema } from "../lib/schema";

describe("onboardingSchema", () => {
  const validData = {
    fullName: "Ada Lovelace",
    email: "ada@example.com",
    companyName: "Analytical Engines Ltd",
    services: ["UI/UX", "Web Dev"],
    budgetUsd: 50000,
    projectStartDate: "2025-09-20",
    acceptTerms: true,
  };

  it("validates correct data", () => {
    expect(() => onboardingSchema.parse(validData)).not.toThrow();
  });

  it("rejects invalid email", () => {
    const invalid = { ...validData, email: "not-an-email" };
    expect(() => onboardingSchema.parse(invalid)).toThrow();
  });

  it("rejects missing required service", () => {
    const invalid = { ...validData, services: [] };
    expect(() => onboardingSchema.parse(invalid)).toThrow();
  });

  it("rejects start date in the past", () => {
    const invalid = { ...validData, projectStartDate: "2000-01-01" };
    expect(() => onboardingSchema.parse(invalid)).toThrow();
  });

  it("rejects when terms are not accepted", () => {
    const invalid = { ...validData, acceptTerms: false };
    expect(() => onboardingSchema.parse(invalid)).toThrow();
  });
});
