export const alertList = {
  alerts: [
    {
      name: "Tropical Cyclone Rosal Bulletin",
      content: `<p class="text-white/60">As of 5AM TC Bulletin for Rosal, The storm was located at 275km East-northeast of Itbayat Batanes</p>

      <div id="title-line" class="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <hr/>
        <h3 class="font-bold text-xl">Intensity</h3>
        <hr/>
      </div>
      ${
        [
          {
            name: "Wind Speed", value: "165kph"
          }, {
            name: "Wind Gusts", value: "195kph",
          }, {
            name: "Movement", value: "East-Northeast @ 15kph"
          }
        ].map(i => `<p><span class="font-bold">${i.name}:</span> <span class="text-red-400">${i.value}</span></p>`).join("")
      }
      <br/>
      <div id="title-line" class="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <hr/>
        <h3 class="font-bold text-xl">Wind Signal</h3>
        <hr/>
      </div>
      <div id="text-wrapper" class="grid gap-3">
      ${
        [
          {
            name: "Wind Signal #2", color: "yellow-500", value: "Batanes, Northern portion of Babuyan Islands",
          }, {
            name: "Wind Signal #1", color: "cyan-500", value: "Rest of Babuyan Islands, Cagayan, Ilocos Norte, Apayao and Northern portion of Isabela"
          }
        ].map(w => `
          <div id="text-group" class="grid gap-1">
          <p id="wind-signal-text" class="text-${w.color} bg-${w.color}/20 p-2 px-3 rounded-full justify-self-start text-xl">${w.name}</p>
          <p id="area">${w.value}</p>
          </div>
        `).join("")
      }
      </div>
      `,
      date: "10-23-26", // ex: 10-21-26 (MM-DD-YY)
      source: "DOST-PAGASA",
    },
  ]
}