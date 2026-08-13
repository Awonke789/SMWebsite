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

  function isValidEmailAddress(value) {
    var parts = value.split('@');
    if (parts.length !== 2) return false;

    var localPart = parts[0];
    var domain = parts[1].toLowerCase();
    if (!localPart || !domain || localPart.length > 64 || value.length > 254) return false;
    if (/\s/.test(value) || localPart.charAt(0) === '.' || localPart.slice(-1) === '.' || localPart.indexOf('..') !== -1) return false;
    if (!/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart)) return false;

    var commonEmailDomains = [
      'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
      'yahoo.com', 'ymail.com', 'icloud.com', 'me.com', 'mac.com', 'proton.me',
      'protonmail.com', 'aol.com', 'zoho.com', 'mail.com', 'gmx.com', 'tutanota.com',
      'tutamail.com', 'fastmail.com', 'hey.com', 'yandex.com', 'qq.com', '163.com'
    ];

    function editDistance(left, right) {
      var previous = Array.from({ length: right.length + 1 }, function (_, index) { return index; });
      for (var row = 1; row <= left.length; row += 1) {
        var current = [row];
        for (var column = 1; column <= right.length; column += 1) {
          var cost = left[row - 1] === right[column - 1] ? 0 : 1;
          current[column] = Math.min(
            current[column - 1] + 1,
            previous[column] + 1,
            previous[column - 1] + cost
          );
        }
        previous = current;
      }
      return previous[right.length];
    }

    // A common provider must match exactly. A one-character near-match such as
    // gmil.com or yaho.com is treated as a typo, not as a valid provider.
    if (commonEmailDomains.indexOf(domain) === -1) {
      var looksLikeProviderTypo = commonEmailDomains.some(function (knownDomain) {
        return editDistance(domain, knownDomain) <= 1;
      });
      if (looksLikeProviderTypo) return false;
    }

    var labels = domain.split('.');
    if (labels.length < 2 || labels.some(function (label) { return !label; })) return false;
    if (labels.some(function (label) {
      return label.length > 63 || !/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(label);
    })) return false;

    var topLevelDomain = labels[labels.length - 1];
    return /^[A-Za-z]{2,63}$/.test(topLevelDomain);
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
    if (emailValue && !isValidEmailAddress(emailValue)) {
      setError(fields.email, 'Please enter a valid email address. Check the spelling of the domain, for example name@gmail.com.');
      valid = false;
    }

    if (!valid) {
      response.textContent = 'Please correct the highlighted fields before sending your message.';
      response.className = 'ajax-response error';
      response.hidden = false;
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
