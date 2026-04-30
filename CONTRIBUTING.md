# Contributing to Workspace IDE

Thank you for your interest in contributing to Workspace IDE! This guide will help you get started.

## Table of Contents

- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Project Architecture](#project-architecture)

---

## Development Setup

### Prerequisites

- **Node.js** 18+ (check with `node --version`)
- **npm** 9+ (check with `npm --version`)
- **Git** 2.30+

### Getting Started

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/<your-username>/Claude-OpenAI-Code.git
cd Claude-OpenAI-Code

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check with `tsc -b` and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Code Style Guidelines

### TypeScript

- Use **strict TypeScript** — avoid `any` types
- Define types in `src/types/workspace.ts` for shared interfaces
- Use descriptive names for variables and functions
- Prefer `interface` over `type` for object shapes

### React

- Use **functional components** with hooks
- Keep components focused — one component, one responsibility
- Use the existing component patterns in `src/components/`
- State management goes through the **Zustand store** (`src/stores/workspaceStore.ts`)

### Styling

- Use **Tailwind CSS v4** utility classes
- Follow existing class naming conventions
- Keep custom CSS in `src/index.css` minimal
- Use `lucide-react` for icons — do not add other icon libraries

### ESLint

- Run `npm run lint` before committing
- All ESLint rules are defined in `eslint.config.js`
- Fix all linting errors before submitting a PR

---

## Pull Request Process

### Before You Start

1. Check [existing issues](https://github.com/ATC-O48/Claude-OpenAI-Code/issues) to avoid duplicate work
2. For major changes, open an issue first to discuss the approach

### Creating a Pull Request

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style guidelines

3. **Verify your changes**:
   ```bash
   npm run lint    # No errors
   npm run build   # Builds successfully
   ```

4. **Commit with a descriptive message**:
   ```bash
   git commit -m "feat: add description of your change"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/) format:
   - `feat:` — New feature
   - `fix:` — Bug fix
   - `docs:` — Documentation only
   - `refactor:` — Code refactoring
   - `style:` — Formatting, missing semicolons, etc.
   - `test:` — Adding or updating tests
   - `chore:` — Build process, dependencies, etc.

5. **Push and open a PR**:
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a PR against the `main` branch.

### PR Review Checklist

- [ ] Code follows the project's style guidelines
- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` completes successfully
- [ ] PR description explains the changes clearly
- [ ] Screenshots included (for UI changes)

---

## Issue Guidelines

### Bug Reports

Use the [Bug Report template](https://github.com/ATC-O48/Claude-OpenAI-Code/issues/new?template=bug_report.yml) and include:

- Clear description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Browser and OS information
- Screenshots if applicable

### Feature Requests

Use the [Feature Request template](https://github.com/ATC-O48/Claude-OpenAI-Code/issues/new?template=feature_request.yml) and include:

- Clear description of the feature
- Use case and motivation
- Proposed solution
- Alternatives considered

### Good First Issues

Look for issues labeled [`good-first-issue`](https://github.com/ATC-O48/Claude-OpenAI-Code/labels/good-first-issue) — these are great for new contributors.

---

## Project Architecture

The project follows a component-based architecture:

```
src/
├── components/     # React UI components
│   ├── layout/     # Workspace layout (TopBar, Panes, etc.)
│   ├── filetree/   # File tree sidebar
│   ├── toolbar/    # Tools dock
│   ├── search/     # Global search
│   ├── resources/  # Resource monitoring
│   ├── spotlight/  # Project settings
│   └── tools/      # Individual tool components
├── stores/         # Zustand state management
├── types/          # TypeScript type definitions
└── main.tsx        # Application entry point
```

For detailed documentation, see the [docs/](docs/) directory.

---

## Questions?

If you have questions about contributing, feel free to:

- Open a [Discussion](https://github.com/ATC-O48/Claude-OpenAI-Code/discussions)
- Check the [Documentation](docs/)
- Review existing [Pull Requests](https://github.com/ATC-O48/Claude-OpenAI-Code/pulls) for examples
