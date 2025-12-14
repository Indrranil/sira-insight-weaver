variable "project_id" {
  description = "The Google Cloud Project ID"
  type        = string
  default     = "internal-apps-465610"  # Your Project ID
}

variable "region" {
  description = "The region to deploy to"
  type        = string
  default     = "asia-south1"
}

variable "frontend_service_name" {
  description = "The name of the Frontend Cloud Run service"
  type        = string
  default     = "sira-frontend"
}