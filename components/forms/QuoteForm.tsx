"use client";

import { useState } from "react";
import { useForm, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import {
  quoteFormSchema,
  quoteStep1Schema,
  quoteStep2Schema,
  quoteStep3Schema,
  quoteStep4Schema,
  type QuoteFormData,
} from "@/lib/validation/quote";
import { legalNotices, siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

const STEPS = ["Service", "Route", "Item & Handling", "Contact", "Review"] as const;

const stepSchemas = [
  quoteStep1Schema,
  quoteStep2Schema,
  quoteStep3Schema,
  quoteStep4Schema,
] as const;

const stepFields: (keyof QuoteFormData)[][] = [
  ["serviceType", "deliveryTiming", "customerType"],
  [
    "pickupAddress",
    "deliveryAddress",
    "numberOfStops",
    "roundTrip",
    "preferredDate",
    "pickupTime",
    "deliveryTime",
  ],
  [
    "itemCategory",
    "approximateSize",
    "approximateWeight",
    "quantity",
    "fragile",
    "specialHandling",
    "waitTime",
    "itemClassification",
  ],
  [
    "fullName",
    "company",
    "email",
    "phone",
    "preferredContact",
    "additionalNotes",
    "consent",
  ],
];

const defaultValues = {
  serviceType: "",
  deliveryTiming: "same-day",
  customerType: "business",
  pickupAddress: "",
  deliveryAddress: "",
  numberOfStops: 1,
  roundTrip: "no",
  preferredDate: "",
  pickupTime: "",
  deliveryTime: "",
  itemCategory: "",
  approximateSize: "",
  approximateWeight: "",
  quantity: 1,
  fragile: "no",
  specialHandling: "",
  waitTime: "",
  itemClassification: "general",
  fullName: "",
  company: "",
  email: "",
  phone: "",
  preferredContact: "either",
  additionalNotes: "",
  website: "",
} as DefaultValues<QuoteFormData>;

type FormStatus = "idle" | "loading" | "success" | "error";

export function QuoteForm({ className }: { className?: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [reference, setReference] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues,
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = form;

  const validateCurrentStep = async () => {
    const schema = stepSchemas[currentStep];
    const values = getValues();
    const stepData = stepFields[currentStep].reduce(
      (acc, key) => {
        acc[key] = values[key];
        return acc;
      },
      {} as Record<string, unknown>
    );

    const result = schema.safeParse(stepData);
    if (!result.success) {
      await trigger(stepFields[currentStep]);
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (currentStep >= 4) return;
    const valid = await validateCurrentStep();
    if (valid) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const onSubmit = async (data: QuoteFormData) => {
    if (status === "loading") return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as {
        success?: boolean;
        reference?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to submit your quote request.");
      }

      setReference(result.reference ?? "");
      setStatus("success");
      toast.success("Quote request submitted!");
      reset(defaultValues);
      setCurrentStep(0);
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
          Quote Request Received
        </h3>
        {reference && (
          <p className="mt-4 font-display text-xl text-gold">
            Reference: {reference}
          </p>
        )}
        <p className="mt-3 text-muted">
          {legalNotices.quoteDisclaimer}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setReference("");
          }}
          className="mt-6 inline-flex items-center justify-center rounded-sm bg-gold px-6 py-3 font-semibold text-black transition-colors hover:bg-gold-bright"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      <ProgressIndicator currentStep={currentStep} />

      <div className="rounded-sm border border-gold/20 bg-graphite/50 p-4 space-y-2">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
          <p className="text-sm text-muted">{legalNotices.medicalFormWarning}</p>
        </div>
        <p className="text-sm text-muted pl-8">{legalNotices.quoteDisclaimer}</p>
      </div>

      {status === "error" && errorMessage && (
        <div
          className="rounded-sm border border-error/50 bg-error/10 p-4 text-sm text-error"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label htmlFor="quote-website">Website</label>
          <input
            id="quote-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        {currentStep === 0 && <StepService register={register} errors={errors} />}
        {currentStep === 1 && <StepRoute register={register} errors={errors} />}
        {currentStep === 2 && <StepItem register={register} errors={errors} />}
        {currentStep === 3 && <StepContact register={register} errors={errors} />}
        {currentStep === 4 && <StepReview values={getValues()} />}

        <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-gold/40 px-6 py-3 font-medium text-ivory transition-colors hover:border-gold hover:bg-gold/10"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-8 py-3 font-display uppercase tracking-wider text-black transition-colors hover:bg-gold-bright"
            >
              Next
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-8 py-3 font-display uppercase tracking-wider text-black transition-colors hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  Submitting…
                </>
              ) : (
                "Submit Quote Request"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <nav aria-label="Quote form progress">
      <ol className="flex flex-wrap gap-2">
        {STEPS.map((label, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          return (
            <li
              key={label}
              className={cn(
                "flex items-center gap-2 rounded-sm px-3 py-2 text-xs font-medium uppercase tracking-wide sm:text-sm",
                isActive && "bg-gold text-black",
                isComplete && !isActive && "bg-gold/20 text-gold",
                !isActive && !isComplete && "bg-graphite text-muted"
              )}
              aria-current={isActive ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                  isActive && "bg-black text-gold",
                  isComplete && !isActive && "bg-gold text-black",
                  !isActive && !isComplete && "bg-carbon text-muted"
                )}
              >
                {isComplete ? "✓" : index + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

type RegisterProps = ReturnType<typeof useForm<QuoteFormData>>["register"];
type FormErrors = ReturnType<typeof useForm<QuoteFormData>>["formState"]["errors"];

function StepService({
  register,
  errors,
}: {
  register: RegisterProps;
  errors: FormErrors;
}) {
  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl uppercase tracking-wide text-gold">
        Service Details
      </h3>

      <Field label="Service Type" required error={errors.serviceType?.message}>
        <select
          id="serviceType"
          className={inputClass(errors.serviceType)}
          {...register("serviceType")}
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Delivery Timing" required error={errors.deliveryTiming?.message}>
        <select
          id="deliveryTiming"
          className={inputClass(errors.deliveryTiming)}
          {...register("deliveryTiming")}
        >
          <option value="same-day">Same-Day</option>
          <option value="rush">Rush / Expedited</option>
          <option value="scheduled">Scheduled</option>
          <option value="recurring">Recurring Route</option>
        </select>
      </Field>

      <Field label="Customer Type" required error={errors.customerType?.message}>
        <select
          id="customerType"
          className={inputClass(errors.customerType)}
          {...register("customerType")}
        >
          <option value="business">Business</option>
          <option value="individual">Individual</option>
        </select>
      </Field>
    </div>
  );
}

function StepRoute({
  register,
  errors,
}: {
  register: RegisterProps;
  errors: FormErrors;
}) {
  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl uppercase tracking-wide text-gold">
        Route Details
      </h3>

      <Field label="Pickup Location" required error={errors.pickupAddress?.message}>
        <input
          id="pickupAddress"
          type="text"
          className={inputClass(errors.pickupAddress)}
          {...register("pickupAddress")}
        />
      </Field>

      <Field label="Delivery Location" required error={errors.deliveryAddress?.message}>
        <input
          id="deliveryAddress"
          type="text"
          className={inputClass(errors.deliveryAddress)}
          {...register("deliveryAddress")}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Number of Stops" required error={errors.numberOfStops?.message}>
          <input
            id="numberOfStops"
            type="number"
            min={1}
            max={20}
            className={inputClass(errors.numberOfStops)}
            {...register("numberOfStops", { valueAsNumber: true })}
          />
        </Field>

        <Field label="Round Trip" required error={errors.roundTrip?.message}>
          <select
            id="roundTrip"
            className={inputClass(errors.roundTrip)}
            {...register("roundTrip")}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </Field>
      </div>

      <Field label="Preferred Date" required error={errors.preferredDate?.message}>
        <input
          id="preferredDate"
          type="date"
          className={inputClass(errors.preferredDate)}
          {...register("preferredDate")}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Pickup Time" error={errors.pickupTime?.message}>
          <input
            id="pickupTime"
            type="time"
            className={inputClass(errors.pickupTime)}
            {...register("pickupTime")}
          />
        </Field>

        <Field label="Delivery Time" error={errors.deliveryTime?.message}>
          <input
            id="deliveryTime"
            type="time"
            className={inputClass(errors.deliveryTime)}
            {...register("deliveryTime")}
          />
        </Field>
      </div>
    </div>
  );
}

function StepItem({
  register,
  errors,
}: {
  register: RegisterProps;
  errors: FormErrors;
}) {
  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl uppercase tracking-wide text-gold">
        Item & Handling
      </h3>

      <Field label="Item Category" required error={errors.itemCategory?.message}>
        <input
          id="itemCategory"
          type="text"
          placeholder="Documents, supplies, parts, etc."
          className={inputClass(errors.itemCategory)}
          {...register("itemCategory")}
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Approximate Size" required error={errors.approximateSize?.message}>
          <input
            id="approximateSize"
            type="text"
            placeholder="e.g. Letter envelope, small box"
            className={inputClass(errors.approximateSize)}
            {...register("approximateSize")}
          />
        </Field>

        <Field label="Approximate Weight" required error={errors.approximateWeight?.message}>
          <input
            id="approximateWeight"
            type="text"
            placeholder="e.g. Under 5 lbs"
            className={inputClass(errors.approximateWeight)}
            {...register("approximateWeight")}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Quantity" required error={errors.quantity?.message}>
          <input
            id="quantity"
            type="number"
            min={1}
            max={100}
            className={inputClass(errors.quantity)}
            {...register("quantity", { valueAsNumber: true })}
          />
        </Field>

        <Field label="Fragile Item" required error={errors.fragile?.message}>
          <select
            id="fragile"
            className={inputClass(errors.fragile)}
            {...register("fragile")}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </Field>
      </div>

      <Field label="Item Classification" required error={errors.itemClassification?.message}>
        <select
          id="itemClassification"
          className={inputClass(errors.itemClassification)}
          {...register("itemClassification")}
        >
          <option value="general">General</option>
          <option value="medical">Medical / Healthcare</option>
          <option value="legal">Legal / Professional</option>
          <option value="business">Business</option>
        </select>
      </Field>

      <Field label="Special Handling Instructions" error={errors.specialHandling?.message}>
        <textarea
          id="specialHandling"
          rows={3}
          placeholder="Temperature, privacy, or handling requirements (no PHI)"
          className={cn(inputClass(errors.specialHandling), "resize-y min-h-[80px]")}
          {...register("specialHandling")}
        />
      </Field>

      <Field label="Expected Wait Time" error={errors.waitTime?.message}>
        <input
          id="waitTime"
          type="text"
          placeholder="e.g. 15 minutes at pickup"
          className={inputClass(errors.waitTime)}
          {...register("waitTime")}
        />
      </Field>
    </div>
  );
}

function StepContact({
  register,
  errors,
}: {
  register: RegisterProps;
  errors: FormErrors;
}) {
  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl uppercase tracking-wide text-gold">
        Contact Information
      </h3>

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

      <Field label="Additional Notes" error={errors.additionalNotes?.message}>
        <textarea
          id="additionalNotes"
          rows={4}
          className={cn(inputClass(errors.additionalNotes), "resize-y min-h-[100px]")}
          {...register("additionalNotes")}
        />
      </Field>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-gold"
          {...register("consent")}
        />
        <span className="text-sm text-muted">
          I agree to be contacted by {siteConfig.shortName} regarding this quote request.{" "}
          <span className="text-error">*</span>
        </span>
      </label>
      {errors.consent && (
        <p className="text-sm text-error" role="alert">
          {errors.consent.message}
        </p>
      )}
    </div>
  );
}

function StepReview({ values }: { values: QuoteFormData }) {
  const rows: { label: string; value: string | number }[] = [
    { label: "Service", value: values.serviceType },
    { label: "Timing", value: values.deliveryTiming },
    { label: "Customer Type", value: values.customerType },
    { label: "Pickup", value: values.pickupAddress },
    { label: "Delivery", value: values.deliveryAddress },
    { label: "Stops", value: values.numberOfStops },
    { label: "Round Trip", value: values.roundTrip },
    { label: "Preferred Date", value: values.preferredDate },
    { label: "Item Category", value: values.itemCategory },
    { label: "Size", value: values.approximateSize },
    { label: "Weight", value: values.approximateWeight },
    { label: "Quantity", value: values.quantity },
    { label: "Fragile", value: values.fragile },
    { label: "Classification", value: values.itemClassification },
    { label: "Name", value: values.fullName },
    { label: "Email", value: values.email },
    { label: "Phone", value: values.phone },
  ];

  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl uppercase tracking-wide text-gold">
        Review Your Request
      </h3>
      <p className="text-sm text-muted">{legalNotices.quoteDisclaimer}</p>

      <dl className="divide-y divide-gold/10 rounded-sm border border-gold/20 bg-carbon">
        {rows.map(({ label, value }) =>
          value ? (
            <div key={label} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
              <dt className="text-sm font-medium text-gold">{label}</dt>
              <dd className="text-sm text-ivory sm:col-span-2">{value}</dd>
            </div>
          ) : null
        )}
        {values.specialHandling && (
          <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="text-sm font-medium text-gold">Special Handling</dt>
            <dd className="text-sm text-ivory sm:col-span-2">{values.specialHandling}</dd>
          </div>
        )}
        {values.additionalNotes && (
          <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3">
            <dt className="text-sm font-medium text-gold">Notes</dt>
            <dd className="text-sm text-ivory sm:col-span-2">{values.additionalNotes}</dd>
          </div>
        )}
      </dl>
    </div>
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
