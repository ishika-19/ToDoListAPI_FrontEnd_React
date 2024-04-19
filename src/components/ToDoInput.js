import React, { useState } from 'react';
import axios from 'axios';

function TodoInput(props) {
    const [inputText, setInputText] = useState('');

    const handleEnterPress = async (e) => {
        if (e.keyCode === 13) {
            await addTodo();
        }
    };
    const addTodo = async () => {
        try {
            if (inputText.trim() === '') {
                console.log('Input text is empty, skipping todo addition');
                return;
            }
            const response = await axios.post('http://127.0.0.1:8000/todos', { task: inputText });
            console.log('Todo added:', response.data);
            props.addList(response.data); // Assuming the response contains the added todo
            setInputText('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleButtonClick = () => {
        console.log('Button clicked');
        addTodo();
        window.location.reload(); // Refresh the page
    };

    return (
        <div className="input-container">
            <input
                type="text"
                className="input-box-todo"
                placeholder="Enter your todo"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleEnterPress}
            />
            <button className="add-btn" onClick={handleButtonClick}>+</button>
        </div>
    );
}

export default TodoInput;
