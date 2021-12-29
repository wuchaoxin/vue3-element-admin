export interface ErrorConfig {
  code?: string | number | unknown;
  message?: string | unknown;
  source?: "request" | "response";
  UA?: Dynamic;
  raw?: AnyObject;
}
