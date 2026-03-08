import { Services } from '@/lib/types/entities'

export const servicesData: Services[] = [
  {
    _id: '1',
    serviceName: 'Web Development',
    serviceIcon: 'Code',
    shortDescription: 'Custom web applications built with modern technologies',
    featuresList: 'Next.js & React\nTypeScript & Performance\nResponsive Design\nSEO Optimization',
    ctaButtonText: 'Get Quote',
  },
  {
    _id: '2',
    serviceName: 'UI/UX Design',
    serviceIcon: 'Palette',
    shortDescription: 'Stunning user interfaces that drive engagement',
    featuresList: 'User Research\nWireframes & Prototypes\nDesign Systems\nAccessibility First',
    ctaButtonText: 'Get Quote',
  },
  {
    _id: '3',
    serviceName: 'Full-Stack Solutions',
    serviceIcon: 'Layers',
    shortDescription: 'End-to-end solutions from frontend to database',
    featuresList: 'API Development\nDatabase Design\nCloud Deployment\nMaintenance & Support',
    ctaButtonText: 'Get Quote',
  },
]

export async function getServices(): Promise<{ items: Services[] }> {
  return Promise.resolve({ items: servicesData })
}
