// Shared components: navbar and footer injection

function renderNavbar(active) {
	const pages = [
		{ href: 'index.html', label: 'Home' },
		{ href: 'about.html', label: 'About' },
		{ href: 'harassment.html', label: 'Harassment' },
		{ href: 'pornography.html', label: 'Pornography' },
		{ href: 'consent.html', label: 'Consent' },
		{ href: 'guidance.html', label: 'Guidance' },
		{ href: 'support.html', label: 'Support' },
		{ href: 'safety.html', label: 'Safety' },
		{ href: 'resources.html', label: 'Resources' }
	];

	const links = pages.map(p => {
		const isActive = active && p.href === active;
		return `<a href="${p.href}" ${isActive ? 'style="color: #6b6bd6; border-bottom: 2px solid #6b6bd6; padding-bottom: 6px;"' : ''}>${p.label}</a>`;
	}).join('');

	return `
		<div class="navbar">
			<div class="container">
				<div class="nav-inner">
					<a class="brand" href="index.html">
						<span class="brand-logo"></span>
						<span>BrightGuard</span>
					</a>
					<nav class="nav-links">${links}
						<a href="help.html" class="btn btn-primary" style="margin-left: 8px;">Get Help</a>
					</nav>
					<button class="nav-toggle" aria-label="Toggle navigation" id="navToggle">☰</button>
				</div>
				<div class="mobile-menu" id="mobileMenu">
					${links}
					<a href="help.html" class="btn btn-primary">Get Help</a>
				</div>
			</div>
		</div>
	`;
}

function renderFooter() {
	const year = new Date().getFullYear();
	return `
		<footer>
			<div class="container">
				<div class="footer-inner">
					<div>
						<div class="brand" style="margin-bottom: 8px;">
							<span class="brand-logo"></span>
							<span>BrightGuard Awareness Project</span>
						</div>
						<p class="muted">Educational resources to help protect and support children and young people.</p>
					</div>
					<div class="footer-links">
						<h3>Quick Links</h3>
						<a href="index.html">Home</a>
						<a href="about.html">About the Issue</a>
						<a href="harassment.html">Harassment & Bullying</a>
						<a href="pornography.html">Pornography Addiction</a>
						<a href="consent.html">Date Rape & Consent</a>
					</div>
					<div class="footer-links">
						<h3>Contact</h3>
						<a href="help.html">Get Help</a>
						<a href="resources.html">Resources</a>
						<a href="support.html">Psychological Support</a>
						<a href="safety.html">Online Safety</a>
					</div>
				</div>
				<div class="footer-bottom">
					<div style="display:flex; justify-content: space-between; align-items:center; gap: 10px; flex-wrap: wrap;">
						<div>Copyright © ${year} BrightGuard Awareness Project</div>
						<div style="display:flex; gap: 8px; align-items:center;">
							<a href="#" aria-label="Facebook" class="chip" title="Facebook">📘</a>
							<a href="#" aria-label="LinkedIn" class="chip" title="LinkedIn">💼</a>
							<a href="#" aria-label="YouTube" class="chip" title="YouTube">▶️</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	`;
}

function mountShared(activePage) {
	const navMount = document.getElementById('navbar');
	const footMount = document.getElementById('footer');
	if (navMount) navMount.innerHTML = renderNavbar(activePage);
	if (footMount) footMount.innerHTML = renderFooter();

	// Mobile menu toggle
	const toggle = document.getElementById('navToggle');
	const mobile = document.getElementById('mobileMenu');
	if (toggle && mobile) {
		toggle.addEventListener('click', () => {
			const isOpen = mobile.style.display === 'grid';
			mobile.style.display = isOpen ? 'none' : 'grid';
		});
	}
}

window.BrightGuardComponents = { mountShared };
// Maintain backward compat for earlier main.js calls
window.MdaddaComponents = window.BrightGuardComponents;

