Contact panel and email validation verification

Desktop: the left contact panel is restored to the original one-third column width, while the form remains two-thirds wide. The panel is shorter vertically because its height is content-driven rather than stretched to the form height. The existing modest 30px column gap is preserved.

Mobile: the panel and form continue to stack responsively without horizontal overflow.

Strict email tests: user@gmail, user@-example.co.za, user@example-.co.za, user@example..co.za, and user@example.c1 were rejected with the contact-page error message. user@example.co.za passed validation and entered the sending state. The success notification is only reached after a successful form-service response.
