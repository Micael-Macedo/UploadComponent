let dropArea = document.querySelector(".drag-files");
dropArea.addEventListener("dragover", dragover)
dropArea.addEventListener("dragleave", dragleave)
function dragover() {
    this.classList.add("dragover")
}
function dragleave() {
    this.classList.remove("dragover")
}
const file = document.querySelector("#fileInput");
file.addEventListener("change", () =>{
    const selectedFiles = (event.target.files);
    if(selectedFiles.length > 0){
        for (let i = 0; i < selectedFiles.length; i++) {
            
            const fileReader = new FileReader();
            fileReader.onload = () => {
                const srcData = fileReader.result;
                loadFile(selectedFiles[i], srcData);
            }
            fileReader.readAsDataURL(selectedFiles[i]);

        }

    }
})
function appendFile(file){
    $(".files").append(
        `<div class="box uploading">
            <div class="icon">
                <i class="ph-fill ph-file"></i>
            </div>
            <div class="info">
                <div class="filename">${file.name}</div>
                <div class="filesize">
                    <span class="currentPorcenter">0</span>
                    <span> MB / </span>
                    <span>${ Math.round(file.size/100) /1000} MB</span>
                </div>
                <div class="bar">
                    <progress value="0" max="100"></progress>
                    <span>0%</span>
                </div>
            </div>
            <div class="action">
                <i class="ph ph-x"></i>
            </div>
        </div>`
    )
    return file.size;
}
function loadFile(file, source){
    let size = appendFile(file);
    uploadFile(size, $(".uploading").last(), source)

}
function uploadFile(fileSize, boxFile, source){
    let porcent = 0
    for (let index = 0; index < 10; index++) {        
        setTimeout(() => {
            porcent +=  fileSize/10
        }, 1000);
        console.log(porcent, index)
    }
    console.log(boxFile)
   console.log($(boxFile).find("div.info"))
    // $(icon).empty()
    // $(icon).append(
    //     `<img src="${source}" />`
    // )
} 