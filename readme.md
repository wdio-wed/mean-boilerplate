![Version](https://img.shields.io/badge/version-1.0-blue.svg) [![Build Status](https://travis-ci.org/alex030293/mean-boilerplate.svg?branch=master)](https://travis-ci.org/alex030293/mean-boilerplate) [![Test Coverage](https://codeclimate.com/github/alex030293/mean-boilerplate/badges/coverage.svg)](https://codeclimate.com/github/alex030293/mean-boilerplate/coverage) [![Code Climate](https://codeclimate.com/github/alex030293/mean-boilerplate/badges/gpa.svg)](https://codeclimate.com/github/alex030293/mean-boilerplate)


# MEAN boilerplate

This is a MEAN stack app boilerplate (MongoDB, Express, AngularJS and Node.js) based on Express app skeleton.

This micro web application consist on a SPA (single page application) for managing fruits.

Each fruit will have **name**, **description** and **price** attributes.

Users will have **username** and **password**.

**DEMO:** [http://mean-boilerplate.azurewebsites.net](http://mean-boilerplate.azurewebsites.net)

* **demo username**: han_solo
* **demo password**: chewbacca

### Backend

Backend will be implement with MongoDB database, running on mongolab.com.

Mongoose will be used as ODM in this project. Only two schemas will be defined, one defining a fruit and the other one definig a basic user profile.

### Frontend

Jade template engine will be used for rendering views. Only one generic layout, one mixins file a an index page will be included.

AngularJS will be used as frontend framework. Each view will have its controller.

Communication with model will be implemented with AJAX instead of a data factory or provider to show of API reusability for mobiles apps, etc.

## Dependencies

* **body-parser** ~1.13.2
* **cookie-parser** ~1.3.5
* **debug** ~2.2.0
* **express** ~4.13.1
* **jade** ~1.11.0
* **morgan** ~1.6.1
* **serve-favicon** ~2.3.0
* **mongoose** ~4.3.0
* **i18next** 1.10.3

## Notes

DB connection string is hardcoded. I know it should be set as an ENV var, but it´s hardcoded due to simplicity matters for the demo.

## Test

Run `npm test` to execute tests. Included tests:

* User unit tests
* User integration tests
* Fruit unit tests
* Fruit integration tests

## TO DO

* Store user password hash instead of the actual password in plain text
* Responsive design
* Retina graphics (@2x)
* Upgrade i18next (deprecated)
