import { createOption, createDropdown } from '../helpers/Dropdown.ts'
import { createLabeledInput } from '../helpers/LabelInput.ts'

function setupColorTypeDropdown(dropdown: HTMLSelectElement): void {
    const toggleColorElements = () => {
        const card = dropdown.closest(".card");
        let colorInputDiv;
        let colorInput1Div;
        let colorInput2Div;
        let sizeCheckDiv;

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

                sizeCheckDiv = card?.querySelector("#size-check-dropdown")?.parentElement;

                // Create color input
                const colorInput = document.createElement("input");
                colorInput.type = "color";
                colorInput.id = "color";
                const labeledColorInput = createLabeledInput("Color", colorInput);

                // Place it in proper spot
                if (sizeCheckDiv) {
                    card?.insertBefore(labeledColorInput, sizeCheckDiv);
                }

                break;
            case "gradient":
                colorInputDiv = card?.querySelector("#color")?.parentElement;

                // Remove color option if it exists
                colorInputDiv?.remove();

                sizeCheckDiv = card?.querySelector("#size-check-dropdown")?.parentElement;

                // Create color input 1
                const colorInput1 = document.createElement("input");
                colorInput1.type = "color";
                colorInput1.id = "color-1";
                const labeledColorInput1 = createLabeledInput("Color 1", colorInput1, "Font", "The starting color of your gradient. Your text will begin with this color.");

                // Create color input 2
                const colorInput2 = document.createElement("input");
                colorInput2.type = "color";
                colorInput2.id = "color-2";
                const labeledColorInput2 = createLabeledInput("Color 2", colorInput2, "Font", "The ending color of your gradient. Your text will gradually fade to this color.");

                // Place them in proper spots
                if (sizeCheckDiv) {
                    card?.insertBefore(labeledColorInput1, sizeCheckDiv);
                    card?.insertBefore(labeledColorInput2, sizeCheckDiv);
                }

                break;
            default:
                // Do nothing
        };
    }
    dropdown.addEventListener('change', () => toggleColorElements());
}

function setupSizeDropdown(dropdown: HTMLSelectElement): void {
    const toggleSizeElement = () => {
        const card = dropdown.closest(".card");
        let sizeInputDiv;
        let familyInputDiv;

        switch(dropdown.value) {
            case "no":
                sizeInputDiv = card?.querySelector("#size")?.parentElement;

                // Remove size input if it exists
                sizeInputDiv?.remove();

                break;
            case "yes":
                familyInputDiv = card?.querySelector("#family-dropdown")?.parentElement;

                // Create size input
                const sizeInput = document.createElement("input");
                sizeInput.type = "number";
                sizeInput.id = "size";
                sizeInput.style.width = "3rem";
                sizeInput.min = "0";
                sizeInput.defaultValue = "30";
                setupNumInput(sizeInput);
                const labeledSizeInput = createLabeledInput("Size", sizeInput, "Font", "Font size changes how big your letters are. It only matters if you’re combining text with other sizes (including if their size isn’t already set).");

                // Place it in proper spot
                if (familyInputDiv) {
                    card?.insertBefore(labeledSizeInput, familyInputDiv);
                }

                break;
            default:
                // Do nothing
        };
    }
    dropdown.addEventListener('change', () => toggleSizeElement());
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

export function createFontCard(): HTMLDivElement {
    const card = document.createElement("div");
    card.className = "card"
    card.id = "font-card"

    // Create label and textbox
    const label = document.createElement("h2");
    label.textContent = "Font Style";

    // Create color type dropdown
    const colorTypeOptions: HTMLElement[] = [
        createOption("none", "None", true),
        createOption("color", "Solid"),
        createOption("gradient", "Gradient")
    ]
    const colorTypeDropdown = createDropdown("color-type-dropdown", colorTypeOptions);
    const labeledColorTypeDropdown = createLabeledInput("Color Type", colorTypeDropdown, "Font", "The type of color your font has. 'None' leaves it unchanged, 'Solid' applies a single color, and 'Gradient' blends two colors across the text.\n\nKeep in mind that gradients add a lot of length to your text, which can cause it to exceed the character limit if your text is too long.");

    // Create size checkbox
    const sizeCheckOptions: HTMLElement[] = [
        createOption("no", "No"),
        createOption("yes", "Yes")
    ]
    const sizeCheckDropdown = createDropdown("size-check-dropdown", sizeCheckOptions);
    const labeledSizeCheckbox = createLabeledInput("Use Size?", sizeCheckDropdown);

    // Create family dropdown
    const familyOptions: HTMLElement[] = [
        createOption("None", "None", true),
        createOption("Legacy", "Legacy"),
        createOption("Arial", "Arial"),
        createOption("ArialBold", "ArialBold"),
        createOption("SourceSans", "SourceSans"),
        createOption("SourceSansBold", "SourceSansBold"),
        createOption("SourceSansLight", "SourceSansLight"),
        createOption("SourceSansItalic", "SourceSansItalic"),
        createOption("Bodoni", "Bodoni"),
        createOption("Garamond", "Garamond"),
        createOption("Cartoon", "Cartoon"),
        createOption("Code", "Code"),
        createOption("Highway", "Highway"),
        createOption("SciFi", "SciFi"),
        createOption("Arcade", "Arcade"),
        createOption("Fantasy", "Fantasy"),
        createOption("Antique", "Antique"),
        createOption("SourceSansSemibold", "SourceSansSemibold"),
        createOption("Gotham", "Gotham"),
        createOption("GothamMedium", "GothamMedium"),
        createOption("GothamBold", "GothamBold"),
        createOption("GothamBlack", "GothamBlack"),
        createOption("AmaticSC", "AmaticSC"),
        createOption("Bangers", "Bangers"),
        createOption("Creepster", "Creepster"),
        createOption("DenkOne", "DenkOne"),
        createOption("Fondamento", "Fondamento"),
        createOption("FredokaOne", "FredokaOne"),
        createOption("GrenzeGotisch", "GrenzeGotisch"),
        createOption("IndieFlower", "IndieFlower"),
        createOption("JosefinSans", "JosefinSans"),
        createOption("Jura", "Jura"),
        createOption("Kalam", "Kalam"),
        createOption("LuckiestGuy", "LuckiestGuy"),
        createOption("Merriweather", "Merriweather"),
        createOption("Michroma", "Michroma"),
        createOption("Nunito", "Nunito"),
        createOption("Oswald", "Oswald"),
        createOption("PatrickHand", "PatrickHand"),
        createOption("PermanentMarker", "PermanentMarker"),
        createOption("Roboto", "Roboto"),
        createOption("RobotoCondensed", "RobotoCondensed"),
        createOption("RobotoMono", "RobotoMono"),
        createOption("Sarpanch", "Sarpanch"),
        createOption("SpecialElite", "SpecialElite"),
        createOption("TitilliumWeb", "TitilliumWeb"),
        createOption("Ubuntu", "Ubuntu"),
        createOption("BuilderSans", "BuilderSans"),
        createOption("BuilderSansMedium", "BuilderSansMedium"),
        createOption("BuilderSansBold", "BuilderSansBold"),
        createOption("BuilderSansExtraBold", "BuilderSansExtraBold"),
        createOption("Arimo", "Arimo"),
        createOption("ArimoBold", "ArimoBold")
    ];
    const familyDropdown = createDropdown("family-dropdown", familyOptions);
    const labeledFamilyDropdown = createLabeledInput("Family", familyDropdown, "Font", "A set of letters and numbers that share the same style, like a design theme for your text.");

    // Create transparency input
    const transparencyInput = document.createElement("input");
    transparencyInput.type = "number";
    transparencyInput.id = "transparency";
    transparencyInput.style.width = "3rem";
    transparencyInput.min = "0";
    transparencyInput.step = "0.1";
    transparencyInput.max = "0.9";
    transparencyInput.defaultValue = "0";
    const labeledTransparencyInput = createLabeledInput("Transparency", transparencyInput, "Font", "Makes your text see-through. Use a transparency of 0 for solid text, or a higher number (up to 0.9) to make it more transparent.");

    // Create weight dropdown
    const weightOptions: HTMLElement[] = [
        createOption("Thin", "Thin"),
        createOption("ExtraLight", "ExtraLight"),
        createOption("Light", "Light"),
        createOption("Regular", "Regular", true),
        createOption("Medium", "Medium"),
        createOption("SemiBold", "SemiBold"),
        createOption("Bold", "Bold"),
        createOption("ExtraBold", "ExtraBold"),
        createOption("Heavy", "Heavy")
    ];
    const weightDropdown = createDropdown("weight-dropdown", weightOptions);
    const labeledWeightDropdown = createLabeledInput("Weight", weightDropdown, "Font", "How thick or thin your letters appear. Choose thin for delicate text or bold for strong, eye-catching text.");

    // Add contents to the card
    card.appendChild(label);
    card.appendChild(labeledColorTypeDropdown);
    card.appendChild(labeledSizeCheckbox);
    card.appendChild(labeledFamilyDropdown);
    card.appendChild(labeledWeightDropdown);
    card.appendChild(labeledTransparencyInput);

    // Setup input functionality
    setupColorTypeDropdown(colorTypeDropdown);
    setupSizeDropdown(sizeCheckDropdown);
    setupNumInput(transparencyInput);

    return card;
}