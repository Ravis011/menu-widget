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
    #checkbox {
      display: none;
    }

    .toggle {
      position: relative;
      width: 35px;
      height: 37px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 10px;
      transition-duration: .5s;
    }

    .toggle:hover {
      transform:scale(1.14);
    }

    .bars {
      width: 100%;
      height: 4px;
      background-color: rgb(92, 130, 255);
      border-radius: 4px;
    }

    #bar2 {
      transition-duration: .8s;
    }

    #bar1 {
      width: 50%;
    }

    #bar2 {
      width: 75%;
    }

    #checkbox:checked + .toggle .bars {
      position: absolute;
      transition-duration: .5s;
    }

    #checkbox:checked + .toggle #bar2 {
      transform: scaleX(0);
      transition-duration: .1s;
    }

    #checkbox:checked + .toggle #bar1 {
      width: 100%;
      transform: rotate(45deg);
      transition-duration: .5s;
    }

    #checkbox:checked + .toggle #bar3 {
      width: 100%;
      transform: rotate(-45deg);
      transition-duration: .5s;
    }

    #checkbox:checked + .toggle {
      transition-duration: .5s;
      transform: rotate(180deg);
    }

    .dropdown-content {
      display: none;
      flex-direction: column;
      align-items: center;
      position: fixed;
      border-radius: 0 16px 16px 16px;
      left: 18px;
      top: 70px;  /* Adjusted to place below the toggle button */
      width: fit-content;
      overflow: hidden;  
      opacity: 0;
      visibility: hidden;
      transform: translateY(-12px);
      transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
      z-index: 1;
      pointer-events: none;
      list-style: none;
      background-color: #f9f9f9;
    }

    #checkbox:checked ~ .dropdown-content {
      display: flex;
      opacity: 0.75;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
      border-color: #0a3cff;
    }

    .dropdown-content a, .dropdown-content .dropdown-item {
      color: black;
      padding: 12px 24px;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.48s cubic-bezier(0.23, 1, 0.32, 1);
      width: 100%;
      position: relative;
      text-align: center;
      overflow: hidden;
    }

    .dropdown-content a::before, .dropdown-content .dropdown-item::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #0a3cff;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
      z-index: -1;
    }

    .dropdown-content a:hover::before, .dropdown-content .dropdown-item:hover::before {
      transform: scaleX(1);
    }

    .dropdown-content a:hover, .dropdown-content .dropdown-item:hover {
      color: #ffffff;
    }

    .menu-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      z-index: 1;
    }

    /* Positioning the toggle button at the top-left corner */
    #${config.containerId} {
      position: fixed;
      top: 25px;
      left: 22px;
      z-index: 999;
    }
  `;
  document.head.appendChild(style);

  const container = document.getElementById(config.containerId);
  if (!container) {
    console.error(`Container with ID ${config.containerId} not found.`);
    return;
  }

  // Create the menu button
  const checkbox = document.createElement('input');
  checkbox.id = 'checkbox';
  checkbox.type = 'checkbox';

  const label = document.createElement('label');
  label.className = 'toggle';
  label.htmlFor = 'checkbox';

  const bar1 = document.createElement('div');
  bar1.id = 'bar1';
  bar1.className = 'bars';

  const bar2 = document.createElement('div');
  bar2.id = 'bar2';
  bar2.className = 'bars';

  const bar3 = document.createElement('div');
  bar3.id = 'bar3';
  bar3.className = 'bars';

  label.appendChild(bar1);
  label.appendChild(bar2);
  label.appendChild(bar3);

  // Create the dropdown content container
  const dropdownContent = document.createElement('div');
  dropdownContent.className = 'dropdown-content';

  // Function to render menu items
  function renderMenuItems(items) {
    dropdownContent.innerHTML = ''; // Clear existing items
    items.forEach(item => {
      const link = document.createElement('a');
      link.href = item.href;
      link.target = '_blank';

      // Create and append icon
      if (item.icon) {
        const icon = document.createElement('img');
        icon.src = item.icon;
        icon.alt = item.label;
        icon.className = 'menu-icon';
        link.appendChild(icon);
      }

      // Append label to the link
      link.appendChild(document.createTextNode(item.label));
      dropdownContent.appendChild(link);
    });
  }

  // Initial render of menu items
  renderMenuItems(dropdownMenuData);

  // Append checkbox, label, and dropdown content to the container
  container.appendChild(checkbox);
  container.appendChild(label);
  container.appendChild(dropdownContent);

  // Close the dropdown if clicked outside
  window.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      checkbox.checked = false;
    }
  });

  // Function to add more dropdown items
  function addDropdownItems(items) {
    items.forEach(item => {
      const link = document.createElement('a');
      link.href = item.href;
      link.target = '_blank';

      // Create and append icon
      if (item.icon) {
        const icon = document.createElement('img');
        icon.src = item.icon;
        icon.alt = item.label;
        icon.className = 'menu-icon';
        link.appendChild(icon);
      }

      // Append label to the link
      link.appendChild(document.createTextNode(item.label));
      dropdownContent.appendChild(link);
    });
  }
  // Function to add more dropdown items at top
  function addDropdownItemsTop(items) {
	items.reverse();
    items.forEach(item => {
      const link = document.createElement('a');
      link.href = item.href;
      link.target = '_blank';

      // Create and append icon
      if (item.icon) {
        const icon = document.createElement('img');
        icon.src = item.icon;
        icon.alt = item.label;
        icon.className = 'menu-icon';
        link.appendChild(icon);
      }

      // Append label to the link
      link.appendChild(document.createTextNode(item.label));
      dropdownContent.insertBefore(link, dropdownContent.firstChild);
    });
  }

  // Function to add any elements as dropdown items in reverse order
  // while preserving their CSS, JavaScript properties, and functionality
  function addElementsAsDropdownItems(elements) {
    elements = Array.from(elements).reverse();
    elements.forEach(element => {
      const existingElement = document.getElementById(element.id);
      if (existingElement) {
        existingElement.remove();
      }

      // Move the element instead of cloning to preserve all properties and events
      element.classList.add('dropdown-item');
      dropdownContent.insertBefore(element, dropdownContent.firstChild);
    });
  }

  // Expose functions for external use
  return {
    addDropdownItems,
    addDropdownItemsTop,
    addElementsAsDropdownItems
  };
}
// Automatically create the container and initialize the menu
  const container = document.createElement('div');
  container.id = 'menuContainer';
  document.body.appendChild(container);

// Initialize the dropdown menu
  const menu = createDropdownMenu({
    containerId: 'menuContainer'
  });
// Example: Add any elements as dropdown items
  const elements = document.querySelectorAll('.dropdown-item');
  menu.addElementsAsDropdownItems(elements);
