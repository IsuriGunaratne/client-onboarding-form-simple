# Client Onboarding Form
A simple client onboarding form built with **Next.js**, **React Hook Form**, and **Zod** for validation.  
The form submits JSON data to an external API endpoint.

## Features
- Form validation with **Zod + React Hook Form**
- Inline error messages
- Success and error handling for form submission
- Services as multi-select checkboxes
- Dynamic date validation (start date must be today or later)
- Tailwind CSS for styling
- Jest test cases for validating the Zod schema
- Pre-fill Services from Query Params

## Prerequisites
- Node.js >= 18
- npm installed

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/IsuriGunaratne/client-onboarding-form-simple.git
cd client-onboarding-form-simple
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**

Create a  **.env.local**  file in the root folder:

```bash
NEXT_PUBLIC_ONBOARD_URL=https://example.com/api/onboard
```
For testing purposes, you can also use a mock API like
```bash
https://jsonplaceholder.typicode.com/posts
```

## Running the Application

1. **Start the development server**
```bash
npm run dev
```

2. **Open the app in your browser**
```bash
http://localhost:3000
```

3. **Fill out the form and submit**

* Successful submissions show a success message. 

* Failed submissions show an error notice at the top.


4. **Service query param from the URL**

You can pre-select a service automatically by adding a query parameter to the URL. 
For example:
```bash
https://your-app-domain.com/?service=UI%2FUX
```
This will automatically check the UI/UX checkbox in the Services section.


## Running Test Cases
The project uses Jest to test the Zod validation schema **(__tests__/schema.test.ts)**.
```bash
npm test
```

## Notes

* The form submission endpoint is configurable via NEXT_PUBLIC_ONBOARD_URL.

* All form fields are validated client-side using Zod.

* Tests ensure that the validation logic behaves correctly for valid and invalid input.
