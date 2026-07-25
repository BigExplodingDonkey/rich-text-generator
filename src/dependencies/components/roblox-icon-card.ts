import { createOption, createDropdown } from '../helpers/Dropdown.ts'
import { createLabeledInput, createTextWithInfoModal } from '../helpers/LabelInput.ts'

export function createRobloxIconCard(): HTMLDivElement {
    const card = document.createElement("div");
    card.className = "card"
    card.id = "icon-card"

    // Create label
    const label = document.createElement("h2");
    label.textContent = "Icons";

    // Create instructions
    const instructionsText = `Use <a href="https://kaan650.github.io/builder-icons/">the icon code list</a> to insert icons into the text.`
    const detailedInstructions = `Once you have an icon code from the icon code list, like "robux" (code for the robux icon), type that code where you want it to be placed in your text, surrounded by 2 & symbols on each side. Please keep in mind that some code words get filtered.
    
    Example text:

    100 &&robux&&
    (This will generate the text "100" with a robux symbol on the right.)`

    const instructions = createTextWithInfoModal(instructionsText, "Icons", detailedInstructions);

    // Create icon color dropdown
    const iconColorOptions: HTMLElement[] = [
        createOption("no", "No"),
        createOption("yes", "Yes")
    ]

    const iconColorDropdown = createDropdown("icon-color-dropdown", iconColorOptions);
    const labeledColorDropdown = createLabeledInput("Same Color As Text?", iconColorDropdown, "Icons", "The color your icons have. 'No' leaves them white, 'Yes' applies your indicated text style colors to them.");

    // Add proper contents to the card
    card.appendChild(label);
    card.appendChild(instructions);
    card.appendChild(labeledColorDropdown);

    return card;
}