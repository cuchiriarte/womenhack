# Madres Reintegración Demo

## Overview
This project is a simple web application designed to help mothers reintegrate into the workforce by providing resources for learning and freelancing opportunities. The application consists of a landing page, a marketplace for offering services, and a school section for exploring STEAM courses.

## Project Structure
```
madres-reintegracion-demo
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── madres
│       │           └── demo
│       │               ├── Main.java
│       │               └── server
│       │                   └── SimpleServer.java
│       └── resources
│           └── application.properties
├── web
│   ├── landing.html
│   ├── about.html
│   ├── marketplace
│   │   └── index.html
│   ├── school
│   │   └── index.html
│   ├── css
│   │   └── styles.css
│   └── js
│       └── app.js
├── pom.xml
├── .gitignore
└── README.md
```

## Features
- **Landing Page**: Provides an overview of the platform's mission and benefits for mothers.
- **Marketplace**: A section where mothers can create profiles and offer their services as freelancers.
- **School**: A section where mothers can explore and enroll in STEAM courses.
- **Responsive Design**: The application is designed to be accessible on both mobile and desktop devices.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd madres-reintegracion-demo
   ```
3. Build the project using Maven:
   ```
   mvn clean install
   ```
4. Run the application:
   ```
   mvn exec:java -Dexec.mainClass="com.madres.demo.Main"
   ```
5. Open your web browser and navigate to `http://localhost:8080` to access the application.

## Usage
- Visit the landing page to learn about the platform.
- Navigate to the marketplace to create a freelancer profile.
- Explore the school section to enroll in available courses.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.