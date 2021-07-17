import React, { useRef, useEffect, useCallback } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";


const WeightModal = ({ showWeightModal, setShowWeightModal}) => {
    const modalRef = useRef();
    
    const closeWeightModal = (e) => {
        if (modalRef.current === e.target) {
          setShowWeightModal(false);
        }
      };
    
      const keyPress = useCallback(
        (e) => {
          if (e.key === "Escape" && showWeightModal) {
            setShowWeightModal(false);
          }
        },
        [setShowWeightModal, showWeightModal]
      );

      useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
      }, [keyPress]);

     
        return (
            <>
              {showWeightModal ? (

              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                showWeightModal={showWeightModal}
                onHide={closeWeightModal}
                ref={modalRef}
                >
                    <Modal.Header>
                    <Modal.Title><h4>Hello Weight</h4></Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <h2>Graph</h2>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"  onClick={() => setShowWeightModal((prev) => !prev)}>
                                        Close
                            </Button>
                        </Modal.Footer>
               </Modal>
               ) : null}
            </>
      )

}

export default WeightModal;