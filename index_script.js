window.onload = () => {
	let cursorBall = document.querySelector(".cursor-ball");
	let cursorOutline = document.querySelector(".cursor-outline");
	let lis = document.querySelectorAll('li');
	document.addEventListener("mousemove", (e) => {
  		cursorBall.style.top = e.pageY + "px";
  		cursorBall.style.left = e.pageX + "px";

  		cursorOutline.style.top = e.pageY + "px";
  		cursorOutline.style.left = e.pageX + "px";
	});

	lis.forEach(item => {
		item.addEventListener("click", () => {
	    	lis.forEach(i => i.classList.remove("active"));
	    	item.classList.add("active");
    	});
    	 
	});

// Scrollspy
	const sections = document.querySelectorAll('content > div');
	const navItems = Array.from(lis);

	window.addEventListener('scroll', () => {
		let current = "";

		sections.forEach(section => {
			const sectionTop = section.offsetTop - 150;
			const sectionHeight = section.clientHeight;
			if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
				current = section.querySelector('h2').textContent.trim().toLowerCase();
			}
		});

		navItems.forEach(item => {
			item.classList.remove("active");
			if (item.textContent.trim().toLowerCase() === current) {
				item.classList.add("active");
			}
		});
	});

	// Clic pour défiler
	lis.forEach(item => {
		item.addEventListener("click", () => {
			const target = Array.from(sections).find(sec =>
				sec.querySelector('h2').textContent.trim().toLowerCase() === item.textContent.trim().toLowerCase()
			);
			if (target) {
				window.scrollTo({
					top: target.offsetTop - 80,
					behavior: 'smooth'
				});
			}
		});
	});
};