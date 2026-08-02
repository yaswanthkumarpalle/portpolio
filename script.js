particlesJS("particles-js",{

particles:{

number:{
value:120,
density:{
enable:true,
value_area:900
}
},

color:{
value:"#00ffff"
},

shape:{
type:"circle"
},

opacity:{
value:.6,
random:true
},

size:{
value:3,
random:true
},

line_linked:{
enable:true,
distance:150,
color:"#00ffff",
opacity:.3,
width:1
},

move:{
enable:true,
speed:2
}

},

interactivity:{

detect_on:"canvas",

events:{

onhover:{
enable:true,
mode:"grab"
},

onclick:{
enable:true,
mode:"push"
}

},

modes:{

grab:{
distance:180,
line_linked:{
opacity:1
}
},

push:{
particles_nb:5
}

}

},

retina_detect:true

});

let btn=document.getElementById("topBtn");

window.onscroll=function(){

if(document.body.scrollTop>300||document.documentElement.scrollTop>300){

btn.style.display="block";

}
else{

btn.style.display="none";

}

};

btn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};