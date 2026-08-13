Contact inline-error verification

The Contact form now uses novalidate plus the existing ajax-response error/success pattern, so native browser validation cannot redirect or move the page before the site script handles the submission.

For invalid input such as user@gmail, the form did not send a request. It displayed the inline message "Please correct the highlighted fields before sending your message." and the field-level message "Please enter a valid email address with a valid domain, for example name@company.co.za." The automatic focus call was removed so the script does not intentionally scroll the page to the field.
