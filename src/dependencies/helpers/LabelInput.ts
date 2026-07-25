function showInfoModal(title: string, text: string) {
    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "modal-overlay";

    // Create modal container
    const modal = document.createElement("div");
    modal.id = "modal";

    // Modal header
    const header = document.createElement("h2");
    header.textContent = title;
    modal.appendChild(header);

    // Body text
    const body = document.createElement("p");
    body.textContent = text;
    body.style.textAlign = "center";
    modal.appendChild(body);

    // Wrap close button in a flex container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.justifyContent = "center"; // center the button
    buttonsContainer.style.gap = "1rem";              // optional gap if more buttons

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.className = "modal-btn";
    closeBtn.id = "modal-btn-close";
    closeBtn.type = "button";
    closeBtn.onclick = () => document.body.removeChild(overlay);

    buttonsContainer.appendChild(closeBtn);
    modal.appendChild(buttonsContainer);
    // --------------------------------------------

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Optional: click overlay to close
    overlay.addEventListener("click", e => {
        if (e.target === overlay) document.body.removeChild(overlay);
    });
}

export function createLabeledInput(labelText: string, input: HTMLElement, styleType?: string, infoText?: string): HTMLDivElement {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "1rem";

    const label = document.createElement("label");
    label.textContent = labelText;

    if (input.id) {
        label.htmlFor = input.id;
    }

    row.append(label, input);

    // Add ? icon if infoText is provided
    if (infoText) {
        const infoBtn = document.createElement("button");
        infoBtn.type = "button";
        infoBtn.textContent = "?";
        infoBtn.style.width = "1.25rem";
        infoBtn.style.height = "1.25rem";
        infoBtn.style.borderRadius = "50%";
        infoBtn.style.border = "none";
        infoBtn.style.backgroundColor = "#5c8eff";
        infoBtn.style.color = "#fff";
        infoBtn.style.cursor = "pointer";
        infoBtn.style.fontSize = "0.8rem";
        infoBtn.style.display = "inline-flex";
        infoBtn.style.alignItems = "center";
        infoBtn.style.justifyContent = "center";

        infoBtn.addEventListener("click", () => {
            showInfoModal(styleType + " " + labelText, infoText);
        });

        row.appendChild(infoBtn);
    }

    return row;
}

export function createTextWithInfoModal(text: string, infoLabel: string, infoText: string): HTMLDivElement {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.gap = "1rem";

    const textDiv = document.createElement("div");
    textDiv.innerHTML = text;

    row.appendChild(textDiv);

    // Add ? icon if infoText is provided
    const infoBtn = document.createElement("button");
    infoBtn.type = "button";
    infoBtn.textContent = "?";
    infoBtn.style.width = "1.25rem";
    infoBtn.style.height = "1.25rem";
    infoBtn.style.borderRadius = "50%";
    infoBtn.style.border = "none";
    infoBtn.style.backgroundColor = "#5c8eff";
    infoBtn.style.color = "#fff";
    infoBtn.style.cursor = "pointer";
    infoBtn.style.fontSize = "0.8rem";
    infoBtn.style.display = "inline-flex";
    infoBtn.style.alignItems = "center";
    infoBtn.style.justifyContent = "center";

    infoBtn.addEventListener("click", () => {
        showInfoModal(infoLabel, infoText);
    });

    row.appendChild(infoBtn);

    return row;
}