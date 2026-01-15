// Lightweight client-side behavior: toggle password, basic validation & faux submit flow
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signin-form');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const toggle = document.getElementById('togglePassword');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');
  const year = document.getElementById('year');

  year.textContent = new Date().getFullYear();

  toggle.addEventListener('click', () => {
    const shown = password.type === 'text';
    password.type = shown ? 'password' : 'text';
    toggle.textContent = shown ? 'Show' : 'Hide';
    toggle.setAttribute('aria-pressed', String(!shown));
  });

  function setLoading(isLoading) {
    if (isLoading) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
    } else {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  function showMessage(msg, isError = true) {
    formMessage.textContent = msg;
    formMessage.style.color = isError ? '#ffb3b3' : '#9ff7c6';
  }

  // Very small client-side validation
  function validate() {
    if (!email.value.trim()) {
      showMessage('Please enter your email address.');
      email.focus();
      return false;
    }
    // simple email check
    const emailRe = /\S+@\S+\.\S+/;
    if (!emailRe.test(email.value.trim())) {
      showMessage('Please enter a valid email address.');
      email.focus();
      return false;
    }
    if (!password.value || password.value.length < 6) {
      showMessage('Password must be at least 6 characters.');
      password.focus();
      return false;
    }
    showMessage('', false);
    return true;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    showMessage('Signing in…', false);

    // Fake network request - replace with real call to your auth endpoint
    setTimeout(() => {
      setLoading(false);

      // Demo behavior: succeed if email contains "demo", else show a failure
      if (email.value.toLowerCase().includes('demo')) {
        showMessage('Signed in successfully — demo only.', false);
        // In a real app you would redirect on success:
        // window.location.href = "/app";
      } else {
        showMessage('Incorrect email or password. This is a demo page; use an email containing "demo".');
        password.value = '';
        password.focus();
      }
    }, 1000);
  });
});