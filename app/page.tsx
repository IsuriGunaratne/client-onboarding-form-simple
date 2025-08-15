"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema, OnboardingFormData } from "@/lib/schema";
import { useState } from "react";

export default function Home() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<OnboardingFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (data: OnboardingFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ONBOARD_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit. Please try again.");
      }

      setSubmitSuccess(data);
    } catch (err: any) {
      setSubmitError(err.message);
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-green-100 border border-green-300 p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-2">✅ Submission Successful!</h2>
          <p className="text-gray-700">Thanks {submitSuccess.fullName}, we received your request.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full space-y-6"
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-black mb-4">
          Client Onboarding
        </h1>

        {submitError && (
          <div className="bg-red-100 text-red-700 p-3 rounded border border-red-300">
            {submitError}
          </div>
        )}

        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="fullName" className="font-medium mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Company Name */}
        <div className="flex flex-col">
          <label htmlFor="companyName" className="font-medium mb-1">
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            {...register("companyName")}
            className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
          )}
        </div>

        {/* Services */}
        <fieldset className="flex flex-col">
          <legend className="font-medium mb-2">Services Interested In</legend>
          <div className="flex flex-wrap gap-3">
            {["UI/UX", "Branding", "Web Dev", "Mobile App"].map((service) => (
              <label
                key={service}
                className="flex items-center gap-2 bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200"
              >
                <input type="checkbox" value={service} {...register("services")} />
                <span>{service}</span>
              </label>
            ))}
          </div>
          {errors.services && (
            <p className="text-red-500 text-sm mt-1">{errors.services.message}</p>
          )}
        </fieldset>

        {/* Budget */}
        <div className="flex flex-col">
          <label htmlFor="budgetUsd" className="font-medium mb-1">
            Budget (USD)
          </label>
          <input
            id="budgetUsd"
            type="number"
            {...register("budgetUsd", { valueAsNumber: true })}
            className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.budgetUsd && (
            <p className="text-red-500 text-sm mt-1">{errors.budgetUsd.message}</p>
          )}
        </div>
        {/* Project Start Date */}
        <div className="flex flex-col">
          <label htmlFor="projectStartDate" className="font-medium mb-1">
            Project Start Date
          </label>
          <input
            id="projectStartDate"
            type="date"
            {...register("projectStartDate")}
            className="border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.projectStartDate && (
            <p className="text-red-500 text-sm mt-1">{errors.projectStartDate.message}</p>
          )}
        </div>

        {/* Accept Terms */}
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("acceptTerms")} />
          <span>I accept the terms and conditions</span>
        </label>
        {errors.acceptTerms && (
          <p className="text-red-500 text-sm mt-1">{errors.acceptTerms.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
