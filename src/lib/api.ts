const API_BASE = "https://glorious-nourishment-production.up.railway.app";

export async function fetchDashboard(participantId: string) {
  const res = await fetch(`${API_BASE}/participant/${participantId}/dashboard`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
}

export async function updatePreferences(
  sessionId: string,
  preferences: Record<string, number>
) {
  const res = await fetch(`${API_BASE}/session/${sessionId}/preferences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(preferences),
  });
  if (!res.ok) throw new Error("Failed to update preferences");
  return res.json();
}

export async function submitVote(pollId: string, optionId: string, participantId: string) {
  const res = await fetch(`${API_BASE}/vote-api/${pollId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ optionId, participantId }),
  });
  if (!res.ok) throw new Error("Failed to submit vote");
  return res.json();
}
