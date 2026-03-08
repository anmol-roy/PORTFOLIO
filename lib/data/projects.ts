import { Projects } from '@/lib/types/entities'

export const projectsData: Projects[] = [
  {
    _id: '1',
    projectTitle: 'E-Commerce Platform',
    screenshot: '/images/projects/ecommerce.jpg',
    shortDescription: 'A full-featured e-commerce platform with product catalog, shopping cart, and payment integration built with Next.js and Stripe.',
    techStack: 'Next.js, React, TypeScript, Tailwind CSS, Stripe, PostgreSQL',
    liveDemoLink: 'https://example.com',
  },
  {
    _id: '2',
    projectTitle: 'SaaS Dashboard',
    screenshot: '/images/projects/saas.jpg',
    shortDescription: 'Real-time analytics dashboard with user management, data visualization, and custom reporting features.',
    techStack: 'Next.js, React, TypeScript, Framer Motion, Chart.js, Firebase',
    liveDemoLink: 'https://example.com',
  },
  {
    _id: '3',
    projectTitle: 'Mobile App Companion',
    screenshot: '/images/projects/mobile.jpg',
    shortDescription: 'Web companion app for mobile users with progressive web app capabilities and offline support.',
    techStack: 'Next.js, React, TypeScript, Service Workers, IndexedDB',
    liveDemoLink: '',
  },
]

export async function getProjects(): Promise<{ items: Projects[] }> {
  return Promise.resolve({ items: projectsData })
}
