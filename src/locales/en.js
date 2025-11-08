export default {
  // Common
  details: 'Details',
  gallery: 'Gallery',
  faq: 'FAQ',
  
  // Intro section
  intro: {
    dear: 'Dear: {name}',
    youreInvited: "You're invited to...",
    weddingTitle: "Bride and Groom's Wedding Celebration",
    openInvitation: 'Open Invitation'
  },
  
  // Details section
  eventDetails: {
    title: 'Event Details',
    dateTimeTitle: 'Date & Time',
    venueTitle: 'Venue',
    dressCodeTitle: 'Dress Code',
    parkingTitle: 'Parking',
    event1: {
      title: '🎪 Event 1: Title',
      dateTime: '[Event 1 time and date]',
      venueNote: 'The event is indoors.',
      dressCode: 'Black tie optional.',
      parking: 'Free parking on-site'
    },
    event2: {
      title: '🌴 Event 2: Title',
      dateTime: '[Event 2 time and date]',
      dressCode: 'Casual Attire',
      parking: 'Available on-site and $5'
    }
  },
  
  // RSVP section
  rsvp: {
    title: 'RSVP - Please submit by Jan 1st',
    groupName: 'Group name:',
    groupNamePlaceholder: 'Group name',
    reservedCount: "We've reserved {count} seat(s) for you. How many are coming?",
    attendWhichDays: 'We will attend these days (Select all that apply):',
    day1: '[Event Day 1]',
    day2: '[Event Day 2]',
    foodPreference: 'Food preference for Event Day 1:',
    person: 'Person {number}:',
    personName: 'Name:',
    personNamePlaceholder: 'Enter person\'s name',
    foodChoice: 'Event Day 1 Food choice:',
    selectOne: 'Select one',
    steak: 'Steak',
    fish: 'Fish',
    vegetarian: 'Vegetarian',
    dietaryRestrictions: 'Dietary restrictions (optional):',
    dietaryPlaceholder: 'Any allergies or dietary needs?',
    submitRsvp: 'Submit RSVP',
    hotelReserved: 'We have a hotel reserved for you!',
    hotelDescription: 'We have booked a complimentary hotel room for you for the night of [Event Date - e.g., December 26th, 2025] <a href="[Hotel Maps Link]" target="_blank" rel="noopener noreferrer">at [Hotel Name]</a>.',
    hotelCheckbox: 'Yes, I want to use the complimentary hotel room for [Event Date]',
    errors: {
      enterGroupName: 'Please enter your group name.',
      enterPersonName: 'Please enter a name for each person.',
      selectOneDay: 'Please select all days to attend.',
      selectFoodPreference: 'Please select a food preference for each person attending Event Day 1.',
      networkError: 'Network error. Please try again. If it still fails just email or text the couple your details. Sorry for the error!'
    },
    success: 'RSVP submitted successfully!'
  },
  
  // Gallery section
  gallerySection: {
    title: 'Gallery',
    openImage: 'Open gallery image {number} in full screen',
    imageAlt: 'Gallery image {number}',
    closeImage: 'Close image',
    imageLabel: 'Image {current} of {total}'
  },
  
  // FAQ section
  faqSection: {
    title: 'Frequently Asked Questions',
    questions: {
      whatToBring: {
        question: 'What should I bring?',
        answer: "Please check the event details for any specific requirements. Comfortable attire appropriate for the dress code is recommended."
      },
      plusOne: {
        question: 'Can I bring a plus one?',
        answer: "We've reserved specific spots for each invited group. When you RSVP, you can specify how many from your reserved group will be attending. If you need to adjust your group size, please reach out to us directly."
      },
      giftRegistry: {
        question: 'Is there a gift registry?',
        answer: "Your presence is the greatest gift! If you wish to give something, a contribution towards [our future/honeymoon/home] would be appreciated but not expected."
      },
      weather: {
        question: 'What if it rains?',
        answer: "We have contingency plans in place for inclement weather. Updates will be shared if any changes are needed."
      },
      directions: {
        question: 'How do I get to the venues?',
        answer: "Both venues are linked in the Details section with direct Google Maps links for easy navigation."
      },
      dietary: {
        question: 'What if I have dietary restrictions?',
        answer: "Please specify any dietary restrictions or food preferences in the RSVP form, and we'll do our best to accommodate your needs."
      }
    }
  },
  
  // Password Gate section
  passwordGate: {
    title: 'Invitation',
    subtitle: 'Please enter the password.',
    selectLanguage: 'Language / 언어',
    passwordPlaceholder: 'Password',
    enterButton: 'Enter',
    clearButton: 'Clear',
    errors: {
      enterPassword: 'Please enter the password.',
      notConfigured: 'Password is not configured. Contact the site owner.',
      incorrect: 'Incorrect password. Please try again.',
      verificationError: 'An error occurred while verifying the password.'
    }
  },
  
  // Footer section
  footer: {
    madeBy: 'Made with',
    openSource: 'this open source template',
    artCredit: ''
  },
}