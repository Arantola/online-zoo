import "../../assets/styles/main.scss";

window.addEventListener('load', () => {
	const headerBurger = document.querySelector   ('.header__burger'),
	      burger       = document.querySelector   ('.burger'),
	      burgerLinks  = document.querySelectorAll('.burger__link'),
          burgerCross  = document.querySelector   ('.burger__button');

    headerBurger.addEventListener('click', () => {
        burger.classList.add('active');
        document.documentElement.classList.add('_lock');
    });

    burger.addEventListener('click', (e) => {
		if (!e.target.closest('.burger__inner')) {
			closeMenuBurger();
		}
	});

	burgerLinks.forEach((item) => {
		item.addEventListener('click', () => {
			closeMenuBurger();
		});
	});

    burgerCross.addEventListener('click', () => {
        closeMenuBurger();
    });

	function closeMenuBurger() {
        burger.classList.remove('active');
        setTimeout(() => { document.documentElement.classList.remove('_lock');}, 100);
    }


	const checkButtons = document.querySelectorAll('.amount__radio'),
	      inputAmount  = document.querySelector   ('.input-amount'),
	      maxLength    = +inputAmount.dataset.maxlength;

	inputAmount.addEventListener('input', function() {
		inputAmount.value = inputAmount.value.replace(/^[0][0-9]*/g, '');
		console.log(inputAmount.value[0]);
		if (inputAmount.value < 0) {
			inputAmount.value = '';
		}
		if (inputAmount.value.length >= maxLength - 1) {
			inputAmount.value = inputAmount.value.substring(0, maxLength);
		}

		checkButtons.forEach((item) => item.checked = false);
		for (let button of checkButtons) {
			if (inputAmount.value == button.value) {
				button.checked = true;
			}
		}
	});
	
	checkButtons.forEach( function(box) {
		box.addEventListener('change', function() {
			if (box.checked) {
				inputAmount.value = box.value;
			}
		});
	})
	checkButtons[5].click();
});