import React from 'react'
import './history.css'

const history = ({ history }) => {
    return (
        <div className="history-container">
            <h1 className="history-title">History</h1>
            <h2>Who have we seen so far?</h2>
            <ul>
                {history.map((cat, index) => (
                    <li key={index}>
                        <img src={cat.image} alt={cat.name} />
                        <p>
                            A {cat.name} cat from {cat.location}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default history