# API basic using.
* api.domain.com just is a example. Run at local: localhost:PORT/v1.
## User
### User Schema:
```
firstName: { type: String },
lastName: { type: String },
email: { type: String },
decks: [{ type: Schema.Types.ObjectId, ref: "Deck" }],
```
- [GET] Get all users:
```
api.mydomain.com/v1/users
```
- [GET] Get a user:
```
api.mydomain.com/v1/users/:userId
```
- [POST] Create a user:
```
api.mydomain.com/v1/users
```
- [PUT] Replace a user:
```
api.mydomain.com/v1/users/:userId
```
- [PATH] Update a user:
```
api.mydomain.com/v1/users/:userId
```
## Deck
### Deck Schema
```
name: {type: String,},
description: {type: String},
total: {type: Number, default: 0},
owner: {
    type: Schema.Types.ObjectId, 
        ref: "User",
}
```
- [GET] Get User's decks:
```
api.mydomain.com/v1/users/:userId/decks
```
- [POST] Create new Deck
```
api.mydomain.com/v1/users/:userId/decks
```
