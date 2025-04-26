# DD.xyz Security Dashboard

A modern, modular, and visually rich web application for blockchain security analytics. Built with React, TypeScript, Vite, and Tailwind CSS, it provides comprehensive risk analysis for addresses, contracts, URLs, and more.

## Features

- **Dashboard**: Overview of security risks and scores.
- **Threat Risks**: Analyze addresses for malicious activity, sanctions, mixers, and more.
- **Sanction Checks**: Check addresses against major sanctions lists and jurisdictions.
- **Approval Risk**: Visualize and monitor token approval risks and permissions.
- **Exposure Risk**: Assess exposure to risky contracts and suspicious activities.
- **Contract Risk**: Analyze smart contracts for vulnerabilities and risk tags.
- **URL Risk**: Detect phishing, suspicious scripts, and domain threats.
- **Dark/Light Theme**: System and user-selectable themes.
- **Responsive UI**: Optimized for desktop and mobile.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui, Lucide icons
- **Routing**: React Router DOM
- **State/Context**: React Context API (ThemeProvider)
- **Utilities**: clsx, tailwind-merge, date-fns
- **Linting**: ESLint, TypeScript ESLint, React Hooks, React Refresh

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-org/dd.xyz.git
cd my-app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

- `src/pages/`: Main app pages (Dashboard, ThreatRisks, SanctionChecks, etc.)
- `src/components/`: Reusable UI components (cards, badges, sidebar, etc.)
- `src/contexts/`: Theme provider and context
- `src/lib/`: Utility functions
- `src/assets/`: Static assets
- `public/`: Static files (favicon, images)
- `index.html`: App entry point

## Configuration

- **Tailwind**: See `tailwind.config.js` and `src/index.css` for theme and utility setup.
- **ESLint**: See `eslint.config.js` for linting rules and recommendations.
- **TypeScript**: Configured via `tsconfig.json` and `tsconfig.app.json`.

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE)

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
