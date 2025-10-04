// Central API configuration for FastAPI backend
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export interface FetchResult {
  count: number;
  docs: {
    title: string;
    abstract: string;
    url: string;
    source: string;
  }[];
}

export interface SummaryResult {
  title: string;
  url: string;
  bullets: string[];
  source: string;
}

export interface CriticResult {
  credibility: number;
  reasons: string[];
}

export interface ResearchItem {
  title: string;
  url: string;
  bullets: string[];
  credibility: number;
  reasons: string[];
}

export interface PipelineResult {
  topic: string;
  count: number;
  items: ResearchItem[];
}

export interface KnowledgeGraphNode {
  id: string;
  type: string;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  relation: string;
}

export interface KnowledgeGraph {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
}

class APIClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Network error" }));
      throw new Error(error.message || `Request failed: ${response.status}`);
    }

    return response.json();
  }

  async health() {
    return this.request<{ ok: boolean }>("/health");
  }

  async fetch(topic: string, maxResults: number = 10) {
    return this.request<FetchResult>(
      `/api/fetch?topic=${encodeURIComponent(topic)}&max_results=${maxResults}`
    );
  }

  async summarize(doc: { title: string; abstract?: string; url: string; source: string }) {
    return this.request<SummaryResult>("/api/summarize", {
      method: "POST",
      body: JSON.stringify(doc),
    });
  }

  async critic(doc: { title: string; abstract: string; url: string; source: string }) {
    return this.request<CriticResult>("/api/critic", {
      method: "POST",
      body: JSON.stringify(doc),
    });
  }

  async research(topic: string, maxResults: number = 10) {
    return this.request<PipelineResult>(
      `/api/pipeline/research?topic=${encodeURIComponent(topic)}&max_results=${maxResults}`
    );
  }

  async addMemory(doc: { title: string; abstract: string; url: string; source: string }) {
    return this.request<{ ok: boolean; count: number }>("/api/memory/add", {
      method: "POST",
      body: JSON.stringify(doc),
    });
  }

  async searchMemory(query: string, k: number = 5) {
    return this.request<{ score: number; doc: any }[]>(
      `/api/memory/search?q=${encodeURIComponent(query)}&k=${k}`
    );
  }

  async getKnowledgeGraph() {
    return this.request<KnowledgeGraph>("/api/kg");
  }
}

export const apiClient = new APIClient(API_BASE);
