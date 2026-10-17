document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');
menuToggle.hidden = false;
menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(expanded));
    navigation.classList.toggle('is-open', expanded);
});
navigation.addEventListener('click', event => {
    if (event.target.closest('a')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
    }
});
navigation.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        navigation.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    }
});

const form = document.querySelector('#inquiry-form');
form.hidden = false;
const result = document.querySelector('#inquiry-result');
const message = document.querySelector('#inquiry-message');
const copyStatus = document.querySelector('#copy-status');
form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const value = key => String(data.get(key) || '').trim();
    const lines = [
        `Hi That’s So Chic TO! I’m ${value('name')} and I’m planning a ${value('occasion').toLowerCase()}.`,
        `Location: ${value('location')}`,
        `Interested in: ${value('service')}`,
        value('date') ? `Event date: ${value('date')}` : 'Event date: To be confirmed',
        value('budget') ? `Planned decor budget: ${value('budget')}` : '',
        value('ideas') ? `My ideas: ${value('ideas')}` : '',
        'Could we discuss options and availability?'
    ];
    message.value = lines.filter(Boolean).join('\n');
    result.hidden = false;
    copyStatus.textContent = '';
    message.focus();
});
document.querySelector('#copy-inquiry').addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(message.value);
        copyStatus.textContent = 'Copied. Open Instagram below and paste your message into a DM.';
    } catch {
        message.focus();
        message.select();
        copyStatus.textContent = 'Select and copy the message above, then paste it into Instagram.';
    }
});
