/// <reference types="react-scripts" />
interface ApiResponse<T> {
  success: boolean;
  message: string;
  errorCode: string;
  data: T | null;
}

interface ApiListResponse<T> {
  success: boolean;
  message: string;
  errorCode: string;
  data: {
    results: T[] | [];
    metadata: {
      pageNumber: number;
      pageSize: number;
      totalPages: number;
      currentPage?: number;
    };
  };
}

interface IMetadata {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  currentPage?: number;
}

interface ErrorResponse {
  message?: string;
  errorCode?: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface SuspenseWrapperProps {
  children: ReactElement;
}

interface AsyncWrapperProps {
  loading: boolean;
  fulfilled: boolean;
  error?: unknown;
  children: React.JSX;
}

interface HelmetProps {
  title: string;
  description: string;
}

interface Query {
  limit?: number;
  page?: number;
  search?: string;
  filter?: string;
}
