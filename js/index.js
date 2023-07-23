// the dataBase array
if (localStorage.length != 0) {
    var dataBase = JSON.parse(localStorage.getItem('site'));
} else {
    var dataBase = [];
}
construct_table();

//temp array to check if name already exist
if (localStorage.getItem('T') != null) {
    var temp = JSON.parse(localStorage.getItem('T'));
} else {
    var temp = [];
}

//global variabls
var websiteName = document.getElementById('site-name');
var websiteURL = document.getElementById('site-url');

// funtion to create and add website to the dataBase
function addWebsite() {
    if (temp.includes(websiteName.value)) {
        swal.fire('website is already exist');
    } else {
        if (websiteName.value == "" || websiteURL.value == "") {
            swal.fire('there is an empty feild');
        } else {
            var website = {
                siteName: websiteName.value,
                URL: websiteURL.value
            };
            if (isValidUrl(website.URL)) {
                dataBase.push(website);
                var stringDataBase = JSON.stringify(dataBase);
                localStorage.setItem('site', stringDataBase);
                temp.push(websiteName.value);
                localStorage.setItem('T', JSON.stringify(temp));
                clear();
                shawData();
            } else {
                swal.fire('invalid URL', 'make sure the URL contains a valid domain and protocol');
            }
        }
    }
}

// function to clear input feilds
function clear() {
    websiteName.value = null;
    websiteURL.value = null;
}

// function to show data in table
function shawData() {
    var trs = '';
    for (var i = 0; i < dataBase.length; i++) {
        trs = `<tr class="">
        <td>${i + 1}</td>
        <td>${dataBase[i].siteName}</td>
        <td><button class="btn btn1"><a href="${dataBase[i].URL}"><i class="fa-regular fa-eye"></i> Visit</a></button></td>
        <td><button onclick="Delete(${i});" class="btn btn2"><i class="fa-solid fa-trash"></i> Delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML += trs;
}
// function to construct data from local storage
function construct_table() {
    var newTrs = '';
    for (var i = 0; i < dataBase.length; i++) {
        newTrs += `<tr class="">
        <td>${i + 1}</td>
        <td>${dataBase[i].siteName}</td>
        <td><button class="btn btn1"><a href="${dataBase[i].URL}"><i class="fa-regular fa-eye"></i> Visit</a></button></td>
        <td><button onclick="Delete(${i});" class="btn btn2"><i class="fa-solid fa-trash"></i> Delete</button></td>
    </tr>`
    }
    document.getElementById('tbody').innerHTML = newTrs;
}

// function to delete website
function Delete(idx) {
    dataBase.splice(idx, 1);
    localStorage.setItem('site', JSON.stringify(dataBase));
    construct_table();
}

// function to validate url 
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}