
import React, { useState, useContext } from 'react';
import '../../css/Modal.css';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean,
  onClose: () => void,
  onConfirm: () => void,
  message: string
}

const Modal: React.FC<Props> = ({ isOpen, onClose, onConfirm, message }: Props) => {

  return createPortal(
    <div className="modal"
      style={{ display: isOpen ? 'flex' : 'none' }}
      onClick={onClose}>
      <div className="modal-content"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
          e.stopPropagation();
          e.nativeEvent.preventDefault();
        }}>
        <div className="modal-header">
          <button type="button" className="close-btn"
            onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn submit-btn" onClick={onConfirm}>Confirm</button>
          <button className="btn cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;