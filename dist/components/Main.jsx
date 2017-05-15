import React from 'react';
import TopBar from 'TopBar';
import Calendar from 'Calendar';
import Body from 'Body';
import Overlay from 'Overlay';


const Main = () => (
  <div className="container-main">
    <TopBar />
    <Calendar />
    <Body />
    <Overlay />
  </div>
);

export default Main;
