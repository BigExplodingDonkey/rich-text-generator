import { createOption, createDropdown } from '../helpers/Dropdown.ts'
import { createLabeledInput } from '../helpers/LabelInput.ts'

export function createMiscellaneousCard(): HTMLDivElement {
    const card = document.createElement("div");
    card.className = "card"
    card.id = "miscellaneous-card"

    // Create label and textbox
    const label = document.createElement("h2");
    label.textContent = "Miscellaneous Styles";

    // Create bold dropdown
    const boldOptions: HTMLElement[] = [
        createOption("yes", "Yes"),
        createOption("no", "No", true)
    ];
    const boldDropdown = createDropdown("bold-dropdown", boldOptions);
    const labeledBoldDropdown = createLabeledInput("Bold", boldDropdown);

    // Create italic dropdown
    const italicOptions: HTMLElement[] = [
        createOption("yes", "Yes"),
        createOption("no", "No", true)
    ];
    const italicDropdown = createDropdown("italic-dropdown", italicOptions);
    const labeledItalicDropdown = createLabeledInput("Italic", italicDropdown);

    // Create underline dropdown
    const underlineOptions: HTMLElement[] = [
        createOption("yes", "Yes"),
        createOption("no", "No", true)
    ];
    const underlineDropdown = createDropdown("underline-dropdown", underlineOptions);
    const labeledUnderlineDropdown = createLabeledInput("Underline", underlineDropdown);

    // Create strikethrough dropdown
    const strikethroughOptions: HTMLElement[] = [
        createOption("yes", "Yes"),
        createOption("no", "No", true)
    ];
    const strikethroughDropdown = createDropdown("strikethrough-dropdown", strikethroughOptions);
    const labeledStrikethroughDropdown = createLabeledInput("Strikethrough", strikethroughDropdown);

    // Create smallcaps dropdown
    const smallcapsOptions: HTMLElement[] = [
        createOption("yes", "Yes"),
        createOption("no", "No", true)
    ];
    const smallcapsDropdown = createDropdown("smallcaps-dropdown", smallcapsOptions);
    const labeledSmallcapsDropdown = createLabeledInput("Smallcaps", smallcapsDropdown, "Miscellaneous", "Makes your text look uppercase while keeping a size difference between the original capital and lowercase letters.");

    // Add contents to the card
    card.appendChild(label);
    card.appendChild(labeledBoldDropdown);
    card.appendChild(labeledItalicDropdown);
    card.appendChild(labeledUnderlineDropdown);
    card.appendChild(labeledStrikethroughDropdown);
    card.appendChild(labeledSmallcapsDropdown);

    return card;
}