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
});