<template>
  <section id="details" class="s-details">
    <div class="container">
      <h2>{{ $t('eventDetails.title') }}</h2>
      <div class="events-wrapper">
        <div class="event-card">
          <h3>{{ $t('eventDetails.event1.title') }}</h3>
          <ul class="event-list">
            <li><strong>{{ $t('eventDetails.dateTimeTitle') }}:</strong> {{ $t('eventDetails.event1.dateTime') }}</li>
            <li><strong>{{ $t('eventDetails.venueTitle') }}:</strong> <a href="[Google Maps Link for Venue 1]">[Venue Name 1],
                [City, State]</a> (<i>{{ $t('eventDetails.event1.venueNote') }}</i>)</li>
            <li><strong>{{ $t('eventDetails.parkingTitle') }}:</strong> {{ $t('eventDetails.event1.parking') }}</li>
            <li><strong>{{ $t('eventDetails.dressCodeTitle') }}:</strong> {{ $t('eventDetails.event1.dressCode') }}</li>
          </ul>
        </div>
        <div class="event-card">
          <h3>{{ $t('eventDetails.event2.title') }}</h3>
          <ul class="event-list">
            <li><strong>{{ $t('eventDetails.dateTimeTitle') }}:</strong> {{ $t('eventDetails.event2.dateTime') }}</li>
            <li><strong>{{ $t('eventDetails.venueTitle') }}:</strong> <a href="[Google Maps Link for Venue 2]">[Venue Name 2], [City, State]</a></li>
            <li><strong>{{ $t('eventDetails.parkingTitle') }}:</strong> {{ $t('eventDetails.event2.parking') }}</li>
            <li><strong>{{ $t('eventDetails.dressCodeTitle') }}:</strong> {{ $t('eventDetails.event2.dressCode') }}</li>
          </ul>
        </div>
      </div>
      <h2>{{ $t('rsvp.title') }}</h2>
      <form class="rsvp-form" @submit.prevent="submitRSVP">
        <div class="form-group">
          <label for="name">{{ $t('rsvp.groupName') }}</label><br />
          <input id="name" type="text" v-model="name" required :placeholder="$t('rsvp.groupNamePlaceholder')" />
        </div>
        <div class="form-group">
          <label>{{ $t('rsvp.reservedCount', { count: reservedCount }) }}</label><br />
          <input type="number" min="1" v-model.number="reservedCount" style="width: 100px; margin-top: 0.5rem;" />
        </div>
        <div class="form-group">
          <label>{{ $t('rsvp.attendWhichDays') }}</label><br />
          <label><input type="checkbox" value="friday" v-model="days" /> {{ $t('rsvp.day1') }}</label><br />
          <label><input type="checkbox" value="saturday" v-model="days" /> {{ $t('rsvp.day2') }}</label>
        </div>
        <div class="form-group">
          <label>{{ $t('rsvp.foodPreference') }}</label><br />
          <div v-for="(person, index) in personInfoArray" :key="index" style="margin-bottom: 1rem; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            <label style="font-weight: bold;">{{ $t('rsvp.person', { number: index + 1 }) }}</label><br />
            <div style="margin-top: 0.5rem;">
              <label>{{ $t('rsvp.personName') }}</label><br />
              <input type="text" v-model="person.name" :placeholder="$t('rsvp.personNamePlaceholder')" style="width: 100%; max-width: 300px; margin-top: 0.25rem;" />
            </div>
            <div style="margin-top: 0.5rem;">
              <label>{{ $t('rsvp.foodChoice') }}</label>
              <select v-model="person.foodPreference" style="margin-left: 0.5rem; width: 150px;">
                <option disabled value="">{{ $t('rsvp.selectOne') }}</option>
                <option value="steak">{{ $t('rsvp.steak') }}</option>
                <option value="fish">{{ $t('rsvp.fish') }}</option>
                <option value="vegetarian">{{ $t('rsvp.vegetarian') }}</option>
              </select>
            </div>
            <div style="margin-top: 0.5rem;">
              <label>{{ $t('rsvp.dietaryRestrictions') }}</label><br />
              <input type="text" v-model="person.dietaryRestriction" :placeholder="$t('rsvp.dietaryPlaceholder')" style="width: 100%; max-width: 300px; margin-top: 0.25rem;" />
            </div>
          </div>
        </div>
        <div v-if="hotelReserved" class="form-group">
          <label v-html="$t('rsvp.hotelDescription')"></label><br/>
          <input type="checkbox" v-model="hotelAccepted" /> {{ $t('rsvp.hotelCheckbox') }}
        </div>
        <button type="submit">{{ $t('rsvp.submitRsvp') }}</button>
        <div v-if="rsvpStatus" class="success" style="margin-top:1rem; color:green;">{{ rsvpStatus }}</div>
        <div v-if="rsvpError" class="error" style="margin-top:1rem; color:red;">{{ rsvpError }}</div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Details',
  data() {
    return {
      reservedCount: 1,
      days: [],
      personInfoArray: [{ name: '', foodPreference: '', dietaryRestriction: '' }],
      hotelReserved: false,
      hotelAccepted: false,
      rsvpStatus: '',
      rsvpError: '',
      name: '',
      inviteId: null
    }
  },
  async created() {
    // Check for ?invite-id= in the URL and fetch invite details
    const params = new URLSearchParams(window.location.search);
    const inviteId = params.get('invite-id');
    
    if (inviteId) {
      // Store the invite ID for later use when submitting RSVP
      this.inviteId = inviteId;
      
      try {
        console.log("Invite ID found:", inviteId);
        const inviteDetailsUrl = `${import.meta.env.VITE_API_BASE_URL}/get-invite-details?invite-id=${encodeURIComponent(inviteId)}`;
        const response = await fetch(inviteDetailsUrl);
        
        if (response.ok) {
          const inviteDetails = await response.json();
          
          // Set the group name
          if (inviteDetails.name) {
            this.name = inviteDetails.name;
          }
          
          // Set the reserved count
          if (inviteDetails.reservedCount && inviteDetails.reservedCount > 0) {
            this.reservedCount = inviteDetails.reservedCount;
            // Initialize personInfoArray to match reserved count
            this.personInfoArray = new Array(inviteDetails.reservedCount).fill(null).map(() => ({ 
              name: '', 
              foodPreference: '', 
              dietaryRestriction: '' 
            }));
          }
          
          // Set hotel reservation status
          if (inviteDetails.hotel) {
            this.hotelReserved = true;
            this.hotelAccepted = true; // Default to checked
          }
        } else {
          console.error('Failed to fetch invite details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching invite details:', error);
      }
    }
  },
  watch: {
    reservedCount(newVal) {
      // Adjust personInfoArray length to match reservedCount
      if (newVal < 1) newVal = 1;
      while (this.personInfoArray.length < newVal) {
        this.personInfoArray.push({ name: '', foodPreference: '', dietaryRestriction: '' });
      }
      while (this.personInfoArray.length > newVal) {
        this.personInfoArray.pop();
      }
    }
  },
  methods: {
    async submitRSVP() {
      this.rsvpStatus = '';
      this.rsvpError = '';
      // Prompt for group name if not set
      if (!this.name) {
        this.rsvpError = this.$t('rsvp.errors.enterGroupName');
        return;
      }
      // Validate at least one day is selected
      if (!this.days || this.days.length === 0) {
        this.rsvpError = this.$t('rsvp.errors.selectOneDay');
        return;
      }
      // Validate all persons have a name
      const missingName = this.personInfoArray.some(person => !person.name.trim());
      if (missingName) {
        this.rsvpError = this.$t('rsvp.errors.enterPersonName');
        return;
      }
      // Validate all persons have a food preference (for Friday)
      if (this.days.includes('friday')) {
        const missingFood = this.personInfoArray.some(person => !person.foodPreference);
        if (missingFood) {
          this.rsvpError = this.$t('rsvp.errors.selectFoodPreference');
          return;
        }
      }
      try {
        const body = {
          inviteId: this.inviteId,
          name: this.name,
          reservedCount: this.reservedCount,
          days: this.days,
          personInfoArray: this.personInfoArray,
          hotelPreference: this.hotelReserved ? this.hotelAccepted : null
        };
        console.log('Submitting RSVP:', body);
        const rsvpUrl = `${import.meta.env.VITE_API_BASE_URL}/wedding-response`;
        const response = await fetch(rsvpUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const text = await response.text();
        if (response.ok) {
          this.rsvpStatus = text || this.$t('rsvp.success');
        } else {
          this.rsvpError = text || 'Failed to submit RSVP.';
        }
      } catch (err) {
        this.rsvpError = this.$t('rsvp.errors.networkError');
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 1rem;
}

.rsvp-form {
  margin-bottom: 2rem;
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.form-group {
  margin-bottom: 1rem;
}

.rsvp-form label {
  font-weight: 500;
}

.rsvp-form input[type="text"],
.rsvp-form input[type="number"],
.rsvp-form select {
  margin-top: 0.5rem;
  padding: 0.4rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
}

.rsvp-form button {
  background: #111;
  color: #fff;
  border: 2px solid #111;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s, color 0.2s;
}

.rsvp-form button:hover {
  background: #fff;
  color: #111;
}

.hotel-reserved {
  margin: 0.5rem 0;
  padding: 1.5rem;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: #fafafa;
  text-align: left;
}

.hotel-reserved h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: -0.02em;
}

.hotel-reserved p {
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555;
}

.hotel-link {
  display: inline-block;
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  border-bottom: 1px solid #2c3e50;
  padding-bottom: 1px;
  transition: all 0.2s ease;
}

.hotel-link:hover {
  color: #34495e;
  border-bottom-color: #34495e;
}
</style>
