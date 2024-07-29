// Define the menu data with icons
const dropdownMenuData = [
  { href: 'https://www.google.com', label: 'Google', icon: 'https://example.com/icons/google.png' },
  { href: 'https://www.facebook.com', label: 'Facebook', icon: 'https://example.com/icons/facebook.png' },
  { href: 'https://www.twitter.com', label: 'Twitter', icon: 'https://example.com/icons/twitter.png' }
];

function createDropdownMenu(config) {
  // Add CSS styles dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    .dropdown-button {
      padding: 10px;
      background-color: #333;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
      min-width: 160px;
    }

    .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: flex;
      align-items: center;
    }

    .dropdown-content a:hover {
      background-color: #ddd;
    }

    .menu-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  `;
  document.head.appendChild(style);

  const container = document.getElementById(config.containerId);
  if (!container) {
    console.error(`Container with ID ${config.containerId} not found.`);
    return;
  }

  // Create the dropdown button
  const button = document.createElement('button');
  button.textContent = config.buttonLabel || 'Menu';
  button.className = 'dropdown-button';

  // Create the dropdown content container
  const dropdownContent = document.createElement('div');
  dropdownContent.className = 'dropdown-content';

  // Add menu items from the dropdownMenuData array
  dropdownMenuData.forEach(item => {
    const link = document.createElement('a');
    link.href = item.href;
    link.target = '_blank';

    // Create and append icon
    const icon = document.createElement('img');
    icon.src = item.icon;
    icon.alt = item.label;
    icon.className = 'menu-icon';

    // Append icon and label to the link
    link.appendChild(icon);
    link.appendChild(document.createTextNode(item.label));
    dropdownContent.appendChild(link);
  });

  // Append button and dropdown content to the container
  container.appendChild(button);
  container.appendChild(dropdownContent);

  // Toggle dropdown visibility on button click
  button.addEventListener('click', () => {
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  });

  // Close the dropdown if clicked outside
  window.addEventListener('click', (e) => {
    if (!button.contains(e.target) && !dropdownContent.contains(e.target)) {
      dropdownContent.style.display = 'none';
    }
  });
}
