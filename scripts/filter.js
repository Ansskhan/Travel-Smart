// Filtering functionality for package cards
document.addEventListener('DOMContentLoaded', function () {
	const auctionContainer = document.querySelector('.auction-container');
	const filterSidebar = auctionContainer.querySelector('.auction-filters-sidebar');
	const packageGrids = auctionContainer.querySelectorAll('.packages-grid');
	const filterGroups = filterSidebar.querySelectorAll('.auction-filter-group');

	// Get selected category, price range, and ratings
	function getFilters() {
		// Categories
		const categoryGroup = Array.from(filterSidebar.querySelectorAll('.auction-filter-group .auction-filter-title'))
			.find(title => title.textContent.includes('Categories'));
		const categoryOptions = categoryGroup ? categoryGroup.parentElement.querySelectorAll('.auction-filter-options .auction-filter-option input[type="checkbox"]:checked') : [];
		const categories = Array.from(categoryOptions).map(input => {
			const label = input.parentElement;
			const link = label.querySelector('a');
			return link ? link.textContent.trim() : label.textContent.trim();
		});

		// Price
		const minPrice = parseInt(document.getElementById('auctionMinPrice').value) || 0;
		const maxPrice = parseInt(document.getElementById('auctionMaxPrice').value) || Infinity;

		// Ratings
		const ratingGroup = Array.from(filterSidebar.querySelectorAll('.auction-filter-group .auction-filter-title'))
			.find(title => title.textContent.includes('Guest Rating'));
		const ratingOptions = ratingGroup ? ratingGroup.parentElement.querySelectorAll('.auction-filter-options .auction-filter-option input[type="checkbox"]:checked') : [];
		let ratings = [];
		Array.from(ratingOptions).forEach(input => {
			const label = input.parentElement.textContent.trim();
			if (label.includes('5 Stars')) ratings.push(5);
			if (label.includes('4 Stars & Up')) ratings.push(4, 5);
			if (label.includes('3 Stars & Up')) ratings.push(3, 4, 5);
		});
		ratings = [...new Set(ratings)];
		return { categories, minPrice, maxPrice, ratings };
	}

	// Main filter function
	function filterPackages() {
		const { categories, minPrice, maxPrice, ratings } = getFilters();
		const headings = document.querySelectorAll('.welcome-text.text-center');
		packageGrids.forEach((grid, i) => {
			let gridCategory = null;
			const firstCard = grid.querySelector('.package-card');
			if (firstCard) gridCategory = firstCard.getAttribute('data-category');
			// Hide grids/headings not matching selected category
			if (categories.length > 0) {
				if (!categories.includes(gridCategory)) {
					grid.style.display = 'none';
					if (headings[i]) headings[i].style.display = 'none';
					return;
				} else {
					grid.style.display = '';
					if (headings[i]) headings[i].style.display = '';
				}
			} else {
				grid.style.display = '';
				if (headings[i]) headings[i].style.display = '';
			}
			// Filter cards in visible grid
			grid.querySelectorAll('.package-card').forEach(card => {
				const cardCategory = card.getAttribute('data-category');
				const price = parseInt(card.querySelector('.discounted-price').textContent.replace(/[^\d]/g, ''));
				// Count stars (full + half)
				const ratingStars = card.querySelectorAll('.package-rating .fa-star').length;
				const ratingHalf = card.querySelectorAll('.package-rating .fa-star-half, .package-rating .fa-star-half-alt').length;
				let rating = ratingStars + (ratingHalf > 0 ? 0.5 : 0);
				let show = true;
				if (categories.length > 0 && !categories.includes(cardCategory)) show = false;
				if (price < minPrice || price > maxPrice) show = false;
				if (ratings.length > 0 && !ratings.includes(Math.round(rating))) show = false;
				card.style.display = show ? '' : 'none';
			});
		});
	}

	// Listen for Apply Filters button
	const applyBtn = filterSidebar.querySelector('.auction-apply-filters-btn');
	if (applyBtn) {
		applyBtn.addEventListener('click', filterPackages);
	}
	// Listen for Reset Filters button
	filterSidebar.addEventListener('click', function (e) {
		if (e.target.classList.contains('auction-reset-filters')) {
			filterSidebar.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
				input.checked = false;
			});
			document.getElementById('auctionMinPrice').value = '';
			document.getElementById('auctionMaxPrice').value = '';
			filterPackages();
		}
	});
	// Initial filter (show all)
	filterPackages();
});
