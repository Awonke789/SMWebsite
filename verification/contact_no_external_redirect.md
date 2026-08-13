Contact no-external-redirect verification

The conflicting generic ajax-form.js handler was removed from contact.html, and the form now includes an inline submit guard. An invalid submission using user@gmail stayed on the Contact URL, displayed the existing-style response message, and displayed the specific email-domain error. The external ajax-form.js script was not present on the Contact page.
