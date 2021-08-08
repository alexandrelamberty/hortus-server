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

- 

### Plants

Plant name with it's differents culture phases starting and ending period.

```json
{
  "name": "Carrot",
  "family": Family(),
  "genus": Genus(),
  "types": Type(),
  "description": "...",
  "varietes": Species[],
  "harvest" DayRange(),
  "season": ["Perenial"],
  "sun": ["Full Sun"],
  "frost": ["Tolerant"],
  "water": ["1/Week"],
  "companion": Plant[],
  "competitor": Plant[],
  "seeding": {
    "start": 2,
    "end": 5,
    "germination": 15
  },
  "transplanting": {
    "start": 2,
    "end": 5,
    "germination": 15,
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
    "germination": 15
  },
  "spacing": 
  {
    "row": 10,
    "lines": 30
  }
}
```

### Plants Family

```json
{
  "title": "Hortus Plant Families",
  "description": "List of all the available plant families in the Hortus system",
  "link": "/families",
  "families":[
    {
      "name": "Cucurbitaceae",
    }
  ]
}
```
### Plants Genus

```json
{
  "title": "Hortus Plant Genus",
  "description": "List of all the available plant genus in the Hortus system",
  "link": "/genera",
  "genera":[
    {
      "name": "Cucurbita",
    }
  ]
}
```

## Plants Types

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

### Crops

```json
{
  "plant": Plant(Carrot),
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

## Ressources

https://www.fondation-louisbonduelle.org/en/my-vegetable-garden/grouping-vegetables-according-to-plant-families/
https://www.vegetables.co.nz/vegetables-a-z/
https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
https://dev.to/carlomigueldy/building-a-restful-api-with-nestjs-and-mongodb-mongoose-2165
https://francescociulla.com/crud-api-using-nestjs-mongoose-mongodb-and-docker
https://stackoverflow.com/questions/52230301/mongoose-with-nestjs-one-to-many
https://bezkoder.com/mongoose-one-to-many-relationship/
https://bezkoder.com/mongoose-one-to-one-relationship-example/
https://medium.com/weekly-webtips/building-modern-backendusing-nest-js-and-mongodb-96fd04f4b050