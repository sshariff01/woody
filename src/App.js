import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import './App.css';
import ChangeFeedItem from './ChangeFeedItem';

const menuItems = [
  { name: 'Change Feed', id: 'change-feed' },
  { name: 'Settings', id: 'settings' },
];

const Sidebar = ({ onMenuItemClick, activeItem }) => {
  return (
    <div className="sidebar">
      <div className="logo">Logo Here</div>
      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onMenuItemClick(item.id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className="upgrade-button">Upgrade Now</div>
    </div>
  );
};

// ChangeFeed content component
const ChangeFeedContent = () => {
  const [feedItems, setFeedItems] = useState([
    {
      id: 1,
      date: 'Aug 02',
      title: '2023 Changelog #3',
      content: 'Finch will now return a 502 status code when we experience upstream issues with a provider...',
    },
    // ... other feed items
  ]);

  const addNewFeedItem = () => {
    // Check if any existing item is in editable state
    const anyItemEditable = feedItems.some(item => item.isEditable);

    if (!anyItemEditable) {
      const newItem = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        title: '',
        content: '',
        isEditable: true // New items are editable by default
      };
      setFeedItems([newItem, ...feedItems]);
    } else {
      alert('Please save or cancel the current edits before adding a new item.');
    }
  };

  // Function to toggle the edit state of an item
  const toggleItemEdit = (id, isEditable) => {
    setFeedItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, isEditable: !isEditable } : item
      )
    );
  };

  const onToggleEdit = (id) => {
    setFeedItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, isEditable: !item.isEditable } : item
      )
    );
  };

  return (
    <div>
      <button onClick={addNewFeedItem} className="btn btn-primary mb-3">Add New Item</button>
      {feedItems.map(item => (
        <ChangeFeedItem
          key={item.id}
          initialData={item}
          isEditable={item.isEditable}
          onToggleEdit={() => toggleItemEdit(item.id, item.isEditable)}
        />
      ))}
    </div>
  );
};

const App = () => {
  // Initialize the activeItem state to the first item's id
  const [activeItem, setActiveItem] = useState(menuItems[0].id);

  const renderContent = () => {
    switch (activeItem) {
      case 'change-feed':
        return <ChangeFeedContent />;
      case 'settings':
        return <div>Settings Content</div>;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <div className="App">
      <Sidebar onMenuItemClick={setActiveItem} activeItem={activeItem} />
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default App;
