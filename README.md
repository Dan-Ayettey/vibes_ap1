# Backend_University  # iOS_University


# `Available Scripts`

In the project directory, you can run:

## `npm install`

Run npm install to install nodejs modules

## `npm start`

Runs the app in the development mode.<br/>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.




# Resource
The key abstraction of information in REST is a resource. According to Fielding's dissertation section 5.2, any information that can be named can be a resource: a document or image, a temporal service (e.g. "today's weather in Los Angeles"), a collection of other resources, a non-virtual object (e.g. a person), and so on. A resource is a conceptual mapping to a set of entities, not the entity that corresponds to the mapping at any particular point in time. More precisely, a resource R is a temporally varying membership function MR(t), that for time t maps to a set of entities, or values, that are equivalent. The values in the set may be resource representations and/or resource identifiers.

A resource can also map to the empty set, that allows references to be made to a concept before any realization of that concept exists.

Resource Identifier
REST uses a resource identifier to identify the particular resource instance involved in an interaction between components. The naming authority (an organization providing APIs, for example) that assigned the resource identifier making it possible to reference the resource, is responsible for maintaining the semantic validity of the mapping over time (ensuring that the membership function does not change). - Fielding's dissertation section 5.2

Representation
REST components perform actions on a resource by using a representation to capture the current or intended state of that resource and by transferring that representation between components. A representation is a sequence of bytes, plus representation metadata to describe those bytes - Fielding dissertation section 5.2.

Domain
According to Wikipedia, a domain model is a system of abstractions that describes selected aspects of a sphere of knowledge, influence, or activity. The concepts include the data involved in a business, and the rules that the business uses in relation to that data. As an example, the PayPal domain model includes domains such as Payment, Risk, Compliance, Identity, Customer Support, etc.

Capability
Capability represents a business-oriented and customer-facing view of an organization's business logic. Capabilities could be used to organize portfolio of APIs as a stable, business-driven view of its system, consumable by customers and experiences. Examples of capability are: Compliance, Credit, Identity, Retail and Risk, among other things.

Capabilities drive the interface, while domains are more coarse-grained and closer to the code and the organization's structure. Capability and domain are seen as orthogonal concerns from a service perspective.

Namespace
Capabilities drive service modeling and namespace concerns in an API portfolio. Namespaces are part of the Business Capability Model. Examples of namespace are: compliance, devices, transfers, credit, limits, etc.

Namespaces should reflect the domain that logically groups a set of business capabilities. Domain definition should reflect the customer's perspective on how platform capabilities are organized. Note that these may not necessarily reflect the company's hierarchy, organization, or (existing) code structure. In some cases, domain definitions are aspirational, in the sense that these reflect the target, customer-oriented platform organization model. Underlying service implementations and organization structures may need to migrate to reflect these boundaries over time.

Service
Services provide a generic API for accessing and manipulating the value set of a resource, regardless of how the membership function is defined or the type of software that is handling the request. Services are generic pieces of software that can perform any number of functions. It is, therefore, instructive to think about the different types of services that exist.

Logically, we can segment the services and the APIs that they expose into two categories:

Capability APIs are public APIs exposed by services implementing generic, reusable business capabilities.
Experience-specific APIs are built on top of capability APIs and expose functionality which may be either specific to a channel, or optimized for a context-specific specialization of a generic capability. Contextual information could be related to time, location, device, channel, identity, user, role, privilege level among other things.
Capability-based Services and APIs
Capability APIs are public interfaces to reusable business capabilities. Public implies that these APIs are limited only to the interfaces meant for consumption by front-end experiences, external consumers, or internal consumers from a different domain.

Experience-based Services and APIs
Experience-specific services provide minimal additional business logic over core capabilities, and mainly provide transformation and lightweight orchestration to tailor an interaction to the needs of a specific experience, channel or device. Their input/output functionality is limited to service calls.


# HTTP response codes
### `Name	Description	Sample reply`

##### 200	Success	{"Success": true}
##### 201	Created	{"Success": true}
##### 400	Bad request	{"message": "Bad request"}
##### 401	Unauthorized	{"message": "Unauthorized"}
##### 404	Not found	{"message": "Not found"}
##### 500	Server error	{"message":"Server error","id":"3188c2d0-29a4-4080-908e-582e7ed82580"}

# Connections
### `Type	Resource	Description`

# version
GET	/api/v1 get api version.

# Users
 ### `Basic role. Type	Resource	Description`
 
##### `POST	/v1/users/users,	creat users.`
#####  `POST	/v1/users/auth,	  authenticate user.`
#####  `GET 	/v1/users/id,	    get user by id.`
#####  `PUT	  /v1/users/id,	    update user by id.`

#####  `PUT  /v1/users/deactivated-account/id, deactivated account.`
#####  `POST /v1/users/id/activated-account",  activated account.`
#####  `PUT /v1/users/id/renewed-secret,  renewed secret.`
#####  `PUT /v1/users/id/renewed-password,  renewed  password.`
      
# Admin role. One has be an admin to access this route

#####  `GET	  /v1/admins/managed-user/id admin   get a sepecific user by.`
#####  `DELETE /v1/admins/managed-user/id admin  get a sepecific user by.`
#####  `GET   /v1/admins/managed-user/ admin  get list of users.`
#####   `PUT  /v1/admins/managed-user/deactivated-account/id, deactivated account.`
#####  `POST /v1/admins/managed-user/activated-account",  activated account.`

# Authentication
All API requests must contain:

X-USER-TOKEN and X-USER-EMAIL in the request headers OR
user_token & user_email in the query parameters
The user_token/X-USER-TOKEN can be found in your settings page. Alternatively, navigate to your account settings by clicking on Account Settings in the dropdown of the top right of your homepage in Workato. Your API key can be found in the left navigation panel in the subsequent page.

#Supported Formats
 API supports sending request body with the application/json content-type. All replies are also encoded in application/json; charset=utf-8



