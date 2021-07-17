import React, { useRef, useEffect, useCallback } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";


const BpModal = ({showBpModal, setShowBpModal}) => {
    const modalRef = useRef();
    
    const closeBpModal = (e) => {
        if (modalRef.current === e.target) {
          setShowBpModal(false);
        }
      };
    
      const keyPress = useCallback(
        (e) => {
          if (e.key === "Escape" && showBpModal) {
            setShowBpModal(false);
          }
        },
        [setShowBpModal, showBpModal]
      );

      useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
      }, [keyPress]);

     
        return (
            <>
              {showBpModal ? (

              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                showBpModal={showBpModal}
                onHide={closeBpModal}
                ref={modalRef}
                >
                    <Modal.Header>
                    <Modal.Title><h4>Hello Blood Pressure</h4></Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <h2>Graph</h2>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"  onClick={() => setShowBpModal((prev) => !prev)}>
                                        Close
                            </Button>
                        </Modal.Footer>
               </Modal>
               ) : null}
            </>
      )

}

export default BpModal;