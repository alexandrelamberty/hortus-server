// https://docs.mongodb.com/manual/tutorial/write-scripts-for-the-mongo-shell/

db.createUser(
    {
        user: "hortus",
        pwd: "hortus",
        roles: [
            {
                role: "readWrite",
                db: "hortus"
            }
        ]
    }
)

db.families.drop();
db.families.insertMany([
  {
    name: 'Solanaceae'
  },
  {
    name: 'Floraceae'
  }
])