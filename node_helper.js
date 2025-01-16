const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

  async socketNotificationReceived(notification, payload) {
    if (notification === "GET_RANSOM_DATA") {
      try {
        // Fetch data from the API
        const response = await fetch('https://api.ransomware.live/v2/recentvictims', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Remove the Authorization header if it's not required
            // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
          },
        });

        // Handle HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const ransomdata = await response.json();

        // Send the data back to the frontend
        this.sendSocketNotification("RANSOM_DATA_RECIEVED", { text: ransomdata });
      } catch (error) {
        console.error('Error fetching ransomware data:', error);

        // Send an error notification if needed
        this.sendSocketNotification("RANSOM_DATA_RECIEVED", { text: 'Error fetching data' });
      }
    }
  },
});

