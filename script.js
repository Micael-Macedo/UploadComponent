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
function appendFile(file, source){
    $(".files").append(
        `<div class="box uploading newbox">
            <div class="icon">
                <i class="ph-fill ph-file"></i>
                <img src="${source}" title="${file.name}"/>
            </div>
            <div class="info">
                <div class="filename">${file.name}</div>
                <div class="filesize">
                    <span class="currentFilePorcent">0 MB / </span>
                    <span>${ Math.round(file.size/100) /1000} MB</span>
                </div>
                <div class="bar">
                    <progress value="0" max="100"></progress>
                    <span class="currentPorcent">0%</span>
                </div>
            </div>
            <div class="action">
                <i class="ph ph-x" onclick="deleteImage(this)"></i>
            </div>
        </div>`
    )
    return Math.round(file.size/100) /1000;
}
function loadFile(file, source){
    let size = appendFile(file, source);
    uploadFile(size)

}
function uploadFile(fileSize){
    let porcent = 0;
    let currentPorcent = 0;
    let progress = $(".newbox progress");
        var loading = setInterval(() => {
            porcent += 1 + porcent;
            currentPorcent = (fileSize / 100) * porcent;
            if(porcent <= 100){
                $(".newbox .currentFilePorcent").text(currentPorcent.toFixed(3) + " MB / ")
                $(".newbox .currentPorcent").text(porcent+"%")
                $(progress).val(porcent);
            }else 
            if(porcent > 100){
                clearInterval(loading);
                $(progress).val(100);
                $(".newbox .currentFilePorcent").text(fileSize + " MB / ")
                $(".newbox .currentPorcent").text(100+"%")
                finalizarCarregamento()
            }
        }, 550)    
} 
function finalizarCarregamento(){
    let icon = $(".newbox .icon");

    $(".newbox").addClass("done");     
    $(".newbox").removeClass("uploading"); 
    $(".newbox").removeClass("newbox");     

    $(icon).addClass("uploaded");     
    
}
function deleteImage(box) {
    console.log($(box).closest(".box"));
    $(box).closest(".box").remove();
}
