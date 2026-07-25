import { createOption, createDropdown } from '../helpers/Dropdown.ts'
import { createLabeledInput } from '../helpers/LabelInput.ts'

function setupColorTypeDropdown(dropdown: HTMLSelectElement): void {
    const toggleColorElements = () => {
        const card = dropdown.closest(".card");
        let colorInputDiv;
        let colorInput1Div;
        let colorInput2Div;
        let thicknessDiv;

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

                thicknessDiv = card?.querySelector("#thickness")?.parentElement;

                // Create color input
                const colorInput = document.createElement("input");
                colorInput.type = "color";
                colorInput.id = "color";
                const labeledColorInput = createLabeledInput("Color", colorInput);

                // Place it in proper spot
                if (thicknessDiv) {
                    card?.insertBefore(labeledColorInput, thicknessDiv);
                }

                break;
            case "gradient":
                colorInputDiv = card?.querySelector("#color")?.parentElement;

                // Remove color option if it exists
                colorInputDiv?.remove();

                thicknessDiv = card?.querySelector("#thickness")?.parentElement;

                // Create color input 1
                const colorInput1 = document.createElement("input");
                colorInput1.type = "color";
                colorInput1.id = "color-1";
                const labeledColorInput1 = createLabeledInput("Color 1", colorInput1, "Stroke", "The starting color of your gradient. Your text stroke will begin with this color.");

                // Create color input 2
                const colorInput2 = document.createElement("input");
                colorInput2.type = "color";
                colorInput2.id = "color-2";
                const labeledColorInput2 = createLabeledInput("Color 2", colorInput2, "Stroke", "The ending color of your gradient. Your text stroke will gradually fade to this color.");

                // Place them in proper spots
                if (thicknessDiv) {
                    card?.insertBefore(labeledColorInput1, thicknessDiv);
                    card?.insertBefore(labeledColorInput2, thicknessDiv);
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

export function createStrokeCard(): HTMLDivElement {
    const card = document.createElement("div");
    card.className = "card"
    card.id = "stroke-card"

    // Create label and textbox
    const label = document.createElement("h2");
    label.textContent = "Stroke (Outline) Style";

    // Create color type dropdown
    const colorTypeOptions: HTMLElement[] = [
        createOption("none", "None", true),
        createOption("color", "Solid"),
        createOption("gradient", "Gradient")
    ]
    const colorTypeDropdown = createDropdown("color-type-dropdown", colorTypeOptions);
    const labeledColorTypeDropdown = createLabeledInput("Color Type", colorTypeDropdown, "Stroke", "The type of color your stroke has. 'None' applies no stroke, 'Solid' applies a single color stroke, and 'Gradient' blends two colors across the text stroke.\n\nKeep in mind that gradients add a lot of length to your text, which can cause it to exceed the booth character limit if your text is too long.");

    // Create size input
    const thicknessInput = document.createElement("input");
    thicknessInput.type = "number";
    thicknessInput.id = "thickness";
    thicknessInput.style.width = "3rem";
    thicknessInput.min = "1";
    thicknessInput.max = "30";
    thicknessInput.defaultValue = "3";
    const labeledThicknessInput = createLabeledInput("Thickness", thicknessInput);

    // Create transparency input
    const transparencyInput = document.createElement("input");
    transparencyInput.type = "number";
    transparencyInput.id = "transparency";
    transparencyInput.style.width = "3rem";
    transparencyInput.min = "0";
    transparencyInput.step = "0.1";
    transparencyInput.max = "0.9";
    transparencyInput.defaultValue = "0";
    const labeledTransparencyInput = createLabeledInput("Transparency", transparencyInput, "Stroke", "Makes your stroke see-through. Use a transparency of 0 for solid stroke, or a higher number (up to 0.9) to make it more transparent.");

    // Create joins dropdown
    const joinsOptions: HTMLElement[] = [
        createOption("miter", "Miter (Default)", true),
        createOption("round", "Round"),
        createOption("bevel", "Bevel")
    ];
    const joinsDropdown = createDropdown("joins-dropdown", joinsOptions);
    const labeledJoinsDropdown = createLabeledInput("Joins", joinsDropdown, "Stroke", "Changes the shape of the corners where the outline lines meet.");

    // Create sizing dropdown
    const sizingOptions: HTMLElement[] = [
        createOption("fixed", "Fixed (Default)", true),
        createOption("scaled", "Scaled")
    ];
    const sizingDropdown = createDropdown("sizing-dropdown", sizingOptions);
    const labeledSizingDropdown = createLabeledInput("Sizing", sizingDropdown, "Stroke", "'Fixed' keeps the stroke thickness exactly what you set. 'Scaled' grows or shrinks based on the text length or booth size.");

    // Add contents to the card
    card.appendChild(label);
    card.appendChild(labeledColorTypeDropdown);
    card.appendChild(labeledThicknessInput);
    card.appendChild(labeledTransparencyInput);
    card.appendChild(labeledJoinsDropdown);
    card.appendChild(labeledSizingDropdown);

    // Setup input functionality
    setupNumInput(thicknessInput);
    setupNumInput(thicknessInput);
    setupNumInput(transparencyInput);
    setupColorTypeDropdown(colorTypeDropdown);

    return card;
}