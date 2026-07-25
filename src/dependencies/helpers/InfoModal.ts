export function showInfoModal(title: string, text: string) {
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

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.className = "modal-btn";
    closeBtn.id = "modal-btn-close";
    closeBtn.onclick = () => document.body.removeChild(overlay);
    modal.appendChild(closeBtn);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Optional: click overlay to close
    overlay.addEventListener("click", e => {
        if (e.target === overlay) document.body.removeChild(overlay);
    });
}
