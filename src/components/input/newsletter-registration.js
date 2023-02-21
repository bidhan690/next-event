import classes from './newsletter-registration.module.css';
import {useRef, useState, useContext} from 'react';
import NotificationContext from '../../../store/notification-context';

function NewsletterRegistration() {
  const [email, setEmail] = useState();
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function handleChange(e) {
    setEmail(e.target.value);
  }

  function registrationHandler(e) {
    e.preventDefault();
    notificationCtx.showNotification({
      title: 'Signing up!',
      message: 'Registering for newsletter',
      status: 'pending',
    });
    const data = {email: emailRef.current.value};
    fetch('/api/registration/', {
      method: 'POST',
      body: JSON.stringify(data),

      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message) || 'Something went wrong';
        });
      })
      .then((data) =>
        notificationCtx.showNotification({
          title: 'Signed Up!',
          message: 'Successfully registered for newsletter',
          status: 'success',
        })
      )
      .catch((err) => {
        notificationCtx.showNotification({
          title: 'Error',
          message: err.message || 'Something went wrong',
          status: 'error',
        });
      });
    setEmail('');
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input type="email" id="email" placeholder="Your email" aria-label="Your email" ref={emailRef} value={email} onChange={handleChange} />
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
