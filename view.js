//data layer
var xmlhttp;
function doc_file_XML() {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } 
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
}

//business layer
var ds_mat_hang;
function lay_du_lieu() {
    var xmlDoc = xmlhttp.responseXML;
    ds_mat_hang = xmlDoc.getElementsByTagName("Mat_hang");
}

function lay_ten_mat_hang(i) {
    return ds_mat_hang[i].getAttribute("Ten");
}

function lay_ma_so_mat_hang(i) {
    return ds_mat_hang[i].getAttribute("Ma_so");
}

function lay_don_gia_ban(i) {
    return ds_mat_hang[i].getAttribute("Don_gia_Ban");
}

function lay_ten_nhom_mat_hang(i) {
    return ds_mat_hang[i].getElementsByTagName("Nhom_Mat_hang")[0].getAttribute("Ten");
}

//View Layer
function hien_thi_du_lieu() {
    lay_du_lieu();

    var cafe = document.getElementById("cafe");
    cafe.classList.add('container-fluid');
    var food = document.getElementById("food");
    food.classList.add('container-fluid');
    var div2;
    var indexMonAn;

    for(var i = 0; i < ds_mat_hang.length; i++) {
        if (lay_ten_nhom_mat_hang(i) === "Món ăn") {
            break;
        }

        if (i % 3 === 0) {
            div2 = document.createElement('div');
            div2.className = 'row';
            cafe.appendChild(div2);
        }

        var div3 = document.createElement('div');
        div3.className = 'col-sm-4';

        div3.innerHTML = "<img src=\"Media/" + lay_ma_so_mat_hang(i) + ".png\"/>" + 
        "<p>" + lay_ten_mat_hang(i) + "</p>" + 
        "<p>" + lay_don_gia_ban(i) + "</p>";

        div2.appendChild(div3);
        indexMonAn = i;
    }

    for(var i = indexMonAn + 1; i < ds_mat_hang.length; i++){
        if (i % 3 === 0) {
            div2 = document.createElement('div');
            div2.className = 'row';
            food.appendChild(div2);
        }

        var div3 = document.createElement('div');
        div3.className = 'col-sm-4';

        var img = document.createElement("IMG");
        img.setAttribute("src", "Media/" + lay_ma_so_mat_hang(i) + ".png");
        img.setAttribute("width", "143");
        img.setAttribute("height", "143");
        
        div3.appendChild(img);
        div3.innerHTML +=
        "<p>" + lay_ten_mat_hang(i) + "</p>" + 
        "<p>" + lay_don_gia_ban(i) + "</p>";

        div2.appendChild(div3);
    }
}

//ham main
function main() {
    doc_file_XML();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hien_thi_du_lieu();
        }
    }
    xmlhttp.open("GET", "Du_lieu.xml", true);
    xmlhttp.send();
}