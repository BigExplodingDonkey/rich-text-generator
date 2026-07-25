import { createCardContainer } from './card-container.ts'

// Convert hex to rgb value
function hexToRGB(hex: string): { r: number, g: number, b: number } {
    const pureHex = hex.replace("#", "");
    return {
        r: parseInt(pureHex.substring(0,2), 16),
        g: parseInt(pureHex.substring(2,4), 16),
        b: parseInt(pureHex.substring(4,6), 16)
    };
}

// Convert rgb to hex value
function rgbToHex(r: number, g: number, b: number): string {
    return (
        "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("")
    );
}

// Generate steps # of colors from startHex to endHex colors
function generateGradient(startHex: string, endHex: string, steps: number): string[] {
    const start = hexToRGB(startHex);
    const end = hexToRGB(endHex);

    const gradient: string[] = [];

    // Calculate and add each color in gradient sequence
    for (let i = 0; i < steps; i++) {
        // 1 less than steps gaps
        const t = i / (steps - 1);

        const r = Math.round(start.r + (end.r - start.r) * t);
        const g = Math.round(start.g + (end.g - start.g) * t);
        const b = Math.round(start.b + (end.b - start.b) * t);

        gradient.push(rgbToHex(r, g, b));
    }

    return gradient;
}

// Check if current character is an invisible character (like newline or return)
function isInvisible(char: string): boolean {
    return char === "\n" || char === "\t" || char === "\r";
}

// Add gradients to the text first
function addGradient(
        text: string, setIconColor: string, // yes or no
        font: boolean, fontColor1: string, fontColor2: string,
        highlight: boolean, highlightColor1: string, highlightColor2: string, highlightTransparency: string,
        stroke: boolean, strokeColor1: string, strokeColor2: string, strokeThickness: string, strokeTransparency: string, strokeJoins: string, strokeSizing: string
    ): string {

    const textWithoutSpaces = text.replace(/ /g, "");

    let fontGradient: string[] = font ? generateGradient(fontColor1, fontColor2, textWithoutSpaces.length) : [];
    let highlightGradient: string[] = highlight ? generateGradient(highlightColor1, highlightColor2, text.length) : [];
    let strokeGradient: string[] = stroke ? generateGradient(strokeColor1, strokeColor2, textWithoutSpaces.length) : [];

    let finalText = "";

    // Track valid indexes for gradients
    let fontIndex = 0;
    let strokeIndex = 0;
    let highlightIndex = 0;

    const characters = Array.from(text);

    // Generate gradient text one character at a time
    for (let i = 0; i < characters.length; i++) {
        let char = characters[i];
        let currentText = char;

        // Check if we should skip adding color to icon placeholders
        const skipIcon = setIconColor === "no" && char === "⸘";

        // Add chosen font gradient to current (non invis) character
        if (fontGradient.length !== 0 && char !== " " && !isInvisible(char) && !skipIcon) {
            currentText = '<font color=\"' + fontGradient[fontIndex] + '\">' + currentText + '</font>';

            fontIndex++;
        }

        // Add chosen highlight gradient to current (non invis but not non space) character
        if (highlightGradient.length !== 0 && !isInvisible(char) && !skipIcon) {
            let startTag = '<mark color=\"' + highlightGradient[highlightIndex] + '\"'
            startTag = (highlightTransparency !== "0") ? startTag + ' transparency=\"' + highlightTransparency + '\"' : startTag;
            startTag += ">";

            const endTag = "</mark>";

            currentText = startTag + currentText + endTag;

            highlightIndex++;
        }

        // Add chosen stroke gradient to current (non invis) character
        if (strokeGradient.length !== 0 && char !== " " && !isInvisible(char) && !skipIcon) {
            let startTag = '<stroke color=\"' + strokeGradient[strokeIndex] + '\" thickness=\"' + strokeThickness + '\"';
            startTag = (strokeTransparency !== "0") ? startTag + ' transparency=\"' + strokeTransparency + '\"' : startTag;
            startTag = (strokeJoins !== "miter") ? startTag + ' joins=\"' + strokeJoins + '\"' : startTag;
            startTag = (strokeSizing !== "fixed") ? startTag + ' sizing=\"' + strokeSizing + '\"' : startTag;
            startTag += ">";

            const endTag = "</stroke>";

            currentText = startTag + currentText + endTag;

            strokeIndex++;
        }

        finalText += currentText;
    }

    return finalText;
}

// Add any font styles selected
function addFontStyle(text: string, color: string, useSize: string, size: string, family: string, weight: string, transparency: string): string {
    let finalText = text;

    let startTag = '<font';
    startTag = (color !== undefined && color !== null) ? startTag + ' color=\"' + color + '\"' : startTag;
    startTag = (useSize !== "no") ? startTag + ' size=\"' + size + '\"' : startTag;
    startTag = (family !== "None") ? startTag + ' family=\"' + family + '\"' : startTag;
    startTag = (weight !== "Regular") ? startTag + ' weight=\"' + weight + '\"' : startTag;
    startTag = (transparency !== "0") ? startTag + ' transparency=\"' + transparency + '\"' : startTag;
    startTag += ">";

    const endTag = "</font>";

    finalText = startTag + finalText + endTag;

    return finalText;
}

// Add highlight style options that are selected
function addHighlightStyle(text: string, color: string, transparency: string): string {
    let finalText = text;

    let startTag = '<mark color=\"' + color + '\"'
    startTag = (transparency !== "0") ? startTag + ' transparency=\"' + transparency + '\"' : startTag;
    startTag += ">";

    const endTag = "</mark>";

    finalText = startTag + finalText + endTag;

    return finalText;
}

// Add stroke style options that are selected
function addStrokeStyle(text: string, color: string, thickness: string, transparency: string, joins: string, sizing: string): string {
    let finalText = text;

    let startTag = '<stroke color=\"' + color + '\" thickness=\"' + thickness + '\"';
    startTag = (transparency !== "0") ? startTag + ' transparency=\"' + transparency + '\"' : startTag;
    startTag = (joins !== "miter") ? startTag + ' joins=\"' + joins + '\"' : startTag;
    startTag = (sizing !== "fixed") ? startTag + ' sizing=\"' + sizing + '\"' : startTag;
    startTag += ">";

    const endTag = "</stroke>";

    finalText = startTag + finalText + endTag;

    return finalText;
}

// Add any miscellaneous styles selected
function addMiscellaneousStyle(text: string, bold: boolean, italic: boolean, underline: boolean, strikethrough: boolean, smallcaps: boolean): string {
    let finalText = text;

    // Add proper tags based on styles indicated
    finalText = bold ? "<b>" + finalText + "</b>" : finalText;
    finalText = italic ? "<i>" + finalText + "</i>" : finalText;
    finalText = underline ? "<u>" + finalText + "</u>" : finalText;
    finalText = strikethrough ? "<s>" + finalText + "</s>" : finalText;
    finalText = smallcaps ? "<sc>" + finalText + "</sc>" : finalText;

    return finalText;
}

// Replace icon text with special unicode character ⸘ and return resulting string + replaced content
function replaceIconCodes(text: string): { text: string; replaced: string[] } {
    const replaced: string[] = [];

    const finalText: string = text.replace(/&&(.+?)&&/g, (_match, iconText) => {
        replaced.push(iconText);
        return "⸘";
    });

    return {
        text: finalText,
        replaced
    }
}

// Replace icon text with special unicode character ⸘ and return resulting string + replaced content
function restoreIconCodes(text: string, replaced: string[]): string {
    let index = 0;

     return text.replace(/⸘/g, () => {
        return `&&${replaced[index++]}&&`;
    });
}

// Replace icon double ampersands with BuilderIcon font tags
function addBuilderIconFont(text: string) {
    let textFinal: string = text;

    let match: RegExpExecArray | null;

    // Repeat while there's still icons left to add the font to
    while ((match = /&&.+?&&/.exec(textFinal)) !== null) {
        let start = match?.index;
        let end = start + match[0].length;

        textFinal = textFinal.slice(0, start) + "<font family=\"rbxasset://LuaPackages/Packages/_Index/BuilderIcons/BuilderIcons/BuilderIcons.json\">" + textFinal.slice(start + 2, end - 2) + "</font>" + (end != textFinal.length - 1 ? textFinal.slice(end) : "");
    }

    return textFinal;
}

// Generate rich text based off style selections
function generateRichText(): string {
    let {text, replaced}: {text: string, replaced: string[]} = replaceIconCodes((document.getElementById("booth-text") as HTMLTextAreaElement)?.value);

    // Icons style
    const iconCard = document.getElementById("icon-card");
    const sameColorAsText = (iconCard?.querySelector("#icon-color-dropdown") as HTMLSelectElement)?.value;

    // Font style
    const fontCard = document.getElementById("font-card");
    const fontColorType = (fontCard?.querySelector("#color-type-dropdown") as HTMLSelectElement)?.value;
    const fontColor = (fontCard?.querySelector("#color") as HTMLSelectElement)?.value;
    const fontColor1 = (fontCard?.querySelector("#color-1") as HTMLSelectElement)?.value;
    const fontColor2 = (fontCard?.querySelector("#color-2") as HTMLSelectElement)?.value;
    const useFontSize = (fontCard?.querySelector("#size-check-dropdown") as HTMLSelectElement)?.value;
    const fontSize = (fontCard?.querySelector("#size") as HTMLSelectElement)?.value;
    const fontFamily = (fontCard?.querySelector("#family-dropdown") as HTMLSelectElement)?.value;
    const fontWeight = (fontCard?.querySelector("#weight-dropdown") as HTMLSelectElement)?.value;
    const fontTransparency = (fontCard?.querySelector("#transparency") as HTMLSelectElement)?.value;

    // Highlight style
    const highlightCard = document.getElementById("highlight-card");
    const highlightColorType = (highlightCard?.querySelector("#color-type-dropdown") as HTMLSelectElement)?.value;
    const highlightColor = (highlightCard?.querySelector("#color") as HTMLSelectElement)?.value;
    const highlightColor1 = (highlightCard?.querySelector("#color-1") as HTMLSelectElement)?.value;
    const highlightColor2 = (highlightCard?.querySelector("#color-2") as HTMLSelectElement)?.value;
    const highlightTransparency = (highlightCard?.querySelector("#transparency") as HTMLSelectElement)?.value;

    // Stroke style
    const strokeCard = document.getElementById("stroke-card");
    const strokeColorType = (strokeCard?.querySelector("#color-type-dropdown") as HTMLSelectElement)?.value;
    const strokeColor = (strokeCard?.querySelector("#color") as HTMLSelectElement)?.value;
    const strokeColor1 = (strokeCard?.querySelector("#color-1") as HTMLSelectElement)?.value;
    const strokeColor2 = (strokeCard?.querySelector("#color-2") as HTMLSelectElement)?.value;
    const strokeThickness = (strokeCard?.querySelector("#thickness") as HTMLSelectElement)?.value;
    const strokeTransparency = (strokeCard?.querySelector("#transparency") as HTMLSelectElement)?.value;
    const strokeJoins = (strokeCard?.querySelector("#joins-dropdown") as HTMLSelectElement)?.value;
    const strokeSizing = (strokeCard?.querySelector("#sizing-dropdown") as HTMLSelectElement)?.value;

    // Miscellaneous styles
    const miscellaneousCard = document.getElementById("miscellaneous-card");
    const bold = (miscellaneousCard?.querySelector("#bold-dropdown") as HTMLSelectElement)?.value;
    const italic = (miscellaneousCard?.querySelector("#italic-dropdown") as HTMLSelectElement)?.value;
    const underline = (miscellaneousCard?.querySelector("#underline-dropdown") as HTMLSelectElement)?.value;
    const strikethrough = (miscellaneousCard?.querySelector("#strikethrough-dropdown") as HTMLSelectElement)?.value;
    const smallcaps = (miscellaneousCard?.querySelector("#smallcaps-dropdown") as HTMLSelectElement)?.value;

    // If gradient color types exist, add them first
    const colorTypeValues = [fontColorType, highlightColorType, strokeColorType];

    if (colorTypeValues.includes("gradient")) {
        const [fontGradientEnabled, highlightGradientEnabled, strokeGradientEnabled] = colorTypeValues.map(val => val === "gradient");
        text = addGradient(
            text, sameColorAsText,
            fontGradientEnabled, fontColor1, fontColor2,
            highlightGradientEnabled, highlightColor1, highlightColor2, highlightTransparency,
            strokeGradientEnabled, strokeColor1, strokeColor2, strokeThickness, strokeTransparency, strokeJoins, strokeSizing
        );
    }

    // If normal (non-gradient) font style options are being used, add them
    if (fontColorType === "color" || useFontSize === "yes" || fontFamily !== "None" || fontWeight !== "Regular" || fontTransparency !== "0") {
        text = addFontStyle(text, fontColor, useFontSize, fontSize, fontFamily, fontWeight, fontTransparency);
    }

    // If normal (non-gradient) highlight style options are being used, add them
    const highlightValues = [highlightColor, highlightTransparency];

    if (highlightColorType === "color") {
        const [val1, val2] = highlightValues;
        text = addHighlightStyle(text, val1, val2);
    }

    // If normal (non-gradient) stroke style options are being used, add them
    if (strokeColorType === "color") {
        text = addStrokeStyle(text, strokeColor, strokeThickness, strokeTransparency, strokeJoins, strokeSizing);
    }

    // If any miscellaneous styles are being used, add them
    const miscellaneousValues = [bold, italic, underline, strikethrough, smallcaps];

    if (miscellaneousValues.includes("yes")) {
        const [boldEnabled, italicEnabled, underlineEnabled, strikethroughEnabled, smallcapsEnabled] = miscellaneousValues.map(val => val === "yes");
        text = addMiscellaneousStyle(text, boldEnabled, italicEnabled, underlineEnabled, strikethroughEnabled, smallcapsEnabled);
    }

    let restoredText = restoreIconCodes(text, replaced);

    // Check for &&text&& pattern, and if it exists then create proper icon tags
    if (/&&.+?&&/.exec(restoredText)) {
        text = addBuilderIconFont(restoredText);
    }

    return text;
}

// Create generated text popup
function createRichTextModal(richText: string) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "modal-overlay";

    // Create modal
    const modal = document.createElement("div");
    modal.id = "modal";

    // Header
    const header = document.createElement("h2");
    header.textContent = "Here's Your Text:";

    // Textarea (read-only)
    const textarea = document.createElement("textarea");
    textarea.value = richText;
    textarea.readOnly = true;
    textarea.id = "modal-textarea";

    // Text length display
    const textLength = document.createElement("div");
    textLength.id = "modal-text-length";
    textLength.textContent = `Text Length: ${richText.length}`;

    // Add a tip if text is too long
    if (richText.length > 650) {
        const tip = document.createElement("div");
        tip.id = "modal-text-tip";
        tip.style.marginTop = "0.4rem";
        tip.style.fontSize = "0.9rem";
        tip.style.color = "#ff5555";
        tip.style.textAlign = "center";
        tip.textContent = "⚠️ Your text exceeds 650 characters. If this is an issue, try shortening your text, or removing gradients if you have any.";
        textLength.appendChild(tip);
    }

    // Container for buttons
    const buttons = document.createElement("div");
    buttons.id = "modal-buttons";

    // Copy button
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy Text";
    copyBtn.className = "modal-btn copy";
    copyBtn.id = "modal-btn-copy";
    copyBtn.onclick = () => {
        textarea.select();
        if (!navigator.clipboard) {
            document.execCommand("copy");
        } else {
            navigator.clipboard.writeText(richText)
                .then(() => alert("Text successfully copied to clipboard."))
                .catch(() => alert("Text could not be copied to clipboard."));
        }
    };

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.className = "modal-btn";
    closeBtn.id = "modal-btn-close";
    closeBtn.onclick = () => document.body.removeChild(overlay);

    // Assemble buttons
    buttons.append(copyBtn, closeBtn);

    // Assemble modal content
    modal.append(header, textarea, textLength, buttons);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

// Setup reset button functionality
function setupResetButton(button: HTMLButtonElement): void {
    // Reload card container (resetting styles) but keep booth text
    const resetStyles = () => {
        // Save text
        const text = (document.getElementById("booth-text") as HTMLTextAreaElement)?.value;

        // Get app and container elements
        const app = document.getElementById('app');
        let cardContainer = document.getElementById("card-container");

        // Remove and recreate container
        cardContainer?.remove();
        cardContainer = createCardContainer();
        app?.appendChild(cardContainer);

        // Put booth text back
        const boothText = document.getElementById("booth-text") as HTMLTextAreaElement;
        boothText!.value = text;
    }
    button.addEventListener('click', () => resetStyles());
}

// Setup generate button functionality
function setupGenerateButton(button: HTMLButtonElement): void {
    const showPopup = () => {
        const richText = generateRichText();
        createRichTextModal(richText);
    }
    button.addEventListener('click', () => showPopup());
}

export function createLastCard(): HTMLDivElement {
    const endCard = document.createElement("div");
    endCard.id = "last-card";

    // Create reset styles button
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Styles";
    resetButton.id = "reset";

    // Create generate button
    const generateButton = document.createElement("button");
    generateButton.textContent = "Generate";
    generateButton.id = "generate";

    // Create container for buttons
    const endButtons = document.createElement("div");
    endButtons.id = "end-buttons";

    // Add buttons to container
     endButtons.appendChild(resetButton);
    endButtons.appendChild(generateButton);
    
    // Add container to end card
    endCard.appendChild(endButtons);

    // Setup buttons functionality
    setupResetButton(resetButton);
    setupGenerateButton(generateButton);

    return endCard;
}