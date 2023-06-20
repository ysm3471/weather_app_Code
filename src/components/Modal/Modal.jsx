import React from 'react';
import ReactDOM from 'react-dom';

function ModalOverlay({children}) {
  return (
    <div className="modal">
      <div>{children}</div>
    </div>
  )
}

const portalEl = document.getElementById('overlays')

export default function Modal({children}) {
  return (
    <div>
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>,portalEl)}
    </div>
  )
}
