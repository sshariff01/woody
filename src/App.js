import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
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
  const [feedItems, setFeedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch ChangeFeed items from the backend
  const fetchChangeFeedItems = async () => {
    setIsLoading(true);

    try {
      console.log('Skipping backend call for demo purposes');
      // const response = await fetch('https://your-backend.com/api/change-feed');
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      // const data = await response.json();
      const data = [
        {
          id: 1,
          date: '2023-08-04',
          title: '2023 Changelog #3',
          content: 'Finch will now return a 502 status code when we experience upstream issues with a provider...',
          status: 'draft',
        },
        // ... other feed items
      ];

      setFeedItems(data.map(item => ({ ...item, isEditable: false })));
    } catch (error) {
      console.error("Could not fetch change feed items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChangeFeedItems();
  }, []);

  // Function to add new item
  const addNewFeedItem = () => {
    // Check if any existing item is in editable state
    const anyItemEditable = feedItems.some(item => item.isEditable);

    if (!anyItemEditable) {
      const newItem = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        title: '',
        content: '',
        isEditable: true, // New items are editable by default
        status: 'draft'
      };
      setFeedItems([newItem, ...feedItems]); // Add new item at the beginning
    } else {
      alert('Please save or cancel the current edits before adding a new item.');
    }
  };

  // Function to publish item
  const publishItemChange = async (id) => {
    setIsLoading(true); // Optionally show loading state

    try {
      console.log('Skipping backend call for demo purposes');
      // const response = await fetch(`https://your-backend.com/api/changefeed/${id}/publish`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Include other headers like Authorization if needed
      //   },
      //   // Include body if needed: JSON.stringify({ publishStatus: true })
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      // Optionally, if your backend returns the updated item:
      // const updatedItem = await response.json();

      setFeedItems(currentItems =>
        currentItems.map(item =>
          item.id === id
            ? {
                // ...item,
                // ...updatedItem, // If your backend returns the updated item
                // Or manually set the publish status and other changes:
                ...item,
                status: item.status === 'published' ? 'draft' : 'published', // Set the publish status
                isEditable: false, // Make sure it's no longer editable
              }
            : item
        )
      );
    } catch (error) {
      console.error("Could not publish the item:", error);
    } finally {
      setIsLoading(false); // Optionally hide loading state
    }
  };

  // Function to toggle the edit state of an item
  const toggleItemEdit = ({ id, isEditable, publishStatus }) => {
    setFeedItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, isEditable: !isEditable } : item
      )
    );
  };

  const onSave = (updatedData) => {
    // Find the item by ID and update it
    setFeedItems(currentItems =>
      currentItems.map(item =>
        item.id === updatedData.id
          ? { ...item, ...updatedData, isEditable: false }
          : item
      )
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={addNewFeedItem} className="btn btn-primary mb-3">Add New Item</button>

      {feedItems.map(item => (
        <ChangeFeedItem
          key={item.id}
          initialData={item}
          isEditable={item.isEditable}
          onSave={onSave}
          status={item.status}
          onPublishChange={() => publishItemChange(item.id)}
          onToggleEdit={() => toggleItemEdit({ id: item.id, isEditable: item.isEditable })}
          // Pass other required props and handlers
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
