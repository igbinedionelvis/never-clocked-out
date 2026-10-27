type NarrativeStage = "act-1" | "act-2" | "act-3";

export function getNarrativeStage(
  openedArtifacts: string[],
): NarrativeStage {
  const actTwoArtifacts = [
    "artifact-02",
    "artifact-03",
    "artifact-04",
    "artifact-05",
  ];

  const actThreeArtifacts = [
    "artifact-06",
    "artifact-07",
    "artifact-08",
  ];

  const hasOpenedActTwoArtifacts = actTwoArtifacts.every((id) =>
    openedArtifacts.includes(id),
  );

  const hasOpenedActThreeArtifacts = actThreeArtifacts.every((id) =>
    openedArtifacts.includes(id),
  );

  if (hasOpenedActTwoArtifacts && hasOpenedActThreeArtifacts) {
    return "act-3";
  }

  if (hasOpenedActTwoArtifacts) {
    return "act-2";
  }

  return "act-1";
}