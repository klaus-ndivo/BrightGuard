// Shared global interactions: mount components, animations, simple charts, form handling

document.addEventListener('DOMContentLoaded', () => {
	// Mount shared UI
	const active = document.body.getAttribute('data-active');
	const components = window.BrightGuardComponents || window.MdaddaComponents;
	if (components) {
		components.mountShared(active);
	}

	// Scroll fade-ups
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('appear');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });

	document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

	// Simple chart placeholders using CSS width if any [data-bar]
	document.querySelectorAll('[data-bar]').forEach(bar => {
		const value = Math.max(0, Math.min(100, Number(bar.dataset.bar)));
		bar.style.width = value + '%';
	});

	// Subtle button glow on hover via style
	document.querySelectorAll('.btn-primary').forEach(btn => {
		btn.addEventListener('mouseenter', () => {
			btn.style.boxShadow = '0 12px 30px rgba(107,107,214,0.45)';
		});
		btn.addEventListener('mouseleave', () => {
			btn.style.boxShadow = '0 8px 20px rgba(107,107,214,0.35)';
		});
	});

	// Help form handling
	const helpForm = document.getElementById('helpForm');
	if (helpForm) {
		helpForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const formData = new FormData(helpForm);
			const name = (formData.get('name') || '').toString().trim();
			const email = (formData.get('email') || '').toString().trim();
			const message = (formData.get('message') || '').toString().trim();
			const notice = document.getElementById('helpNotice');
			if (!name || !email || !message) {
				if (notice) notice.textContent = 'Please complete all fields.';
				return;
			}
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
				if (notice) notice.textContent = 'Please provide a valid email address.';
				return;
			}
			if (notice) notice.textContent = 'Thanks for reaching out. A team member will contact you soon.';
			helpForm.reset();
		});
	}
});

