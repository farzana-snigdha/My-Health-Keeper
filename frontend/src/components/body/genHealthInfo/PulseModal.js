import React, { useRef, useEffect, useCallback } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";


const PulseModal = ({showPulseModal, setShowPulseModal}) => {
    const modalRef = useRef();
    
    const closePulseModal = (e) => {
        if (modalRef.current === e.target) {
          setShowPulseModal(false);
        }
      };
    
      const keyPress = useCallback(
        (e) => {
          if (e.key === "Escape" && showPulseModal) {
            closePulseModal()
          }
        },
        [setShowPulseModal, showPulseModal]
      );

      useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
      }, [keyPress]);

     
        return (
            <>
              {showPulseModal ? (

              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                showPulseModal={showPulseModal}
                onHide={closePulseModal}
                ref={modalRef}
                >
                    <Modal.Header>
                    <Modal.Title><h4>Hello Pulse Rate</h4></Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <h2>Graph</h2>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"  onClick={() => setShowPulseModal((prev) => !prev)}>
                                        Close
                            </Button>
                        </Modal.Footer>
               </Modal>
               ) : null}
            </>
      )

}

export default PulseModal;