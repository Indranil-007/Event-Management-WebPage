# Event Management Webpage

A hackathon and event management website for the **Institute of Engineering & Management**. It lists upcoming events, shows a live countdown to the next one, and lets visitors register or get in touch. It is plain HTML, CSS and JavaScript with no build step and no backend.

## Features

- **Live countdown:** a Days : Hours : Minutes : Seconds clock in neon boxes, counting down to the soonest upcoming event. It moves on to the next event automatically when one starts.
- **Event categories:** every event is tagged Hardware Workshop, Software Workshop or Guest Lecture, with filter buttons (All, Hardware, Software, Guest Lecture).
- **Event details:** clicking an event card opens a popup with its description, venue, key points and a button that preselects it in the registration form.
- **Registration form:** collects name, email, event choice, team name and team members, with validation. On success it shows: "Your Response have been noted, Confirmation will be sent via E-Mail".
- **Schedule timeline:** all events listed in date order.
- **Contact section:** organizer details and a contact form with validation.
- **Responsive design:** works on desktop and mobile, with a collapsible menu on small screens.
- **Theme:** dark cyberpunk with an electric blue / cyan accent.

## Project structure

```
index.html   Page structure and sections
style.css    Theme, layout and responsive styles
script.js    Event data, countdown, filters, popup and form logic
```

## Getting started

1. Keep `index.html`, `style.css` and `script.js` in the same folder.
2. Open `index.html` in any modern browser.

The fonts (Orbitron and Rajdhani) load from Google Fonts, so an internet connection is needed to see them. Without one, the site falls back to default fonts.

## Editing events

All events live in the `EVENTS` array at the top of `script.js`. Each event looks like this:

```js
{
  id: 1,
  title: "IoT Sensor Build Workshop",
  category: "hardware",              // "hardware" | "software" | "lecture"
  date: "2026-10-24T10:00:00",       // YYYY-MM-DDTHH:MM:SS, local time
  venue: "Electronics Lab, Block B",
  short: "One-line summary shown on the card.",
  details: "Longer description shown in the popup.",
  points: ["Point one", "Point two", "Point three"]
}
```

Edit, add or remove entries and the event cards, schedule, registration dropdown and countdown all update on their own. Give each event a unique `id`.

## Customizing

- **Colors:** change the CSS variables in the `:root` block at the top of `style.css`. The accent color is `--cyan`.
- **Organizer details:** replace the placeholder names, emails and venue in the Contact section of `index.html`.
- **Site name and college:** edit the header and footer in `index.html`.

## Limitations

- The registration and contact forms only validate input and show a message. Nothing is stored or sent, so no confirmation email is actually delivered. To make it real, connect the forms to a backend or a form service such as Formspree, Google Forms or Firebase.
- The countdown uses the visitor's local time zone.

## Tech

HTML5, CSS3 and vanilla JavaScript (ES6).
