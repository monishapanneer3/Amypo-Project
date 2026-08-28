# EventSphere — Frontend

React 18 + Redux Toolkit + Ant Design frontend for the EventSphere conference
session management system, built to the file structure and behavior
described in the project SRS.

## Getting started

```bash
npm install
npm start        # runs on http://localhost:3000
npm test         # runs the Jest/RTL test suite
```

By default the app calls a backend at `http://localhost:8080/api`. Override
this with an `.env` file:

```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

## Structure

```
src/
  components/
    attendees/    AttendeeForm.jsx, AttendeeList.jsx
    layout/        Navbar.jsx, Navbar.css, Footer.jsx (re-exports of src/layout)
    sessions/      SessionForm.jsx, SessionList.jsx
    speakers/      SpeakerForm.jsx, SpeakerList.jsx
  hooks/           useFetch.js
  layout/          Navbar.jsx, Navbar.css, Footer.jsx  (canonical layout)
  services/        api.js, sessionService.js, speakerService.js, attendeeService.js
  store/
    slices/        authSlice.js, sessionSlice.js, speakerSlice.js, attendeeSlice.js
    index.js
  tests/           example Jest/RTL specs
  App.jsx / App.css
  Home.jsx / Home.css
  Login.jsx
  index.js / index.css
  setupTests.js
```

`src/components/layout` mirrors the `src/layout` directory listed in the SRS
project structure; the components there simply re-export the canonical
implementation in `src/layout` to avoid maintaining duplicate logic.

## Key behaviors implemented per the SRS

- JWT persisted to `localStorage` on login, removed on logout (`authSlice.js`).
- `useFetch` hook returns `{ loading, data }`, starting `loading: true` /
  `data: null`, resolving once the API call settles.
- Loading indicator text: `Loading participants...` (`data-testid="loader"`).
- Status/error feedback rendered in an element with `data-testid="status-msg"`
  on the Session, Speaker, and Attendee list/form screens.
- `Server Unreachable` shown on network failure across list screens.
- Session, Speaker, and Attendee CRUD screens with Ant Design tables,
  pagination, create/edit modals, and delete confirmation.
- Route protection: unauthenticated users are redirected to `/login`.
