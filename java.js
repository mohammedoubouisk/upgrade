let contrast=document.getElementById('contrast');
let saturate=document.getElementById('saturate');
let brightness=document.getElementById('brightness');
let sepia=document.getElementById('sepia');
let grayscale=document.getElementById('grayscale');
let blur=document.getElementById('blur');
let hueRotate=document.getElementById('hue-rotate');

let download=document.getElementById('download');
let reset=document.getElementById('reset');
let imgBox=document.querySelector('.img-box');
let img=document.getElementById('img');
let upload=document.getElementById('upload');

let canvas=document.getElementById('canvas');
let context=canvas.getContext('2d');

upload.onchange=function(){
    download.style.display='block';
    reset.style.display='block';

    let reader = new FileReader();
    reader.readAsDataURL(upload.files[0]);
    reader.onload=function(){
        img.src=reader.result;
    }

    img.onload=function(){
        canvas.width=img.width;
        canvas.height=img.height;
        context.drawImage(img,0,0,canvas.width,canvas.height);
        img.style.display='none'
        resetValue();
    }
}

// for use filters
let inputs=document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input',function(){
        context.filter=`
        contrast(${contrast.value}%)
        saturate(${saturate.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
        context.drawImage(img,0,0,canvas.width,canvas.height)
    })
})

// reset function
function resetValue(){
    saturate.value=100
    contrast.value=100
    brightness.value=100
    sepia.value=0
    grayscale.value=0
    blur.value=0
    hueRotate.value=0
    img.style.filter='none'
}

reset.onclick=function(){
     resetValue();
}

// download
download.onclick=function(){
    download.href=canvas.toDataURL('image/jpeg');
}
