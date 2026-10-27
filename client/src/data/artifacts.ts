import type { Artifact } from "../types/Artifact";

export const artifacts: Artifact[] = [
  {
    id: "artifact-01",
    title: "Timecard 00417",
    date: "October 17, 1989",
    author: "Payroll Department",
    act: 1,
    content: `MORROW WORKS MACHINE SHOP NO. 4
PAYROLL RECORD

Employee: Raymond Mercer
Shift date: Tuesday, October 17, 1989
Clock in: 22:00
Clock out: — BLANK —
Scheduled end: 06:00, October 18

Payroll annotation:
Unclosed shift. No final punch recorded.`,
  },

  {
    id: "artifact-02",
    title: "Work Order 441",
    date: "October 17, 1989",
    author: "Raymond Mercer",
    act: 2,
    content: `MORROW WORKS MACHINE SHOP NO. 4
WORK ORDER 441

Opened: October 17, 1989, 21:35
Machine: Hydraulic Press No. 4
Raised by: Raymond Mercer

Report:
"Abnormal vibration during loaded cycle. Ram appears to drift toward operator's left under load. Inspect ram guide and verify ram-stop and interlock operation before continued production."

Disposition:
"Inspection pending. Production requested to continue until scheduled maintenance window."

Status: OPEN`,
  },
];