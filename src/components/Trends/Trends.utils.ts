export class TopMatchWidget {
  constructor({
    language,
    targetElementId,
    breakPoint = 650,
    allowTouchMove = false,
    stack = false,
  }) {
    this.language = language;
    this.targetElementId = targetElementId;
    this.breakPoint = breakPoint;
    this.allowTouchMove = allowTouchMove;
    this.targetElement = document.getElementById(this.targetElementId);
    this.swiper = null; // Initialize swiper property

    this.init();
  }

  init() {
    // Check if the target element exists
    if (this.targetElement) {
      // Add style dynamically
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://ccp.lmms.be/top-match/style.css";
      document.head.appendChild(stylesheet);

      // Add Swiper stylesheet dynamically
      const swiperStylesheet = document.createElement("link");
      swiperStylesheet.rel = "stylesheet";
      swiperStylesheet.href = "https://ccp.lmms.be/top-match/swiper.min.css";
      document.head.appendChild(swiperStylesheet);

      // Add Swiper script dynamically
      const swiperScript = document.createElement("script");
      swiperScript.src = "https://ccp.lmms.be/top-match/swiper.min.js";
      swiperScript.async = true;
      swiperScript.onload = () => {
        this.renderWidget();
        this.ensureSwiperInit(".tew-swiper");

        window.addEventListener("resize", () => {
          this.ensureSwiperInit(".tew-swiper");
        });
      };
      document.body.appendChild(swiperScript);
    } else {
      console.error(`Element with id "${this.targetElementId}" not found.`);
    }
  }

  renderWidget() {
    this.targetElement.innerHTML = `
      <div class="tew tew-swiper">
        <div class="tew-header">
          <div class="tew-title">Trends</div>
        </div>
        <div class="tew-wrapper swiper-wrapper">
          <div class="tew-list tew-list-one swiper-slide"></div>
          <div class="tew-list tew-list-two swiper-slide"></div>
        </div>
        <div class="tew-footer">
          <div class="tew-buttons">
            <div class="tew-button tew-button_prev tew-button_active"></div>
            <div class="tew-button tew-button_next"></div>
          </div>
        </div>
      </div>`;

    this.fetchEvents();
  }

  fetchEvents() {
    fetch(
      `https://dcp.lmms.be/api/top-events-widget/get-upcoming-events/${this.language}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Display events using the provided function
        this.renderEvents(data);
        this.renderTranslations(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  renderTranslations(data) {
    document.querySelector(".tew-title").innerHTML =
      data.translations.box_title;
  }

  renderEvents(data) {
    let listOne = "";
    let listTwo = "";
    data.events.forEach((ev, i) => {
      let cardTemplate = "";
      if (ev.headToHead == "1") {
        cardTemplate = `
          <a class="tew-card" data-linktracking="${
            ev.eventDescription
          }" href="${ev.aliasUrl}">
            <img class="tew-icon" src="https://dcp.lmms.be/uploads/team_icons/${
              ev.home_image
            }" alt=""/>
            <div class="tew-content">
                <div class="tew-name">${ev.team_home}</div>
                <span class="tew-league">${ev.meetingDescription}</span>
                <div class="tew-status ${
                  ev.live == 1 ? "tew-status_live" : ""
                }">${ev.live == 1 ? "LIVE" : ev.eventDate}</div>
                <div class="tew-name tew-name_right">${ev.team_away}</div>
            </div>
            <img class="tew-icon" src="https://dcp.lmms.be/uploads/team_icons/${
              ev.away_image
            }" alt=""/>
          </a>`;
      } else {
        cardTemplate = `
          <a class="tew-card tew-card_competition" data-linktracking="${
            ev.eventDescription
          }" href="${ev.aliasUrl}">
            <img class="tew-icon" src="https://dcp.lmms.be/uploads/team_icons/${
              ev.home_image
            }" alt=""/>
            <div class="tew-content tew-content_competition">
                <div class="tew-competitonGroup">
                    <div class="tew-name">${ev.team_home}</div>
                    <span class="tew-league tew-league_competition">${
                      ev.meetingDescription
                    }</span>
                </div>
                <div class="tew-status ${
                  ev.live == 1 ? "tew-status_live" : ""
                }">${ev.live == 1 ? "LIVE" : ev.eventDate}</div>
            </div>
          </a>`;
      }
      if (i < 5) {
        listOne += cardTemplate;
      } else {
        listTwo += cardTemplate;
      }
    });
    document.querySelector(".tew-list-one").innerHTML = listOne;
    document.querySelector(".tew-list-two").innerHTML = listTwo;

    // Ensure Swiper is reinitialized after events are rendered
    this.ensureSwiperInit(".tew-swiper");
  }

  ensureSwiperInit(swiperContainer) {
    requestAnimationFrame(() => {
      const swiperWrapper = document.querySelector(swiperContainer);
      if (!swiperWrapper) return;

      const swiperWidth = swiperWrapper.offsetWidth;

      if (swiperWidth === 0) {
        setTimeout(() => this.ensureSwiperInit(swiperContainer), 100); // Retry after a short delay
      } else {
        this.initSwiper(swiperContainer, swiperWidth);
      }
    });
  }

  initSwiper(swiperContainer, swiperWidth) {
    const slidesPerView = swiperWidth > this.breakPoint ? 2 : 1;

    if (swiperWidth > this.breakPoint) {
      document.querySelector(".tew-buttons").style.display = "none";
    } else {
      document.querySelector(".tew-buttons").style.display = "flex";
    }

    if (this.swiper) {
      // If swiper instance already exists, destroy it before reinitializing
      this.swiper.destroy(true, true);
    }

    this.swiper = new Swiper(swiperContainer, {
      direction: "horizontal",
      loop: false,
      allowTouchMove: this.allowTouchMove,
      slidesPerView: slidesPerView,
      spaceBetween: 5,
      navigation: {
        nextEl: ".tew-button_next",
        prevEl: ".tew-button_prev",
      },
    });

    this.swiper.on("slideChange", () => {
      this.setActiveButton();
    });
  }

  setActiveButton() {
    if (this.swiper) {
      // Check if this.swiper is not null
      const activeIndex = this.swiper.activeIndex;
      document.querySelectorAll(".tew-button").forEach((button) => {
        button.classList.remove("tew-button_active");
      });
      document
        .querySelectorAll(".tew-button")
        [activeIndex % 2].classList.add("tew-button_active");
    }
  }
}
