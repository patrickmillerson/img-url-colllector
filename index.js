var img_obj = {};
var img_obj_arr = [];
var img_obj_storage_arr = [];
var dynamic_img_arr = [];
var uni_id = Date.now()

// Initialize localstorage at boot time
function createUrlStorageObj() {
    var url_obj = localStorage.getItem("url_objs");
    if (url_obj) {
        console.log("URL Obj Exsists");
    } else {
        localStorage.setItem("url_objs", []);
        console.log("Creating URL Obj");
    }
}

// Function to get data when app boot
function getUrlObj() {
    let url_objs = JSON.parse(localStorage.getItem("url_objs"));
    img_obj_storage_arr = url_objs;

    // Creating dynamic html content
    for (var i = 0; i < url_objs.length; i++) {
        dynamic_img_arr.push(`
        <div class="col-md-2 m-2" id='${url_objs[i].img_id}'>
            <figure class="figure">
              <img src="${url_objs[i].img_url}" class="figure-img img-fluid rounded" alt="...">
              <figcaption class="figure-caption">ID: ${url_objs[i].img_id}</figcaption>
              <figcaption class="figure-caption">URL: 
                <a href='${url_objs[i].img_url}'>${url_objs[i].img_url}</a>
              </figcaption>
                <div>
                    <button class='btn btn-danger btn-sm' onclick='deleteUrlObj(${url_objs[i].img_id}, ${i})'>
                    Delete
                    </button>
                </div>
            </figure>
        </div>
        `)
    }
}

// Function for creating dynamic html cards for objs
function createDynamicImageUrlCards() {
    document.getElementById('image-section').innerHTML = dynamic_img_arr.join('');
    dynamic_img_arr = []
}

// Function for saveing new url objs to localstorage
function setUrlObjs(obj) {
    localStorage.setItem("url_objs", JSON.stringify(obj));
}

// Function for deleting a single url obj
function deleteUrlObj(id, index) {
    var objs_arr = JSON.parse(localStorage.getItem("url_objs"));
    for (var i = 0; i < objs_arr.length; i++) {
        objs_arr[i].img_id == id ? objs_arr.splice(i, 1) : '';

        // Saving obj in localstorage after deleteing
        setUrlObjs(objs_arr);
    }
    // Calling function to update UI without reffreshing page
    getUrlObj()
    createDynamicImageUrlCards()
}


// Adding images and creating image obj list
function addImage() {
    if (document.getElementById('img-url').value) {
        img_obj_storage_arr.push({
            img_id: Date.now(),
            img_url: document.getElementById('img-url').value
        });

        // Saving obj in localstorage after adding new items
        setUrlObjs(img_obj_storage_arr)

        // Calling function to update UI without reffreshing page
        getUrlObj()
        createDynamicImageUrlCards()

    } else {
        alert('You must fill in a img url')
    }
}

// Calling funtion when initializing app
createUrlStorageObj()
getUrlObj()
createDynamicImageUrlCards()