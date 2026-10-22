const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'ADMIN' | 'USER';
  isActive: boolean;
  createdAt?: string;
  totalLearnedWords?: number;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description?: string;
  level?: string;
  targetScore?: string;
  thumbnailUrl?: string;
  orderIndex: number;
  totalLessons: number;
  totalWords: number;
  lessons?: {
    id: number;
    title: string;
    _count: { vocabularies: number };
  }[];
}

export interface ApiLesson {
  id: number;
  courseId: number;
  title: string;
  description?: string;
  orderIndex: number;
  _count?: { vocabularies: number };
  vocabularies?: ApiVocabulary[];
}

export interface ApiVocabulary {
  id: number;
  lessonId: number;
  word: string;
  meaning: string;
  partOfSpeech?: string;
  ipa?: string;
  audioUrl?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  orderIndex: number;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('toeic_auth_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('toeic_auth_token', token);
      } else {
        localStorage.removeItem('toeic_auth_token');
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const json = await response.json();

      if (!response.ok) {
        const errorMessage =
          json.message ||
          (Array.isArray(json.errors) ? json.errors[0] : null) ||
          'Yêu cầu thất bại';
        throw new Error(errorMessage);
      }

      return json.data !== undefined ? json.data : json;
    } catch (err: any) {
      console.warn(`API Error [${endpoint}]:`, err.message);
      throw err;
    }
  }

  // --- Auth APIs ---
  async login(credentials: { email: string; password: string }) {
    const res = await this.request<{
      accessToken: string;
      user: User;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.setToken(res.accessToken);
    return res;
  }

  async register(data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    const res = await this.request<{
      accessToken: string;
      user: User;
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setToken(res.accessToken);
    return res;
  }

  async getProfile(): Promise<User> {
    return this.request<User>('/auth/me');
  }

  logout() {
    this.setToken(null);
  }

  // --- Courses APIs ---
  async getCourses(): Promise<Course[]> {
    return this.request<Course[]>('/courses');
  }

  async getCourse(idOrSlug: string | number): Promise<Course> {
    return this.request<Course>(`/courses/${idOrSlug}`);
  }

  // --- Lessons APIs ---
  async getLessons(courseId?: number): Promise<ApiLesson[]> {
    const query = courseId ? `?courseId=${courseId}` : '';
    return this.request<ApiLesson[]>(`/lessons${query}`);
  }

  async getLesson(id: number): Promise<ApiLesson> {
    return this.request<ApiLesson>(`/lessons/${id}`);
  }

  // --- Vocabulary APIs ---
  async searchVocabularies(
    q: string,
    courseId?: number,
  ): Promise<ApiVocabulary[]> {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (courseId) params.set('courseId', courseId.toString());
    return this.request<ApiVocabulary[]>(
      `/vocabularies/search?${params.toString()}`,
    );
  }

  // --- Progress APIs ---
  async getAllLearnedProgress(): Promise<{
    learnedVocabularyIds: number[];
    totalLearned: number;
  }> {
    return this.request('/progress/all');
  }

  async getCourseProgress(courseId: number): Promise<{
    courseId: number;
    totalWords: number;
    totalLearned: number;
    percentage: number;
    learnedVocabularyIds: number[];
    lessonProgress: Record<number, { total: number; learned: number }>;
  }> {
    return this.request(`/progress/course/${courseId}`);
  }

  async toggleLearned(vocabularyId: number): Promise<{
    vocabularyId: number;
    isLearned: boolean;
  }> {
    return this.request('/progress/toggle', {
      method: 'POST',
      body: JSON.stringify({ vocabularyId }),
    });
  }

  async resetLesson(lessonId: number): Promise<{
    lessonId: number;
    resetCount: number;
  }> {
    return this.request(`/progress/reset-lesson/${lessonId}`, {
      method: 'POST',
    });
  }

  // --- Admin APIs ---
  async adminGetUsers(params?: {
    search?: string;
    role?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    users: User[];
    meta: { total: number; page: number; totalPages: number };
  }> {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.role) query.set('role', params.role);
    if (params?.page) query.set('page', params.page.toString());
    if (params?.limit) query.set('limit', params.limit.toString());
    return this.request(`/admin/users?${query.toString()}`);
  }

  async adminToggleUserStatus(userId: number): Promise<{ user: User }> {
    return this.request(`/admin/users/${userId}/status`, {
      method: 'PATCH',
    });
  }

  async adminUpdateUserRole(
    userId: number,
    role: 'ADMIN' | 'USER',
  ): Promise<{ user: User }> {
    return this.request(`/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  }

  async adminCreateLesson(data: {
    courseId: number;
    title: string;
    description?: string;
    orderIndex?: number;
  }): Promise<{ lesson: ApiLesson }> {
    return this.request('/admin/lessons', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async adminUpdateLesson(
    id: number,
    data: { title?: string; description?: string; orderIndex?: number },
  ): Promise<{ lesson: ApiLesson }> {
    return this.request(`/admin/lessons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async adminDeleteLesson(id: number): Promise<{ id: number }> {
    return this.request(`/admin/lessons/${id}`, {
      method: 'DELETE',
    });
  }

  async adminCreateVocabulary(data: {
    lessonId: number;
    word: string;
    meaning: string;
    partOfSpeech?: string;
    ipa?: string;
    exampleSentence?: string;
    exampleTranslation?: string;
    orderIndex?: number;
  }): Promise<{ vocab: ApiVocabulary }> {
    return this.request('/admin/vocabularies', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async adminUpdateVocabulary(
    id: number,
    data: {
      word?: string;
      meaning?: string;
      partOfSpeech?: string;
      ipa?: string;
      exampleSentence?: string;
      exampleTranslation?: string;
      orderIndex?: number;
    },
  ): Promise<{ vocab: ApiVocabulary }> {
    return this.request(`/admin/vocabularies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async adminDeleteVocabulary(id: number): Promise<{ id: number }> {
    return this.request(`/admin/vocabularies/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();
