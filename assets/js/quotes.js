let currentQuestionIndex = 0;
    let questions = [];
    let userAnswers = {};// To store user answers

    function setQuestions() {
        const service = document.getElementById('service').value;
        const questionsContainer = document.getElementById('questionsContainer');
        questionsContainer.innerHTML = '';

        switch (service) {
            case 'web_development':
                questions = [
                    { q: "What type of web development do you need?", a1: "Full-stack", a2: "Frontend only" },
                    { q: "Do you have an existing website?", a1: "Yes", a2: "No" },
                    { q: "Do you need e-commerce functionality?", a1: "Yes", a2: "No" },
                    { q: "Will you require ongoing maintenance?", a1: "Yes", a2: "No" }
                ];
                break;
            case 'web_design':
                questions = [
                    { q: "What style of website are you looking for?", a1: "Modern", a2: "Classic" },
                    { q: "Do you need custom graphics?", a1: "Yes", a2: "No" },
                    { q: "Will you provide the content?", a1: "Yes", a2: "No" },
                    { q: "Do you need the website to be mobile-friendly?", a1: "Yes", a2: "No" }
                ];                               
                break;
            case 'corporate_branding':
                questions = [
                    { q: "What type of branding services are you interested in?", a1: "Logo design", a2: "Complete branding package" },
                    { q: "Do you need help with brand guidelines?", a1: "Yes", a2: "No" },
                    { q: "Are you looking to rebrand or create a new brand?", a1: "Rebrand", a2: "New brand" },
                    { q: "Do you need digital branding services?", a1: "Yes", a2: "No" }
                ];                
                break;
            case 'marketing':
                questions = [
                    { q: "What type of marketing are you interested in?", a1: "Social media", a2: "Email" },
                    { q: "Do you need help with content creation?", a1: "Yes", a2: "No" },
                    { q: "What is your target audience?", a1: "B2B", a2: "B2C" },
                    { q: "Do you have a budget in mind?", a1: "Yes", a2: "No" }
                ];
                break;
            case 'domain_hosting':
                questions = [
                    { q: "Do you need domain registration?", a1: "Yes", a2: "No" },
                    { q: "Do you require email hosting?", a1: "Yes", a2: "No" },
                    { q: "What type of hosting do you need?", a1: "Shared", a2: "Dedicated" },
                    { q: "Do you need SSL certificates?", a1: "Yes", a2: "No" }
                ];                
                break;
            case 'social_media_management':
                questions = [
                    { q: "Which platforms are you interested in managing?", a1: "Facebook & Instagram", a2: "Twitter & LinkedIn" },
                    { q: "Do you need content creation?", a1: "Yes", a2: "No" },
                    { q: "Are you looking for paid advertising?", a1: "Yes", a2: "No" },
                    { q: "Do you need social media analytics?", a1: "Yes", a2: "No" }
                ];                
                break;
            case 'printing':
                questions = [
                    { q: "What type of printing do you need?", a1: "Business cards", a2: "Flyers & brochures" },
                    { q: "Do you have a design ready?", a1: "Yes", a2: "No" },
                    { q: "What quantity are you looking for?", a1: "Small", a2: "Large" },
                    { q: "Do you need delivery services?", a1: "Yes", a2: "No" }
                ];                
                break;
            default:
                questions = [];
                break;
        }

        currentQuestionIndex = 0;
        userAnswers = {}; // Reset user answers
        displayQuestion(currentQuestionIndex);
    }




function showQuestions() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const serviceSelect = document.getElementById('service');

    // Check if the required fields are filled
    if (nameInput.value.trim() === '') {
        alert('Name is required');
        nameInput.focus();
        return;
    }
    if (emailInput.value.trim() === '') {
        alert('Email is required');
        emailInput.focus();
        return;
    }
    if (serviceSelect.value.trim() === '') {
        alert('Please select a service');
        serviceSelect.focus();
        return;
    }

    document.getElementById('initialForm').style.display = 'none';
    document.getElementById('questionsForm').style.display = 'block';
    document.getElementById('submitBtn').style.display = 'none'; // Hide submit initially
}

function displayQuestion(index) {
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.innerHTML = '';

    if (index < questions.length) {
        const question = questions[index];
        questionsContainer.innerHTML = `
            <div class="mb-3 question-item">
                <h4 class="question-text">${question.q}</h4>
                <label><input type="radio" name="q${index}" value="${question.a1}" required> ${question.a1}</label><br>
                <label><input type="radio" name="q${index}" value="${question.a2}" required> ${question.a2}</label>
            </div>
        `;

        if (index === questions.length - 1) {
            document.getElementById('nextBtn').style.display = 'none';
            document.getElementById('submitBtn').style.display = 'block';
        } else {
            document.getElementById('nextBtn').style.display = 'block';
            document.getElementById('submitBtn').style.display = 'none';
        }
    }
}

function nextQuestion() {
    if (!validateCurrentQuestion()) {
        return; // Stop if validation fails
    }
    saveCurrentAnswer();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
}

function validateCurrentQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
    if (!selectedOption) {
        alert('Please answer the current question.');
        return false; // Validation failed
    }
    return true; // Validation passed
}

function previousQuestion() {
    saveCurrentAnswer();
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
}

function saveCurrentAnswer() {
    const question = questions[currentQuestionIndex];
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
    if (selectedOption) {
        userAnswers[question.q] = selectedOption.value;
    }
}


function resetForm() {
    // Reset the form fields
    document.getElementById('quoteForm').reset();
    // Hide the questions form and show the initial form
    document.getElementById('initialForm').style.display = 'block';
    document.getElementById('questionsForm').style.display = 'none';
    // Reset the questions and userAnswers
    questions = [];
    userAnswers = {};
    currentQuestionIndex = 0;
    document.getElementById('questionsContainer').innerHTML = '';
}

function closePopup() {
    const quotePopup = document.getElementById('quotePopup');
    if (quotePopup) {
        quotePopup.style.display = 'none';
    }
    
    // Remove dynamic popup and overlay
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => popup.remove());
    const overlays = document.querySelectorAll('.popup-overlay');
    overlays.forEach(overlay => overlay.remove());

    resetForm(); // Reset the form and popup state
}

function submitForm(event) {
    event.preventDefault();
    // Your form submission logic
    saveCurrentAnswer();

    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'flex';
    const formData = new FormData(document.getElementById('quoteForm'));
    for (const question in userAnswers) {
        formData.append(`answers[${question}]`, userAnswers[question]);
    }

    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response data:', data);
        // Hide loading spinner and show success/error message
        document.getElementById('loadingSpinner').style.display = 'none';
        if (data.status === 'success') {
            console.log('Showing popup with message:', data.message);
            showPopup(data.message);
        } else {
            console.log('Showing popup with message:', data.message);
            showPopup('There was an error sending your request. Please try again.');
        }
        setTimeout(closePopup, 10000);  // Close the popup and reset the form
    })
    .catch(error => {
        console.error('Error:', error);
        showPopup('There was an error sending your request. Please try again.');
        setTimeout(closePopup, 10000); // Close the popup and reset the form
    });
}

function toggleQuotePopup() {
    const quotePopup = document.getElementById('quotePopup');
    if (quotePopup.style.display === 'none' || quotePopup.style.display === '') {
        quotePopup.style.display = 'flex';
    } else {
        closePopup();
    }
}


function showPopup(message) {
    // Create and display the popup
    console.log('Showing popup with message:', message);
const popup = document.createElement('div');
popup.classList.add('popup');
popup.innerHTML = `
    <div class="popup-content">
        <p>${message}</p>
        <button onclick="closePopup()">OK</button>
    </div>
`;
document.body.appendChild(popup);

// Center the popup


const closeButton = document.getElementById('popupCloseBtn');
if (closeButton) {
    closeButton.addEventListener('click', closePopup);
}
}


document.addEventListener('DOMContentLoaded', function() {
document.getElementById('quoteForm').addEventListener('submit', submitForm);
});
