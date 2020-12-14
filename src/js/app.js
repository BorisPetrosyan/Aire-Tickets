import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favorite from './views/favorite'
//console.log(formUI, locations, ticketsUI, favorite)

document.addEventListener('DOMContentLoaded', e => {
    const form = formUI.form;
    const btn = ticketsUI.containerUI;
    const deleteBtn = favorite.containerDropdownUI;

    // Events

    initApp();

    btn.addEventListener('click', e => {

        e.preventDefault();
        onAddFavorite(e)
    });
    deleteBtn.addEventListener('click', e => {
        e.preventDefault();
        onDeleteFavTicket(e)
    });
    form.addEventListener('submit', e => {
        e.preventDefault();
        onFormSubmit();

    });


    // handlers
    async function initApp() {
        await locations.init();
        formUI.setAutocompleteData(locations.shortCities);
    }

    function onDeleteFavTicket(e) {
        if (e.target.classList.contains('delete-favorite')) {
            e.target.closest('.favorite-item').remove()
        }
    }

    function onAddFavorite(e) {

        if (e.target.classList.contains('green')) {
            let ticket = e.target.parentElement
            const btnInfo = e.target
            favorite.renderFavorities(ticket, btnInfo)
        }
    }

    async function onFormSubmit() {
        const origin = locations.getCityCodeByKey(formUI.originValue);
        const destination = locations.getCityCodeByKey(formUI.destinationValue);
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;
        const currency = currencyUI.currecyValue;

        await locations.fetchTickets({
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });


        ticketsUI.renderTickets(locations.lastSearch);
        //console.log(locations.lastSearch);
    }
});

// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI