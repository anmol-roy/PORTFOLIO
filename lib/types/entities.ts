export interface Services {
  _id: string
  _createdDate?: Date
  _updatedDate?: Date
  serviceName?: string
  serviceIcon?: string
  shortDescription?: string
  featuresList?: string
  ctaButtonText?: string
}

export interface Projects {
  _id: string
  _createdDate?: Date
  _updatedDate?: Date
  projectTitle?: string
  screenshot?: string
  shortDescription?: string
  techStack?: string
  liveDemoLink?: string
}

export interface ProcessSteps {
  _id: string
  _createdDate?: Date
  _updatedDate?: Date
  stepName?: string
  stepOrder?: number
  icon?: string
  description?: string
  shortDescription?: string
  bullets?: string[]
}

export interface Testimonials {
  _id: string
  _createdDate?: Date
  _updatedDate?: Date
  clientName?: string
  businessName?: string
  clientPhoto?: string
  feedbackText?: string
  rating?: number
}
