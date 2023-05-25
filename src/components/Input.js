import { useState } from "react";

const Input = ({ onInputChange }) => {
    const [input, setInput] = useState('');

    const handleInput = (event) => {
        setInput(event.target.value);
        onInputChange(event.target.value);
    }

    return (
        <div>
            <input type="text" value={input} onChange={handleInput} />
        </div>
    ); 
}

export default Input;