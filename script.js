let dropArea = document.querySelector(".drag-files");
dropArea.addEventListener("dragover", dragover)
dropArea.addEventListener("dragleave", dragleave)
function dragover() {
    this.classList.add("dragover")
}
function dragleave() {
    this.classList.remove("dragover")
}