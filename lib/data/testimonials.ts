import { Testimonials } from '@/lib/types/entities'

export const testimonialsData: Testimonials[] = [
  {
    _id: '1',
    clientName: 'Sarah Johnson',
    businessName: 'Tech Startup Inc',
    clientPhoto: '/images/testimonials/client1.jpg',
    feedbackText:
      'Anmol delivered an exceptional web application that exceeded our expectations. His attention to detail and expertise in modern web technologies was invaluable.',
    rating: 5,
  },
  {
    _id: '2',
    clientName: 'Michael Chen',
    businessName: 'Digital Agency Pro',
    clientPhoto: '/images/testimonials/client2.jpg',
    feedbackText:
      'Working with Anmol was a game-changer for our agency. The website he built for us is fast, beautiful, and converts exceptionally well.',
    rating: 5,
  },
  {
    _id: '3',
    clientName: 'Emma Rodriguez',
    businessName: 'E-Commerce Solutions',
    clientPhoto: '/images/testimonials/client3.jpg',
    feedbackText:
      'Professional, responsive, and incredibly talented. Anmol understood our vision and brought it to life perfectly.',
    rating: 5,
  },
  {
    _id: '4',
    clientName: 'David Thompson',
    businessName: 'SaaS Platform Ltd',
    clientPhoto: '/images/testimonials/client4.jpg',
    feedbackText:
      'The level of expertise and dedication Anmol brought to our project was outstanding. Highly recommended!',
    rating: 5,
  },
]

export async function getTestimonials(): Promise<{ items: Testimonials[] }> {
  return Promise.resolve({ items: testimonialsData })
}
