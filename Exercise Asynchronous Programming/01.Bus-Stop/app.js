async function getInfo() {

    const stopId = document.getElementById("stopId").value;
    const bussesEl = document.getElementById("buses");
    const stopNameEl = document.getElementById("stopName");
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        stopNameEl.textContent = "Loading..";
        bussesEl.replaceChildren()
        const res = await fetch(url);

        if (res.status !== 200) {
            throw new Error('Stop ID found!');
        }
        const data = await res.json();
        stopNameEl.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            const liEl = document.createElement("li");
            liEl.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            bussesEl.appendChild(liEl);
        })

    } catch (error) {
        stopNameEl.textContent = "Error";
    }
}