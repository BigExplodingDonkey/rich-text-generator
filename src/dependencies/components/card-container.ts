import { createTextCard } from './text-card.ts'
import { createDivider } from './divider.ts';
import { createRobloxIconCard } from './roblox-icon-card.ts'
import { createHighlightCard } from './highlight-card.ts'
import { createFontCard } from './font-card.ts'
import { createStrokeCard } from './stroke-card.ts'
import { createMiscellaneousCard } from './miscellaneous-card.ts'
import { createLastCard } from './last-card.ts'

export function createCardContainer(): HTMLElement {
    const cardContainer = document.createElement("div");
    cardContainer.id = "card-container";

    // Create different cards
    const textCard = createTextCard();

    const divider1 = createDivider();
    const robloxIconCard = createRobloxIconCard();

    const divider2 = createDivider();
    const fontCard = createFontCard();

    const divider3 = createDivider();
    const highlightCard = createHighlightCard();

    const divider4 = createDivider();
    const strokeCard = createStrokeCard();

    const divider5 = createDivider();
    const miscellaneousCard = createMiscellaneousCard();

    const divider6 = createDivider();
    const lastCard = createLastCard();

    // Add the cards to the card wrapper
    cardContainer.appendChild(textCard);

    cardContainer.appendChild(divider1);
    cardContainer.appendChild(robloxIconCard);

    cardContainer.appendChild(divider2);
    cardContainer.appendChild(fontCard);

    cardContainer.appendChild(divider3);
    cardContainer.appendChild(highlightCard);

    cardContainer.appendChild(divider4);
    cardContainer.appendChild(strokeCard);

    cardContainer.appendChild(divider5);
    cardContainer.appendChild(miscellaneousCard);

    cardContainer.appendChild(divider6);
    cardContainer.appendChild(lastCard);

    return cardContainer;
}