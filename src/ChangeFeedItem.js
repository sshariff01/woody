import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import './ChangeFeedItem.css';

const ChangeFeedItem = ({ initialData, isEditable: isEditableProp, onToggleEdit }) => {
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
    setIsEditable(false);
    onToggleEdit(data.id, false); // Call the onToggleEdit from props
  };

  const handleEdit = () => {
    setIsEditable(true);
    onToggleEdit(data.id, true); // Call the onToggleEdit from props
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handlePublish = () => {
    // Logic to handle the publish action
    console.log('Publishing:', data);
    // You may want to update the state or call an API to publish the item
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
            <button onClick={() => onToggleEdit(data.id)} className={`btn ${isEditable ? 'btn-success me-2' : 'btn-primary me-2'}`}>
            {isEditable ? 'Save' : 'Edit'}
            </button>
            {!isEditable && (
            <button onClick={handlePublish} className="btn btn-info">
                Publish
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
