// Export the CV layout (.container) as a single-page PDF via html2pdf.js.
(function () {
  const downloadBtn = document.querySelector(".download-fab");
  const cvRoot = document.querySelector(".container");

  if (!downloadBtn || !cvRoot) return;

  async function downloadPdf() {
    downloadBtn.classList.add("is-busy");
    downloadBtn.setAttribute("aria-busy", "true");

    try {
      const { width, height } = cvRoot.getBoundingClientRect();
      const options = {
        margin: 0,
        filename: "CV_Mourtalla_Toure_Software_Engineer.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "px", format: [width, height], orientation: "portrait" },
        pagebreak: { mode: ["avoid-all"] },
      };

      const worker = html2pdf().set(options).from(cvRoot).toPdf();
      const pdf = await worker.get("pdf");

      // html2pdf sometimes adds a blank trailing page - drop it.
      const pageCount = pdf.internal.getNumberOfPages();
      if (pageCount > 1) {
        pdf.deletePage(pageCount);
      }

      await worker.save();
    } finally {
      downloadBtn.classList.remove("is-busy");
      downloadBtn.setAttribute("aria-busy", "false");
    }
  }

  downloadBtn.addEventListener("click", downloadPdf);
})();
