# Wedding Invitation Template

A beautiful, modern wedding invitation website template built with Vue.js, featuring password protection, multi-language support, RSVP functionality, and a photo gallery.

## Demo

[View the live demo here](https://kind-pebble-0089d911e.3.azurestaticapps.net) to see the template in action.

## Features

- 🔒 Password-protected access
- 🌐 Multi-language support (English & Korean)
- 📱 Fully responsive design
- 📸 Photo gallery
- 📝 RSVP form with Azure Functions backend
- 🎨 Beautiful animations and transitions

## Quick Start

1. Clone this repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```
VITE_API_BASE_URL=https://someurl.com/api
VITE_PASSWORD_HASH=your_password_hash
VITE_PASSWORD_SALT=your_password_salt
VITE_PASSWORD_ITERATIONS=200000
```

Use the password hash generator script: `node scripts/gen_password_hash.js` to generate the output.

### Customization

1. **Couple Names**: Update in `src/locales/en.js` and `src/locales/ko.js`
2. **Event Details**: Modify dates, venues, and details in locale files
3. **Images**: Replace images in `public/assets/images/`
4. **Colors/Styling**: Update styles in `src/assets/main.css`

## Set up for production

You will need to create an Azure Function to power the RSVP functionality, and an Azure Storage account to collect responses.

See the `azure-function/` directory for the backend code.

## References

Big thank you to [danixsofyan](https://github.com/danixsofyan) as their [open source repo](https://github.com/danixsofyan/wedding-invitation) was the main inspiration for this template.