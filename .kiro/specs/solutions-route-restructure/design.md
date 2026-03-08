# Design Document: Solutions Route Restructure

## Overview

This design outlines the restructuring of the Next.js application to separate content sections from the homepage to a new /solutions route. The implementation leverages Next.js 13+ App Router's file-system based routing to create a new route while preserving all existing component functionality, styling, and interactivity.

The core approach is minimal and surgical: we create a new page file at `app/solutions/page.tsx` that replicates the current homepage structure (minus the HeroSection), and simplify `app/page.tsx` to display only "Hello World". No component files are modified, ensuring zero risk to existing functionality.

### Key Design Decisions

1. **File-Only Modification**: Only files in the `app/` directory are modified, leaving all component files untouched
2. **Code Duplication Strategy**: The scroll handler logic and component composition are duplicated in the solutions page rather than extracted to shared utilities, prioritizing simplicity and minimizing refactoring risk
3. **Client-Side Rendering**: Both pages use the `'use client'` directive to maintain the existing client-side interactivity patterns
4. **Preserved Architecture**: All component props, styling classes, and interaction patterns remain identical to the current implementation

## Architecture

### Route Structure

```
app/
├── page.tsx              # Simplified homepage ("Hello World")
├── solutions/
│   └── page.tsx          # New solutions page (relocated content)
├── layout.tsx            # Root layout (unchanged)
└── globals.css           # Global styles (unchanged)
```

### Component Flow

**Current Homepage (app/page.tsx)**:
```
ScrollProgress → Header → HeroSection → AboutSection → ServicesSection → 
PortfolioSection → ProcessSection → TestimonialsSection → ContactSection → Footer
```

**New Solutions Page (app/solutions/page.tsx)**:
```
ScrollProgress → Header → AboutSection → ServicesSection → PortfolioSection → 
ProcessSection → TestimonialsSection → ContactSection → Footer
```

**Simplified Homepage (app/page.tsx)**:
```
<main>Hello World</main>
```

### Scroll Handling Architecture

The scroll functionality is implemented using the browser's native `scrollIntoView` API with smooth behavior. The pattern is:

1. **Handler Function**: `handleScroll(sectionId: string)` uses `document.getElementById()` to locate target sections
2. **Prop Passing**: The handler is passed to Header, Footer, HeroSection, and ServicesSection components via their `onScroll` prop
3. **Section IDs**: Each content section component has an `id` attribute matching the navigation link IDs (about, services, portfolio, process, testimonials, contact)

This architecture is duplicated in the solutions page to maintain independence between routes.

## Components and Interfaces

### Page Components

#### Homepage Component (app/page.tsx)
```typescript
export default function Home() {
  return (
    <main className="bg-background text-foreground">
      Hello World
    </main>
  )
}
```

**Responsibilities**:
- Display minimal "Hello World" text
- Apply background and foreground color classes for consistency

**Props**: None

**State**: None

#### Solutions Page Component (app/solutions/page.tsx)
```typescript
'use client'

export default function SolutionsPage() {
  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Header onScroll={handleScroll} />
      <AboutSection />
      <ServicesSection onScroll={handleScroll} />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer onScroll={handleScroll} />
    </main>
  )
}
```

**Responsibilities**:
- Implement scroll handler function
- Compose all content sections in correct order
- Pass scroll handler to components requiring navigation
- Apply consistent styling classes

**Props**: None

**State**: None (scroll handler is a pure function)

### Component Interfaces

#### Header Component
```typescript
interface HeaderProps {
  onScroll: (sectionId: string) => void
}
```

**Usage**: `<Header onScroll={handleScroll} />`

#### Footer Component
```typescript
interface FooterProps {
  onScroll: (sectionId: string) => void
}
```

**Usage**: `<Footer onScroll={handleScroll} />`

#### HeroSection Component
```typescript
interface HeroSectionProps {
  onScroll: (sectionId: string) => void
}
```

**Usage**: `<HeroSection onScroll={handleScroll} />` (only on original homepage, not on solutions page)

#### ServicesSection Component
```typescript
interface ServicesSectionProps {
  onScroll: (sectionId: string) => void
}
```

**Usage**: `<ServicesSection onScroll={handleScroll} />`

#### Other Section Components
The following components do not accept props:
- `AboutSection`
- `PortfolioSection`
- `ProcessSection`
- `TestimonialsSection`
- `ContactSection`
- `ScrollProgress`

### Import Structure

Both page components import from the same component paths:
```typescript
import { ScrollProgress } from '@/components/shared/ScrollProgress'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ContactSection } from '@/components/sections/ContactSection'
```

## Data Models

This feature does not introduce new data models. All data structures remain within the existing component implementations:

- **Navigation Links**: Defined within Header and Footer components as static arrays
- **Section Content**: Managed internally by each section component
- **Scroll State**: Managed by browser's native scroll API, no application state required

### Type Definitions

```typescript
// Scroll handler function signature
type ScrollHandler = (sectionId: string) => void

// Section ID type (for type safety)
type SectionId = 'about' | 'services' | 'portfolio' | 'process' | 'testimonials' | 'contact' | 'hero'
```

These types are implicit in the current implementation and do not require explicit type files.

