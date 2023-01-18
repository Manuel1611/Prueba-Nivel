/* API URL */
const url = "https://testimonialapi.toolcarton.com/api";

var container = document.getElementById('container');

var data = [];

/*
    The function below will get
    and store the data in JSON form:
*/
async function get_data(url) {
    
    const response = await fetch(url);
    
    data = await response.json();

    show_data(data);

}

get_data(url);

/*
    The function below will draw
    the cards and fill them with
    the information we retrieved before:
*/
function show_data(data) {

    /* Sort items by rating */
    data.sort((a, b) => (a.rating < b.rating) ? 1 : -1);

    /* Going through the data to draw each card */
    for(let testimonial of data) {

        createCard(testimonial.name, testimonial.location, testimonial.rating, testimonial.message, testimonial.avatar);
        
    }

}

/*
    The function below simply
    creates a div element:
*/
function create_div() {
    return document.createElement('div');
}

/*
    The function below simply
    adds a child to the target element:
*/
function toappend(target, x) {
    target.appendChild(x);
}

var btn = document.getElementById('btn');
var form_container = document.getElementById('form-container');
var btn_reset = document.getElementById('reset');
var form = document.getElementById('dialog');

var req1 = document.getElementById('req1');
var req2 = document.getElementById('req2');
var req3 = document.getElementById('req3');
var req4 = document.getElementById('req4');

/*
    Show the dialog when pressing the + button
*/
btn.addEventListener('click', function() {
    form_container.style.display = 'flex';
});

/*
    Hide the dialog when pressing the cancel button
*/
btn_reset.addEventListener('click', function() {
    form_container.style.display = 'none';

    req1.innerHTML = '&nbsp;';
    req2.innerHTML = '&nbsp;';
    req3.innerHTML = '&nbsp;';
    req4.innerHTML = '&nbsp;';
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    var name = document.getElementById('name');
    var loc = document.getElementById('loc');
    var rat = document.getElementById('rat');
    var msg = document.getElementById('msg');

    if(checkData(name.value, loc.value, rat.value, msg.value)) {

        /* If everything is OK, hide the dialog,
           then add the card */
        form_container.style.display = 'none';
        
        createCard(name.value, loc.value, rat.value, msg.value, 'default-img.jpg');

        let newcard = {
            name: name.value,
            location: loc.value,
            avatar: 'default-img.jpg',
            message: msg.value,
            rating: rat.value,
        }

        // Remove cards from DOM
        document.querySelectorAll('.card-container').forEach(element => {
            element.remove();
        });

        // Add the new card to the data array
        data.push(newcard);

        // Show the cards sorted again
        show_data(data);

        // Clear all inputs after adding the new card
        name.value = '';
        loc.value = '';
        rat.value = '';
        msg.value = '';

    }
});

/*
    The function below will check
    if all the inputs are fulfilled.
    If not, show the required message:
*/
function checkData(name, loc, rat, msg) {

    if(!name) {
        req1.innerHTML = 'Required';
    } else {
        req1.innerHTML = '&nbsp;';
    }
    if(!loc) {
        req2.innerHTML = 'Required';
    } else {
        req2.innerHTML = '&nbsp;';
    }
    if(!rat) {
        req3.innerHTML = 'Required';
    } else {
        req3.innerHTML = '&nbsp;';
    }
    if(!msg) {
        req4.innerHTML = 'Required';
    } else {
        req4.innerHTML = '&nbsp;';
    }

    if(!name || !loc || !rat || !msg) {
        return false;
    } else {
        return true;
    }
}

/*
    The function below will create
    a new card with the information given
*/
function createCard(username, userlocation, userrating, usermessage, useravatar) {
    // Creating the card element
    const card = create_div();
    card.className = 'card-container';
    toappend(container, card);

    const info = create_div();
    info.className = 'info';

    // Testimonial user description
    const desc = create_div();
    desc.className = 'desc';

    desc.innerHTML = usermessage;  

    toappend(card, info);
    toappend(card, desc);

    // Testimonial profile icon
    const image = create_div();
    image.className = 'image';

    image.style.background = 'url(' + useravatar + ') center center no-repeat';

    image.style.backgroundSize = 'cover';
    const name_location = create_div();
    name_location.className = 'name-location';
    const quote_marks = create_div();
    quote_marks.className = 'quote-marks';

    toappend(info, image);
    toappend(info, name_location);
    toappend(info, quote_marks);

    // Testimonial user name
    const name = create_div();
    name.className = 'name';

    name.innerHTML = username;

    const location = create_div();
    location.className = 'location';

    toappend(name_location, name);
    toappend(name_location, location);

    // Testimonial user location
    const location_icon = document.createElement('i');
    location_icon.className = 'ph-map-pin-fill';
    const street = document.createElement('span');

    street.innerHTML = userlocation;

    toappend(location, location_icon);
    toappend(location, street);

    const quote_icon = document.createElement('i');
    quote_icon.className = 'ph-quotes-fill';
    quote_icon.classList.add('icon-size');

    toappend(quote_marks, quote_icon);

    // Testimonial rating
    const rating = create_div();
    rating.className = 'rating';
    toappend(card, rating);

    rating.innerHTML = 'Rating: ';
    const rating_number = document.createElement('span');
    rating_number.className = 'rating-number';

    rating_number.innerHTML = userrating;

    toappend(rating, rating_number);
}