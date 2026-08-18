export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const normalized = typeof codespaceName === 'string' ? codespaceName.trim() : '';

  if (normalized && normalized !== 'undefined' && normalized !== 'null') {
    return `https://${normalized}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

export function extractItems(payload, keys = []) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  for (const key of keys) {
    if (payload && Array.isArray(payload[key])) {
      return payload[key];
    }
  }

  if (payload && typeof payload === 'object') {
    const nested = Object.values(payload).find((value) => Array.isArray(value));
    if (nested) {
      return nested;
    }
  }

  return [];
}
