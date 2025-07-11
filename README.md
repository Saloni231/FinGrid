# Backlink Marketplace

## Project Overview

A React + TypeScript data grid application built for the Liquid Metrix React Developer Test.  
Implements clean, maintainable, and testable UI using **SOLID principles**, **hexagonal architecture**, and **modular components**.

### Key Features:

- **Sortable Columns**: Click on column headers to toggle ascending/descending order
- **Filter by ContractSize**: Show only rows with `ContractSize > X`
- **Increment/Decrement Buttons**: Modify the ContractSize threshold in steps of 10
- **Input Validation**: ContractSize input blocks non-numeric characters
- **Bonus**: Text filters for `ISIN`, `CFICode`, and `Venue`

---

## Installation & Setup

### Requirements:

- Node.js (>=16.x.x)
- npm or yarn

### Steps to Run Locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Saloni231/FinGrid.git
   cd FinGrid

   ```

2. **Install Dependencies:**
   If you're using npm:

   ```bash
   npm install
   ```

   Or if you're using yarn:

   ```bash
   yarn install
   ```

3. **Start the Development Server:**

   ```bash
   npm start
   ```

   Or if you're using yarn:

   ```bash
   yarn dev
   ```

The app should now be running on http://localhost:3000.

### Technologies Used

| Technology                  | Purpose                                                     |
| --------------------------- | ----------------------------------------------------------- |
| **React**                   | Frontend library for building UI components                 |
| **TypeScript**              | Static typing for safer, more predictable JavaScript        |
| **Jest**                    | Unit testing framework                                      |
| **React Testing Library**   | For writing behavior-driven unit tests for React components |
| **CSS Modules / Plain CSS** | Scoped styles for individual components                     |
| **Hexagonal Architecture**  | Clean separation of UI, logic, and infrastructure           |
| **SOLID Principles**        | Ensures maintainability, scalability, and testability       |

## Project Architecture

The project follows **Hexagonal Architecture (Ports & Adapters)**:

src/
├── adapters/
│   └── ui/
│       ├── components/
│       ├── constants/
│       ├── models/
│       └── styles/
├── core/
│   ├── domain/
│   │   ├── models/
│   │   └── services/
│   └── utils/
├── infrastructure/
│   └── csv/
└── test/


## Running Tests

This project includes unit tests using **Jest** and **React Testing Library**.

```bash
npm test
# or
yarn test
```
