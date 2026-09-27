# Digital-Form-System

A Vue-based internal manufacturing management system designed to digitise shop-floor inspection and daily production records.

## Features

### Login

* Simple login interface for system access.

### Manufacturing

* Manufacturing department homepage.
* Provides basic instructions and supports language switching.

### Machine Inspection

* Records equipment inspection information.
* Requires image uploads before submission.
* Displays an alert when required files are missing.

### Appearance Inspection

* Records product appearance inspection results.
* Prompts users to confirm their inspection results before submission.

### Daily Sheet

* Records machine working hours and production types, including:

  * Normal production
  * Rework
  * Trial production

* **Product Form**: records production quantities and processing time.
* **Stop Form**: records downtime, duration, and related issues.
* Provides issue reference information through a full-screen image preview.
* Validates that the total recorded production and downtime matches the operator's attendance hours before submission.

## Tech Stack

* Vue.js
* JavaScript
* HTML
* CSS

## Project Setup

Install dependencies:

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Notes

This repository is a portfolio version of an internal manufacturing system. Company-specific information, production data, and business-related details have been removed or replaced with demonstration data.
