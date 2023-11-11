import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // prevent form submission
   
  var password = document.getElementById('password').value;
   
  // Check password criteria using regular expressions
  var hasUpperCase = /[A-Z]/.test(password);
  var hasLowerCase = /[a-z]/.test(password);
  var hasNumbers = /\d/.test(password);
  var hasMinLength = password.length >= 8;
   
  // Display message to user if password does not meet criteria
  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasMinLength) {
     document.getElementById('message').textContent = 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.';
  } else {
     document.getElementById('message').textContent = '';
     // Add code here to submit the form or process the password as needed
  }
 });


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
