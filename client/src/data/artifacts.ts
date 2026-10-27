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

  {
    id: "artifact-03",
    title: "Ray's Notebook",
    date: "October 17, 1989",
    author: "Raymond Mercer",
    act: 2,
    content: `RAY MERCER — PERSONAL NOTEBOOK

October 17, 1989
Press No. 4

"Vibration is worse under load. Ram is walking sideways. Guide looks worn. Found a crack along the lower edge. It isn't cycling clean.

Dwyer says finish the run and leave the inspection for morning.

I don't like the sound it makes coming back up."`,
  },

  {
    id: "artifact-04",
    title: "Shift Schedule",
    date: "October 16, 1989",
    author: "Production Scheduling",
    act: 2,
    content: `MORROW WORKS MACHINE SHOP NO. 4
SHIFT SCHEDULE

Wednesday, October 18, 1989

06:00 — Press No. 4
Operator: Eli Turner
Supervisor: Frank Dwyer

Production order: 18B — Housing plates

Note:
Machine inspection to be completed before first run.`,
  },

  {
    id: "artifact-05",
    title: "Inspection Checklist",
    date: "October 17, 1989",
    author: "Frank Dwyer",
    act: 2,
    content: `MORROW WORKS MACHINE SHOP NO. 4
INSPECTION CHECKLIST

Machine: Press No. 4
Date: October 17, 1989

Frame / mounting: Checked
Hydraulic lines: Checked
Ram guide: Inspection required
Interlock and ram-stop test: Incomplete
Return-to-service authorization: Pending

Foreman signoff: Frank Dwyer

"Production may continue. Complete remaining inspection at next scheduled maintenance window."

Time: 21:50`,
  },

  {
    id: "artifact-06",
    title: "Incident Report 89-104",
    date: "October 18, 1989",
    author: "Frank Dwyer",
    act: 3,
    content: `MORROW WORKS MACHINE SHOP NO. 4
INCIDENT REPORT 89-104

Date: October 18, 1989
Subject: Unauthorized stoppage — Hydraulic Press No. 4

"At approximately 00:12, employee Raymond Mercer halted production on Press No. 4 without authorization. The stoppage delayed completion of Production Order 18B. Employee Mercer departed the premises before the end of his scheduled shift. No approved production stoppage was recorded.

Management considers the incident a failure to follow supervisory instruction."

Disposition: Employee action under review.`,
  },

  {
    id: "artifact-07",
    title: "Unsent Letter to June",
    date: "October 19, 1989",
    author: "Raymond Mercer",
    act: 3,
    content: `June,

I know you'll tell me I should have kept my head down. Maybe I should have.

But I saw what that machine was doing. I couldn't send Eli in there in the morning and pretend I hadn't.

Dwyer says I walked off the job. That's what they'll write down, I suppose.

I keep thinking about how easy it would have been to let it run.

I don't know what happens now.

Ray

Envelope addressed to June Mercer.
Never mailed.`,
  },

  {
    id: "artifact-08",
    title: "Final Note",
    date: "Unknown",
    author: "Raymond Mercer",
    act: 3,
    content: `Found inside Ray Mercer's locker.

"I didn't stop the machine. I stopped what it was about to do."`,
  },
];
