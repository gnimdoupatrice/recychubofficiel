import { describe, expect, it } from "vitest";
import { accountError, detailsError, formatPhoneInput, signupSteps, type AuthForm } from "@/lib/auth-form";

const form: AuthForm = { phone: "90 12 34 56", password: "Valid-pass-42", full_name: "Test", company_name: "", quartier: "", city: "Kara", address: "" };

describe("Inscription en deux étapes", () => {
  it("prévoit Compte puis Localisation pour un ménage", () => {
    expect(signupSteps("household")).toEqual(["Compte", "Localisation"]);
    expect(accountError(form, true)).toBeNull();
    expect(detailsError(form, "household")).not.toBeNull();
    expect(detailsError({ ...form, quartier: "Tomdè" }, "household")).toBeNull();
  });
  it("prévoit Compte puis Entreprise sans exiger le quartier ménage", () => {
    expect(signupSteps("company")).toEqual(["Compte", "Entreprise"]);
    expect(detailsError(form, "company")).not.toBeNull();
    expect(detailsError({ ...form, company_name: "Collecteur test" }, "company")).toBeNull();
  });
  it("accepte un numéro togolais complet et le présente en quatre paires", () => {
    expect(formatPhoneInput("+22890123456")).toBe("90 12 34 56");
    expect(formatPhoneInput("0022890123456")).toBe("90 12 34 56");
    expect(accountError({ ...form, phone: "90 12" }, false)).not.toBeNull();
  });
});