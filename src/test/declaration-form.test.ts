import { describe, expect, it } from "vitest";
import { entrySearch, materialDisplay, validDeclaration } from "@/lib/declaration-form";

describe("Declaration rules", () => {
  it("opens household sign-in from the homepage", () => {
    expect(entrySearch("household")).toEqual({ mode: "signin", role: "household" });
  });
  it("opens company sign-in from the homepage", () => {
    expect(entrySearch("company")).toEqual({ mode: "signin", role: "company" });
  });
  it("requires a positive finite weight and a neighbourhood", () => {
    expect(validDeclaration("pet", "12.5", "Tomdè")).toBe(true);
    for (const kg of ["", "0", "-1", "Infinity", "oops"]) expect(validDeclaration("pet", kg, "Tomdè")).toBe(false);
    expect(validDeclaration("pet", "12.5", " ")).toBe(false);
    expect(validDeclaration("", "12.5", "Tomdè")).toBe(false);
  });
  it("keeps existing carton and electronic materials selectable", () => {
    for (const material of [{ id: "carton", name: "Cartons", category: "Carton" }, { id: "d3e", name: "D3E", category: "Électronique" }]) {
      expect(materialDisplay(material).label).toBe(material.name);
    }
  });
  it.each([["pet", "PET"], ["pehd", "PEHD"], ["sachets", "Sachets d’eau"], ["fer", "Fer"], ["cuivre", "Cuivre"], ["aluminium", "Aluminium"], ["laiton", "Bronze"], ["batteries", "Batteries"]])("distinguishes %s without changing its stored ID", (id, label) => {
    expect(materialDisplay({ id, name: "Legacy name", category: "Legacy category" }).label).toBe(label);
  });
});
import { encodeNote, isDonation, payout, stripIntent } from "@/lib/declaration-form";
describe("vente / don", () => {
  it("un don est marqué dans la note", () => expect(encodeNote("3 sacs", "donation")).toBe("[DON] 3 sacs"));
  it("une vente garde la note telle quelle", () => expect(encodeNote("3 sacs", "sale")).toBe("3 sacs"));
  it("repasser en vente retire la marque", () => expect(encodeNote("[DON] 3 sacs", "sale")).toBe("3 sacs"));
  it("détecte un don", () => { expect(isDonation("[DON]")).toBe(true); expect(isDonation("sacs")).toBe(false); });
  it("affiche la note sans marque", () => expect(stripIntent("[DON] fils")).toBe("fils"));
  it("un don rapporte 0 F", () => expect(payout("[DON]", 10, 150)).toBe(0));
  it("une vente rapporte kg × prix", () => expect(payout("", 10, 150)).toBe(1500));
});
