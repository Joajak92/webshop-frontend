# Webshop-frontend

## Overview

A frontend for a webshop built with React/Typescript and the Vitest library. The webshop is powered by a microservice infrastructure connected via a gateway. The product features testing of components and data. A payment flow is tested with solutions from Stripe Payment. It uses protected routes to ensure that only autheticated users can use the webpage.

## Technologies

Framework: React + Vite + Typescript

Testing: Vitest and npm testing library

Database: None. Databases are handled by the microservices listed below.

Port: Standard React (5173)

CI/CD Workflow: Node.js CI

**Payment implementation**

To test the flow of payment, a sandbox enviroment was created using Stripe Payment. Visit their site for more information. Link: https://stripe.com/se/payments

## Environment variables

- VITE_GATEWAY_API_URL (url to the gateway-application)
- VITE_ENABLE_MOCKS (prevents login as mock user when running the application)

## Startup

1. Open terminal
2. enter "npm install" command to get the latest updates and libraries used
3. enter "npm run build" to confirm that the installation succeeded.
4. enter "npm run dev" to run the application
5. Optional: enter "npm run test" to run the tests.

## Important

In order to run the project, you need to add a .env.local-file that points to the gateway, whether it is a localhost port or a deployed application.

## Links

Below are the links to the repositories of the services that the frontend relies on to work. For more information on the services, visit their individual repositories.

**Gateway**
Link: https://github.com/joel-schou/gateway-service
Role: connects the frontend with the microservices in the backend.

**Microservices**
Auth-service: https://github.com/katttiger/auth-service
Role: Handles authentication and handling of users by using JWT.

Product-service: https://github.com/Joajak92/product-service
Role: Manages the products in the webshop.

Order-service: https://github.com/klasen98/projekt-order-service
Role: Manages the orders created by users.

E-mail-service: https://github.com/joel-schou/email-service
Role: Sends a cofnirmation e-mail to the user's mail after the order has been sent.
