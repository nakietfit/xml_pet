//data layer
var xmlhttp;
function doc_file_XML() {
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
}

//business layer
var ds_mat_hang;
function lay_du_lieu() {
    var xmlDoc = xmlhttp.responseXML;
    ds_mat_hang = xmlDoc.getElementsByTagName("Mat_hang");
}

function lay_ten_mat_hang(i){
    return ds_mat_hang[i].getAttribute("Ten");
}

function lay_ma_so_mat_hang(i){
    return ds_mat_hang[i].getAttribute("Ma_so");
}

function lay_don_gia_ban(i){
    return ds_mat_hang[i].getAttribute("Don_gia_Ban");
}

function lay_ten_nhom_mat_hang(i){
    return ds_mat_hang[i].getElementsByTagName("Nhom_Mat_hang")[0].getAttribute("Ten");
}

//View Layer
function hien_thi_du_lieu(){
    lay_du_lieu();

    var div1 = document.createElement('div');
    div1.className = 'content';
    var div2;
    for(var i = 0; i < ds_mat_hang.length; i++, j++){
        if (i % 6 === 0) {
            div2 = document.createElement('div');
            div2.className = 'row';
            div1.appendChild(div2);
        }

        var div3 = document.createElement('div');
        div3.className = 'col-lg-2';

        div3.innerHTML = "<img src=\"Media/" + lay_ma_so_mat_hang(i) + ".png\"/>" + 
        "<p>" + lay_ten_mat_hang(i) + "</p>" + 
        "<p>" + lay_don_gia_ban(i) + "</p>";

        div2.appendChild(div3);
    }
}

//ham main
function main(){
    doc_file_XML();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            hien_thi_du_lieu();
        }
    }
    xmlhttp.open("GET", "Du_lieu.xml", true);
    xmlhttp.send();
}