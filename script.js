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
