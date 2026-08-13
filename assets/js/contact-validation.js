document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var response = form.querySelector('.ajax-response');
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

    if (fields.email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim())) {
      setError(fields.email, 'Please enter a valid email address.');
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

  Object.keys(fields).forEach(function (key) {
    fields[key].addEventListener('input', function () {
      clearError(fields[key]);
      if (response.classList.contains('error')) response.hidden = true;
    });
  });

  form.addEventListener('submit', function (event) {
    if (!validate()) event.preventDefault();
  });
});
