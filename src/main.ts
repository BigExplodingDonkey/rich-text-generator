import './style.css'
import { createHeader } from './dependencies/components/header.ts'
import { createCardContainer } from './dependencies/components/card-container.ts'

const app = document.getElementById('app');
if (!app) {
  throw new Error("App container not found.");
}

// Retrieve contents to add to application
const header = createHeader();
const cardContainer = createCardContainer();

// Add contents to application
app.appendChild(header);
app.appendChild(cardContainer);