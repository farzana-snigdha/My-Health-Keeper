import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfView(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  return (
    <div className="mainPdf">
      <Document
        file={`http://localhost:5000/${props.getFilePath}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="pdfViewer">
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          ⬅
        </button>
        &nbsp; Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        &nbsp;{" "}
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          ➡
        </button>
      </div>
    </div>
  );
}
