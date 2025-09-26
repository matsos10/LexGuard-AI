# LexGuard AI

An AI-powered SaaS platform for automated legal monitoring, contract analysis, and compliance management.

[cloudflarebutton]

## Overview

LexGuard AI is a sophisticated, AI-powered SaaS platform designed for legal and compliance professionals. It addresses the critical challenges of tedious legal monitoring, complex contract management, and ensuring GDPR compliance. The platform provides a suite of tools to automate and streamline these processes, enabling teams to focus on high-value strategic work instead of manual, error-prone tasks.

This project is built on a modern, serverless stack using Cloudflare Workers for the backend and React for the frontend, ensuring high performance, scalability, and security.

## Key Features

-   **Automated Regulatory Watch**: An AI agent continuously scans legal and regulatory sources, providing users with real-time, summarized updates relevant to their industry and jurisdiction.
-   **Intelligent Contract Analysis**: Users can upload contracts, and the AI will automatically identify key clauses, potential risks, obligations, and critical dates, presenting them in an easy-to-understand dashboard.
-   **AI-Powered Document Management**: A secure repository for legal documents with smart search capabilities, allowing users to find information using natural language queries.
-   **Automated Compliance Audits**: The system can perform automated checks against internal policies or external regulations like GDPR, generating reports that highlight areas of non-compliance and suggest remediation steps.

## Technology Stack

-   **Frontend**: React, TypeScript, Vite, Tailwind CSS
-   **UI Components**: Shadcn/ui, Radix UI
-   **Backend**: Cloudflare Workers, Hono
-   **Database**: Cloudflare Durable Objects (for state management)
-   **State Management**: Zustand
-   **Routing**: React Router
-   **Animations**: Framer Motion
-   **Icons**: Lucide React

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) (v1.0 or higher)
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up)
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/lexguard-ai.git
    cd lexguard-ai
    ```

2.  **Install dependencies:**
    This project uses Bun for package management.
    ```sh
    bun install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root of the project by copying the example file.
    ```sh
    cp .env.example .env
    ```
    Fill in the necessary values in your new `.env` file (e.g., API keys for Supabase, Stripe, etc.).

### Running Locally

To start the development server for both the frontend and the backend worker, run:

```sh
bun dev
```

This will start the Vite development server for the React application and a local Wrangler process for the Cloudflare Worker. The application will be available at `http://localhost:3000`.

## Development

The codebase is organized into three main directories:

-   `src/`: Contains all the frontend React application code.
    -   `pages/`: Top-level route components.
    -   `components/`: Reusable UI components, including Shadcn/ui elements.
    -   `hooks/`: Custom React hooks.
    -   `lib/`: Utility functions and API client.
-   `worker/`: Contains the backend Hono application for the Cloudflare Worker.
    -   `index.ts`: The main entry point for the worker.
    -   `user-routes.ts`: API route definitions.
    -   `entities.ts`: Data models and logic interacting with Durable Objects.
-   `shared/`: Contains TypeScript types and interfaces shared between the frontend and backend.

## Deployment

This application is designed for easy deployment to the Cloudflare global network.

1.  **Build the application:**
    ```sh
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    Make sure you have authenticated Wrangler with your Cloudflare account. Then, run the deploy command:
    ```sh
    bun run deploy
    ```
    This command will build the application and deploy it to your Cloudflare account. Wrangler will provide you with the URL of your deployed application.

Alternatively, you can deploy directly from your GitHub repository using the button below.

[cloudflarebutton]

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.