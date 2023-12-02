window.addEventListener("load", () => {
    document.getElementById("sign-in").addEventListener("click", () => {
        
        var emailtxt = document.getElementById("account_email").value;
        var passtxt = document.getElementById("account_passwd").value;
    
        firebase.auth().signInWithEmailAndPassword(emailtxt, passtxt)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;

            window.location.href = "./home.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    
    });

    //Google
    document.getElementById("sign-in-google").addEventListener("click", () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope("email");
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log("login Successfull", result.user)

            window.location.href = "./home.html";
        })
        .catch((error) => {
            console.log("Login Failed", error)
        })
    });

    //phone
    function getPhoneNumberFromUserInput() {
        return "+12368636058"
    }

    function getCodeFromUserInput() {
        return "123456"
    }

    document.getElementById("sign-in-phone").addEventListener("click", () => {

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

        const phoneNumber = getPhoneNumberFromUserInput();
        const appVerifier = window.recaptchaVerifier;

        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            
            const code = getCodeFromUserInput();
            confirmationResult.confirm(code)
            .then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log("login Successfull", user)
                window.location.href = "./home.html";
            })
            .catch((error) => {
                grecaptcha.reset(window.recaptchaWidgetId);
                console.log("login Failed", error)
            });
        })
        .catch((error) => {
            alert(error);
        });
    })
});