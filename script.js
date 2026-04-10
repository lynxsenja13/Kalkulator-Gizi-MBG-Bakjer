let img = new Image();

document.getElementById("upload").addEventListener("change", function(e){
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event){
    img.src = event.target.result;
    document.getElementById("preview").src = img.src;
  }

  reader.readAsDataURL(file);
});

let cropper;

function cropImage(){
  const image = document.getElementById('preview');

  if(cropper){
    cropper.destroy();
  }

  cropper = new Cropper(image, {
    aspectRatio: 1,
    viewMode: 1
  });
}

async function removeBg(){
  const fileInput = document.getElementById("upload");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("image_file", file);

  const res = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": "API_KEY_KAMU"
    },
    body: formData
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  img.src = url;
  document.getElementById("preview").src = url;
}

let rotation = 0;

function rotateImage(){
  rotation += 90;

  document.getElementById("preview").style.transform =
    `rotate(${rotation}deg)`;
}

function getTanggalWIB(){
  const now = new Date();

  return now.toLocaleDateString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function generate(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 500;
  canvas.height = 600;

  const template = document.getElementById("template").value;

  let bg;

  if(template === "biru"){
    bg = templateBiru;
  } else {
    bg = templatePutih;
  }

  // gambar background template
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // gambar makanan
  ctx.drawImage(img, 100, 50, 300, 300);

  // teks
  ctx.fillStyle = template === "biru" ? "#ffffff" : "#000000";

  ctx.font = "20px Arial";
  ctx.fillText(document.getElementById("namaMenu").value, 50, 400);

  ctx.font = "16px Arial";
  ctx.fillText(document.getElementById("gizi").value, 50, 430);

  ctx.fillText(getTanggalWIB(), 50, 500);
}

function download(){
  const canvas = document.getElementById("canvas");
  const link = document.createElement("a");
  link.download = "mbg.png";
  link.href = canvas.toDataURL();
  link.click();
}

const templateBiru = new Image();
templateBiru.src = "assets/template-biru.png";

const templatePutih = new Image();
templatePutih.src = "assets/template-putih.png";
