export const alertList = {
  alerts: [
    {
      name: "Tropical Cyclone Rosal Bulletin 11AM",
      content: `<p class="text-white/60">
      Typhoon Rosal slightly weakens while moving over the Sea of East Taiwan
      </p>

      <div id="title-line" class="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <hr/>
        <h3 class="font-bold text-xl">Intensity</h3>
        <hr/>
      </div>
      ${
        [  // data
          {
            name: "Wind Speed", value: 150, unit: "kph"
          }, {
            name: "Wind Gusts", value: 185, unit: "kph"
          }, {
            name: "Movement", value: "East-Northeast @ 15kph"
          }
        ].map(i => `<p><span class="font-bold">${i.name}:</span> <span class="text-red-400">${i.value}${i.unit ? i.unit : ""}</span></p>`).join("")
      }
      <br/>
      <div id="title-line" class="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <hr/>
        <h3 class="font-bold text-xl">Wind Signal</h3>
        <hr/>
      </div>
      <div id="text-wrapper" class="grid gap-3">
      ${
        [ // data
          {
            name: "Wind Signal #2", color: "yellow-500", value: [
              "Batanes", 
              "Northern portion of Babuyan Islands"
            ], scale: "62-88kph"
          }, {
            name: "Wind Signal #1", color: "cyan-500", value: [
              "Rest of Babuyan Islands",
              "Cagayan", 
              "Ilocos Norte",
              "Apayao",
            ],
            scale: "39-61kph"
          }
        ].map(w => `
          <div id="text-group" class="grid gap-2">
          <p id="wind-signal-text" class="text-${w.color} bg-${w.color}/20 p-2 px-3 rounded-full justify-self-start text-xl">${w.name}</p>
          <p id="wind-signal-speed" class="text-white/60">Wind Speed: <span class="text-${w.color}">${w.scale}</span></p>
          <ul>${w.value.map(a => `<li class="list-disc list-inside">${a}</li>`).join("")}</ul>
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