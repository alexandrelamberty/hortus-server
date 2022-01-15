### Data modeling

## Culture

### Culture Phase

- Semis (Seeding)
  - Interieur (Indoor)
  - Chassis (Frame)
  - Exterieur (Outdoor)
- Repiquage (Transplanting)
- Plantation (Planting)
- Récolte (Harvest)

### Culture Care and Envinronment

### Plant

```json
{
  "name": string,
  "family": string,
  "genus": string,
  "species": sring,
  "subspecies": string,
  "variant": string,
} 
```

## Plant Type

See: `plant_type.json`

```json
{
  "title": "Hortus Plant Types",
  "description": "List of all the available plant types in the Hortus system",
  "link": "/types",
  "types":[
    {
      "id": Id(),
      "title": "Root",
      "link": "/types/1"
    }
  ]
}
```

### Seed

```json
{
  "plant": Plant,
  "name": string,
  "description": "",
  "harvest" DayRange(),
  "season": ["Annual", "Biennial", "Perenial"],
  "sun": ["Full Sun"],
  "frost": ["", "Non tolerant"],
  "water": ["1/Week"],
  "companions": Plant[],
  "competitors": Plant[],
  "seeding": {
    "start": 2,
    "end": 5,
    "germination": 15
  },
  "transplanting": {
    "start": 2,
    "end": 5,
    "growth": 2
  },
  "planting": {
    "start": 2,
    "end": 5,
    "maturity": 6
  },
  "harvesting": {
    "start": 2,
    "end": 5,
    "duration": 15
  },
  "spacing": 
  {
    "row": 10,
    "lines": 30
  }
}
```

### Culture

```json
{
  "plant": Carrot,
  "createdAt": Date,
  "updatedAt": Date,
  "seeding": {
    "status": "Waiting|Started|Stopped",
    "startedAt": Date,
    "endedAt": Date,
    "quantity": Number,
  },
  "transplanting": {
    "status": "Waiting|Started|Stopped",
    "startedAt": Date,
    "endedAt": Date,
    "quantity": Number,
  },
  "planting": {
    "status": "Waiting|Started|Stopped",
    "startedAt": Date,
    "endedAt": Date,
    "quantity": Number,
  },
  "harvesting": {
    "status": "Waiting|Started|Stopped",
    "startedAt": Date,
    "endedAt": Date,
    "quantity": { 
      "number": "1O",
      "mesure": "Kg"
    }
  },
}
```
