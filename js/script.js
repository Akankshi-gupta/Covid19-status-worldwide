async function makeRequest() {

    const url = "http://coronavirus.m.pipedream.net/";
    let response = await fetch(url);
    let data = await response.json();
    return data;

}
async function setData() {
    const response = await makeRequest();
    const global = response['summaryStats']['global'];

    const global_confirmed = document.getElementById('confirmed_cases');
    const gloabl_deaths = document.getElementById('deaths');

    const confirmed = global['confirmed'];
    const deaths = global['deaths'];

    const h2_confirmed = document.createElement('h2');
    const h2_deaths = document.createElement('h2');

    const confirmed_cases_text = document.createTextNode(confirmed);
    const deaths_cases_text = document.createTextNode(deaths);

    h2_confirmed.appendChild(confirmed_cases_text);
    h2_deaths.appendChild(deaths_cases_text);

    global_confirmed.appendChild(h2_confirmed);
    gloabl_deaths.appendChild(h2_deaths);



    const lastUpdatedTimestamp = new Date(response['cache']['lastUpdatedTimestamp']).toLocaleString();
    const global_update = document.getElementById('last_update');
    const h2_update = document.createElement('h2');
    const update_text = document.createTextNode(lastUpdatedTimestamp);
    h2_update.appendChild(update_text);
    global_update.appendChild(h2_update);

    const rawData = response["rawData"];
    document.getElementsByClassName("loader")[0].remove();
    const data_table = document.getElementById('data_table');
    data_table.style.display="block";
    for (const data of rawData) {
        const country = data['Country_Region'];
        const state = data['Province_State'];
        const confirmed_cases = data['Confirmed'];
        const deaths = data['Deaths'];
        const last_updated = data['Last_Update'];


        const tr = document.createElement('tr');
        const td_country = document.createElement('td');
        const td_state = document.createElement('td');
        const td_confirmed = document.createElement('td');
        const td_deaths = document.createElement('td');
        const td_updated = document.createElement('td');

        const country_text = document.createTextNode(country);
        const state_text = document.createTextNode(state);
        const confirmed_text = document.createTextNode(confirmed_cases);
        const deaths_text = document.createTextNode(deaths);
        const last_updated_text = document.createTextNode(last_updated);

        td_country.appendChild(country_text);
        td_state.appendChild(state_text);
        td_confirmed.appendChild(confirmed_text);
        td_deaths.appendChild(deaths_text);
        td_updated.appendChild(last_updated_text);

        tr.appendChild(td_country);
        tr.appendChild(td_state);
        tr.appendChild(td_confirmed);
        tr.appendChild(td_deaths);
        tr.appendChild(td_updated);

        data_table.appendChild(tr);

    }

}

function filter_rows() {
    const search = document.getElementById('search_input');
    const value = search.value.toUpperCase();
    const table = document.getElementById('data_table');
    const tr = table.getElementsByTagName('tr');

    for (const row of tr) {
        const first_column = row.getElementsByTagName('td')[0];
        const second_column = row.getElementsByTagName('td')[1];
        if (first_column) {
            const first_column_value = first_column.innerHTML.toUpperCase();
            const second_column_value = second_column.innerHTML.toUpperCase();
            if (first_column_value.indexOf(value) > -1 || second_column_value.indexOf(value) > -1) {
                row.style.display = "";

            }
            else {
                row.style.display = "none";
            }
        }
    }
}

  window.addEventListener('load',setData);









