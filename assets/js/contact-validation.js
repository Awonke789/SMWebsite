document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var response = form.querySelector('.ajax-response');
  var submitButton = form.querySelector('button[type="submit"]');
  var fields = {
    name: form.querySelector('[name="name"]'),
    email: form.querySelector('[name="email"]'),
    subject: form.querySelector('[name="subject"]'),
    message: form.querySelector('[name="message"]')
  };

  function setError(field, message) {
    var group = field.closest('.contact-field');
    var error = group.querySelector('.field-error');
    group.classList.add('has-error');
    field.setAttribute('aria-invalid', 'true');
    error.textContent = message;
    error.hidden = false;
  }

  function clearError(field) {
    var group = field.closest('.contact-field');
    var error = group.querySelector('.field-error');
    group.classList.remove('has-error');
    field.removeAttribute('aria-invalid');
    error.textContent = '';
    error.hidden = true;
  }

  function validate() {
    var valid = true;
    Object.keys(fields).forEach(function (key) {
      var field = fields[key];
      clearError(field);
      if (!field.value.trim()) {
        setError(field, 'Please enter your ' + key + '.');
        valid = false;
      }
    });

    var emailValue = fields.email.value.trim();
    var emailPattern = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;
    var hasConsecutiveDots = emailValue.indexOf('..') !== -1;
    if (emailValue && (!emailPattern.test(emailValue) || hasConsecutiveDots)) {
      setError(fields.email, 'Please enter a valid email address with a valid domain, for example name@company.co.za.');
      valid = false;
    }

    if (!valid) {
      response.textContent = 'Please correct the highlighted fields before sending your message.';
      response.className = 'ajax-response error';
      response.hidden = false;
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
    } else {
      response.textContent = '';
      response.hidden = true;
    }
    return valid;
  }

  function setResponse(message, type) {
    response.textContent = message;
    response.className = 'ajax-response ' + type;
    response.hidden = false;
  }

  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener('input', function () {
      clearError(fields[key]);
      if (response.classList.contains('error')) response.hidden = true;
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validate()) return;

    var originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    setResponse('Sending your message...', 'sending');

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (result) {
        if (!result.ok) throw new Error('Request failed');
        return result.json().catch(function () { return {}; });
      })
      .then(function () {
        form.reset();
        setResponse('Thank you. Your message has been sent successfully.', 'success');
      })
      .catch(function () {
        setResponse('We could not send your message right now. Please email admin@smsolutionspe.co.za directly.', 'error');
      })
      .finally(function () {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
      });
  });
});
