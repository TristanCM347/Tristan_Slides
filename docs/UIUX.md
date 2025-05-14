GLOBAL
- The website includes a sleek, modern appearance with a linear gradient background and grey tones for various elements.
- A consistent font across the site enhances user comfort.
- A harmonious color scheme, user-tested and inspired by online sources, provides visual unity.
- All website elements maintain consistent hues, calculated mathematically.
- Contrast is achieved through grey elements against the linear gradient backdrop.
- Uniform appearance across different screens, including headers, forms, and modals.
- Consistent design for buttons, controls, and cards across multiple screens.
- Consistently placed modern buttons in the header facilitate easy navigation.
- Efficient workflows are accommadated from logging in to editing presentations. This includes direct adjustments of main presentation properties from the dashboard enhance speed and efficiency.
- Minimalist design avoids unnecessary clutter; presentation settings are accessed exclusively via the hamburger menu.
- Detailed modals and high-contrast colors, validated by Chrome Web Tools, facilitate usability.
- Webiste is very safe due to vast amounts of error checking user actions plus not allowing them to make any errors such as - Data Rendering Safeguards: UseEffect in React ensures that data needed for forms is fully loaded before rendering, preventing premature submissions and enhancing safety. If users submit form while content isnt loaded then nothing happens either (its equivalent to closing the file)
- Adherence to best understable practices in form labeling for better accessibility and operability as specifically mentioned in lecture notes.
"<label for={someInput}>Name</label>"
"<input id={someInput} />"
- Persistent error messages and detailed feedback improve user interaction.
- Implemented safe and very understandable redirection rules across all URLs to prevent navigation errors and ensure user access is appropriately managed based on authentication status and content availability.
- http://localhost:3000/register -> Redirects to dashboard or login
  - http://localhost:3000/login -> Redirects to dashboard or login
  - http://localhost:3000 -> Redirects to dashboard or login
  - http://localhost:3000/dashboard -> Redirects to dashbaord or login
  - http://localhost:3000/presentationId -> Redirects to dashbaord or login or first slide of presentation (depends on the user accessing, if token in storage, if presentaiton exists etc..)
  - http://localhost:3000/presentationId/slideNum -> Redirects to dashbaord or login or first slide of presentation (depends on the user accessing, if token in storage, if presentaiton exists, if slide num exists etcc..)
  - http://localhost:3000/preview/presentationId/slideNum -> Redirects to dashbaord or login or first slide of presentation (depends on the user accessing, if token in storage, if presentaiton exists, if slide num exists etcc..)
  - http://localhost:3000/anystringor/sequence/youchoose -> redirects to dashboard or login
- All modals can be submitted with enter key and can be exited with escape key

LOGIN / REGISTER SCREEN
- Interactive forms toggle between login and registration modes. 
- Forms are unsubmitable when fields are incomplete or passwords do not match, enforced by a blurred, non-clickable submit button.

DASHBOARD
- Presentations are displayed in a consistent, aligned format, reducing user anxiety.
- Pattern affordance from hamburger suggests possible actions, particularly for accessing presentation settings via the hamburger menu on each presentation card.
- Presentation properties can be modified directly from the dashboard, speeding up user interactions.

PRESENTATION SCREEN
- A user-friendly layout prioritizes buttons over a hamburger menu, with a scrollable header allowing all buttons to be accessible.
- Feedback mechanisms confirm actions like saving presentations and validate navigational routes.
- Detailed tooltips on hover provide operational guidance for toolbar and header controls promoting learnability..
- Toolbar icons reflect their real-world applications.
- Slides are designed as squares to accommodate various screen sizes, with extensive media queries to optimize the display area.
- Safety-focused features include confirmatory modals for critical actions like revising history or deleting slides.
- Data-sensitive forms delay loading until all necessary data is fetched, preventing premature submissions, promoting safety.
- Can navigate slides wiht left and right arrow buttons
- We give users an error and also a solution e.g. when trying to delete if theres only one slide in the presentation
