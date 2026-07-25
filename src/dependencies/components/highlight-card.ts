import { createOption, createDropdown } from '../helpers/Dropdown.ts'
import { createLabeledInput } from '../helpers/LabelInput.ts'

function setupColorTypeDropdown(dropdown: HTMLSelectElement): void {
    const toggleColorElements = () => {
        const card = dropdown.closest(".card");
        let colorInputDiv;
        let colorInput1Div;
        let colorInput2Div;
        let transparencyInputDiv;

        switch(dropdown.value) {
            case "none":
                colorInputDiv = card?.querySelector("#color")?.parentElement;
                colorInput1Div = card?.querySelector("#color-1")?.parentElement;
                colorInput2Div = card?.querySelector("#color-2")?.parentElement;

                // Remove all color options if they exist
                colorInputDiv?.remove();
                colorInput1Div?.remove();
                colorInput2Div?.remove();

                break;
            case "color":
                colorInput1Div = card?.querySelector("#color-1")?.parentElement;
                colorInput2Div = card?.querySelector("#color-2")?.parentElement;

                // Remove gradient options if they exist
                colorInput1Div?.remove();
                colorInput2Div?.remove();

                transparencyInputDiv = card?.querySelector("#transparency")?.parentElement;

                // Create color input
                const colorInput = document.createElement("input");
                colorInput.type = "color";
                colorInput.id = "color";
                const labeledColorInput = createLabeledInput("Color", colorInput);

                // Place it in proper spot
                if (transparencyInputDiv) {
                    card?.insertBefore(labeledColorInput, transparencyInputDiv);
                }

                break;
            case "gradient":
                colorInputDiv = card?.querySelector("#color")?.parentElement;

                // Remove color option if it exists
                colorInputDiv?.remove();

                transparencyInputDiv = card?.querySelector("#transparency")?.parentElement;

                // Create color input 1
                const colorInput1 = document.createElement("input");
                colorInput1.type = "color";
                colorInput1.id = "color-1";
                const labeledColorInput1 = createLabeledInput("Color 1", colorInput1);

                // Create color input 2
                const colorInput2 = document.createElement("input");
                colorInput2.type = "color";
                colorInput2.id = "color-2";
                const labeledColorInput2 = createLabeledInput("Color 2", colorInput2);

                // Place them in proper spots
                if (transparencyInputDiv) {
                    card?.insertBefore(labeledColorInput1, transparencyInputDiv);
                    card?.insertBefore(labeledColorInput2, transparencyInputDiv);
                }

                break;
            default:
                // Do nothing
        };
    }
    dropdown.addEventListener('change', () => toggleColorElements());
}

function setupNumInput(input: HTMLInputElement): void {
    const defaultValue = input.defaultValue;
    const ensureCorrectValue = () => {
        const value = parseFloat(input.value);

        // If invalid, set to default value
        if (isNaN(value)) {
            input.value = defaultValue;
            return;
        }

        // Get min and max
        const min = input.min ? parseFloat(input.min) : -Infinity;
        const max = input.max ? parseFloat(input.max) : Infinity;

        // If value isn't between min and max, set to default value
        if (value < min || value > max) {
            input.value = defaultValue;
            return;
        }
    }
    input.addEventListener('change', () => ensureCorrectValue());
}

export function createHighlightCard(): HTMLDivElement {
    const card = document.createElement("div");
    card.className = "card"
    card.id = "highlight-card"

    // Create label and textbox
    const label = document.createElement("h2");
    label.textContent = "Highlight Style";

    // Create color type dropdown
    const options: HTMLElement[] = [
        createOption("none", "None"),
        createOption("color", "Solid"),
        createOption("gradient", "Gradient")
    ]
    const colorTypeDropdown = createDropdown("color-type-dropdown", options);
    const labeledColorTypeDropdown = createLabeledInput("Color Type", colorTypeDropdown, "Highlight", "The type of color your highlighting has. 'None' adds no highlighting, 'Solid' adds solid color highlighting, and 'Gradient' blends two colors across the highlighting.\n\nKeep in mind that gradients add a lot of length to your text, which can cause it to exceed the booth character limit if your text is too long.");

    // Create transparency input
    const transparencyInput = document.createElement("input");
    transparencyInput.type = "number";
    transparencyInput.id = "transparency";
    transparencyInput.style.width = "3rem";
    transparencyInput.min = "0";
    transparencyInput.step = "0.1";
    transparencyInput.max = "0.9";
    transparencyInput.defaultValue = "0";
    const labeledTransparencyInput = createLabeledInput("Transparency", transparencyInput, "Highlight", "Makes your text highlighting see-through. Use a transparency of 0 for solid highlighting, or a higher number (up to 0.9) to make it more transparent.");

    // Add proper contents to the card
    card.appendChild(label);
    card.appendChild(labeledColorTypeDropdown);
    card.appendChild(labeledTransparencyInput);

    // Setup input functionality
    setupColorTypeDropdown(colorTypeDropdown);
    setupNumInput(transparencyInput);

    return card;
}