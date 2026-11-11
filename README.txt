BXSea website
=============
Open index.html in any browser (double-click it). No build step needed.

Files
  index.html   page content and text (edit wording here)
  styles.css   colours, fonts, buttons
  script.js    scales the page, header behaviour, Contact Us pop-up
  img/         logo and one artwork image per section, taken from the design PDF
  fonts/       put SF-Pro-Rounded.woff2 (Bold) here; Inter is the fallback

Notes
  - The design is 1600 x 5400 px (six 1600 x 900 sections). The page keeps that
    exact layout and scales it to the window width.
  - The logo and menu stay fixed at the top while scrolling.
  - Menu: VISIT US -> Plan Your Visit, ABOUT US -> Beneath the Surface,
    EXPLORE -> 20 Journeys, EVENTS -> shows. GET TICKETS! -> Plan Your Visit.
  - CONTACT US (top right) opens a pop-up form. It checks name and email and
    shows a thank-you message, but nothing is sent yet: connect it to a form
    service (e.g. Formspree) to receive messages by email.
  - 20 Journeys: only the dots show; hover (or tap) a dot to open its pin and card.
  - Animals (manta, whale, sloth, penguin) and the event cards in the shows
    section pop up on hover (tap on phones). Their cut-out images are the
    .webp files in img/.
