class FavoriteUI {
    constructor() {
        this.container = document.querySelector('.favorites #dropdown1');
    }

    get containerDropdownUI() {
        return this.container;
    }


    renderFavorities(ticket, btnInfo) {

        const ticketInfo = ticket.lastElementChild.dataset
        let haseInFav = true
        const favorites = this.container.querySelectorAll('.delete-favorite')
        favorites.forEach(element => {
            if (JSON.stringify(btnInfo.dataset) === JSON.stringify(element.dataset)) {
                haseInFav = false
                M.toast({ html: 'This ticket is already add in favorite!' })
            }
        });

        const tamplate = FavoriteUI.favoritTicketsTemplate(ticketInfo, haseInFav);
        this.container.insertAdjacentHTML('afterbegin', tamplate);
    }


    static favoritTicketsTemplate(ticketInfo, haseInFav) {
        if (haseInFav) {
            return `<div class="favorite-item  d-flex align-items-start">
        <img
          src="${ticketInfo.airline_logo}"
          class="favorite-item-airline-img"
        />
        <div class="favorite-item-info d-flex flex-column">
          <div
            class="favorite-item-destination d-flex align-items-center"
          >
            <div class="d-flex align-items-center mr-auto">
              <span class="favorite-item-city">${ticketInfo.origin_name}</span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="favorite-item-city">${ticketInfo.destination_name}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${ticketInfo.time_departure}</span>
            <span class="ticket-price ml-auto">${ticketInfo.currencysimpol}${ticketInfo.currency}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">Пересадок: ${ticketInfo.transfers}</span>
            <span class="ticket-flight-number">Номер рейса: ${ticketInfo.flight_number}</span>
          </div>
          <a
          data-airline_logo="${ticketInfo.airline_logo}"
          data-time_departure = "${ticketInfo.time_departure}"
          data-origin_name = "${ticketInfo.origin_name}"
          data-destination_name = "${ticketInfo.destination_name}"
          data-currency = "${ticketInfo.currency}"
          data-transfers = "${ticketInfo.transfers}"
          data-flight_number = "${ticketInfo.flight_number}"
          data-currencySimpol = "${ticketInfo.currencysimpol}"
            class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
            >Delete</a
          >
        </div>
      </div>`
        } else { return '' }

    }



}

const favorite = new FavoriteUI();

export default favorite;