


# content-share

This project is a **Content creation system** built using microservices architecture allowing content creators to create educational content.

## Overview

This application serves as a **Content creation system** allowing content creators to create contents efficiently. The system enables users to:

- Register : Users can provide their email ID and password to register themselves.
- Login : Users can login to the system to allow them to create contents or view their own contents. 
- Create contents: Once logged in, Users can create contents by providing the title,description and file link.
- View their contents: Once logged in, Users can view contents created by them in the My contents section. 


## Features
- **User login** : User can login to create content or view only contents belonging to them and can logout as well.
- **Content Creation**: Users can create new contents specifying title, description and file link.
- **Content Display**: Users can view the contents that are created by them only.


## Architecture

1. **Contents service**
   - Allows for content creation.
2. **Users service**
   - Allows for user registration and login functionality.
3. **Query service**
   - Allows for feeding the relevant contents (contents belonging to a user) to the client. Stores the users and contents in an efficient data structure allowing for better system performance.
4. **Event Bus**
   - Implements an event-driven architecture facilitating communication between microservices.



### Technologies Used

- **Backend**:
  - Node.js with Express.js for server-side logic and RESTful API endpoints.
  - JWT for user authentication.
  - MongoDB for data storage and management.
- **Frontend**:
  - React.js for interactive user interfaces.
  - Material UI for UI components.
  - CSS for responsive design.
- **Communication**:
  - RESTful APIs for inter-service communication.

### Installation

1. Clone the repository: `git clone https://github.com/nikhilar98/contentShare`
2. Navigate to the project directory: `cd contentShare`.
3. Install dependencies: Navigate to each folder and `npm install` .
4. Environment variables setup : Navigate to each folder and configure environment variables.
5. Start the application: Navigate to each folder and `npm start`.

The app should be fully up and running at this stage. 

**Live Link to access the app :** <a>https://content-share-ashy.vercel.app</a>
