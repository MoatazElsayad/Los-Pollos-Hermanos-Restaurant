// Script file to manage the reviews in the survay.html

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const reviewsList = document.getElementById('reviews-list');

    // Load reviews from localStorage on page load
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    savedReviews.reverse().forEach(review => renderReview(review));

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const reviewText = document.getElementById('review').value.trim();

        if (!name || !email || !reviewText) return;

        const review = {
            name,
            email,
            reviewText,
            date: new Date().toLocaleString() // Saves readable date and time
        };

        // Save to localStorage
        savedReviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(savedReviews));

        // Render review immediately
        renderReview(review, true);

        // Clear form
        form.reset();
    });

    // Function to render a review in the DOM
    function renderReview(review, insertAtTop = false) {
        const div = document.createElement('div');
        div.className = 'review-item';

        div.innerHTML = `
            <div class="review-header">${review.name}</div>
            <div class="review-email">${review.email}</div>
            <p class="review-text">${review.reviewText}</p>
            <div class="review-date">${review.date}</div>
            <button class="remove-review-btn" title="Delete Review">
                <img src="images/bin-icon.svg" alt="Remove" class="remove-icon"/>
            </button>
        `;

        // Add event listener to delete this review
        div.querySelector('.remove-review-btn').addEventListener('click', () => {
            // Remove from localStorage
            const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
            const updated = savedReviews.filter(r =>
                !(r.name === review.name &&
                r.email === review.email &&
                r.reviewText === review.reviewText &&
                r.date === review.date)
            );
            localStorage.setItem('reviews', JSON.stringify(updated));

            // Remove from DOM
            div.remove();
        });

        if (insertAtTop) {
            reviewsList.insertBefore(div, reviewsList.firstChild);
        } else {
            reviewsList.appendChild(div);
        }
    }
});

