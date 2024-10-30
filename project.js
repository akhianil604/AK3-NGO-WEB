function navigateTo(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('active');
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
        selectedPage.classList.add('active');
    }
}

// function googleSignIn() {
//     // This is just a placeholder function. To implement Google Sign-In, you would use Google's API.
//     alert("Google Sign-In functionality will be implemented here.");
// }


// Show home page by Default 
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');

// Form submission for the "Register Plea" form
    const registerPleaForm = document.querySelector('#register-plea form');
    registerPleaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for submitting your plea! We will review it and get back to you soon.');
        registerPleaForm.reset();
    });
});

//While you scroll through home page , text pops up 
document.addEventListener('DOMContentLoaded', function() {
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150; // Adjust this value to control when the section becomes visible

        reveals.forEach(reveal => {
            const sectionTop = reveal.getBoundingClientRect().top;
            if (sectionTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            } else {
                reveal.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check in case sections are already in view
});

//While you scroll through about us page , text pops up 
// document.addEventListener('DOMContentLoaded', function() {
//     const reveals = document.querySelectorAll('.reveal');

//     function revealOnScroll() {
//         const windowHeight = window.innerHeight;
//         const revealPoint = 150; // Adjust this value as needed

//         reveals.forEach(reveal => {
//             const sectionTop = reveal.getBoundingClientRect().top;
//             if (sectionTop < windowHeight - revealPoint) {
//                 reveal.classList.add('active');
//             } else {
//                 reveal.classList.remove('active');
//             }
//         });
//     }

//     window.addEventListener('scroll', revealOnScroll);
//     revealOnScroll(); // Initial check in case sections are already in view
// });


//Google Pay API Part
function onGooglePayLoaded() {
    const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });
    const button = paymentsClient.createButton({
        onClick: onGooglePayButtonClicked
    });
    document.getElementById('container').appendChild(button);
}

function onGooglePayButtonClicked() {
    const paymentDataRequest = getGooglePayPaymentDataRequest();
    const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });

    paymentsClient.loadPaymentData(paymentDataRequest)
        .then(paymentData => {
            // Handle the payment data and complete the transaction on your server.
            processPayment(paymentData);
        })
        .catch(err => {
            console.error('Error in payment processing:', err);
        });
}

function getGooglePayPaymentDataRequest() {
    return {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA']
            },
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                    gateway: 'example', // Replace with your gateway
                    gatewayMerchantId: 'exampleMerchantId' // Replace with your merchant ID
                }
            }
        }],
        merchantInfo: {
            merchantId: '12345678901234567890', // Replace with your merchant ID
            merchantName: "(AK)^3's NGO"
        },
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: '1.00', // Update this value dynamically as needed
            currencyCode: 'USD',
            countryCode: 'US'
        }
    };
}

function processPayment(paymentData) {
    // TODO: Send the payment data to your server for processing.
    console.log('Payment successful', paymentData);
    alert('Thank you for your donation!');
}



//Login Part
function navigateToPortal(portal) {
    if (portal === 'sister') {
        window.location.href = 'sister-portal.html';
    } else if (portal === 'police') {
        window.location.href = 'police-portal.html';
    } else if (portal === 'user') {
        window.location.href = 'user-portal.html';
    }
}


//User-login after clicking on sign-in in the login header 
function handleLogin(event) {
    event.preventDefault(); 

    const userId = document.getElementById('ID').value;
    const password = document.getElementById('password').value;

    const userValid = validateUser(userId, password);

    if (userValid) {
        alert("Login successful! Redirecting to your portal...");
        window.location.href = `user-portal-${userId}.html`; // Adjust this as per your portal structure
    } else {
        alert("Invalid ID or password. Please try again.");
    }
}

// Mock validation function
function validateUser(userId, password) {
    const mockUsers = {
        'user123': 'password123',
        'user456': 'password456'
    };

    return mockUsers[userId] === password;
}


//User-signup part
document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('DOB').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;

    // Generate a random ID (for demonstration)
    const userId = 'USER' + Math.floor(Math.random() * 1000000);

    console.log({
        name, phone, email, dob, address, password, userId
    });

    alert(`Thank you for signing up! Please check your email (${email}) for your user ID: ${userId}.`);

    event.target.reset(); 
    
    // Alternatively, if you want to reload the entire page:
    // location.reload();

    // Simulate sending the ID via email
    sendUserIdToEmail(email, userId);
});

function sendUserIdToEmail(email, userId) {
    // Replace the URL with your actual backend API endpoint , Akshaj u need to take care of this part
    const apiEndpoint = 'https://your-backend-api.com/send-email';

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            userId: userId,
            message: `Hello, your User ID is: ${userId}`
        }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Email sent successfully');
        } else {
            console.error('Error sending email');
        }
    })
    .catch(error => console.error('Error:', error));
}




