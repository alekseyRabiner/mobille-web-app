import React from 'react';


const Overlay = () => (
  <div id="overlay" className="overlay-container" >
    <a className="closebtn" onClick={() => { document.getElementById('overlay').style.height = '0%'; }}>&times;</a>
    <div className="overlay-content">
      <a>Link 1</a>
      <a>Link 2</a>
      <a>Link 3</a>
      <a>Link 4</a>
    </div>
  </div >
);

export default Overlay;
