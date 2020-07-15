# Please use node version 8.10.0

- npm run dev # Run server
- npm run test # Run unit test


# Api routes
- http://localhost:8000/events POST - save event
- http://localhost:8000/events GET - get all events
- http://localhost:8000/events DELETE - delete all events
- http://localhost:8000/events/actors/:id GET - get actor by id
- http://localhost:8000/actors PUT - update actor info | params { id, avatar_url, login }
- http://localhost:8000/actors GET - get actors info
- http://localhost:8000/actors/streak GET - streak by actor