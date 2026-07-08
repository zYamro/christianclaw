import { describe, expect, it } from "vitest";
import {
  buildChristianValuesSafetyLines,
  buildChristianValuesSection,
  CHRISTIAN_CLAW_IDENTITY_LINE,
  CHRISTIAN_CLAW_VALUES_COMPACT_LINE,
} from "./christian-values.js";

describe("CHRISTIAN_CLAW_IDENTITY_LINE", () => {
  it("brands the assistant as ChristianClaw under Christian values", () => {
    expect(CHRISTIAN_CLAW_IDENTITY_LINE).toContain("ChristianClaw");
    expect(CHRISTIAN_CLAW_IDENTITY_LINE).toContain("Christian values");
    expect(CHRISTIAN_CLAW_IDENTITY_LINE).toContain("OpenClaw");
  });
});

describe("buildChristianValuesSection", () => {
  it("renders a full section with virtues and content guardrails", () => {
    const lines = buildChristianValuesSection({ isMinimal: false });
    const section = lines.join("\n");

    expect(lines[0]).toBe("## Christian Values");
    expect(section).toContain("Virtues to embody:");
    expect(section).toContain("Content I will decline:");
    // Representative virtues drawn from Christian ethics.
    expect(section).toMatch(/love your neighbor/i);
    expect(section).toMatch(/truthfully|truth/i);
    expect(section).toMatch(/humility/i);
    expect(section).toMatch(/compassion|mercy/i);
    // Representative guardrails for a values-aligned posture.
    expect(section).toMatch(/sexual|pornographic/i);
    expect(section).toMatch(/blasphem|sacril/i);
    expect(section).toMatch(/deception|fraud/i);
    // Collaboration posture for the multi-agent team.
    expect(section).toMatch(/team that serves one another/i);
    // Sections always terminate with a trailing blank line for prompt spacing.
    expect(lines[lines.length - 1]).toBe("");
  });

  it("renders a compact variant for minimal/sub-agent prompt modes", () => {
    const full = buildChristianValuesSection({ isMinimal: false });
    const minimal = buildChristianValuesSection({ isMinimal: true });

    expect(minimal[0]).toBe("## Christian Values");
    expect(minimal.join("\n")).toContain(CHRISTIAN_CLAW_VALUES_COMPACT_LINE);
    // Compact variant is shorter than the full section.
    expect(minimal.length).toBeLessThan(full.length);
    expect(minimal[minimal.length - 1]).toBe("");
  });
});

describe("buildChristianValuesSafetyLines", () => {
  it("returns a single guardrail line aligned with the values posture", () => {
    const lines = buildChristianValuesSafetyLines();
    expect(lines.length).toBe(2);
    const line = lines[0];
    expect(line).toMatch(/Christian-values content posture/i);
    expect(line).toMatch(/sexual|exploitative/i);
    expect(line).toMatch(/deceptive|fraud/i);
    expect(lines[1]).toBe("");
  });
});
