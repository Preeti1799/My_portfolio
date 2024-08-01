var typed = new Typed(".text", {
    strings: ["Btech Graduate", "Frontend Developer", "Quick learner"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (result.success) {
            alert('Form submitted successfully!');
        } else {
            handleRateLimit(result);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
});

async function handleRateLimit(result) {
    if (result.message.includes('Rate limited')) {
        alert('Rate limit exceeded. Retrying in 30 seconds...');
        setTimeout(() => form.submit(), 30000); // Retry after 30 seconds
    } else {
        alert('Error: ' + result.message);
    }
}
