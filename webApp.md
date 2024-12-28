# Product Requirements Document
## PM Interview Practice Platform

### 1. Product Overview
#### 1.1 Purpose
A minimalist web application that helps aspiring Product Managers prepare for interviews by providing organized practice questions and progress tracking without requiring user authentication.

#### 1.2 Target Users
- Primary: Aspiring Product Managers preparing for interviews
- Secondary: Career switchers studying PM interview formats
- Tertiary: Current PMs refreshing their interview skills

#### 1.3 Success Metrics
- Average session duration > 15 minutes
- Questions attempted per session > 5
- Return rate > 40%
- Page load time < 2 seconds

### 2. Technical Requirements

#### 2.1 Platform Requirements
- Modern web browsers (last 2 versions)
- Mobile responsive design
- Offline capability
- No backend dependencies
- Static hosting
- Browser storage only

#### 2.2 Performance Requirements
- Initial load time < 2s
- Smooth animations (60fps)
- Offline storage < 5MB
- Instant state updates

#### 2.3 Technology Stack
- **Frontend Framework**: Next.js
  - Static Site Generation (SSG)
  - File-based routing
  - Built-in optimization features

- **Styling**: TailwindCSS
  - Utility-first approach
  - Custom design system configuration
  - Responsive design utilities

- **State Management**: 
  - Browser Local Storage for progress tracking
  - React Context for global state
  - No external state management required

- **Content Management**:
  - Markdown files for questions
  - GitHub-based content workflow
  - Automated content processing

- **Build & Deployment**:
  - Static site hosting (Vercel/Netlify)
  - GitHub Actions for automation
  - Content validation workflows

#### 2.4 Development Requirements
- Node.js v18+
- npm/yarn for package management
- Git for version control
- GitHub for collaboration

### 3. Core Features

#### 3.1 Question Management
- Category-based organization
- Expandable question cards
- Progress tracking via checkboxes
- Local storage integration
- Optional context and follow-up questions

#### 3.2 Navigation
- Persistent sidebar (desktop)
- Hamburger menu (mobile)
- Category-based organization
- Progress indicators
- Mobile-responsive design

#### 3.3 Progress Tracking
- Category-wise progress bars
- Overall completion percentage
- Persistent progress storage
- Progress reset option

### 4. User Interface

#### 4.1 Layout Structure
Desktop View:
- Fixed sidebar (240px width)
- Expandable main content area
- Progress indicators

Mobile View:
- Hamburger menu
- Collapsible sidebar
- Fullscreen question view
- Floating progress indicator

#### 4.2 Interaction Patterns
- Single click category selection
- Click to expand/collapse questions
- Checkbox for completion
- Auto-collapse other questions
- Clear visual feedback
- Smooth transitions

### 5. Content Structure

#### 5.1 Question Categories
1. Behavioral Questions
   - Achievement & Success
   - Challenges & Problem-Solving 
   - Interpersonal & Collaboration

2. Product Design Questions
   - Product Analysis
   - New Product Design
   - Product Improvement

3. Strategy Questions
   - Market Entry & Expansion
   - Future Planning & Growth

4. Execution Questions
   - Metrics & Analysis
   - Root Cause Analysis

5. Estimation Questions
   - Market Size & Scale



### 6. Content Management

#### 6.1 Repository Structure
```
interview-questions/
├── content/
│   ├── behavioral/
│   ├── product-design/
│   ├── strategy/
│   ├── execution/
│   └── estimation/
├── components/
├── pages/
├── .github/
│   ├── workflows/
│   │   └── question-automation.yml
│   └── ISSUE_TEMPLATE/
│       └── new-question.yml
└── scripts/
    └── generate-question.js
```

#### 6.2 Question Validation Rules
- Required metadata fields
- Unique ID
- Valid category and subcategory
- Proper markdown formatting
- No duplicate content
- Minimum content requirements

#### 6.3 Content Automation
- GitHub Issues template with form fields for new questions
- Automated PR creation via GitHub Actions
- Content validation before PR creation
- Dynamic form fields based on section selection

#### 6.4 Technical Implementation
1. **Issue Template Structure**
   - Form-based issue template using GitHub's form schema
   - Dynamic dropdown fields using GitHub API
   - Markdown support for question content

2. **GitHub Actions Workflow**
   - Triggers on issue creation
   - Validates form inputs
   - Generates markdown files
   - Creates PRs with appropriate labels

3. **Content Organization**
   - JSON-based section/subsection mapping
   - Markdown files for individual questions
   - Automated frontmatter generation
   - Built-in validation checks

4. **File Generation**
   - Standardized markdown format
   - Automated file naming convention
   - Category-based file organization
   - Metadata inclusion

#### 6.5 Content Contribution Walkthrough

1. **Accessing the Form**
   - Navigate to the repository on GitHub
   - Click on "Issues" tab
   - Select "New Issue"
   - Click on "New Interview Question" template

2. **Filling the Form**
   - Title: Brief description of the question (e.g., "Tell me about a time you failed")
   - Section: Select from dropdown (e.g., "Behavioral Questions")
   - Subsection: Select from dynamically populated options (e.g., "Leadership")
   - Question: Full question text with any context
   - How to Answer (Optional): Framework or approach to answer
   - Example (Optional): Sample answer demonstrating the framework

3. **Submission and Automation**
   - Click "Submit new issue"
   - GitHub Action automatically:
     - Creates a new branch
     - Generates markdown file in correct location
     - Creates PR with appropriate labels
     - Links PR to original issue

4. **Example Submission**
```
Title: Tell me about a time you failed

Section: Behavioral Questions
Subsection: Problem Solving

Question:
Tell me about a time you failed. What did you learn from it?

How to Answer:
Use the STAR framework:
- Situation: Set the context
- Task: What was your responsibility
- Action: What you did
- Result: Outcome and learnings

Example:
"In my previous role, I was leading a product launch (S) where I was responsible 
for coordinating between engineering and marketing teams (T). I failed to 
establish clear communication channels early on, which led to misaligned 
expectations and a delayed launch (A). From this experience, I learned the 
importance of setting up structured communication protocols at the start of any 
cross-functional project. In my next project, I implemented weekly sync meetings 
and a shared documentation system, which led to much smoother execution (R)."
```

The above submission would automatically create a markdown file in 
`content/behavioral/problem-solving/time-you-failed.md` with appropriate 
frontmatter and formatting.

### 7. Future Considerations
Features for later phases:
- Search functionality
- Question filtering
- Progress export
- Dark mode
- Question ratings

Out of scope:
- User accounts
- Social features
- Question submissions
- Analytics tracking

### 8. Layout & User Experience Design

#### 8.1 Core Layout Elements

1. **Sidebar**
   - Width: Fixed 240 pixels on desktop
   - Position: Fixed to left side of screen
   - Key Elements:
     * Category navigation menu
     * Overall progress overview
     * Collapse/expand button
     * Visual progress indicators per category

2. **Main Content Area**
   - Adapts to remaining screen width
   - Scrollable independent of sidebar
   - Key Elements:
     * Category header with title and progress
     * List of question cards
     * Category-specific progress bar

3. **Mobile Layout**
   - Full-width design
   - Hamburger menu for navigation
   - Floating progress indicator
   - Full-screen question view

#### 8.2 Component Details

1. **Navigation System**
   - Always visible on desktop
   - Collapsible for more screen space
   - Nested category structure
   - Clear visual hierarchy
   - Progress indicators per section

2. **Question Display**
   - Card-based layout
   - Two states: collapsed and expanded
   - Expanded view shows full content
   - Checkbox for progress tracking
   - Optional sections for context and examples

3. **Progress Tracking System**
   - Visual progress bars per category
   - Overall completion percentage
   - Persistent across browser sessions
   - Clear visual feedback on completion
   - Category and subcategory tracking

#### 8.3 Responsive Design Strategy

1. **Desktop (Large Screens)**
   - Two-column layout
   - Fixed sidebar with scrollable main content
   - Comfortable reading width
   - Multiple questions visible simultaneously

2. **Tablet (Medium Screens)**
   - Narrower sidebar (200px)
   - Adjusted typography and spacing
   - Optimized touch targets
   - Collapsible sidebar option

3. **Mobile (Small Screens)**
   - Single column layout
   - Hamburger menu navigation
   - Full-width question cards
   - Touch-optimized interactions
   - Floating action buttons

#### 8.4 User Journeys

1. **First-Time User Experience**
   - Landing on homepage
   - Category overview presentation
   - Progress system introduction
   - First question interaction
   - Initial progress tracking

2. **Return User Experience**
   - Progress restoration
   - Last position recall
   - Quick category navigation
   - Continued progress tracking
   - Session resumption

3. **Mobile User Experience**
   - Quick access via hamburger menu
   - Smooth category switching
   - Easy question navigation
   - Touch-friendly interactions
   - Progress updates on the go

#### 8.5 Interactive Elements

1. **Navigation Interactions**
   - Hover effects on categories
   - Active state highlighting
   - Completion checkmarks
   - Smooth transitions between states

2. **Question Card Behaviors**
   - Smooth expansion/collapse
   - Preview of first few lines
   - Clear completion status
   - Easy progress updating

3. **Progress Tracking**
   - Immediate visual feedback
   - Local storage updates
   - Category progress calculation
   - Completion celebrations
   - Overall progress updates

#### 8.6 Animation Guidelines

1. **Core Animations**
   - Smooth state transitions (0.3s)
   - Card expansions (0.2s)
   - Progress updates (0.4s)
   - Menu transitions (0.3s)

2. **Micro-interactions**
   - Checkbox animations
   - Hover feedback
   - Progress bar updates
   - Navigation transitions
   - Mobile menu slides

#### 8.7 Accessibility Features

1. **Keyboard Support**
   - Full navigation support
   - Logical tab order
   - Clear focus indicators
   - Keyboard shortcuts

2. **Screen Reader Optimization**
   - Semantic HTML structure
   - Clear heading hierarchy
   - Progress announcements
   - State change notifications

3. **Visual Accessibility**
   - High contrast options
   - Color-blind friendly design
   - Scalable text
   - Clear visual hierarchy


## Future Considerations
- Add a search bar
- Add a progress export feature
- Add a dark mode
- Add a question submission feature
- Add notes to questions