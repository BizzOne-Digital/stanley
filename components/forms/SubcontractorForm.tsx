"use client";

import { useState } from "react";
import { useForm, type DefaultValues, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import {
  subcontractorFormSchema,
  type SubcontractorFormData,
} from "@/lib/validation/subcontractor";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const defaultValues = {
  fullName: "",
  phone: "",
  email: "",
  cityArea: "",
  hasLicense: undefined,
  hasTransportation: undefined,
  yearsExperience: "",
  vehicleType: "",
  availability: "",
  deliveryExperience: "",
  courierExperience: "",
  customerServiceExperience: "",
  goodFit: "",
  additionalInfo: "",
  consent: false,
  website: "",
} as DefaultValues<SubcontractorFormData>;

type FormStatus = "idle" | "loading" | "success" | "error";

export function SubcontractorForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [driversLicense, setDriversLicense] = useState<File | null>(null);
  const [proofOfInsurance, setProofOfInsurance] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubcontractorFormData>({
    resolver: zodResolver(subcontractorFormSchema) as Resolver<SubcontractorFormData>,
    defaultValues,
  });

  const onSubmit = async (data: SubcontractorFormData) => {
    const newFileErrors: Record<string, string> = {};
    if (!driversLicense) newFileErrors.driversLicense = "Driver's license is required";
    if (!proofOfInsurance) newFileErrors.proofOfInsurance = "Proof of insurance is required";
    if (Object.keys(newFileErrors).length > 0) {
      setFileErrors(newFileErrors);
      return;
    }
    setFileErrors({});

    setStatus("loading");
    setErrorMessage("");

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "website" || value === undefined) return;
        if (key === "consent") {
          formData.append(key, value ? "true" : "false");
          return;
        }
        formData.append(key, String(value));
      });
      formData.append("website", data.website ?? "");
      if (driversLicense) formData.append("driversLicense", driversLicense);
      if (proofOfInsurance) formData.append("proofOfInsurance", proofOfInsurance);
      if (resume) formData.append("resume", resume);

      const response = await fetch("/api/subcontractor", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to submit your application.");
      }

      setStatus("success");
      toast.success("Application submitted successfully!");
      reset(defaultValues);
      setDriversLicense(null);
      setProofOfInsurance(null);
      setResume(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setStatus("error");
      setErrorMessage(message);
      toast.error(message);
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-sm border border-gold/30 bg-carbon p-8 text-center metallic-edge",
          className
        )}
        role="status"
      >
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-gold" aria-hidden />
        <h3 className="font-display text-2xl uppercase tracking-wide text-ivory">
          Application Received
        </h3>
        <p className="mt-3 text-muted">
          Thank you for applying to drive with {siteConfig.shortName}. We will review your
          application and contact you if your qualifications match our current needs.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center justify-center rounded-sm bg-gold px-6 py-3 font-semibold text-black transition-colors hover:bg-gold-bright"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-10", className)}
      noValidate
    >
      {status === "error" && errorMessage && (
        <div
          className="rounded-sm border border-error/50 bg-error/10 p-4 text-sm text-error"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <FormSection title="Personal Information">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full Name" required error={errors.fullName?.message}>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              className={inputClass(errors.fullName)}
              {...register("fullName")}
            />
          </Field>

          <Field label="Phone Number" required error={errors.phone?.message}>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass(errors.phone)}
              {...register("phone")}
            />
          </Field>

          <Field label="Email Address" required error={errors.email?.message}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={inputClass(errors.email)}
              {...register("email")}
            />
          </Field>

          <Field label="City/Area" required error={errors.cityArea?.message}>
            <input
              id="cityArea"
              type="text"
              placeholder="e.g. New Orleans, Metairie"
              className={inputClass(errors.cityArea)}
              {...register("cityArea")}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Driver Information">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Valid driver's license?" required error={errors.hasLicense?.message}>
            <select
              id="hasLicense"
              className={inputClass(errors.hasLicense)}
              {...register("hasLicense")}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>

          <Field
            label="Reliable transportation?"
            required
            error={errors.hasTransportation?.message}
          >
            <select
              id="hasTransportation"
              className={inputClass(errors.hasTransportation)}
              {...register("hasTransportation")}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>

          <Field
            label="Years of driving experience"
            required
            error={errors.yearsExperience?.message}
          >
            <input
              id="yearsExperience"
              type="text"
              placeholder="e.g. 5"
              className={inputClass(errors.yearsExperience)}
              {...register("yearsExperience")}
            />
          </Field>

          <Field label="Type of vehicle" required error={errors.vehicleType?.message}>
            <input
              id="vehicleType"
              type="text"
              placeholder="e.g. Sedan, SUV, Van"
              className={inputClass(errors.vehicleType)}
              {...register("vehicleType")}
            />
          </Field>
        </div>

        <Field label="Availability" required error={errors.availability?.message}>
          <textarea
            id="availability"
            rows={3}
            placeholder="Days and times you're available to drive"
            className={cn(inputClass(errors.availability), "resize-y min-h-[80px]")}
            {...register("availability")}
          />
        </Field>
      </FormSection>

      <FormSection title="Experience">
        <Field
          label="Previous delivery experience"
          error={errors.deliveryExperience?.message}
        >
          <textarea
            id="deliveryExperience"
            rows={3}
            placeholder="Describe any prior delivery experience"
            className={cn(inputClass(errors.deliveryExperience), "resize-y min-h-[80px]")}
            {...register("deliveryExperience")}
          />
        </Field>

        <Field
          label="Courier/medical courier experience"
          error={errors.courierExperience?.message}
        >
          <textarea
            id="courierExperience"
            rows={3}
            placeholder="Describe any courier or medical courier experience"
            className={cn(inputClass(errors.courierExperience), "resize-y min-h-[80px]")}
            {...register("courierExperience")}
          />
        </Field>

        <Field
          label="Customer service experience"
          error={errors.customerServiceExperience?.message}
        >
          <textarea
            id="customerServiceExperience"
            rows={3}
            placeholder="Describe any customer service experience"
            className={cn(
              inputClass(errors.customerServiceExperience),
              "resize-y min-h-[80px]"
            )}
            {...register("customerServiceExperience")}
          />
        </Field>
      </FormSection>

      <FormSection title="Documents">
        <p className="text-sm text-muted -mt-2">
          Upload PDF, JPG, PNG, or DOC files (max 5 MB each).
        </p>

        <FileField
          id="driversLicense"
          label="Driver's license"
          required
          file={driversLicense}
          error={fileErrors.driversLicense}
          onChange={setDriversLicense}
        />

        <FileField
          id="proofOfInsurance"
          label="Proof of insurance"
          required
          file={proofOfInsurance}
          error={fileErrors.proofOfInsurance}
          onChange={setProofOfInsurance}
        />

        <FileField
          id="resume"
          label="Resume (optional)"
          file={resume}
          onChange={setResume}
        />
      </FormSection>

      <FormSection title="Final Questions">
        <Field
          label="Why would you be a good fit for Conley Logistics?"
          required
          error={errors.goodFit?.message}
        >
          <textarea
            id="goodFit"
            rows={4}
            className={cn(inputClass(errors.goodFit), "resize-y min-h-[100px]")}
            {...register("goodFit")}
          />
        </Field>

        <Field
          label="Anything else you'd like us to know?"
          error={errors.additionalInfo?.message}
        >
          <textarea
            id="additionalInfo"
            rows={3}
            className={cn(inputClass(errors.additionalInfo), "resize-y min-h-[80px]")}
            {...register("additionalInfo")}
          />
        </Field>
      </FormSection>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-gold"
          {...register("consent")}
        />
        <span className="text-sm text-muted">
          I agree to be contacted by {siteConfig.shortName} regarding this application.{" "}
          <span className="text-error">*</span>
        </span>
      </label>
      {errors.consent && (
        <p className="text-sm text-error" role="alert">
          {errors.consent.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-black transition-colors hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Submitting…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden />
            Submit Application
          </>
        )}
      </button>
    </form>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-6 rounded-sm border border-gold/20 bg-carbon/50 p-6 metallic-edge">
      <legend className="font-display text-lg uppercase tracking-wide text-gold px-2">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-ivory">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FileField({
  id,
  label,
  required,
  file,
  error,
  onChange,
}: {
  id: string;
  label: string;
  required?: boolean;
  file: File | null;
  error?: string;
  onChange: (file: File | null) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-ivory">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <input
        id={id}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
        className={cn(
          "w-full rounded-sm border bg-black px-4 py-3 text-sm text-ivory file:mr-4 file:rounded-sm file:border-0 file:bg-gold file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-gold-bright",
          error ? "border-error" : "border-graphite hover:border-gold/40"
        )}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {file && <p className="text-xs text-muted">Selected: {file.name}</p>}
      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError?: { message?: string }) {
  return cn(
    "w-full rounded-sm border bg-black px-4 py-3 text-ivory placeholder:text-muted/60 transition-colors",
    "focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50",
    hasError ? "border-error" : "border-graphite hover:border-gold/40"
  );
}
