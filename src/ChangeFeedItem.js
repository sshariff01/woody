import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import './ChangeFeedItem.css';

const ChangeFeedItem = ({ initialData, isEditable: isEditableProp, status, onToggleEdit, onPublishChange: onPublishChangeProp, onSave: onSaveProp  }) => {
  const [data, setData] = useState(initialData);
  const [isEditable, setIsEditable] = useState(isEditableProp || false);

  useEffect(() => {
    setIsEditable(isEditableProp);
  }, [isEditableProp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSave = () => {
    // Check if any field is empty
    if (!data.date.trim() || !data.title.trim() || !data.content.trim()) {
      alert('Please fill in all fields before saving.');
      return;
    }

    setIsEditable(false);
    onSaveProp(data); // Pass the updated data back to the parent component for saving
  };


  const handleEdit = () => {
    setIsEditable(true);
    onToggleEdit({ id: data.id, isEditable: true }); // Call the onToggleEdit from props
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handlePublishStatusChange = () => {
    // Logic to handle the publish action
    console.log('Changing publish status for:', data);
    onPublishChangeProp(data.id); // Call the onPublish from props
    setData({ ...data, status: status === 'draft' ? 'published' : 'draft' });
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          {isEditable ? (
            <input
              type="date"
              name="date"
              className="form-control"
              value={data.date}
              onChange={handleChange}
            />
          ) : (
            <span className="date-view">{data.date}</span>
          )}
        </div>
        <div className="col-8">
          {isEditable ? (
            <input
              type="text"
              name="title"
              className="form-control"
              value={data.title}
              onChange={handleChange}
              placeholder="Enter title here"
            />
          ) : (
            <span className="title-view">{data.title}</span>
          )}
        </div>
        <div className="col text-end">
            {isEditable ? (
                <button onClick={handleSave} className="btn btn-success me-2">
                    Save
                </button>
                ) : (
                <button onClick={handleEdit} className="btn btn-primary me-2">
                Edit
                </button>
            )}
            {!isEditable && status === 'draft' && (
            <button onClick={handlePublishStatusChange} className="btn btn-info">
                Publish
            </button>
            )}
            {!isEditable && status === 'published' && (
            <button onClick={handlePublishStatusChange} className="btn btn-info">
                Unpublish
            </button>
            )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          {isEditable ? (
            <textarea
              name="content"
              className="form-control"
              value={data.content}
              onChange={handleChange}
              placeholder="Enter content here"
            />
          ) : (
            <div className="content-view">{data.content}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeFeedItem;
