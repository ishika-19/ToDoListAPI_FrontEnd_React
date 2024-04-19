import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Todolist(props) {
    const [visibleItems, setVisibleItems] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedText, setEditedText] = useState('');

    useEffect(() => {
        // Initialize visibleItems based on the length of props.item
        setVisibleItems(new Array(props.item.length).fill(true));
    }, [props.item]);

    useEffect(() => {
        console.log('visibleItems after initialization:', visibleItems);
    }, [visibleItems]);

    const handleDeleteItem = (index) => {
        console.log('Deleting item at index:', index);
        const updatedVisibleItems = [...visibleItems];
        updatedVisibleItems[index] = false;
        setVisibleItems(updatedVisibleItems);
        // Call the deleteItem function passed as props
    };
    const handleEditItem = (index) => {
        setEditIndex(index);
        setEditedText(props.item[index].task);
    };
    const handleInputChange = (e) => {
        setEditedText(e.target.value);
    };
    const handleSubmit = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/todos/${props.item[editIndex].id}/`, { task: editedText });
            console.log('Todo updated:', response.data);
            // Close the pop-up after successful update
            setEditIndex(null);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <ul className="todo-list">
            {props.item.map((listItem, index) => (
                <React.Fragment key={listItem.id}>
                    {visibleItems[index] && ( // Only render visible items
                        <li className="list-item">
                            {editIndex === index ? ( // Render input field if the item is being edited
                                <div>
                                    <input
                                        type="text"
                                        value={editedText}
                                        onChange={handleInputChange}
                                    />
                                    <button onClick={handleSubmit}>Update</button>
                                </div>
                            ) : (
                                <div>
                                    <span onClick={() => handleEditItem(index)}>{listItem.task}</span>
                                    <span className='icons'>
                                        <i className="fa-solid fa-trash-can icon-delete" onClick={() => handleDeleteItem(index)}></i>
                                    </span>
                                </div>
                            )}
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
}

export default Todolist;
