import { ProcessSteps } from '@/lib/types/entities'

export const processStepsData: ProcessSteps[] = [
  {
    _id: '1',
    stepName: 'Discovery',
    stepOrder: 1,
    icon: 'Lightbulb',
    shortDescription: 'Understanding your business',
    description: 'We start by learning about your business, target audience, and project goals through detailed consultation.',
    bullets: [
      'Business analysis & goals',
      'Target audience research',
      'Feature planning & scope',
    ],
  },
  {
    _id: '2',
    stepName: 'Strategy',
    stepOrder: 2,
    icon: 'Compass',
    shortDescription: 'Planning the solution',
    description: 'We create a comprehensive strategy document outlining architecture, timeline, and deliverables.',
    bullets: [
      'Technical architecture',
      'Project timeline',
      'Resource planning',
    ],
  },
  {
    _id: '3',
    stepName: 'Design',
    stepOrder: 3,
    icon: 'Palette',
    shortDescription: 'Crafting the experience',
    description: 'Our designers create wireframes and high-fidelity mockups that bring your vision to life.',
    bullets: [
      'Wireframing & prototyping',
      'Visual design system',
      'User experience flow',
    ],
  },
  {
    _id: '4',
    stepName: 'Development',
    stepOrder: 4,
    icon: 'Code',
    shortDescription: 'Building the product',
    description: 'We develop using modern technologies, following best practices for performance and scalability.',
    bullets: [
      'Clean code practices',
      'Performance optimization',
      'Testing & QA',
    ],
  },
  {
    _id: '5',
    stepName: 'Launch',
    stepOrder: 5,
    icon: 'Rocket',
    shortDescription: 'Going live',
    description: 'We handle deployment, testing, and launch support to ensure a smooth release.',
    bullets: [
      'Deployment & setup',
      'Performance monitoring',
      'Launch support',
    ],
  },
]

export async function getProcessSteps(): Promise<{ items: ProcessSteps[] }> {
  const sorted = [...processStepsData].sort((a, b) => (a.stepOrder || 0) - (b.stepOrder || 0))
  return Promise.resolve({ items: sorted })
}
