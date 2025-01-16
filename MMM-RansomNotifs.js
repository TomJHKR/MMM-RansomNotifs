Module.register("MMM-RansomNotifs", {

	defaults: {
		maximumEntries: 10,
		fade: true,
		fadePoint: 0.25, // Start on 1/4th of the list.
		tableClass: "small",
		displayFlag: true,
		refreshTime: 300000,
	},

  /**
   * Apply the default styles.
   */
  getStyles() {
    return ["ransomnotifs.css","https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.6.6/css/flag-icons.min.css"]
  },

  /**
   * Pseudo-constructor for our module. Initialize stuff here.
   */
  start() {
	this.getRansomData()
    setInterval(() => this.getRansomData(), this.config.refreshTime)
  },

  /**
   * Handle notifications received by the node helper.
   * So we can communicate between the node helper and the module.
   *
   * @param {string} notification - The notification identifier.
   * @param {any} payload - The payload data`returned by the node helper.
   */
	socketNotificationReceived: function (notification, payload) {
		if (notification === "RANSOM_DATA_RECIEVED") {
			if (payload) {
				let currentFadeStep = 0;
				let startFade;
				let fadeSteps;

				if (this.config.fade && this.config.fadePoint < 1) {
					if (this.config.fadePoint < 0) {
						this.config.fadePoint = 0;
					}
					startFade = this.config.maximumEntries * this.config.fadePoint; // default : 0
					fadeSteps = this.config.maximumEntries - startFade; // default : 10
				}

				// Assuming payload is an array of objects
				//var lines = '';
				const wrapper = document.createElement("table")
				wrapper.className = this.config.tableClass;

				for (const key in payload) {
					payload[key].slice(0, 10).forEach((item, index) => {
					const ransomRow = document.createElement("tr");
					ransomRow.className = "event-wrapper normal event";

					//  Add Flag
					const flagWrapper = document.createElement("td");
					if (this.config.displayFlag) {
						flagWrapper.className = `symbol align-right`;
						const flag = document.createElement("span");
						flag.className = `fi fi-${item.country.toLowerCase()}`;
						flagWrapper.appendChild(flag);
					}
					ransomRow.appendChild(flagWrapper);

					// Add Name
					const victimName = document.createElement("td");
					victimName.className = "title bright victim";
					victimName.innerHTML = `${item.victim}`;
					ransomRow.appendChild(victimName);

					// Add Date
					const attackDate = document.createElement("td");
					attackDate.className = "time light";
					attackDate.innerHTML = `${item.attackdate.split(' ')[0]}`;
					ransomRow.appendChild(attackDate);


					// Create Fade effect.
					if (index >= startFade) {
						currentFadeStep = index - startFade;
						ransomRow.style.opacity = 1 - (1 / fadeSteps) * currentFadeStep;
					}

					wrapper.appendChild(ransomRow);
					});
				}
				this.templateContent = wrapper;
			} else {
				this.templateContent = "No data available";
			}
		this.updateDom()
		}
	},

  /**
   * Render the page we're on.
   */
  getDom() {
		return this.templateContent;
  },

  getRansomData() {
    this.sendSocketNotification("GET_RANSOM_DATA")
  },

  /**
   * This is the place to receive notifications from other modules or the system.
   *
   * @param {string} notification The notification ID, it is preferred that it prefixes your module name
   * @param {number} payload the payload type.
   */
  notificationReceived(notification, payload) {
    if (notification === "TEMPLATE_RANDOM_TEXT") {
      this.templateContent = `${this.config.exampleContent} ${payload}`
      this.updateDom()
    }
  }
})
