import React from 'react'
import './ban.css'

const Ban = ({ banList, removeFromBanList }) => {
    return (
      <div className="ban-container">
        <div className='ban-title'>Ban List</div>
        <p>Select an attribute in your listing to ban it</p>
        {banList.length > 0 ? (
          <ul>
            {banList.map((item, index) => (
              <li key={index}>
                <button onClick={() => removeFromBanList(item)}>{item}</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No banned attributes</p>
        )}
      </div>
    );
  };
export default Ban;