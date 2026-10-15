"use client";

import { useState } from "react";
import { useForm, type DefaultValues, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send, CheckCircle2, AlertTriangle } from "lucide-react";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validation/contact";
import { legalNotices, siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const defaultValues = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  preferredContact: "either",
  serviceInterest: "",
  pickupArea: "",
  deliveryArea: "",
  preferredDate: "",
  message: "",
  website: "",
} as DefaultValues<ContactFormData>;

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema) as Resolver<ContactFormData>,
    defaultValues,
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send your message.");
      }

      setStatus("success");
      toast.success("Message sent successfully!");
      reset(defaultValues);
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
          Message Received
        </h3>
        <p className="mt-3 text-muted">
          Thank you for contacting {siteConfig.shortName}. We will review your inquiry and
          respond as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center justify-center rounded-sm bg-gold px-6 py-3 font-semibold text-black transition-colors hover:bg-gold-bright"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-6", className)}
      noValidate
    >
      <div className="rounded-sm border border-gold/20 bg-graphite/50 p-4 space-y-2">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
          <p className="text-sm text-muted">{legalNotices.medicalWarning}</p>
        </div>
        <p className="text-sm text-muted pl-8">{legalNotices.hazardousRestriction}</p>
      </div>

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

        <Field label="Company" error={errors.company?.message}>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            className={inputClass(errors.company)}
            {...register("company")}
          />
        </Field>

        <Field label="Email" required error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClass(errors.email)}
            {...register("email")}
          />
        </Field>

        <Field label="Phone" required error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass(errors.phone)}
            {...register("phone")}
          />
        </Field>
      </div>

      <Field label="Preferred Contact Method" required error={errors.preferredContact?.message}>
        <select
          id="preferredContact"
          className={inputClass(errors.preferredContact)}
          {...register("preferredContact")}
        >
          <option value="either">Email or Phone</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </Field>

      <Field label="Service Interest" required error={errors.serviceInterest?.message}>
        <select
          id="serviceInterest"
          className={inputClass(errors.serviceInterest)}
          {...register("serviceInterest")}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Pickup Area" required error={errors.pickupArea?.message}>
          <input
            id="pickupArea"
            type="text"
            placeholder="Neighborhood, zip, or general area"
            className={inputClass(errors.pickupArea)}
            {...register("pickupArea")}
          />
        </Field>

        <Field label="Delivery Area" required error={errors.deliveryArea?.message}>
          <input
            id="deliveryArea"
            type="text"
            placeholder="Neighborhood, zip, or general area"
            className={inputClass(errors.deliveryArea)}
            {...register("deliveryArea")}
          />
        </Field>
      </div>

      <Field label="Preferred Date" error={errors.preferredDate?.message}>
        <input
          id="preferredDate"
          type="date"
          className={inputClass(errors.preferredDate)}
          {...register("preferredDate")}
        />
      </Field>

      <Field label="Message" required error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          placeholder="Describe your delivery needs. Do not include protected health information."
          className={cn(inputClass(errors.message), "resize-y min-h-[120px]")}
          {...register("message")}
        />
      </Field>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-gold"
          {...register("consent")}
        />
        <span className="text-sm text-muted">
          I agree to be contacted by {siteConfig.shortName} regarding this inquiry.{" "}
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
            Sending…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden />
            Send Message
          </>
        )}
      </button>
    </form>
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

function inputClass(hasError?: { message?: string }) {
  return cn(
    "w-full rounded-sm border bg-black px-4 py-3 text-ivory placeholder:text-muted/60 transition-colors",
    "focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50",
    hasError ? "border-error" : "border-graphite hover:border-gold/40"
  );
}
