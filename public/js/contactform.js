function validateForm() {
    const name = document.getElementById('name').value;
    if (name === "") {
        document.getElementById('status').innerHTML = "<b>Name cannot be empty</b>";
        return false;
    }
    const email = document.getElementById('email').value;
    if (email === "") {
        document.getElementById('status').innerHTML = "Email cannot be empty";
        return false;
    } else {
        // eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            document.getElementById('status').innerHTML = "Email format invalid";
            return false;
        }
    }
    const subject = document.getElementById('subject').value;
    if (subject === "") {
        document.getElementById('status').innerHTML = "Subject cannot be empty";
        return false;
    }
    const message = document.getElementById('message').value;
    if (message === "") {
        document.getElementById('status').innerHTML = "Message cannot be empty";
        return false;
    }
    document.getElementById('status').innerHTML = "Sending...";
    this.setAttribute('disabled', 'disabled');

    const form = document.getElementById('contact-form');
    // eslint-disable-next-line
    console.log(form); // form.name.value

    const dataToSend =  {
          name: form.name.value,
          email: form.email.value
    };



    const fetch1 = fetch('/telegram');
    const fetch2 = fetch('/posttogitter');
    const fetch3 = fetch('/pozvonit-v-fsb');

    let responseText;

    fetch('/mail', { body: dataToSend })
        .then( (response) => {
            return  Promise.all(fetch1, fetch2, fetch3, Promise.resolve(response.text()));

        }).then(( arrayOf4Values ) => {
            responseText = arrayOf4Values[3];
            return JSON.parse(responseText);
        }).then( responseObject => {
            alert(responseObject.message)
         })
        .catch( (err) => {
            // eslint-disable-next-line
            console.log("Request failed", err.message);
        })
    //document.getElementById('contact-form').submit();

}

exports = validateForm; // same as module.exports for CommonJS or AMD


