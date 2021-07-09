import React, { useRef, useEffect, useCallback } from 'react';
import "../../../static/Styling/addNotesModal.css";
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';


const ModalWrapper = styled.div`
  width: 30%;
  height: 50%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  position: relative;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const MedModal = ({ showModal, setShowModal }) => {
    const modalRef = useRef();

    const closeModal = e => {
      if (modalRef.current === e.target) {
        setShowModal(false);
      }
    };

    const keyPress = useCallback(
      e => {
        if (e.key === 'Escape' && showModal) {
          setShowModal(false);
          console.log('I pressed');
        }
      },
      [setShowModal, showModal]
    );

    useEffect(
      () => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
      },
      [keyPress]
    );

    return (
      <>
        {showModal ? (
            <div className="modal" onClick={closeModal} ref={modalRef}>
              <ModalWrapper showModal={showModal}>
                <ModalContent>
{console.log("ki")}
                </ModalContent>
                <CloseModalButton
                  aria-label='Close modal'
                  onClick={() => setShowModal(prev => !prev)}
                />
              </ModalWrapper>
          </div>
        ) : null}
      </>
    );
  };

  export default MedModal; 