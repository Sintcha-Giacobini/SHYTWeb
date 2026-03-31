const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://glorious-nourishment-production.up.railway.app";

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchDashboard(participantId: string) {
  return apiFetch(`/participant/${participantId}/dashboard`);
}

export async function updatePreferences(
  sessionId: string,
  preferences: Record<string, number>
) {
  return apiFetch(`/session/${sessionId}/preferences`, {
    method: "POST",
    body: JSON.stringify(preferences),
  });
}

export async function submitVote(
  pollId: string,
  optionId: string,
  participantId: string
) {
  return apiFetch(`/vote-api/${pollId}`, {
    method: "POST",
    body: JSON.stringify({ optionId, participantId }),
  });
}

/**
 * Link an Apple Account to a backend participant.
 * Call after Sign in with Apple to sync the user.
 */
export async function linkAppleAccount(appleId: string, name: string, email?: string | null) {
  return apiFetch(`/auth/apple/link`, {
    method: "POST",
    body: JSON.stringify({ appleId, name, email }),
  });
}
