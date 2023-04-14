const width = 300;
let FileInput = document.querySelector("#fileInput");
FileInput.addEventListener("change", (event) =>{
    let fileReader = new FileReader();
    fileReader.onload = () => {
        createCanva(fileReader.result);
    }
    fileReader.readAsDataURL(event.target.files[0]);
})

function createCanva(image_url) {
    let image = document.createElement("img")
    image.src = image_url

    image.onload = (e) =>{
        let canvas = document.createElement("canvas")
        let ratio = width / e.target.width
        canvas.width = width
        canvas.height = ratio* e.target.height

        const context = canvas.getContext("2d")
        context.drawImage(image, 0,0, canvas.width, canvas.height)

        let new_image_url = context.canvas.toDataURL("image/jpeg", 100)
        let new_image = document.createElement("img")
        new_image.src = new_image_url
        $(".files").append(new_image);
    }
}