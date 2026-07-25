export function createHeader(): HTMLElement {
    const header = document.createElement("header");
    const nav = document.createElement("nav");
    const ul = document.createElement("ul");
    ul.innerHTML = `
    <li><b>Rich Text Generator</b></li>
    <li><a href="https://www.discord.gg/VgCjM8agKC">
        <img src="DiscordIcon.png" class="nav-icon"> Discord Server
    </a></li>
    `;

    // Build nav header
    nav.appendChild(ul);
    header.appendChild(nav);
    
    return header;
}