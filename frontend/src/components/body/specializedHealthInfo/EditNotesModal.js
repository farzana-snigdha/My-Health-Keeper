import React, {useState, useRef, useEffect, useCallback } from "react";
import "react-responsive-modal/styles.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";


const EditNotesModal = ({ showEditModal, setShowEditModal,getNote,getID }) => {
    const token = useSelector((state) => state.token);

    const closeEditModal = () => {
    setShowEditModal(false);
  };
  const [description, setDesc] = useState("");
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDesc(value);
  };
  const updateDesc = async (e, folderId) => {
    e.preventDefault();
    console.log("folderId ", folderId);
    await axios
      .patch(
        "http://localhost:5000/api/updateSpecializedHealthInfo/" + folderId,
        { description },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => {
        // showSPHealthNotes();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showEditModal}
        onHide={closeEditModal}
      >
        <Modal.Header>
          <Modal.Title>
            <h4>Hello Pulse Rate</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{getID}</h2>
          <p>{getNote}</p>
          <textarea
                    onChange={handleChangeInput}
                    value={description}
                  ></textarea>
                  <Button onClick={(e) => updateDesc(e, getID)}>👍🏼</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              closeEditModal();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditNotesModal;
